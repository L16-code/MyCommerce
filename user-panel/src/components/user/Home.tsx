import axios from "axios"
import { useEffect, useState } from "react"
import { ProductsData } from "./Profile/ProfileInterface"
import { useSelector } from "react-redux"
import { RootState } from "../../state_management/store/store"
import { Bounce, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import routes from "../../routes/routes"

// import Navbar from "./Navbar"
const Home = () => {
    const navigate = useNavigate()
    const [productData, setProductData] = useState<ProductsData[]>([])
    const GetProducts = async () => {
        await axios.get('http://localhost:5000/get-product').then(res => setProductData(res.data.data))
    }
    const isAuthenticated = useSelector((state: RootState) => state.root.isAuthenticated)
    const user_detail = useSelector((state: RootState) => state.root.user)
    const AuthStr = 'Bearer '.concat(user_detail?.token as string);
    const addToCartHandler = (id: string) => async() => {
        if (isAuthenticated) {
            const AddCartData={
                user_id: user_detail?.id,
                product_id: id
            }
            console.log(id)
            await axios.post('http://localhost:5000/addCart', AddCartData, { headers: { Authorization: AuthStr }})
            toast.success('🦄 The Product Has Been Added Into The Cart', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            navigate(routes.LOGIN)
        }
    }
    useEffect(() => {
        GetProducts()
    }, [])
    return (
        <div>
            {/* <Navbar /> */}
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ margin: "2rem", fontWeight: "bold" }}>Shopping Hub</h1>
                <div style={{ width: '80%', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: "aliceblue", display: "flex", flexWrap: "wrap", gap: "4rem", marginTop: "2rem" }}>
                    {
                        productData.map((product) => {
                            return (
                                <div className="product-card">
                                    <p className="product-card__category">{product.category} <span>(Quantity: {product.quantity})</span></p>
                                    <img src={product.image} alt="" className="product-card__image" />
                                    <h2 className="product-card__name">{product.name}</h2>
                                    {/* <p className="product-card__quantity">{product.quantity}</p> */}
                                    <p className="product-card__price">${product.price.toFixed(2)}</p>
                                    <p className="product-card__description">{product.description}</p>
                                    {
                                        isAuthenticated ?
                                            <button className="product-card__button" onClick={ addToCartHandler(product._id.toString()) }>Add to Cart</button>
                                            :
                                            <button className="product-card__button" onClick={() => { navigate(routes.LOGIN) }}>please Login</button>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home