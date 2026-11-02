import { createCredential } from "./../module/UserIdentification.js"
import { Request, Response } from "express"
import { qureyRoomList } from "../repositories/roomsRepositories.js"




// every res.json will must have {
//                               success: true/false
//                               massage: "string"
//                               response code 
//                               }




async function send_response(res: Response,
    success: boolean,
    massage: string,
    status_code: number
): Promise<Response> {
    return res.status(status_code).json({
        success: success,
        massage: massage
    })

}



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

const getRoomList = async (req: Request, res: Response)=> {

    const RoomList = await qureyRoomList();

    res.json(RoomList);

}


export { createUser, getRoomList }