import express from "express";
import { addListing } from "../controllers/listingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const listingRouter = express.Router();

listingRouter.post('/',protect, addListing)

export default listingRouter