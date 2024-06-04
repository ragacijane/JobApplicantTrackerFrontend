import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            idKandidata: number,
            idKorisnika: number,
            idTipa: number,
            username: string,
            password: string,
        };

        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}
// create same looking object as session object
// we do it cuz "user" is actualy whole object that is passed from backend, not the user field in recieved object
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            idKandidata: number,
            idKorisnika: number,
            idTipa: number,
            username: string,
            password: string,
        };

        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}
