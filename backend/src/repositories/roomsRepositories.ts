import { pool } from "../config/database.js";


export async function qureyRoomList() {

    try {

        const result = await pool.query("SELECT * FROM room_list")

        return result.rows;
        
    } catch (error) {
        console.log(error)
    }
    
}
