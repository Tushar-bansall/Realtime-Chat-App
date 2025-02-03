import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AgoraRTC, { AgoraRTCProvider,useRTCClient, useJoin, useLocalMicrophoneTrack, useLocalCameraTrack, usePublish, useRemoteUsers, useIsConnected, LocalUser, RemoteUser } from "agora-rtc-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';




export const CallPage = () => {
  const { rchannelName, rtoken, token, setCalling, channel } = useAuthStore();

  // ✅ Step 1: Create the Agora client once
  const client = React.useMemo(() => AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }), []);

  return (
    <AgoraRTCProvider client={client}>
      <CallInterface client={client} appId="48db19b2a9894c6f8d0ad517be270221" channel={channel || rchannelName} token={token || rtoken} setCalling={setCalling} />
    </AgoraRTCProvider>
  );
};

const CallInterface = ({ client, appId, channel, token, setCalling }) => {
  const isConnected = useIsConnected();


    if (channel && token) {
      console.log("Joining Agora Channel:", channel);
      useJoin({ appid: appId, channel, token });
    }



  // ✅ Step 3: Manage audio & video tracks
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

      usePublish([localMicrophoneTrack, localCameraTrack]);
    
  const remoteUsers = useRemoteUsers();
  const rtcClient = useRTCClient(); // Access Agora RTC client
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If remote users exist, stop loading
    if (remoteUsers.length > 0) {
      setLoading(false);
    }else {
      setLoading(true)
    }
  }, [remoteUsers]);

  useEffect(() => {
    const handleUserJoined = () => {
      setLoading(false); // Stop loading when a user joins
    };

    const handleUserLeft = () => {
      if (remoteUsers.length === 0) setLoading(true); // Restart loading if all users leave
    };

    rtcClient.on("user-joined", handleUserJoined);
    rtcClient.on("user-left", handleUserLeft);

    return () => {
      rtcClient.off("user-joined", handleUserJoined);
      rtcClient.off("user-left", handleUserLeft);
    };
  }, [rtcClient, remoteUsers]);
  return (
    <div className="h-[calc(100vh-10rem)] sm:h-[calc(100vh-5rem)] bg-slate-100">
      <div className="room">
        {isConnected ? (
          <div className="user-list h-[calc(100vh-16rem)] sm:h-[calc(100vh-10rem)] flex-col md:flex">
            <div className="user h-56 md:h-full w-full md:w-[calc(50vw)]">
              <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
              >
                <samp className="user-name text-lg text-indigo-600 ml-5">You</samp>
              </LocalUser>
            </div>
            <div className="divider divider-horizontal hidden md:block m-0 divider-neutral"></div>
            <div className="divider md:hidden  m-0 divider-neutral"></div>
            {loading ? 
              <DotLottieReact
              className="user h-56 md:h-full w-full md:w-[calc(50vw)]"
                src="https://lottie.host/7477a639-7813-43e5-af4b-ce1118d1c244/tmxb4P8Tk9.lottie"
                loop
                autoplay
              /> 
            :
            remoteUsers.map((user) => (
              <div className="user h-56 md:h-full w-full md:w-[calc(50vw)]" key={user.uid}>
                <RemoteUser user={user}>
                  <samp className="user-name text-lg text-indigo-600 ml-5">{user.uid}</samp>
                </RemoteUser>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-10rem)] sm:h-[calc(100vh-5rem)] gap-5 items-center justify-center p-10 bg-slate-100">
            <p className="text-blue-400 text-3xl font-bold mt-5">Calling...</p>
            <DotLottieReact
              src="https://lottie.host/3e05e1ef-3f1a-477c-8379-83a91255abff/1wsCFuTYeR.lottie"
              loop
              className="w-[calc(90vw)] h-96"
              autoplay
            />
          </div>
        )}
      </div>
      {isConnected && (
        <div className="control h-16 flex justify-between p-4 bg-gray-800">
          <div className="left-control flex gap-5">
            <button onClick={() => setMic((a) => !a)}>
              <img src={micOn ? "microphone.gif" : "no-microphone.gif"} className="w-10 h-10" />
            </button>
            <button className="btn btn-circle p-0.5 bg-white btn-outline" onClick={() => setCamera((a) => !a)}>
              <img src={cameraOn ? "video.png" : "no-video.png"} className="w-10 h-10" />
            </button>
          </div>
          <button onClick={() => setCalling(false)}>
            <img src={remoteUsers?.length < 1 ? "calling.gif" : "callcut.gif"} className="w-10 h-10" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CallPage;
