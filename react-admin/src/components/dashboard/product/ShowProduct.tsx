import Sidebar from "../sidebar";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes/routes";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetProduct } from "./productInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../../state_management/store/store";
const ShowProduct = () => {
    const TOKEN = useSelector((state: RootState) => state.root.token);
    const AuthStr = 'Bearer '.concat(TOKEN);
    const navigate = useNavigate();
    const [products, setProducts] = useState<GetProduct[]>([]);
    const GetProducts = () => {
        axios.get('http://localhost:5000/product/read',{ headers: { Authorization: AuthStr } })
            .then(res => setProducts(res.data.data))
    }
    const StatusHandler=async(id:string)=>{
        const isConfirm=confirm('Are you Sure You Want To Change status')
        if(isConfirm){
            await axios.post(`http://localhost:5000/product/update-status`, {id:id},{ headers: { Authorization: AuthStr } })
            GetProducts()
        }
    }
    useEffect(() => {
        GetProducts()
    }, [])
    return (
        <div className="wrapper">
            <Sidebar isAuthenticated={true} />
            <div className="main">
                <Navbar />
                <main className="content">
                    <div className="container-fluid p-0">
                        <h1 className="h3 mb-3">Product  Page</h1>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Product View</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1" style={{ width: "100%" }}>
                                            <div className="card flex-fill">
                                                <div className="card-header">
                                                    <button style={{
                                                        padding: "5px",
                                                        borderRadius: "5px",
                                                        border: "1px solid #000",
                                                        color: "#000",
                                                        backgroundColor: "#17a2b8",
                                                    }}
                                                        onClick={() => { navigate(routes.PRODUCTS_ADD) }}
                                                    >Add Product</button>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table table-hover my-0">
                                                        <thead>
                                                            <tr>
                                                                <th className="d-none d-xl-table-cell">Name</th>
                                                                <th className="d-none d-xl-table-cell">category</th>
                                                                <th className="d-none d-xl-table-cell">price</th>
                                                                <th className="d-none d-xl-table-cell">quantity</th>
                                                                <th className="d-none d-xl-table-cell">image</th>
                                                                <th className="d-none d-xl-table-cell">status</th>
                                                                <th className="d-none d-md-table-cell">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {products.map((product) => (
                                                                <tr key={product._id}>
                                                                    <td>{product.name}</td>
                                                                    <td>{product.category}</td>
                                                                    <td>{product.price}</td>
                                                                    <td>{product.quantity}</td>
                                                                    <td><img src={product.image} alt={product.name} style={{ width: "100px" }} /></td>
                                                                    <td>{
                                                                            product.status === "active" ?
                                                                                <span className="badge bg-success" onClick={()=>{ StatusHandler(product._id)}} style={{ cursor:"pointer"}}>Active</span>
                                                                                :
                                                                                <span className="badge bg-danger" onClick={()=>{ StatusHandler(product._id)}} style={{ cursor:"pointer"}}>Inactive</span>
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                    <button style={{
                                                                        padding: "5px",
                                                                        borderRadius: "5px",
                                                                        border: "1px solid #000",
                                                                        color: "#000",
                                                                        backgroundColor: "green",
                                                                    }}
                                                                    onClick={()=>navigate(routes.PRODUCTS_EDIT,{state:{id:product._id}} )}
                                                                    >Edit</button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ShowProduct