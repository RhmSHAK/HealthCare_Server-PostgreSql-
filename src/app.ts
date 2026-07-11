import express, { Application,Request,Response } from "express";
import cors from "cors";
import { UserRouter } from "./app/modules/User/user.routers";
import { adminRouter } from "./app/modules/Admin/admin.routers";



const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
  res.send("Server is running HealthCare_Server");
});

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/admin", adminRouter);


export default app;