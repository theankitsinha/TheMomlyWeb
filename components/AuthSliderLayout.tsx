"use client";

import React from "react";

import {motion} from 'framer-motion';
import Image from "next/image";

const slides = [
    "/assets/images/auth/slider/momlySlide01.png",
    "/assets/images/auth/slider/momlySlide02.png",
    "/assets/images/auth/slider/momlySlide03.png",
    "/assets/images/auth/slider/momlySlide04.png",
    "/assets/images/auth/slider/momlySlide05.png",
    "/assets/images/auth/slider/momlySlide06.png",
]

const AuthSliderLayout = () => {
    const duplicatedSlides = [...slides, ...slides];
    return (
        <>
            <div className="flex overflow-hidden p-5">
                <div className="my-auto">
                    <div
                        className="absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:w-40 before:h-full  before:filter before:blur-3 after:absolute after:right-0 after:top-0 after:w-40 after:h-full  after:filter after:blur-3"></div>
                    <motion.div
                        className="flex gap-x-20"
                        animate={{
                            x: ['0%', '-100%'],
                            transition: {
                                ease: 'linear',
                                duration: 80,
                                repeat: Infinity,
                            }
                        }}
                    >
                        {duplicatedSlides.map((slide, index) => (
                            <div key={index} className="flex-shrink-0 h-60 w-60"
                                 style={{width: `${100 / slides.length}%`}}>
                                <Image
                                    src={slide}
                                    alt={"imageSliderAlt" + index}
                                    width={1000}
                                    height={1000}
                                    className="h-44 w-auto"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </>

    );
};

export default AuthSliderLayout;