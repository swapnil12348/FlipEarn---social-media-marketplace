import express from "express"
import { protectAdmin } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get('/isAdmin', protectAdmin, isAdmin)



export default adminRouter;
