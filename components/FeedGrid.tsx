'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Feed, FeedPaginatedResponseType} from '@/types/admin-api';
import {decryptData, EncryptedObject} from "@/lib/encryption";
import {debounce} from "next/dist/server/utils";
import {signOut} from "next-auth/react";
import {motion} from "framer-motion";
import SingleFeed from "@/components/Post";
import {FeedSkeletonCard} from "@/components/FeedSkeletonCard";

const FeedGrid: React.FC = () => {
    const [feedItems, setFeedItems] = useState<Feed[]>([]);
    const containerRef = useRef<HTMLInputElement>(null);
    const [offset, setOffset] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [isLast, setIsLast] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/core/feeds')
            .then((res) => res.json())
            .then((response: EncryptedObject) => {
                const decryptedResponse = decryptData(response);
                if (decryptedResponse.error && decryptedResponse.error === "Unauthorized") {
                    signOut().then();
                }
                const feedPageResponse: FeedPaginatedResponseType = decryptedResponse;
                if (feedPageResponse.data) {
                    setFeedItems(feedPageResponse.data);
                    setIsLoading(false);
                }
            }).catch((err) => console.log(err));
    }, []);
    const handleScroll = () => {
        if (containerRef.current && typeof window !== 'undefined') {
            const container = containerRef.current
            const {bottom} = container.getBoundingClientRect();
            const {innerHeight} = window
            setIsInView(() => bottom <= innerHeight)
        }
    }

    useEffect(() => {
        debounce(() => !isLast && handleScroll, 200);
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (isInView) {
            loadMoreFeeds(offset).then(() => (setIsLoading(false)))
        }
    }, [isInView])

    const loadMoreFeeds = async (offset: number) => {
        setIsLoading(true)
        await fetchFeeds(offset)
        setOffset((prev) => prev + 1)
        setIsLoading(false)
    }

    const fetchFeeds = async (offset: number) => {
        fetch('/api/core/feeds?page=' + offset)
            .then((res) => res.json())
            .then((response: EncryptedObject) => {
                const decryptedResponse: FeedPaginatedResponseType = decryptData(response);
                if (decryptedResponse.data) {
                    setFeedItems((prevItems) => [...prevItems, ...decryptedResponse.data]);
                    decryptedResponse.pagination.current_page < decryptedResponse.pagination.last_page ? setIsLast(false) : setIsLast(true);
                }
            }).catch((err) => console.log(err));
    }
    return (
        <>
            {isLoading ? (
                <FeedSkeletonCard/>
            ) : (
                <div ref={containerRef}>
                    {feedItems.map((singleFeed, index) => {
                        return (
                            <motion.div
                                key={"animationMotionDiv:" + singleFeed.id + index}
                                initial={{opacity: 0, y: 20, scale: 1.2}}
                                animate={{opacity: 1, y: 0, scale: 1}}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                }}
                            >
                                <SingleFeed
                                    key={"singleFeedItem:" + singleFeed.id}
                                    feed={singleFeed}
                                />
                            </motion.div>
                        )
                    })}
                </div>
            )}
            {isLoading && (
                <FeedSkeletonCard/>
            )}
        </>
    );
};

export default FeedGrid;