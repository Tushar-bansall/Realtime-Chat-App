const AuthImagePattern = ({title, subtitle}) => {
    return (
        <div className="flex w-85 bg-slate-800 p-12 flex-col gap-4 items-center justify-center text-center">
            <div className="flex items-center gap-2">
                <div className="skeleton h-20 w-20 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                <div className="skeleton h-5 w-20"></div>
                <div className="skeleton h-5 w-28"></div>
                </div>
            </div>
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-5 w-28"></div>
            <div className="skeleton h-5 w-full"></div>
            <div className="skeleton h-5 w-full"></div>
            <div className="gap-2">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-base-content/60">{subtitle}</p>
            </div>
        </div>
    )
}

export default AuthImagePattern