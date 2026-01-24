// src/pages/chat/Chatting.js

import React, { Suspense } from "react";
import "./Chatting.scss";
import { useLoaderData, Await, useLocation } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Chatting = () => {
  const data = useLoaderData();
  const location = useLocation();
  const chatId = location.state?.chatId;

  return (
    <div className="chatPageWrapper">
      <div className="chatPageInner">
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <Await
            resolve={data?.chatResponse}
            errorElement={<p>Error loading chats!</p>}
          >
            {(chatResponse) => (
              <Chat chats={chatResponse.data} openChatId={chatId} />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default Chatting;
