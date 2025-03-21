import React from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { THEMES } from '../constants'

const PREVIEW_MESSAGES = [
  {id: 1, content: "Hey! How's it going", isSent: false},
  {id: 2, content: "I'm doing great! Just working on some new features.", isSent: true}
]

const SettingsPage = () => {
  const {theme,setTheme} = useThemeStore()
  return (
    <div className=" container mx-auto px-4 pt-4 max-w-5xl">
      <div className="space-y-2 md:space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-base md:text-lg font-semibold">Theme</h2>
          <p className="text-xs md:text-sm text-base-content/70">Choose a theme for your chat interface</p> 
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 md:gap-2">
          {THEMES.map((t) => (
            <button 
            key={t}
            className={`
                        group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors 
                        ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                      `}
            onClick={() => setTheme (t)}
            >
            <div className="relative h-5 md:h-8 w-full rounded-md overflow-hidden" data-theme={t}> 
              <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                <div className="rounded bg-primary"></div>
                <div className="rounded bg-secondary"></div>
                <div className="rounded bg-accent"></div>
                <div className="rounded bg-neutral"></div> 
              </div>
            </div>
            <span className="text-[8px] md:text-[11px] font-medium truncate w-full text-center"> 
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
            </button>
          ))}
        </div>
        {/* Preview Section */}
        <h3 className="text-base md:text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-2 md:p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden"> 
                {/* Chat Header */}
                <div className="px-2 md:px-4 py-1.5 md:py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium"> 
                    J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>
                {/* Chat Messages */}
                <div className="p-2 md:p-4 space-y-2 md:space-y-4 min-h-[100px] max-h-[200px] overflow-y-auto bg-base-100"> 
                { PREVIEW_MESSAGES.map((message) => (
                  <div
                  key={message.id}
                  className={`flex ${message.isSent? "justify-end": "justify-start"}`}
                  >
                    <div className={`
                    max-w-[80%] rounded-xl p-3 shadow-sm
                    ${message.isSent ? "bg-primary text-primary-content/70": "bg-base-200"}
                    `}
                    >
                      <p className="text-xs md:text-sm">{message.content}</p>
                      <p className={`
                      text-[7px] md:text-[10px] mt-1.5
                      ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                      `}
                      > 12:00 pm </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Chat Input */}
              <div className="p-2 md:p-4 border-t border-base-300 bg-base-100">
                <div className="flex gap-1 md:gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1 text-sm h-10" 
                    placeholder="Type a message..."
                    value="This is a preview"
                    readOnly
                  />
              <button className="btn btn-primary h-10 min-h-0">
                <svg fill="#000000" className='h-4 w-4' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 51.636 51.636" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M51.353,0.914c-0.295-0.305-0.75-0.39-1.135-0.213L0.583,23.481c-0.399,0.184-0.632,0.605-0.574,1.041 s0.393,0.782,0.826,0.854l22.263,3.731l2.545,21.038c0.054,0.438,0.389,0.791,0.824,0.865c0.057,0.01,0.113,0.015,0.169,0.015 c0.375,0,0.726-0.211,0.896-0.556l24-48.415C51.72,1.675,51.648,1.218,51.353,0.914z M27.226,46.582l-2.232-18.457 c-0.054-0.44-0.391-0.793-0.828-0.866L4.374,23.941L48.485,3.697L27.226,46.582z"></path> </g></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>  
  )
}

export default SettingsPage