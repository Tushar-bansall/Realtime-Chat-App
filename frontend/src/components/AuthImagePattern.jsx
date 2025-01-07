const AuthImagePattern = ({title, subtitle}) => {
    return (
        <div className="hidden md:flex text-center justify-center items-center bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20220206/pngtree-emoji-of-social-media-or-chat-application-network-emoticon-background-image_985694.jpg')] bg-cover flex-col gap-20">
            <div className="flex h-28 w-28 mx-auto animate-ping bg-orange-400 rounded-full p-4">
                <img src="ping.png" />
            </div>    
            <div >
                <h2 className="text-3xl font-bold text-orange-700 mb-9">{title}</h2>
                <p className="text-md text-orange-700 font-medium max-w-[calc(280px)]">{subtitle}</p>
            </div>
        </div>
    )
}

export default AuthImagePattern