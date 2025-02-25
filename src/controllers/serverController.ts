import {Request, Response} from "express";
import { getServerhealth} from "../services/serverService"

export const getServerHealth = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await getServerhealth()
        res.status(response.status).json(response)
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
}