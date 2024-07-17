import Sidebar from "../sidebar";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes/routes";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetProduct } from "./productInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../../state_management/store/store";
import Modal from "../commonComponents/modal";
import * as XLSX from 'xlsx';
const ShowProduct = () => {
    const TOKEN = useSelector((state: RootState) => state.root.token);
    const AuthStr = 'Bearer '.concat(TOKEN);
    const navigate = useNavigate();
    const [products, setProducts] = useState<GetProduct[]>([]);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const GetProducts = () => {
        axios.get('http://localhost:5000/product/read', { headers: { Authorization: AuthStr } })
            .then(res => setProducts(res.data.data))
    }
    const StatusHandler = async (id: string) => {
        const isConfirm = confirm('Are you Sure You Want To Change status')
        if (isConfirm) {
            await axios.post(`http://localhost:5000/product/update-status`, { id: id }, { headers: { Authorization: AuthStr } })
            GetProducts()
        }
    }
    const ExportProductHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/product/export-products`, {
                headers: { Authorization: AuthStr },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'products.xlsx');
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.log(err);
        }
    }
    const ImportHandler = async () => {
        console.log("Import")
        const headers = ["name", "price", "quantity", "description", "category_id"];
        const sheetData = [headers];
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        if (worksheet['!ref']) {
            console.log("hello")
            const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
            for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
                const cell_address = XLSX.utils.encode_cell({ c: C, r: 0 });
                if (!worksheet[cell_address]) continue;
                worksheet[cell_address].s = {
                    font: {
                        bold: true
                    }
                };
            }
        }
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

        // Generate the Excel file
        XLSX.writeFile(workbook, 'AddProducts.xlsx');
        // const csvContent = [headers].map(row => row.join(",")).join("\n");
        // const blob = new Blob([csvContent], { type: "text/csv" });
        // const url = window.URL.createObjectURL(blob);
        // const a = document.createElement("a");
        // a.href = url;
        // a.download = "Addproducts.csv";
        // a.click();
        // window.URL.revokeObjectURL(url);
        openModal()

        // const fileInput = document.getElementById('import-file') as HTMLInputElement;
        // if (!fileInput.files ||!fileInput.files[0]) {
        //     return;
        // }
        // const formData = new FormData();
        // formData.append('file', fileInput.files[0]);
        // try {
        //     await axios.post(`http://localhost:5000/product/import-products`, formData, {
        //         headers: { Authorization: AuthStr },
        //         'Content-Type': 'application/json'
        //     });
        //     GetProducts()
        // } catch (err) {
        //     console.log(err);
        // }
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
                                            <div className="card flex-fill" >
                                                <div className="card-header" style={{ gap: "1rem", display: "flex" }}>
                                                    <button style={{
                                                        padding: "5px",
                                                        borderRadius: "5px",
                                                        border: "1px solid #000",
                                                        color: "#000",
                                                        backgroundColor: "#17a2b8",
                                                    }}
                                                        onClick={() => { navigate(routes.PRODUCTS_ADD) }}
                                                    >Add Product</button>
                                                    <button style={{
                                                        padding: "5px",
                                                        borderRadius: "5px",
                                                        border: "1px solid #000",
                                                        color: "#000",
                                                        backgroundColor: "#17a2b8",
                                                    }}
                                                        onClick={ExportProductHandler}
                                                    >Export Products</button>
                                                    <button style={{
                                                        padding: "5px",
                                                        borderRadius: "5px",
                                                        border: "1px solid #000",
                                                        color: "#000",
                                                        backgroundColor: "#17a2b8",
                                                    }}
                                                        onClick={ImportHandler}
                                                    >Import Products</button>
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
                                                                            <span className="badge bg-success" onClick={() => { StatusHandler(product._id) }} style={{ cursor: "pointer" }}>Active</span>
                                                                            :
                                                                            <span className="badge bg-danger" onClick={() => { StatusHandler(product._id) }} style={{ cursor: "pointer" }}>Inactive</span>
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
                                                                            onClick={() => navigate(routes.PRODUCTS_EDIT, { state: { id: product._id } })}
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
                    <Modal show={showModal} onClose={closeModal}>
                        <h2>Add Csv</h2>
                        <form style={{ width: '80%', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }} noValidate>
                            <div style={{ marginBottom: '15px' }}>
                                <label htmlFor="state" style={{ display: 'block', marginBottom: '5px' }}>File</label>
                                <input
                                    type="file"
                                    // {...register('state')}
                                    id="state"
                                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                                />
                                {/* {errors.state && <p style={{ color: 'red', marginTop: '5px' }}>{errors.state.message}</p>} */}
                            </div>
                            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#556cd6', color: '#fff', border: 'none', borderRadius: '5px' }}>Submit</button>
                        </form>
                    </Modal>
                </main>
            </div>
        </div>
    )
}

export default ShowProduct