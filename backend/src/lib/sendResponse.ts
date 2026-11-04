import {Response } from "express"



export async function send_response(res: Response,
    success: boolean,
    massage: string,
    status_code: number,
    data: unknown[] | null = null
): Promise<Response> {
    return res.status(status_code).json({
        success: success,
        massage: massage,
        data: data
    })

}