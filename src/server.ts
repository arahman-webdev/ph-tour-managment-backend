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
 */
