import { Link } from "react-router-dom"
import routes from "../../routes/routes"

const Navbar = () => {
    const isAuthenticated=false
    return (
        <nav>
            <Link to="/">Home</Link>
            {isAuthenticated &&
                <>
                    <Link to="/profile">Profile</Link>
                    <Link to="/myorders">MyOrders</Link>
                    <Link to="/cart">Cart</Link>

                </>
            }
            {isAuthenticated ? <Link to="/" onClick={() => { }}>Logout</Link> : <Link to={routes.USER_LOGIN}>Login</Link>}

        </nav>
    )
}

export default Navbar