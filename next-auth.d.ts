import {Session} from "next-auth/next"
import {DashboardResponseType} from "@/types/admin-api";

declare module "next-auth" {
    interface Session {
        accessToken: string
        user: DashboardResponseType & Session["user"]
    }

    interface User {
        accessToken: string
    }

    interface JWT {
        accessToken: string
    }
}