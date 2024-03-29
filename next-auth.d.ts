import {Session} from "next-auth/next"
import {UserDetailsResponse} from "@/types/admin-api";

declare module "next-auth" {
    interface Session {
        accessToken: string
        user: UserDetailsResponse & Session["user"]
    }

    interface User {
        accessToken: string
    }

    interface JWT {
        accessToken: string
    }
}