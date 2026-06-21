import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import listingRouter from "./routes/listingRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();

// ✅ FIX: Configure CORS to explicitly allow the Authorization header
app.use(cors({
    origin: "http://localhost:5173", // Make sure this matches your React/Vite URL exactly!
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // 👈 This is required for Clerk
    credentials: true
}));

// ✅ DEBUG: This will print in your backend terminal so we know the token arrived
app.use((req, res, next) => {
    // We don't need to log inngest routes
     if (!req.url.includes('/api/inngest')) {
        // 1. Is the token actually a real token, or is it "Bearer null"?
        console.log(`[${req.method}] ${req.url} - Header:`, req.headers.authorization);
        
        // 2. Did the backend actually load the .env file successfully?
        console.log("Secret Key Loaded in Backend?:", !!process.env.CLERK_SECRET_KEY);
    }
    next();
});

// Clerk Middleware MUST come after CORS
app.use(clerkMiddleware());

app.get("/", (req, res)=> res.send("Server is live!"));

app.use("/api/inngest", serve({client: inngest, functions}));

app.use(express.json());
app.use("/api/listing", listingRouter);
app.use("/api/chat", chatRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));