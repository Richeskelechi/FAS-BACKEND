"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdminLogin = exports.validateAdmin = void 0;
const joi_1 = __importDefault(require("joi"));
const date_1 = __importDefault(require("@joi/date"));
const joi = joi_1.default.extend(date_1.default);
const validateAdmin = function (body) {
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let errorArr = [];
    if (body.fullname == '')
        errorArr.push("Fullname is required");
    if (body.email == '')
        errorArr.push("Email is required");
    if (body.phoneNumber == '')
        errorArr.push("Phone Number is required");
    if (body.access == '')
        errorArr.push("Admin Access is required");
    const isValidEmail = emailRegex.test(body.email);
    const isValidPassword = passwordRegex.test(body.password);
    if (!isValidEmail)
        errorArr.push("Email is not A valid Email address");
    if (!isValidPassword)
        errorArr.push("Password Must Be up to 8 charcters and must contain both letters, numbers and special characters.");
    if (body.password == '')
        errorArr.push("Password is required");
    if (body.access == '')
        errorArr.push("Access is required");
    if (errorArr.length > 0) {
        return { success: false, data: errorArr };
    }
    return { success: true };
};
exports.validateAdmin = validateAdmin;
const validateAdminLogin = function (body) {
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let errorArr = [];
    if (body.email == '')
        errorArr.push("Email is required");
    if (body.password == '')
        errorArr.push("Password is required");
    const isValidEmail = emailRegex.test(body.email);
    const isValidPassword = passwordRegex.test(body.password);
    if (!isValidEmail)
        errorArr.push("Email is not A valid Email address");
    if (!isValidPassword)
        errorArr.push("Password Must Be up to 8 charcters and must contain both letters, numbers and special characters.");
    if (errorArr.length > 0) {
        return { success: false, data: errorArr };
    }
    return { success: true };
};
exports.validateAdminLogin = validateAdminLogin;
//# sourceMappingURL=addAdminValidate.js.map