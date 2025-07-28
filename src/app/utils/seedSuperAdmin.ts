/* eslint-disable no-console */
import { envVars } from "../configue/env";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs";


export const seedSuperAdmin = async () => {

    try {
            const isSuperAdminExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL })

    if (isSuperAdminExist) {

        return console.log("Super admin already exist")

    }

    console.log("Trying to create super admin..............")


    const hashSuperAdminPass = bcrypt.hashSync(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUNDS));

    const authProvider: IAuthProvider = {
        provider: "credentials",
        providerId: envVars.SUPER_ADMIN_EMAIL
    }

    const payload: IUser = {
        name: "Super admin",
        role: Role.SUPER_ADMIN,
        email: envVars.SUPER_ADMIN_EMAIL,
        password: hashSuperAdminPass,
        isVerified: true,
        auth: [authProvider],
        

    }

    const superAdmin = await User.create(payload)

    console.log("Super admin created successfully \n")
    console.log(superAdmin)
    } catch (error) {
        console.log(error)
    }
}