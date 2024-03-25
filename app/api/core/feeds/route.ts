import {getServerSession} from "next-auth";
import {nextAuthOptions} from "@/utils/nextAuth/nextAuthOptions";
import {NextRequest, NextResponse} from "next/server";
import {adminApi, generateFetchOptions} from "@/lib/admin";
import {FeedGetResponseType} from "@/types/admin-api";
import {encryptData} from "@/lib/encryption";


export async function GET(request: NextRequest, response: NextResponse) {
    const session = await getServerSession(nextAuthOptions);
    if (!session) {
        return NextResponse.json({error: 'Unauthorized'});
    }
    const page = request.nextUrl.searchParams.get("page")
    let api: string = 'feeds'
    if (page) {
        api = api + '?page=' + page
    }
    let feeds = await fetch(adminApi(api),
        generateFetchOptions('GET', null, session.accessToken));
    if (feeds.status != 200) {
        return NextResponse.json(encryptData({error: 'Unauthorized'}));
    }
    const feedsResponse: FeedGetResponseType = await feeds.json();
    return NextResponse.json(encryptData(feedsResponse.data));
}