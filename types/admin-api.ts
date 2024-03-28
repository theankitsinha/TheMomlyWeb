export type FeedGetResponseType = {
    status: boolean
    message: string
    data: FeedPaginatedResponseType
}

export type MeetGetResponseType = {
    status: boolean
    message: string
    data: MeetPaginatedResponseType
}

export interface MeetPaginatedResponseType {
    data: Meet[]
    pagination: Pagination
}


export interface FeedPaginatedResponseType {
    data: Feed[]
    pagination: Pagination
}

export type Feed = {
    id: number
    user_id: number
    feed_type: string
    is_anonymous: boolean
    body: string
    body_link: any
    image_json: string[]
    tag: any[]
    user_name: string
    user_thumbnail: string
    user_avatar: string
    total_likes: number
    total_comments: number
    poll_options: PollOption[]
    user_selected_poll_option?: UserSelectedPollOption
    already_liked: boolean
    diffForHumans: string
    created_at: string
}

export interface PollOption {
    id: number
    option: string
    total_selection: number
}

export interface UserSelectedPollOption {
    option_id: number
    feed_id: number
    option: string
}

export type Pagination = {
    current_page: number
    from: number
    to: number
    per_page: number
    total: number
    last_page: number
}


export type Meet = {
    id: number
    user_id: number
    bio: string
    avatar: string
    state_of_mind?: string
    reason_to_join: string
    describes_me?: string
    hometown?: string
    city?: string
    state: string
    country_code: string
    languages?: string[]
    hobbies?: string
    name: string
    username: string
    email: string
    current_stage: string
    connection_status: any
    mutual_connections_count: number
    total_connections_count: number
    score: number
    children: Children[]
    distance: number
}

export interface Children {
    dob: string
    age_in_years: number
}


//.file

export type LoginPostResponseType = {
    status: boolean
    message: string
    data: UserDetailsResponse
}

export type UserDetailsResponse = {
    accessToken: string
    wasRecentlyCreated: boolean
    isApproved: boolean
    profileExists: boolean
    roles: Role[]
    isSubscriptionUser: boolean
    id: number
    name: string
    username: string
    email: string
    phoneNumber: any
    phoneExtension: string
    deviceId: string
    lat: string
    long: string
    stageId: number
    image: string
}

export interface Role {
    id: number
    title: string
}

