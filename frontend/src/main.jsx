import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'

import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react"

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AgoraRTCProvider client={client}>
        <App />
      </AgoraRTCProvider>
    </BrowserRouter> 
  </StrictMode>
);
