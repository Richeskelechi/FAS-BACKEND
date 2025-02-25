import { Request, Response } from "express";
import { addAdminService, loginAdminService, getAllAdminService, getSingleAdminService, updateAdminService, changeAccessService, blockAdminService, deleteAdminService, changePasswordService, resetPasswordEmailService, resetPasswordEmailValidateService, getAllUserService, getSingleUserService, blockUserService } from "../services/adminService"

export const addAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                status: 401,
                message: "Unauthorized User",
            });
            return; // Ensure function ends here
        }

        const response = await addAdminService(req.body);
        res.status(response.status).json(response); // Send response

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await loginAdminService(req.body);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const allAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                status: 401,
                message: "Unauthorized User",
            });
            return;
        }

        const response = await getAllAdminService();
        res.status(response.status).json(response);
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: err instanceof Error ? err.message : err,
        });
    }
};

export const singleAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: adminId } = req.params;

        if (req.user !== adminId) {
            res.status(401).json({
                status: 401,
                message: "Unauthorized User",
            });
            return;
        }

        const response = await getSingleAdminService(adminId);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const updateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: adminId } = req.params;

        if (req.user === adminId) {
            res.status(401).json({ status: 401, message: "Unauthorized User" });
            return;
        }

        const response = await updateAdminService(adminId, req.body);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const changeAccess = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: adminId } = req.params;

        if (req.user === adminId) {
            res.status(401).json({ status: 401, message: "Unauthorized User" });
            return;
        }

        const response = await changeAccessService(req.body);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const blockAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: adminId } = req.params;

        if (req.user === adminId) {
            res.status(401).json({ status: 401, message: "Unauthorized User" });
            return;
        }

        const response = await blockAdminService(adminId);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: adminId } = req.params;

        if (req.user === adminId) {
            res.status(401).json({ status: 401, message: "Unauthorized User" });
            return;
        }

        const response = await deleteAdminService(adminId);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const changePasswordAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: adminId } = req.params;

        if (req.user === adminId) {
            res.status(401).json({ status: 401, message: "Unauthorized User" });
            return;
        }

        const response = await changePasswordService(adminId, req.body);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const resetPasswordEmailAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await resetPasswordEmailService(req.body);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const resetPasswordEmailValidateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await resetPasswordEmailValidateService(req.body);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const allUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: adminId } = req.params;

        if (req.user === adminId) {
            res.status(401).json({ status: 401, message: "Unauthorized User" });
            return;
        }

        const response = await getAllUserService();
        res.status(response.status).json(response);
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: err instanceof Error ? err.message : err,
        });
    }
};

export const singleUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: adminId, userId } = req.params;

        if (req.user === adminId) {
            res.status(401).json({ status: 401, message: "Unauthorized User" });
            return;
        }

        const response = await getSingleUserService(userId);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const blockUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: adminId, userId } = req.params;

        if (req.user === adminId) {
            res.status(401).json({ status: 401, message: "Unauthorized User" });
            return;
        }

        const response = await blockUserService(userId);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};