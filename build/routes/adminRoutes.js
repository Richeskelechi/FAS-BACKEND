"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const checkAuth_1 = require("../middlewares/checkAuth");
const adminRouter = express_1.default.Router();
adminRouter.post("/addAdmin", checkAuth_1.verifyToken, checkAuth_1.checkSuperAdmin, adminController_1.addAdmin);
adminRouter.post("/loginAdmin", adminController_1.loginAdmin);
adminRouter.get("/allAdmin", checkAuth_1.verifyToken, checkAuth_1.checkSuperAdmin, adminController_1.allAdmin);
adminRouter.get("/admin/:id", checkAuth_1.verifyToken, adminController_1.singleAdmin);
adminRouter.put("/updateAdmin/:id", checkAuth_1.verifyToken, adminController_1.updateAdmin);
adminRouter.put("/changeAccess/:id", checkAuth_1.verifyToken, checkAuth_1.checkSuperAdmin, adminController_1.changeAccess);
adminRouter.put("/blockAdmin/:id", checkAuth_1.verifyToken, checkAuth_1.checkSuperAdmin, adminController_1.blockAdmin);
adminRouter.put("/deleteAdmin/:id", checkAuth_1.verifyToken, checkAuth_1.checkSuperAdmin, adminController_1.deleteAdmin);
exports.default = adminRouter;
//# sourceMappingURL=adminRoutes.js.map