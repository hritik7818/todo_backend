import express from 'express';
import cors from 'cors';

import todoRouters from './routes/todo_routes.js';
import authRouters from './routes/auth_route.js '

import {errorHandler} from "./middlewares/error_handler.js"


const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth",authRouters);
app.use("/api/todos",todoRouters);

app.use(errorHandler);
// Health check
app.get('/health',(req,res)=>{
    res.send("server is running...");
});

export default app;