import React from 'react';

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <img 
                src="logo.png" 
                alt="MT Chat Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Welcome to MT😉Chat</h2>
        <p className="text-base text-opacity-60">
          Select a user to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
