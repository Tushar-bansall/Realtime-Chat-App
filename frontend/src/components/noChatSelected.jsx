import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-col bg-slate-200 items-center justify-center ">
      <div className=" text-center space-y-4">
        <DotLottieReact
          src="https://lottie.host/96ccc652-54e3-4094-8852-a2bc247669f5/LBvsj1fjfl.lottie"
          className='w-[calc(60vw)] h-80'
          loop
          autoplay
        />
        <h2 className=" font-bold text-blue-500 text-4xl text-nowrap ">Welcome to BuzzChat </h2>
        <p className=" font-bold  text-blue-500 text-xl ">
          Select a user to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
