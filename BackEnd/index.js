import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import userRoute from "./routes/user.js"
import companyRoute from "./routes/company.js"
import JobRoute from "./routes/job.js"
import ApplicationRoute from "./routes/application.js"
dotenv.config({});

const app = express();

//middleare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://hire-on-kv.vercel.app" // ✅ must include https://
  ],
  credentials: true
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000

//apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", JobRoute)
app.use("/api/v1/application", ApplicationRoute)

app.listen(PORT, () => {
    connectDb();
    console.log(`server running at port ${PORT}`);

})
