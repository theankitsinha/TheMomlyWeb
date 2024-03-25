import React from "react";
import AddNewFeed from "@/components/AddNewFeed";
import FeedGrid from "@/components/FeedGrid";


export default async function Home() {
    return (
        <>
            <AddNewFeed/>
            <FeedGrid/>
        </>
    );
}
