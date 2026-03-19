/* eslint-disable @next/next/no-img-element */
import React from "react";

interface BootingScreenProps {
  visible: boolean;
  isShutDown: boolean;
  turnOn: () => void;
}

export default function BootingScreen({ visible, isShutDown, turnOn }: BootingScreenProps) {
  return (
    <div
      style={
        visible || isShutDown
          ? { zIndex: "100" }
          : { zIndex: "-20" }
      }
      className={
        (visible || isShutDown
          ? " visible opacity-100"
          : " invisible opacity-0 ") +
        " absolute duration-500 select-none flex flex-col justify-around items-center top-0 right-0 overflow-hidden m-0 p-0 h-screen w-screen bg-black"
      }
    >
      <img
        width="400px"
        height="400px"
        className="md:w-1/4 w-1/2"
        src="/images/icons/cof_orange_hex.svg"
        alt="Ubuntu Logo"
      />
      <div
        className="w-10 h-10 flex justify-center items-center rounded-full outline-none cursor-pointer"
        onClick={turnOn}
      >
        {isShutDown ? (
          <div className="bg-white rounded-full flex justify-center items-center w-10 h-10 hover:bg-gray-300 transition-all duration-150 ease-in-out">
            <img
              width="32px"
              height="32px"
              className="w-8"
              src="/images/icons/power-button.svg"
              alt="Power Button"
            />
          </div>
        ) : (
          <img
            width="40px"
            height="40px"
            className={" w-10 " + (visible ? " animate-spin " : "")}
            src="/images/icons/process-working-symbolic.svg"
            alt="Ubuntu Process Symbol"
          />
        )}
      </div>
      <img
        width="200px"
        height="100px"
        className="md:w-1/5 w-1/2"
        src="/images/icons/ubuntu_white_hex.svg"
        alt="Ubuntu Name"
      />
      {/* <div className="text-white mb-4">
        <a
          className="underline"
          href="https://www.linkedin.com/in/souta-mizuno-6310a6365/"
          rel="noreferrer noopener"
          target="_blank"
        >
          linkedin
        </a>
        <span className="font-bold mx-1">|</span>
        <a
          href="https://github.com/snow9351"
          rel="noreferrer noopener"
          target="_blank"
          className="underline"
        >
          github
        </a>
      </div> */}
    </div>
  );
}
