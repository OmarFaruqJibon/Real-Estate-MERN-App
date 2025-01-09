import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContex";
import apiCall from "../../lib/apiCall";
import { format } from 'timeago.js';
import { SocketContext } from "../../context/SocketContex";

function Chat({ chats }) {
    const [chat, setChat] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    // console.log(socket);

    const messageEndRef = useRef();

    // const decrease = useNotificationStore((state) => state.decrease);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiCall("/chats/" + id);
            setChat({ ...res.data, receiver });

        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const text = formData.get("text");

        if (!text) return;

        try {
            const res = await apiCall.post("/messages/" + chat.id, { text });
            setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
            e.target.reset();

            socket.emit("sendMessage", {
                receiverId: chat.receiver.id,
                data: res.data,
            });


        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const read = async () => {
            try {
                await apiCall.put("/chats/read/" + chat.id);
            } catch (err) {
                console.log(err);
            }
        };

        if (chat && socket) {
            socket.on("getMessage", (data) => {
                if (chat.id === data.chatId) {
                    setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
                    read();
                }
            });
        }
        return () => {
            socket.off("getMessage");
        };
    }, [socket, chat]);


    return (
        <div className="chat">
            <div className="messages">
                <h3>Messages</h3>
                {chats.map((c) => (
                    <div className="message" key={c.id}
                        style={{
                            backgroundColor: c.seenBy.includes(currentUser.id) || chat?.id === c.id
                                ? "white"
                                : "#ffff77"
                        }}
                        onClick={() => handleOpenChat(c.id, c.receiver)}
                    >
                        <img
                            src={c.receiver.avatar || "https://i.postimg.cc/J7dgwngh/profile-picture.png"}
                            alt="receiver-profile-picture"
                        />
                        <span>{c.receiver.username.toUpperCase()}</span>
                        <p>{c.lastMessage}...</p>
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
                            {/* <div ref={messageEndRef}></div> */}
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