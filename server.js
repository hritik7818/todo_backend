import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT, () => {
      console.log(`server is running on PORT : ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed : ", error);
    process.exit(1); //! Stop the server
  }
};

startServer();
