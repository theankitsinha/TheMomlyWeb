import Image from "next/image";
import {useSession} from "next-auth/react";
import {Feed} from "@/types/admin-api";
import React, {useLayoutEffect, useState} from "react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import Linkify from "linkify-react";
import {HiEllipsisVertical, HiHandThumbUp, HiOutlineCheckCircle, HiOutlineHeart} from "react-icons/hi2";

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {FcComments} from "react-icons/fc";
import {cn} from "@/lib/utils";

const useTruncatedElement = ({ref}: { ref: any }) => {
    const [isTruncated, setIsTruncated] = useState(false);
    const [isReadingMore, setIsReadingMore] = useState(false);

    useLayoutEffect(() => {
        const {offsetHeight, scrollHeight} = ref.current || {};

        if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
            setIsTruncated(true);
        } else {
            setIsTruncated(false);
        }
    }, [ref]);

    return {
        isTruncated,
        isReadingMore,
        setIsReadingMore,
    };
};
const onLikeHandler = async (postId: string, email: string, likes: any) => {
    const likeSet = new Set(likes);
    if (likeSet.has(email)) {
        likeSet.delete(email);
    } else {
        likeSet.add(email);
    }
    // await db.collection('posts').doc(postId).set({
    //     likes: [...likeSet]
    // }, {merge: true});
}

function SingleFeed({feed}: { feed: Feed }) {
    const ref = React.useRef<HTMLInputElement>(null);
    const {isTruncated, isReadingMore, setIsReadingMore} = useTruncatedElement({
        ref,
    });
    const {data: session, status} = useSession({required: true});
    const [pollSelectedOption, setPollSelectedOption] = useState(feed.user_selected_poll_option?.option_id ?? null);
    const pollSumTotal = feed.poll_options.reduce((sum, current) => sum + current.total_selection, 0) ?? 0;
    return (
        <div className="shadow bg-white dark:bg-dark-second dark:text-dark-txt mt-4 rounded-lg">
            {/* POST AUTHOR */}
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex space-x-2 items-center">
                    {feed.user_avatar && (
                        <Avatar>
                            <AvatarImage className="w-10 h-10 rounded-full" src={feed.user_avatar}/>
                        </Avatar>
                    )}
                    <div>
                        <div className="font-semibold">{feed.is_anonymous ? 'Anonymous' : feed.user_name}</div>
                        <span className="text-sm text-gray-500">{feed.diffForHumans}</span>
                    </div>
                </div>
                <div
                    className="w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 dark:text-dark-txt dark:hover:bg-dark-third rounded-full cursor-pointer">
                    <HiEllipsisVertical className="h-auto w-6"/>
                </div>
            </div>
            {/* END POST AUTHOR */}
            {/* POST CONTENT */}
            <div className="px-4 py-2">
                <p ref={ref} className={`${!isReadingMore && 'line-clamp-4'}`}>
                    <Linkify options={{
                        target: "_blank",
                        className: 'text-primary',
                    }}>
                        {feed.body}
                    </Linkify>
                </p>

                {isTruncated && !isReadingMore && (
                    <button className="text-primary" onClick={() => setIsReadingMore(true)}>
                        Read more
                    </button>
                )}
            </div>
            {/* END POST CONTENT */}
            {/* POST IMAGE */}
            {feed.image_json.length > 0 && (
                <div className="py-2 relative h-96 w-auto bg-white">
                    {feed.image_json.length > 1 ? (
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {feed.image_json.map((singleImage, index) => {
                                return (
                                    <SwiperSlide key={"imageSingle" + index + feed.id}>
                                        <Image src={singleImage} alt={'postImage' + index + feed.id.toString()}
                                               objectFit="contain" layout="fill"/>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    ) : (<
                            Image src={feed.image_json[0]} alt={'postImageSingle' + feed.id.toString()}
                                  objectFit="contain" layout="fill"/>
                    )}
                </div>
            )}
            {/* END POST IMAGE */}
            {feed.feed_type === 'poll' && pollSelectedOption && (
                <div className="flex flex-col gap-2 pl-4 pr-8 py-2">
                    {feed.poll_options.map((singlePollOption, index) => {
                        const percentage = ((singlePollOption.total_selection / pollSumTotal) * 100.0).toFixed(1)
                        return (
                            <div className="overflow-hidden p-1"
                                 key={"progressKey" + index + feed.id}>
                                <div
                                    className="relative h-8 flex items-center justify-center bg-gray-100 rounded">
                                    <div
                                        style={{width: percentage + "%"}}
                                        className={cn("absolute top-0 bottom-0 left-0 rounded ",
                                            singlePollOption.id === pollSelectedOption ? 'bg-red-400' : 'bg-red-200')}></div>
                                    <div
                                        className="relative font-medium text-sm flex justify-between w-full">
                                        <div className="justify-start p-4 flex flex-row">
                                            <span>{singlePollOption.option}</span> {singlePollOption.id === pollSelectedOption &&
                                            <HiOutlineCheckCircle className="px-4 h-5 w-auto"/>}
                                        </div>
                                        <div className="justify-end p-4">
                                            {percentage + "%"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="flex justify-between mb-1 text-sm">
                        <span>Total votes</span>
                        <span>{pollSumTotal} votes</span>
                    </div>
                </div>
            )}

            {/* POST REACT */}
            <div className="px-4 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex flex-row-reverse items-center">
                            <span className="ml-2 text-gray-500 dark:text-dark-txt">
                             {feed.already_liked ? 'You and ' + feed.total_likes + ' other' + (feed.total_likes > 1 ? 's' : '') : feed.total_likes}
                            </span>
                        <div
                            className={`rounded-full grid place-items-center -ml-1`}
                            onClick={() => onLikeHandler(feed.id.toString(), session?.user.id, feed.total_likes)}>
                            <HiHandThumbUp
                                className={`h-5 w-auto fill-blue-600`}/>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse items-center">
                            <span className="ml-2 text-gray-500 dark:text-dark-txt">
                              {feed.total_comments} comments
                            </span>
                        <div
                            className={`rounded-full grid place-items-center -ml-1 ${feed.already_liked ? "text-primary" : ""}`}
                            onClick={() => onLikeHandler(feed.id.toString(), session?.user.id, feed.total_likes)}>
                            <FcComments
                                className={`h-5 w-auto fill-gray-600`}/>
                        </div>
                    </div>
                </div>
            </div>
            {/* END POST REACT */}
            {/* POST ACTION */}
            <div className="py-2 px-4">
                <div
                    className="border border-gray-200 dark:border-dark-third border-l-0 border-r-0 py-1">
                    <div className="flex space-x-2 col-2">
                        <div
                            className={cn("w-full flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt",
                                feed.already_liked && 'text-primary fill-primary')}>
                            <HiOutlineHeart
                                className={cn('h-5 w-auto', feed.already_liked && 'text-current fill-current')}/>
                            <span className="text-sm font-semibold">Like</span>
                        </div>
                        <div
                            className="w-full flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
                            <FcComments
                                className={`h-5 w-auto fill-gray-600`}/>
                            <span className="text-sm font-semibold">Comment</span>
                        </div>
                        {/*<div*/}
                        {/*    className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">*/}
                        {/*    <i className="bx bx-share bx-flip-horizontal"/>*/}
                        {/*    <span className="text-sm font-semibold">Share</span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
            {/* END POST ACTION */}
            {/*/!* LIST COMMENT *!/*/}
            {/*<div className="py-2 px-4">*/}
            {/*    /!* COMMENT *!/*/}
            {/*    <div className="flex space-x-2">*/}
            {/*        <img*/}
            {/*            src="./images/avt-5.jpg"*/}
            {/*            alt="Profile picture"*/}
            {/*            className="w-9 h-9 rounded-full"*/}
            {/*        />*/}
            {/*        <div>*/}
            {/*            <div className="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm">*/}
            {/*                <span className="font-semibold block">John Doe</span>*/}
            {/*                <span>*/}
            {/*    Lorem ipsum dolor sit amet consectetur adipisicing elit.*/}
            {/*  </span>*/}
            {/*            </div>*/}
            {/*            <div className="p-2 text-xs text-gray-500 dark:text-dark-txt">*/}
            {/*                <span className="font-semibold cursor-pointer">Like</span>*/}
            {/*                <span>.</span>*/}
            {/*                <span className="font-semibold cursor-pointer">Reply</span>*/}
            {/*                <span>.</span>*/}
            {/*                10m*/}
            {/*            </div>*/}
            {/*            /!* COMMENT *!/*/}
            {/*            <div className="flex space-x-2">*/}
            {/*                <img*/}
            {/*                    src="./images/avt-7.jpg"*/}
            {/*                    alt="Profile picture"*/}
            {/*                    className="w-9 h-9 rounded-full"*/}
            {/*                />*/}
            {/*                <div>*/}
            {/*                    <div*/}
            {/*                        className="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm">*/}
            {/*                        <span className="font-semibold block">John Doe</span>*/}
            {/*                        <span>*/}
            {/*        Lorem ipsum dolor sit amet consectetur adipisicing elit.*/}
            {/*      </span>*/}
            {/*                    </div>*/}
            {/*                    <div className="p-2 text-xs text-gray-500 dark:text-dark-txt">*/}
            {/*                        <span className="font-semibold cursor-pointer">Like</span>*/}
            {/*                        <span>.</span>*/}
            {/*                        <span className="font-semibold cursor-pointer">*/}
            {/*        Reply*/}
            {/*      </span>*/}
            {/*                        <span>.</span>*/}
            {/*                        10m*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            /!* END COMMENT *!/*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    /!* END COMMENT *!/*/}
            {/*    /!* COMMENT *!/*/}
            {/*    <div className="flex space-x-2">*/}
            {/*        <img*/}
            {/*            src="./images/avt-5.jpg"*/}
            {/*            alt="Profile picture"*/}
            {/*            className="w-9 h-9 rounded-full"*/}
            {/*        />*/}
            {/*        <div>*/}
            {/*            <div className="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm">*/}
            {/*                <span className="font-semibold block">John Doe</span>*/}
            {/*                <span>*/}
            {/*    Lorem ipsum dolor sit amet consectetur, adipisicing elit. In*/}
            {/*    voluptate ipsa animi corrupti unde, voluptatibus expedita*/}
            {/*    suscipit, itaque, laudantium accusantium aspernatur officia*/}
            {/*    repellendus nihil mollitia soluta distinctio praesentium*/}
            {/*    nulla eos?*/}
            {/*  </span>*/}
            {/*            </div>*/}
            {/*            <div className="p-2 text-xs text-gray-500 dark:text-dark-txt">*/}
            {/*                <span className="font-semibold cursor-pointer">Like</span>*/}
            {/*                <span>.</span>*/}
            {/*                <span className="font-semibold cursor-pointer">Reply</span>*/}
            {/*                <span>.</span>*/}
            {/*                10m*/}
            {/*            </div>*/}
            {/*            /!* COMMENT *!/*/}
            {/*            <div className="flex space-x-2">*/}
            {/*                <img*/}
            {/*                    src="./images/avt-7.jpg"*/}
            {/*                    alt="Profile picture"*/}
            {/*                    className="w-9 h-9 rounded-full"*/}
            {/*                />*/}
            {/*                <div>*/}
            {/*                    <div*/}
            {/*                        className="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm">*/}
            {/*                        <span className="font-semibold block">John Doe</span>*/}
            {/*                        <span>*/}
            {/*        Lorem ipsum dolor sit amet consectetur adipisicing elit.*/}
            {/*      </span>*/}
            {/*                    </div>*/}
            {/*                    <div className="p-2 text-xs text-gray-500 dark:text-dark-txt">*/}
            {/*                        <span className="font-semibold cursor-pointer">Like</span>*/}
            {/*                        <span>.</span>*/}
            {/*                        <span className="font-semibold cursor-pointer">*/}
            {/*        Reply*/}
            {/*      </span>*/}
            {/*                        <span>.</span>*/}
            {/*                        10m*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            /!* END COMMENT *!/*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    /!* END COMMENT *!/*/}
            {/*</div>*/}
            {/*/!* END LIST COMMENT *!/*/}
            {/*/!* COMMENT FORM *!/*/}
            {/*<div className="py-2 px-4">*/}
            {/*    <div className="flex space-x-2">*/}
            {/*        <img*/}
            {/*            src="./images/tuat.jpg"*/}
            {/*            alt="Profile picture"*/}
            {/*            className="w-9 h-9 rounded-full"*/}
            {/*        />*/}
            {/*        <div*/}
            {/*            className="flex-1 flex bg-gray-100 dark:bg-dark-third rounded-full items-center justify-between px-3">*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                placeholder="Write a comment..."*/}
            {/*                className="outline-none bg-transparent flex-1"*/}
            {/*            />*/}
            {/*            <div className="flex space-x-0 items-center justify-center">*/}
            {/*  <span*/}
            {/*      className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl">*/}
            {/*    <i className="bx bx-smile"/>*/}
            {/*  </span>*/}
            {/*                <span*/}
            {/*                    className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl">*/}
            {/*    <i className="bx bx-camera"/>*/}
            {/*  </span>*/}
            {/*                <span*/}
            {/*                    className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl">*/}
            {/*    <i className="bx bxs-file-gif"/>*/}
            {/*  </span>*/}
            {/*                <span*/}
            {/*                    className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl">*/}
            {/*    <i className="bx bx-happy-heart-eyes"/>*/}
            {/*  </span>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*/!* END COMMENT FORM *!/*/}
        </div>
    );
}

export default SingleFeed;
