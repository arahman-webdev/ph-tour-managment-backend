/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import mongoose from "mongoose"
import { app } from "./app"
import { Server } from "http"
import { envVars } from "./app/configue/env"
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin"



// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server



async function main() {
    try {
        await mongoose.connect(envVars.DB_URL)
            .then(() => {
                console.log('Connected to mongodb')
            })

           

      server =  app.listen(5000, () => {
            console.log(`This is running on the port ${envVars.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}



( () =>{ 
    main()
    seedSuperAdmin()
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
 * alsom types 
 * 1. npm i @types/passport @types/passport-local @types/passport-google-oauth2
 * }
 *  ------------------------------------------Step --------------------2---------------------------
 * import passport and google auth where needed
 * 
 * ------------------------------------------Step --------------------3---------------------------
 * 
 * 
 */
