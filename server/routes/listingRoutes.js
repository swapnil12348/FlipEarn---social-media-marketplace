import express from "express";
import { addListing } from "../controllers/listingController.js";

const listingRouter = express.Router();

listingRouter.post('/', addListing)

export default listingRouter