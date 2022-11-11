"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        trim: true,
        minlength: 8,
    },
    access: {
        type: String,
        trim: true,
        required: true,
    },
    isActive: {
        type: String,
        trim: true,
        default: "Active",
    },
    last_login: {
        type: Date,
        trim: true,
        default: Date.now(),
    }
}, { timestamps: true });
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
//# sourceMappingURL=admin.js.map