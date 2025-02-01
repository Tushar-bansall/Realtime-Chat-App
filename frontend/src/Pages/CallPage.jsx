
  import React, { useEffect, useState } from "react";
  import { useAuthStore } from "../store/useAuthStore";
  import {
    LocalUser,
    RemoteUser,
    useIsConnected,
    useJoin,
    useLocalMicrophoneTrack,
    useLocalCameraTrack,
    usePublish,
    useRemoteUsers,
  } from "agora-rtc-react"
  

  export const CallPage = () => {
    const {fetchToken,subscribeToCalls,unsubscribeFromCalls,rchannelName,rtoken}=useAuthStore()
    const [calling, setCalling] = useState(false);
    const isConnected = useIsConnected(); // Store the user's connection status
    const appId = "48db19b2a9894c6f8d0ad517be270221"
    const [channel, setChannel] = useState("channel_" + (Math.random()*30000).toFixed(0));
    const [token, setToken] = useState("");

    useEffect(()=>{
      subscribeToCalls()
      return () => {unsubscribeFromCalls()}
    },[subscribeToCalls,unsubscribeFromCalls])
  
    useJoin({appid: appId, channel: channel, token: token ? token : null}, calling);
  
    rchannelName && rtoken && useJoin({appid: appId, channel: rchannelName, token: rtoken });
    

    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);
    usePublish([localMicrophoneTrack, localCameraTrack]);
  
    const remoteUsers = useRemoteUsers();
    return (
      <div >
        <div className="room">
          {isConnected ? (
            <div className="user-list">
              <div className="user h-96 w-full">
                <LocalUser
                  audioTrack={localMicrophoneTrack}
                  cameraOn={cameraOn}
                  micOn={micOn}
                  videoTrack={localCameraTrack}
                >
                  <samp className="user-name">You</samp>
                </LocalUser>
              </div>
              {remoteUsers && remoteUsers.map((user) => (
                <div className="user h-72 w-full" key={user.uid}>
                  <RemoteUser  user={user}>
                    <samp className="user-name">{user.uid}</samp>
                  </RemoteUser>
                </div>
              ))}
            </div>
          ) : (
            <div className="join-room">
  
              <button
                className={`join-channel ${!appId || !channel ? "disabled" : ""}`}
                disabled={!appId || !channel}
                onClick={async() => {
                  const res=await fetchToken(channel,0)
                  setToken(res)
                  setCalling(true)}}
              >
                <span>Join Channel</span>
              </button>
            </div>
          )}
        </div>
        {isConnected && (
          <div className="control flex justify-between p-4  bg-gray-800">
            <div className="left-control flex gap-5">
              <button  onClick={() => setMic(a => !a)}>
                <img src={micOn ? "microphone.gif" : "no-microphone.gif"} className="w-10 h-10 " />
              </button>
              <button className="btn btn-circle p-0.5 bg-white btn-ghost" onClick={() => setCamera(a => !a)}>
                <img src={cameraOn ? "video.png" : "no-video.png"} className="w-10 h-10" />
              </button>
            </div>
            <button  onClick={() => setCalling(a => !a)}>
              <img src={!calling ? "calling.gif" : "callcut.gif"} className="w-10 h-10" />
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default CallPage;
  