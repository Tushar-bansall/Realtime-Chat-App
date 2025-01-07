import React from 'react';

const NoChatSelected = () => {
  return (
    <div className="w-full bg-[url(https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-yellow-tourism-trolley-case-to-chat-with-image_13961.jpg)] bg-cover flex flex-col items-center justify-center ">
      <div className="max-w-md text-center space-y-8">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary/30 flex items-center justify-center animate-bounce">
              <img 
                src="ping.png" 
                alt="MT Chat Logo" 
                className="object-cover" 
              />
            </div>
          </div>
        </div>
        <h2 className=" font-bold text-base-200 text-md sm:text-lg md:text-4xl lg:text-nowrap ">Welcome to MyTalks😉Chat App</h2>
        <p className=" font-bold  text-base-200 text-sm sm:text-base md:text-2xl ">
          Select a user to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
