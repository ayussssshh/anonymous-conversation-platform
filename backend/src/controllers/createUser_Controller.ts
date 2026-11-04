import { createCredential } from "../module/UserIdentification.js"
import { Request, Response } from "express"
import {send_response} from "../lib/sendResponse.js"




// every res.json will must have {
//                               success: true/false
//                               massage: "string"
//                               response code 
//                               }


const createUser = async (req: Request, res: Response) => {

    const userCredential: string = createCredential()

    // if (userCredential == null) throw an error

    res.cookie('userCredential', userCredential, {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    })

    await send_response(res, true, "Temporary session active successfully", 200)

}




export { createUser }