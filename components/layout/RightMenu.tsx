'use client'
import * as React from "react"
import Image from "next/image";

import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import {Autoplay} from "swiper/modules";

function RightMenu() {
    return (
        <>
            {/* RIGHT MENU */}
            <div className="w-1/5 pt-16 h-full hidden xl:block px-4 fixed top-0 right-0">
                <div className="h-full">
                    <div className="flex justify-between items-center px-4 pt-4">
                          <span className="font-semibold text-gray-500 text-lg dark:text-dark-txt">
                            Connection requests
                          </span>
                    </div>
                    <div className="p-2">
                        <div
                            className="flex items-center space-x-4 p-2 hover:bg-gray-200 dark:hover:bg-dark-third rounded-lg transition-all"
                        >
                            <Image
                                width={50}
                                height={50}
                                src="https://themomly.com/onlyLogo.svg"
                                alt="Profile picture"
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="flex-1 h-full">
                                <div className="dark:text-dark-txt">
                                    <span className="font-semibold">Supriya A</span>
                                    <span className="float-right">6d</span>
                                </div>
                                <div className="flex space-x-2 mt-2">
                                    <div
                                        className="w-1/2 bg-blue-500 cursor-pointer py-1 text-center font-semibold text-white rounded-lg">
                                        Confirm
                                    </div>
                                    <div
                                        className="w-1/2 bg-gray-300 cursor-pointer py-1 text-center font-semibold text-black rounded-lg">
                                        Delete
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-200 dark:border-dark-third mt-6"/>
                    <div
                        className="flex justify-between items-center px-4 pt-4 text-gray-500 dark:text-dark-txt">
                        <span className="font-semibold text-lg">Sponsored</span>
                    </div>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        {["https://themomly.s3.ap-south-1.amazonaws.com/banners/app-banner02523232426.png", "https://themomly.s3.ap-south-1.amazonaws.com/banners/app-banner02531717462.png", "https://themomly.s3.ap-south-1.amazonaws.com/banners/app-banner10175858771.png"]
                            .map((singleImage, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <Image src={singleImage} alt={"singleImageBanner-" + index} width={200}
                                               height={200} className="w-80 rounded h-auto"/>
                                    </SwiperSlide>
                                )
                            })}
                    </Swiper>
                </div>
            </div>
            {/* END RIGHT MENU */}
        </>

    );
}

export default RightMenu;
