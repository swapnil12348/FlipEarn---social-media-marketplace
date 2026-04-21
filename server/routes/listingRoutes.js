import express from "express";
import { addListing, updateListing } from "../controllers/listingController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../configs/multer.js";

const listingRouter = express.Router();

listingRouter.post('/',upload.array("images", 5) ,protect, addListing)
listingRouter.put('/',upload.array("images", 5), protect, updateListing)

export default listingRouter