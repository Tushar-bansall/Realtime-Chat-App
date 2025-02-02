import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const AuthImagePattern = ({title, subtitle}) => {
    return (
        <div className="hidden md:flex text-center justify-center items-center flex-col gap-5">
            <DotLottieReact
            src="https://lottie.host/edc7422d-4cf2-4f8d-bf67-fb7de52dd916/bNTGLK2X8o.lottie"
            loop
            autoplay
            />
            <div >
                <h2 className="text-3xl font-bold text-purple-900 mb-4">{title}</h2>
                <p className="text-md text-purple-900 font-medium max-w-[calc(280px)]">{subtitle}</p>
            </div>
        </div>
    )
}


export default AuthImagePattern