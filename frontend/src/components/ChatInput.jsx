import { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import toast from 'react-hot-toast'


const ChatInput = () => {
    const [text,setText] = useState("")
    const [imagePreview,setImagePreview] = useState(null)
    const fileInputRef = useRef(null)
    const {sendMessage} = useChatStore()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(!file.type.startsWith("image/"))
        {
            toast.error("Please select an image")
            return
        }

        const render = new FileReader()
        render.onloadend = () => {
            setImagePreview(render.result);
        }
        render.readAsDataURL(file)
    }

    const removeImage = () => {
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value =""
    }

    const msgsend = (e) => { 
        e.preventDefault()
        toast.promise(handleSendMessage(), {
        loading: "Sending... 🤔",
        success: "Message sent successfully! 😊",
        error: "Uh oh, there was an error 😟!",
      })};

    const handleSendMessage = async() => {
        if(!text.trim() && !imagePreview) return

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview
            })
            setText("")
            setImagePreview(null)
            
            if(fileInputRef.current) fileInputRef.current.value=""
        } catch (error) {
            console.error("Failed to send message", error)
        }
    }

  return (
    <div>
        {imagePreview && (
            <div className=' mb-3 flex items-center gap-2'>
                <div className='relative'>
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className='w-20 h-20 object-cover rounded-lg border border-zinc-700'
                    />
                    <button
                        onClick={removeImage}
                        className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                        flex items-center justify-center'
                        type="button"
                    >
                       <svg width="25px" height="25px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-568.000000, -1087.000000)" fill="#fdfcfc"> <path d="M584,1117 C576.268,1117 570,1110.73 570,1103 C570,1095.27 576.268,1089 584,1089 C591.732,1089 598,1095.27 598,1103 C598,1110.73 591.732,1117 584,1117 L584,1117 Z M584,1087 C575.163,1087 568,1094.16 568,1103 C568,1111.84 575.163,1119 584,1119 C592.837,1119 600,1111.84 600,1103 C600,1094.16 592.837,1087 584,1087 L584,1087 Z M589.717,1097.28 C589.323,1096.89 588.686,1096.89 588.292,1097.28 L583.994,1101.58 L579.758,1097.34 C579.367,1096.95 578.733,1096.95 578.344,1097.34 C577.953,1097.73 577.953,1098.37 578.344,1098.76 L582.58,1102.99 L578.314,1107.26 C577.921,1107.65 577.921,1108.29 578.314,1108.69 C578.708,1109.08 579.346,1109.08 579.74,1108.69 L584.006,1104.42 L588.242,1108.66 C588.633,1109.05 589.267,1109.05 589.657,1108.66 C590.048,1108.27 590.048,1107.63 589.657,1107.24 L585.42,1103.01 L589.717,1098.71 C590.11,1098.31 590.11,1097.68 589.717,1097.28 L589.717,1097.28 Z" id="cross-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>                                 
                    </button>
                </div>
            </div>
        )}
        <form onSubmit={msgsend} class="flex items-center w-full max-w-lg mx-auto">   
              
              <div class="relative w-full">
                <input type="text" value={text} onChange={(e)=> setText(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type your message "  /> 
              </div>               
              <button type="button" class="ml-3.5 flex items-center btn btn-ghost btn-circle">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
                    </svg>
                </button>                   
                <input
                type="file"
                id="file-input"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
                />
                <button
                    type='button'
                    className={`hidden sm:flex btn btn-circle btn-ghost
                        ${imagePreview ? "text-emerald-500" : "text-zinc-400" }`}
                    onClick={()=> fileInputRef.current?.click()}
                >
                    <img width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/image--v1.png" alt="image--v1" />                  
                </button>
                <button type="submit" class="inline-flex items-center py-1.5 px-2 ms-2 text-sm font-medium text-white bg-blue-700 rounded-sm border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                 >
                    <img width="24" height="24" src="https://img.icons8.com/puffy/32/sent.png" alt="sent"/>
                </button>
        </form>
    </div>
  )
}

export default ChatInput