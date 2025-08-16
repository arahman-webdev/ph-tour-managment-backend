"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const env_1 = require("./app/configue/env");
const seedSuperAdmin_1 = require("./app/utils/seedSuperAdmin");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(env_1.envVars.DB_URL)
                .then(() => {
                console.log('Connected to mongodb');
            });
            server = app_1.app.listen(5000, () => {
                console.log(`This is running on the port ${env_1.envVars.PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
(() => {
    main();
    (0, seedSuperAdmin_1.seedSuperAdmin)();
})();
// process.on('unhandledRejection', error =>{
//     console.log("unhandled rejection and it is shutting down", error)
//     if(server){
//         server.close(()=>{
//             process.exit(1)
//         })
//         process.exit(1)
//     }
// })
// Promise.reject(new Error('I forgot to catch this promise'))
/** Error handling
 *
 * unhandled rejection error
 * uncaught error
 * signal termination or sigterm
 */
/**
 * install all neccessary package
 * create user.service.ts {
 * 1. Buisiness logic and user.create in the userService.ts
 * }
 *
 * create user.controller.ts {
 * 1.  req body
 * }
 *
 * create user.route.ts {
 * 1. .post, get, put etc
 * }
 *
 * ---------------------------validation with Zod ---------------------------
 *
 * 1. create userZodSchem from zod documentation in the user.validation or other name in the user moduler
 * 2. create a variable in the validateRequest.ts and export from there. This is a middleware
 * 3. use it in the router.ts
 *
 * ---------------------------- password hashing with bcryptjs ---------------------
 *
 * 1. npm i bcryptjs, 2. import, 3.see the document from https://www.npmjs.com/package/bcryptjs and use in the user.service.ts
 *
 *
 * --------------------------------generate jwt token ----------------------------------------------
 *
 * 1. create jwt.ts named file in the utils
 * 2. in there sign and verify buisiness logic wiil be happen
 * 3. generate token will be used in the login service file
 * 4. verify token will be used in the checkAuth for hitting router.
 * 5. and checkAuth will call like this router.patch('/:id', examAuth(...Object.values()), UserController.updateUser)
 *
 *
 * How to find out google auth ---------------- with passport js
 *
 *  https://dev.to/fatihguzel/integrating-google-oauth-20-with-jwt-in-a-nodejs-typescript-app-using-passportjs-3ij

https://www.passportjs.org/tutorials/password/session/

https://www.npmjs.com/package/passport

https://stackoverflow.com/questions/46644366/what-is-passport-initialize-nodejs-express

https://github.com/jaredhanson/passport

https://github.com/jaredhanson/passport-local

https://github.com/passport/todos-express-password

https://github.com/jaredhanson/passport-google-oauth2

https://github.com/passport/todos-express-google-oauth2
DEV Community
Integrating Google OAuth 2.0 with JWT in a Node.js + TypeScript App...
Let’s cut to the chase—auth is a pain. And if you’ve ever used Passport.js, you know it’s not just a...
Integrating Google OAuth 2.0 with JWT in a Node.js + TypeScript App...
Passport.js
Username & Password Tutorial: Establish Session
In this tutorial you will build an Express app that lets users log in using a username and password.
Username & Password Tutorial: Establish Session
npm
passport
Simple, unobtrusive authentication for Node.js.. Latest version: 0.7.0, last published: 2 years ago. Start using passport in your project by running `npm i passport`. There are 6213 other projects in the npm registry using passport.
Image
GitHub
GitHub - jaredhanson/passport: Simple, unobtrusive authentication f...
Simple, unobtrusive authentication for Node.js. Contribute to jaredhanson/passport development by creating an account on GitHub.
GitHub - jaredhanson/passport: Simple, unobtrusive authentication f...
 *
 */
/**
 * Google login with passport js step by step
 *
 * 1. Step-------
 *  a. install neccesary npm package {
 * 1. npm i passport
 * 2. npm i passport-local
 * 3. npm i passport-google-oauth
 * 4. npm i express-session
 * alsom types
 * 1. npm i @types/passport @types/passport-local @types/passport-google-oauth2
 * }
 *  ------------------------------------------Step --------------------2---------------------------
 * import passport and google auth where needed
 *
 * ------------------------------------------Step --------------------3---------------------------
 * -----import "./app/configue/passport" To import this file is crucial-গুরুত্বপূর্ণ  to set up the Google strategy and session handling.-----------------
 * doc: https://www.passportjs.org/packages/passport-google-oauth2/
 * app.use(session({secret: "secret",resave: false ,saveUninitialized: false ,})) in the app.ts
 * saveUninitialized: false because not creating unneccessary records. It prevents empty session I mean অপ্রয়োজনীয় সেশন রেকর্ড তৈরি না করে মেমরি বা ডাটাবেসের ব্যবহার সংরক্ষণ করে।
 * app.use(passport.initialize()), app.use(passport.session()) in the app.ts too
 *
 *  ------------------------------------------Step ------------------   FOUR ---------------------------
 * 1. CREATE PASSPORT JS FILE IN THE CONFIGUE FOLDER
 * 2. import strategy from passport-google-oauth2
 * 3. rename strategy as GoogleStrategy like: import { Strategy as GoogleStrategy} from "passport-google-oauth20";
 *
 *
 * ------------------------------------------Step ------------------   5 ---------------------------
 *
 * Go to google cloud console
 * open nevigation bar from left side and click on APIS & SERVICE ON
 * then click on the Oauth consent screen now click on the client and after that you can see your client if you created a project.
 * but if you do not create can see the create project at the right side.
 *
 * Now you have to use them in the passport.ts file
 *
 * passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://yourdomain:3000/auth/google/callback",
    
  } asynch(request, accessToken, refreshToken, profile, done:callback)=>{
   tyrcatch(
   
   check if user has or if user email has

   and after that create user and send it to db


    ------------------------------------------Step ------------------   6 ---------------------------

    passport.serializeUser
    passport.deserializeUser


 ------------------------------------------Step ------------------   6 ---------------------------

    1. create a controller named getCallbackController in auth controller.ts

const googleCallbackController = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    console.log(user)

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
    }

    const tokenInfo = createUserToken(user)

    setAuthCookie(res, tokenInfo)

    res.redirect(envVars.FRONTEND_URL)
}

   )
  },
 */
/**
 * Credential login with passport js--------------------------------------step by step
 *
 * What need to create user
 * if == user?, if isGoogleAuthentictaed === user, password match with bcryptjs
 * passport.use({     usernameField: "email",
   passwordField: "password"}, asynch(email, password, done )=>{
      business logic
   } )
 */
