import {createCredential} from "./../module/UserIdentification.js"
import { Request, Response } from "express"






const createUser = async (req: Request, res: Response) => {

    const userCredential: string = await createCredential()

    res.cookie('userCredential', userCredential, {
        httpOnly: false,
        secure: false,
        maxAge: 1000*60*60*24
    })

    res.json({
        massage: "send"
    })
    
}


export {createUser}