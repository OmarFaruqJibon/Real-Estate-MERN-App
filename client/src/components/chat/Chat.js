import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContex";
import apiCall from "../../lib/apiCall";
import { format } from 'timeago.js';
import { SocketContext } from "../../context/SocketContex";
import { useNotificationStore } from "../../lib/notificationStore";


function Chat({ chats: initialChats, openChatId }) {
    const [chat, setChat] = useState(null);
    const [chats, setChats] = useState(initialChats);
    const { currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const messageEndRef = useRef();
    const decrease = useNotificationStore((state) => state.decrease);

    // Automatically open the chat if openChatId is provided
    useEffect(() => {
        if (openChatId) {
            const targetChat = chats.find((c) => c.id === openChatId);
            if (targetChat) {
                handleOpenChat(targetChat.id, targetChat.receiver);
            }
        }
    }, [openChatId, chats]);

    // Scroll to the bottom of the chat when messages are updated
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    // Handle opening a chat
    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiCall("/chats/" + id);

            // Mark the chat as seen by the current user
            if (!res.data.seenBy.includes(currentUser.id)) {
                await apiCall.put("/chats/read/" + id); // Update the backend
                setChats((prevChats) =>
                    prevChats.map((c) =>
                        c.id === id
                            ? { ...c, seenBy: [...c.seenBy, currentUser.id] }
                            : c
                    )
                );
            }

            setChat({ ...res.data, receiver });
        } catch (error) {
            console.log(error.message);
        }
    };

    // Handle sending a message
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get("text");
        if (!text) return;

        try {
            const res = await apiCall.post("/messages/" + chat.id, { text });
            setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
            e.target.reset();

            // Emit the new message via socket
            socket.emit("sendMessage", {
                receiverId: chat.receiver.id,
                data: res.data,
            });
        } catch (err) {
            console.log(err);
        }
    };

    // Listen for new messages via socket
    useEffect(() => {
        if (socket) {
            socket.on("getMessage", (data) => {
                // Update the chat's seenBy array if the message belongs to the currently open chat
                if (chat?.id === data.chatId) {
                    setChat((prev) => ({
                        ...prev,
                        messages: [...prev.messages, data],
                        seenBy: [...prev.seenBy, currentUser.id], // Mark as seen by the current user
                    }));
                }

                // Update the chats list to reflect the new message
                setChats((prevChats) =>
                    prevChats.map((c) =>
                        c.id === data.chatId
                            ? {
                                ...c,
                                lastMessage: data.text, // Update the last message
                                seenBy: chat?.id === data.chatId
                                    ? [...c.seenBy, currentUser.id] // Mark as seen if the chat is open
                                    : c.seenBy.filter((id) => id !== currentUser.id), // Mark as unread if the chat is not open
                            }
                            : c
                    )
                );
            });

            return () => {
                socket.off("getMessage");
            };
        }
    }, [socket, chat, currentUser.id]);

    return (
        <div className="chat">
            <div className="messages">
                <h3>Messages</h3>

                {chats.map((c) => (
                    <div className="message" key={c.id}
                        style={{
                            backgroundColor: c?.seenBy.includes(currentUser.id) || chat?.id === c.id
                                ? "white"
                                : "#ffff77"
                        }}
                        onClick={() => handleOpenChat(c.id, c.receiver)}
                    >
                        <img
                            src={c?.receiver.avatar || "https://i.postimg.cc/J7dgwngh/profile-picture.png"}
                            alt="receiver-profile-picture"
                        />
                        <span>{c?.receiver.username.toUpperCase()}</span>
                        <p>{c?.lastMessage}...</p>
                    </div>
                ))}
            </div>

            <div className="chatBoxWrapper">
                {chat && (
                    <div className="chatBox">
                        <div className="top">
                            <div className="user">
                                <img
                                    src={chat.receiver.avatar || "https://i.postimg.cc/J7dgwngh/profile-picture.png"} alt=""
                                />
                                {chat.receiver.username.toUpperCase()}
                            </div>
                            <span className="close" onClick={() => setChat(null)}>X</span>
                        </div>

                        <div className="center">
                            {chat.messages.map((message) => (
                                <div className="chatMessage" key={message.id}
                                    style={{
                                        alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                                        textAlign: message.userId === currentUser.id ? "right" : "left",
                                    }}
                                >
                                    <p>{message.text}</p>
                                    <span>{format(message.createdAt)}</span>
                                </div>
                            ))}
                            <div ref={messageEndRef}></div>
                        </div>
                        <form onSubmit={handleSubmit} className="bottom">
                            <textarea name="text"></textarea>
                            <button>Send</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chat;