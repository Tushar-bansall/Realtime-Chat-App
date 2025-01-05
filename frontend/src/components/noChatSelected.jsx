import React from 'react';

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-[url(https://www.shutterstock.com/image-vector/social-media-sketch-vector-seamless-600nw-1660950727.jpg)] bg-cover p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-primary/30 flex items-center justify-center animate-bounce">
              <img 
                src="logo.png" 
                alt="MT Chat Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-blue-800 bg-base-100/20">Welcome to MyTalks😉Chat App</h2>
        <p className="text-lg font-bold  text-blue-800 bg-base-100/30">
          Select a user to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
