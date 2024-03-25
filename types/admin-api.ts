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

export type LoginPostResponseType = {
    status: boolean
    message: string
    data: DashboardResponseType
}

export type DashboardResponseType = {
    id: number
    firebase_uid: string
    name: string
    username_visibility: boolean
    username: string
    phone_extension: string
    phone_number: string
    is_approved: boolean
    email: string
    created_at: string
    accessToken: string
    login: Login
    profile: Profile
    isSubscriptionUser: boolean
    children: Children[]
}

export interface Login {
    user_id: number
    device_id: string
    notification_token: any
    device_type: string
    login_method: string
    ip: string
    updated_at: string
    created_at: string
    id: number
}

export interface Profile {
    id: number
    bio: string
    bio_link: any
    pincode: any
    gender: string
    avatar: string
    avatar_thumbnail: string
    lat: string
    long: string
    state_of_mind: any
    reason_to_join: string
    describes_me: any
    address: string
    sub_district: string
    district: string
    city: string
    state: string
    country: string
    country_code: string
    dob: string
    languages: string[]
    education: string
    work: any
    hometown: any
    hobbies: any
    updated_at: string
    user_id: number
    current_stage_id: number
    children_stage_id: number
}

export interface Children {
    id: number
    gender: string
    dob: string
    name: string
    created_at: string
    updated_at: string
    deleted_at: any
    user_id: number
    children_stage_id: number
    recommended_stage_id: any
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

