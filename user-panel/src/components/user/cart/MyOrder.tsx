import axios from "axios"
import { useSelector } from "react-redux";
import { RootState } from "../../../state_management/store/store";
import { useState } from "react";
import { GetOrderData } from "./CartInterface";

const MyOrder = () => {
    const user_detail = useSelector((state: RootState) => state.root.user);
    const AuthStr = 'Bearer '.concat(user_detail?.token as string);
    const [OrderData, setOrderData] = useState<GetOrderData[]>([]);
    const GetMyOrder=async()=>{
        await axios.get(`http://localhost:5000/get-order/${user_detail?.id}`, { headers: { Authorization: AuthStr } })
        .then(res => setOrderData(res.data.data))
    }
    return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ margin: "2rem", fontWeight: "bold" }}>MyOrders</h1>
            <div style={{ width: '80%', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: "aliceblue", display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "2rem" }}>
                {/* {myorders.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>You have no orders.</p>
                ) : (
                    myorders.map(order => (
                        <div key={order.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '15px', marginBottom: '15px' }}>
                            <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>Order #{order.id}</h2>
                            {order.items.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                                        <p style={{ margin: '0' }}>Price: ${item.price.toFixed(2)}</p>
                                        <p style={{ margin: '0' }}>Quantity: {item.quantity}</p>
                                    </div>
                                    <div>
                                        <p style={{ margin: '0', fontWeight: 'bold' }}>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                            <p style={{ textAlign: 'right', fontWeight: 'bold', marginTop: '10px' }}>
                                Order Total: ${order.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                            </p>
                        </div>
                    ))
                )} */}
            </div>
        </div>
    )
}

export default MyOrder