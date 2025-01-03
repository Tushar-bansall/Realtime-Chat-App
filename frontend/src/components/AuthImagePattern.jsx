const AuthImagePattern = ({title, subtitle}) => {
    return (
        <div className="hidden md:flex text-center items-center bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20220206/pngtree-emoji-of-social-media-or-chat-application-network-emoticon-background-image_985694.jpg')] bg-cover w-85 pt-20 bg-slate-800 px-12 flex-col gap-10">
            <div className="flex h-20 w-20 mx-auto animate-ping bg-orange-400 rounded-full">
                <img src="logo.png" />
            </div>    
            <div className=" mt-5 ">
                <h2 className="text-3xl font-bold text-orange-700 mb-9">{title}</h2>
                <p className="text-md text-orange-700 font-medium max-w-[calc(280px)]">{subtitle}</p>
            </div>
        </div>
    )
}

export default AuthImagePattern