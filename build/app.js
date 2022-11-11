"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const cors_1 = __importDefault(require("cors"));
const connectDB_1 = __importDefault(require("./db/connectDB"));
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionSuccessStatus: 200
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/admin/api/v1", adminRoutes_1.default);
const startApp = async () => {
    try {
        await (0, connectDB_1.default)(process.env.DATABASE_URL);
        const port = process.env.PORT || 3030;
        app.listen(port, () => {
            console.log(`The application is listening on port ${port}! And Database is Connected`);
        });
    }
    catch (err) {
        console.log(err);
    }
};
startApp();
//# sourceMappingURL=app.js.map