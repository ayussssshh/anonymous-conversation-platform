import {send_response} from "../lib/sendResponse.js"
import { Request, Response } from "express"
import { qureyRoomList } from "../repositories/roomsRepositories.js"




const getRoomList = async (req: Request, res: Response)=> {

    const RoomList = await qureyRoomList()

    await send_response(res, true, "fetched the list of rooms", 200, RoomList)

}

export {getRoomList}