"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSuperAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_1 = require("../models/admin");
const verifyToken = async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = (jsonwebtoken_1.default.verify(token, process.env.FEDOK_SECRET));
            const verifiedAdmin = await admin_1.Admin.findById(decoded.id);
            if (!verifiedAdmin) {
                return res.status(403).json({
                    status: 400,
                    message: 'Not Authorised, Invalid Admin'
                });
            }
            if (verifiedAdmin?.isActive === "Blocked") {
                return res.status(403).json({
                    status: 400,
                    message: 'Admin Email is blocked. Please Contact The Administrator'
                });
            }
            if (verifiedAdmin?.isActive === "Deleted") {
                return res.status(403).json({
                    status: 400,
                    message: 'Admin Email does not exist.'
                });
            }
            let accessAdmin = {
                id: verifiedAdmin.id,
                fullname: verifiedAdmin.fullname,
                email: verifiedAdmin.email,
                access: verifiedAdmin.access
            };
            req.user = accessAdmin;
            ;
            return next();
        }
        catch (error) {
            return res.status(404).json({
                status: 400,
                message: 'UnAuthorized!. Please Login Again'
            });
        }
    }
    else {
        return res.status(404).json({
            status: 400,
            message: 'UnAuthorized!. Please Login Again'
        });
    }
};
exports.verifyToken = verifyToken;
const checkSuperAdmin = (req, res, next) => {
    console.log(req.user.email);
    if (req.user.access == "Super") {
        return next();
    }
    else {
        return res.status(403).json({
            status: 400,
            message: 'Not Authorised To Perform This Action',
        });
    }
};
exports.checkSuperAdmin = checkSuperAdmin;
module.exports = { verifyToken: exports.verifyToken, checkSuperAdmin: exports.checkSuperAdmin };
//# sourceMappingURL=checkAuth.js.map