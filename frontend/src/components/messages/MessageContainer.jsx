import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation.js";
import MessageInput from "./MessageInput.jsx";
import Messages from "./Messages.jsx";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import GameLaunch from "../sidebar/GameLaunch.jsx";
import OpenGame from "../sidebar/OpenGame.jsx";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [gameCode, setGameCode] = useState(""); // State to store the game code

  const handleGameCode = (code) => {
    setGameCode(code); // Set the game code when received
  };
  useEffect(() => {
    // cleanup function (unmounts )
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center justify-between">
            <div>
              <span className="label-text">To:</span>{" "}
              <span className="text-gray-900 font-bold">
                {selectedConversation.fullName}
              </span>
            </div>
            <div className="flex space-x-4">
              <GameLaunch onCode={handleGameCode} />
              <OpenGame />
            </div>
          </div>

          <Messages />
          <MessageInput gameCode={gameCode} />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {  
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
