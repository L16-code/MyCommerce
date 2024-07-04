// import Navbar from "./Navbar"
const Home = () => {
    return (
        <div>
            {/* <Navbar /> */}
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ margin: "2rem", fontWeight: "bold" }}>Shopping Hub</h1>
                <div style={{ width: '80%', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: "aliceblue", display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "2rem" }}>
                    {/* {
                        data.map((product) => {
                            return (
                                <div className="product-card">
                                    <img src={product.image} alt="" className="product-card__image" />
                                    <h2 className="product-card__name">{product.name}</h2>
                                    <p className="product-card__price">${product.price.toFixed(2)}</p>
                                    <p className="product-card__description">{product.description}</p>
                                    <button className="product-card__button" onClick={addToCartHandler(product.id.toString())}>Add to Cart</button>
                                </div>

                            )
                        })
                    } */}
                </div>
            </div>
        </div>
    )
}

export default Home