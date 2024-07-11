import axios from "axios"
import { useEffect, useState } from "react"
import { CategoriesData, ProductsData } from "./Profile/ProfileInterface"
import { useSelector } from "react-redux"
import { RootState } from "../../state_management/store/store"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import routes from "../../routes/routes"

// import Navbar from "./Navbar"
const Home = () => {
    const navigate = useNavigate()
    const [productData, setProductData] = useState<ProductsData[]>([])
    const [CatgoryData, setCatgoryData] = useState<CategoriesData[]>([])
    const [Limit, setLimit] = useState(4)

    const GetProducts = async (limit: number) => {
        await axios.get(`http://localhost:5000/get-product/?page=1&limit=${limit}`).then(res => setProductData(res.data.data))
    }
    const GetCategory = async () => {
        await axios.get(`http://localhost:5000/get-category`).then(res => setCatgoryData(res.data.data))
    }
    const isAuthenticated = useSelector((state: RootState) => state.root.isAuthenticated)
    const user_detail = useSelector((state: RootState) => state.root.user)
    const AuthStr = 'Bearer '.concat(user_detail?.token as string);

    const addToCartHandler = (id: string) => async () => {
        if (isAuthenticated) {
            const AddCartData = {
                user_id: user_detail?.id,
                product_id: id
            }
            console.log(id)
            await axios.post('http://localhost:5000/addCart', AddCartData, { headers: { Authorization: AuthStr } })
            toast.success('🦄 The Product Has Been Added Into The Cart');
        } else {
            navigate(routes.LOGIN)
        }
    }

    const LoadMoreHandler = async () => {
        const newLimit = Limit + 4;
        await axios.get(`http://localhost:5000/get-product/?page=1&limit=${newLimit}`).then(res => setProductData(res.data.data))
        setLimit(newLimit);
    }

    useEffect(() => {
        GetProducts(Limit)
        GetCategory()
    }, [Limit])

    return (
        <>
            <div>
                <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ margin: "2rem", fontWeight: "bold" }}>Shopping Hub</h1>
                    <div style={{ width: '80%', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: "aliceblue", display: "grid", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
                        <div style={{ display: "block", textAlign: "center", fontSize: "medium", fontWeight: "bold" }}>Filters</div>
                        <div style={{ display: "flex", gap: "4rem", justifyContent: "center" }}>
                            <div>
                                <input type="text" placeholder="search products" style={{ padding: '8px', boxSizing: 'border-box' }}/>
                            </div>
                            <select name="category" id="category" style={{ padding: '8px', boxSizing: 'border-box' }}>
                                <option value="">All</option>
                                {
                                    CatgoryData.map((category) => {
                                        return (
                                            <option key={category._id} value={category._id}>{category.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <select name="" id="" style={{ padding: '8px', boxSizing: 'border-box' }}>
                                <option value="">test</option>
                                <option value="">test</option>
                                <option value="">test</option>
                                <option value="">test</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ width: '80%', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: "aliceblue", display: "flex", flexWrap: "wrap", gap: "4rem", marginTop: "2rem" }}>
                        {
                            productData.map((product) => {
                                return (
                                    <div className="product-card" key={product._id}>
                                        <p className="product-card__category">{product.category} <span>(Quantity: {product.quantity})</span></p>
                                        <img src={product.image} alt="" className="product-card__image" />
                                        <h2 className="product-card__name">{product.name}</h2>
                                        <p className="product-card__price">₹{product.price.toFixed(2)}</p>
                                        <p className="product-card__description">{product.description}</p>
                                        {
                                            isAuthenticated ?
                                                <button className="product-card__button" onClick={addToCartHandler(product._id.toString())}>Add to Cart</button>
                                                :
                                                <button className="product-card__button" onClick={() => { navigate(routes.LOGIN) }}>Please Login</button>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button onClick={LoadMoreHandler} style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        cursor: "pointer"
                    }}>Load More</button>
                </div>
            </div>
        </>
    )
}

export default Home
