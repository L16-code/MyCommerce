import  express from "express";
import envConfig from "./config/envConfig";
import connectDB from "./db/dbConnect";
import PermissionRouter from "./features/permissions/routes";
import RoleRouter from "./features/roles/routes";
import UserRouter from "./features/users/routes";
// import AuthRouter from "./features/auth/Routes";
import cors from "cors"
const app= express();
app.use(express.json());
const env =envConfig();
const port=env.port;
connectDB()
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

app.use("/permission",PermissionRouter );
app.use("/roles",RoleRouter );
app.use("/user",UserRouter );


app.listen(port,()=>{
    console.log("server is running on port http://localhost:"+port);
})