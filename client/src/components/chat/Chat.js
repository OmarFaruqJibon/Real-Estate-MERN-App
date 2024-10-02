import { useState } from "react";
import "./chat.scss";

function Chat() {
    const [chat, setChat] = useState(true);
    return (
        <div className="chat">


            <div className="messages">
                <h3>Messages</h3>
                <div className="message">
                    <img
                        src="https://i.postimg.cc/L69sbCdp/client1.png"
                        alt=""
                    />
                    <span>John Doe</span>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
                <div className="message">
                    <img
                        src="https://i.postimg.cc/sXzzZxsr/client6.png"
                        alt=""
                    />
                    <span>Kane smith</span>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
                <div className="message">
                    <img
                        src="https://i.postimg.cc/XYT44xPX/client5.png"
                        alt=""
                    />
                    <span>Will show</span>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
                <div className="message">
                    <img
                        src="https://i.postimg.cc/02y8fzm5/client4.png"
                        alt=""
                    />
                    <span>Krish Doe</span>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
                <div className="message">
                    <img
                        src="https://i.postimg.cc/0Nw5whSp/client3.png"
                        alt=""
                    />
                    <span>Harry Hos</span>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
                <div className="message">
                    <img
                        src="https://i.postimg.cc/wTwB8XHs/client2.png"
                        alt=""
                    />
                    <span>John Doe</span>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
            </div>

            <div className="chatBoxWrapper">
                {chat && (
                    <div className="chatBox">
                        <div className="top">
                            <div className="user">
                                <img
                                    src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                    alt=""
                                />
                                John Doe
                            </div>
                            <span className="close" onClick={() => setChat(null)}>X</span>
                        </div>
                        <div className="center">
                            <div className="chatMessage">
                                <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                                <span>1 hour ago</span>
                            </div>
                            <div className="chatMessage own">
                                <p>Lorem ipsum dolor sit amet</p>
                                <span>1 hour ago</span>
                            </div>
                            <div className="chatMessage">
                                <p>Lorem ipsum dolor sit amet</p>
                                <span>1 hour ago</span>
                            </div>
                            <div className="chatMessage own">
                                <p>Lorem ipsum dolor sit amet</p>
                                <span>1 hour ago</span>
                            </div>
                            <div className="chatMessage">
                                <p>Lorem ipsum dolor sit amet</p>
                                <span>1 hour ago</span>
                            </div>
                            <div className="chatMessage own">
                                <p>Lorem ipsum dolor sit amet</p>
                                <span>1 hour ago</span>
                            </div>
                            <div className="chatMessage">
                                <p>Lorem ipsum dolor sit amet</p>
                                <span>1 hour ago</span>
                            </div>
                            <div className="chatMessage own">
                                <p>Lorem ipsum dolor sit amet</p>
                                <span>1 hour ago</span>
                            </div>
                            <div className="chatMessage">
                                <p>Lorem ipsum dolor sit amet</p>
                                <span>1 hour ago</span>
                            </div>
                            <div className="chatMessage own">
                                <p>Lorem ipsum dolor sit amet</p>
                                <span>1 hour ago</span>
                            </div>
                        </div>
                        <div className="bottom">
                            <textarea></textarea>
                            <button>Send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chat;