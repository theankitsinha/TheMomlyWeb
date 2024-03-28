'use client'
import Image from "next/image";
import React, {useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {BiCamera, BiPoll} from "react-icons/bi";


function AddNewFeed() {
    const {data: session, status} = useSession({
        required: true,
    });
    const [body, setBody] = useState();
    const filePickerRef = useRef<HTMLInputElement>(null);
    const [imageToPost, setImageToPost] = useState(null);

    const sendPost = (e: any) => {
        e.preventDefault();

    };
    const addImageToPost = (e: any) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent: any) => {
            setImageToPost(readerEvent.target.result);
        };
    };
    const removeImage = (e: any) => {
        setImageToPost(null);
    };
    return (
        <>
            {/* POST FORM */}
            <div className="px-4 mt-4 shadow rounded-lg bg-white dark:bg-dark-second">
                <div className="p-2 border-b border-gray-300 dark:border-dark-third flex space-x-4">
                    <Image
                        src={session?.user.image}
                        className="w-10 h-10 rounded-full"
                        width={40}
                        height={40}
                        layout="fixed"
                        alt={session?.user.id.toString()}/>
                    <div
                        className="flex-1 bg-gray-100 rounded-full flex items-center justify-start pl-4 cursor-pointer dark:bg-dark-third text-gray-500 text-lg dark:text-dark-txt">
                        <form className="flex flex-1">
                            <input
                                type="text"
                                value={body}
                                // onChange={(event) => setBody(event)}
                                className="outline-none p-2 rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                                placeholder={`What's on your mind, ${session?.user.name}?`}
                            />
                            <button className="pr-5" onClick={sendPost}>
                                Post
                            </button>
                        </form>
                        {imageToPost && (
                            <div
                                onClick={removeImage}
                                className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
                            >
                                <Image className="h-10 object-containe" src={imageToPost} alt="" height={40}
                                       width={40}
                                       layout="fixed"/>
                                <p className="text-xs text-red-500 text-center">Remove</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-2 flex">
                    <div
                        // @ts-ignore
                        onClick={() => filePickerRef.current.click()}
                        className="w-1/2 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-red-500">
                        <BiCamera className="h-7 w-7 text-green-400"/>
                        <p className="text-xs sm:text-sm xl:text-base">Photo</p>
                        <input
                            ref={filePickerRef}
                            type="file"
                            hidden
                            onChange={addImageToPost}
                        />
                    </div>
                    <div
                        className="w-1/2 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-green-500">
                        <BiPoll className="h-7 w-7 text-blue-400"/>
                        <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-dark-txt">
                         Poll
                        </span>
                    </div>
                </div>
            </div>
            {/* END POST FORM */}
        </>

    );
}

export default AddNewFeed;
