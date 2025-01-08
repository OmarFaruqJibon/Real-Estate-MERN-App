import { useContext, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContex";
import apiCall from "../../lib/apiCall";
import { format } from 'timeago.js';

function Chat({ chats }) {
    const [chat, setChat] = useState(null);
    const { currentUser } = useContext(AuthContext);

    console.log(chats);

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


        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="chat">


            <div className="messages">
                <h3>Messages</h3>
                {chats.map((c) => (
                    <div className="message" key={c.id}
                        style={{
                            backgroundColor: c.seenBy.includes(currentUser.id)
                                ? "white"
                                : "yellow"
                        }}
                        onClick={() => handleOpenChat(c.id, c.receiver)}
                    >
                        <img
                            src={c.receiver.avatar || "https://i.postimg.cc/J7dgwngh/profile-picture.png"}
                            alt="receiver-profile-picture"
                        />
                        <span>{c.receiver.username}</span>
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
                                {chat.receiver.username}
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