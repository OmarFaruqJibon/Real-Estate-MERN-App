import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContex";
import apiCall from "../../lib/apiCall";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContex";
import { useNotificationStore } from "../../lib/notificationStore";
import EmojiPicker from "emoji-picker-react";

function Chat({ chats: initialChats, openChatId }) {
    const [chat, setChat] = useState(null);
    const [chats, setChats] = useState(initialChats);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [inputText, setInputText] = useState("");
    const { currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const messageEndRef = useRef();
    const decrease = useNotificationStore((state) => state.decrease);

    useEffect(() => {
        if (openChatId) {
            const targetChat = chats.find((c) => c.id === openChatId);
            if (targetChat) handleOpenChat(targetChat.id, targetChat.receiver);
        }
    }, [openChatId, chats]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiCall("/chats/" + id);
            if (!res.data.seenBy.includes(currentUser.id)) {
                await apiCall.put("/chats/read/" + id);
                setChats((prevChats) =>
                    prevChats.map((c) =>
                        c.id === id ? { ...c, seenBy: [...c.seenBy, currentUser.id] } : c
                    )
                );
            }
            setChat({ ...res.data, receiver });
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = inputText.trim();
        if (!text) return;

        try {
            const res = await apiCall.post("/messages/" + chat.id, { text });
            setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
            setInputText("");

            socket.emit("sendMessage", {
                receiverId: chat.receiver.id,
                data: res.data,
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on("getMessage", (data) => {
                if (chat?.id === data.chatId) {
                    setChat((prev) => ({
                        ...prev,
                        messages: [...prev.messages, data],
                        seenBy: [...prev.seenBy, currentUser.id],
                    }));
                }

                setChats((prevChats) =>
                    prevChats.map((c) =>
                        c.id === data.chatId
                            ? {
                                ...c,
                                lastMessage: data.text,
                                seenBy:
                                    chat?.id === data.chatId
                                        ? [...c.seenBy, currentUser.id]
                                        : c.seenBy.filter((id) => id !== currentUser.id),
                            }
                            : c
                    )
                );
            });

            return () => socket.off("getMessage");
        }
    }, [socket, chat, currentUser.id]);

    return (


        <div className={`chatContainerWithNavbar ${chat ? 'show-chat' : 'show-sidebar'}`}>

            <div className="sidebar">
                <h3>Chats</h3>
                <div className="chatList">
                    {chats.map((c) => (
                        <div
                            className={`chatItem ${chat?.id === c.id ? "active" : ""} ${c?.seenBy.includes(currentUser.id) ? "seen" : "unseen"
                                }`}
                            key={c.id}
                            onClick={() => handleOpenChat(c.id, c.receiver)}
                        >
                            <img
                                src={
                                    c?.receiver.avatar ||
                                    "https://i.postimg.cc/J7dgwngh/profile-picture.png"
                                }
                                alt="avatar"
                            />
                            <div className="chatInfo">
                                <span>{c?.receiver.username.toUpperCase()}</span>
                                <p>{c?.lastMessage?.slice(0, 25)}...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="chatBoxWrapper">
                {chat ? (
                    <div className="chatBox">
                        <div className="chatHeader">
                            <img
                                src={
                                    chat.receiver.avatar ||
                                    "https://i.postimg.cc/J7dgwngh/profile-picture.png"
                                }
                                alt="avatar"
                            />
                            <span>{chat.receiver.username}</span>
                            <button className="closeBtn" onClick={() => setChat(null)}>
                                ✕
                            </button>
                        </div>

                        <div className="chatBody">
                            {chat.messages.map((message) => (
                                <div
                                    className={`chatMessage ${message.userId === currentUser.id ? "own" : "other"
                                        }`}
                                    key={message.id}
                                >
                                    <div className="messageBubble">
                                        <p>{message.text}</p>
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messageEndRef}></div>
                        </div>

                        <form onSubmit={handleSubmit} className="chatInput">
                            <button
                                type="button"
                                className="emojiToggle"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                😊
                            </button>

                            {showEmojiPicker && (
                                <div className="emojiPickerWrapper">
                                    <EmojiPicker
                                        onEmojiClick={(emojiData) =>
                                            setInputText((prev) => prev + emojiData.emoji)
                                        }
                                    />
                                </div>
                            )}

                            <input
                                type="text"
                                name="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type a message..."
                                autoComplete="off"
                            />

                            <button type="submit">Send</button>
                        </form>
                    </div>
                ) : (
                    <div className="noChat">Select a chat to start messaging</div>
                )}
            </div>
        </div>
    );
}

export default Chat;
