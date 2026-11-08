import { pool } from "../config/database.js";
import logger from "../lib/logger.js";


export async function qureyRoomList() {

    try {

	const result = await pool.query("SELECT * FROM room_list WHERE is_private = FALSE")
        return result.rows;
        
    } catch (error) {
        logger.error(error)
    }
    
}


export async function createRoom(name: string, description: string, is_private: boolean) {

    try {

        const result = await pool.query(`INSERT INTO room_list (name, description, is_private) VALUES ($1, $2, $3) RETURNING room_id`,
            [name, description, is_private]
        )

        return result.rows[0].room_id;
        
    } catch (error) {
        logger.error(error)
    }
    
}



export async function joinRoom(userID: string, roomId: number, is_moderator:boolean) {

    try {

        const result = pool.query(`INSERT INTO room_members(user_id, room_id, is_moderator) VALUES ($1, $2, $3)`,
            [userID, roomId, is_moderator]
        )
        
    } catch (error) {
        logger.error(error)
    }
    
}