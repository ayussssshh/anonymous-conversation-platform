import e from "express";
import { pool } from "../config/database.js";
import logger from "../lib/logger.js";

export async function mapUserIdtoUsername(userId:string, username: string) {

    try {

        const result = await pool.query(`INSERT INTO anonymous_users (user_id, username) VALUES ($1, $2) RETURNING user_id , username`, [userId, username])

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0].username
        
    } catch (error) {
        logger.error(error)
    }
    
}


export async function getUsernamebyUID(
    user_id: string
): Promise<string | null> {

    try {
        const result = await pool.query(
            `SELECT username
             FROM anonymous_users
             WHERE user_id = $1
             LIMIT 1`,
            [user_id]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0].username;

    } catch (error) {
        logger.error(error);
        return null;
    }
}
