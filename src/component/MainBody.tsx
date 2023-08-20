import React, { useState } from "react";
import { RiChatVoiceFill, RiSendPlane2Fill } from "react-icons/ri";
import { BiSolidSend } from "react-icons/bi";
import axios from "axios";

const MainBody = () => {
  const [inputText, setInputText] = useState<string>("");
  const [showInputText, setShowInputText] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<String>("");
  const [textResponse, setTextResponse] = useState<String>("");
  const [chatHistory, setChatHistory] = useState<any>([]);
  const [showLoaingIcon, setShowLoaingIcon] = useState<boolean>(false);

  /* const API_URL = process.env.API_URL as string;
  const API_MODELL = process.env.API_MODELL as string;
  const API_KEY = process.env.API_KEY as string; */
  const changeInputHandler = (e: any) => {
    setInputText(e.target.value);
  };

  const fetchData = async () => {
    setShowInputText(true);
    setShowLoaingIcon(true);
    setDisplayText(inputText);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}?token=${process.env.REACT_APP_API_KEY}&action=gpt3.5-turbo&q=${inputText}`
    );
    const item = await response.json();
    console.log(item);

    const userMessage = { text: inputText, isUser: true };
    const botMessage = { text: item.result[0], isUser: false };

    setChatHistory((prevHistory: any) => [
      ...prevHistory,
      userMessage,
      botMessage,
    ]);
    setShowLoaingIcon(false);
    setInputText("");
  };

  return (
    <div className="h-screen w-screen bg-[#343541]">
      <section className="flex flex-col items-center justify-center py-4 pt-8">
        <div className="flex flex-row ">
          <h1 className="  mr-2 text-[1.99rem]">Frei Mini-ChatGpt</h1>
          <RiChatVoiceFill size={33} color="#565869" />
        </div>
        <h5 className="text-[#787a85] mt-[20px] text-[1.1rem] sm:text-[1.3rem]">
          Was Kann Ich Ihnen Helfen?
        </h5>
      </section>

      <div className="scrollbar" id="style-2">
        <div className="h-fit w-full lg:w-[90%] mx-auto my-0  max-h-[68vh]">
          <div className="flex flex-col w-full h-fit p-[15px] lg:p-0">
            {/* Display chat history */}
            {chatHistory.map((message: any, index: any) => (
              <div
                key={index}
                className={`${
                  message.isUser
                    ? "w-fit h-fit bg-gray-600 px-5 py-3 sm:max-w-[70%] lg:max-w-[50%] rounded-t-[30px] rounded-bl-[30px] ml-auto mb-2 mt-2"
                    : "w-fit  h-fit bg-gray-700 sm:max-w-[70%] lg:max-w-[50%] px-5 py-3 rounded-t-[30px] rounded-br-[30px] mr-auto mt-2 mb-2"
                }`}
              >
                <p className="text-[1.05rem] text-[#ECECF1]">{message.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="fixed absolute bottom-0 flex w-screen ">
        <div className="flex items-center justify-center w-full mb-4 ">
          <div className="flex flex-row rounded-[15px] justify-center items-center min-h-[60px] min-w-[90vw] lg:max-w-[800px] lg:min-w-[600px] bg-[#40414F]">
            <input
              value={inputText}
              onChange={changeInputHandler}
              className="bg-[#40414F] pl-3 w-[90%] min-h-[20px] outline-none text-white"
              placeholder="Eine Nachricht senden"
            />
            {showLoaingIcon ? (
              <div className=" lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <BiSolidSend
                className="mx-3 hover:fill-[#8b8c94] transition-all cursor-pointer"
                size={25}
                color="#6B6C7B"
                onClick={fetchData}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainBody;
