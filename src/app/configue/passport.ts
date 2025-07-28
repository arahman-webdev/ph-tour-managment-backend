/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from "bcryptjs"



passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    }, async (email, password, done) => {
        try {
            const isExistUser = await User.findOne({ email });

            if (!isExistUser) {
              return  done(null, false, { message: "User does not exist" })
            }

            const isGoogleAuthentictaed = isExistUser?.auth.some(providerObj => providerObj.provider === "google")

            if (isGoogleAuthentictaed && !isExistUser.password) {
              return  done(null, false, { message: "You have not authenticated with credntial, So, you want to login with google and password. At first login using google and then set password. So that you can login throgh password" })
            }

            const isPasswordMatch = await bcryptjs.compare(password as string, isExistUser?.password as string)

            if (!isPasswordMatch) {
               return done(null, false, { message: "User password does not match" })
            }


            return done(null, isExistUser)
        } catch (error) {
            console.log(error)
            done(error)
        }
    }
))


passport.use(
    new GoogleStrategy(
        {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRET,
            callbackURL: envVars.GOOGLE_CALLBACK_URL
        }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {
                const email = profile.emails?.[0].value;
                if (!email) {
                    return done(null, false, { message: "Email is not found" })
                }

                let user = await User.findOne({ email })

                if (!user) {
                    user = await User.create({
                        email,
                        name: profile.displayName,
                        picture: profile.photos?.[0].value,
                        role: Role.USER,
                        auth: [
                            {
                                provider: "google",
                                providerId: profile.id
                            }
                        ],

                    })

                    return done(null, user)
                }


            } catch (error) {
                console.log("Google strategy error from passport js", error)
                return done(error)
            }
        }
    )
)


// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user.id)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        console.log(error)
    }
})