import  express from "express";
import envConfig from "./config/envConfig";
import connectDB from "./db/dbConnect";
// import AuthRouter from "./features/auth/Routes";
import  bodyParser  from "body-parser";
const app= express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
import cors from "cors"
import PermissionRouter from "./features/admin/permissions/routes";
import RoleRouter from "./features/admin/roles/routes";
import UserRouter from "./features/admin/users/routes";
import ProductCategoryRouter from "./features/admin/products-category/routes";
import ProductRouter from "./features/admin/products/routes";
import UserPanelRouter from "./features/user/auth/routes";
import UserProductRouter from "./features/user/products/routes";
// app.use(express.json());
const env =envConfig();
const port=env.port;
connectDB()
app.use(cors({
    origin:[ 'http://localhost:5173','http://localhost:5174'], 
    credentials: true 
}));

app.use("/permission",PermissionRouter );
app.use("/roles",RoleRouter );
app.use("/user",UserRouter);
app.use("/product-category",ProductCategoryRouter);
app.use("/product",ProductRouter);

// user-panel routes
app.use('/',UserPanelRouter,UserProductRouter)
app.listen(port,()=>{
    console.log("server is running on port http://localhost:"+port);
})