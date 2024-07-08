import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../state_management/store/store";
import { useEffect, useState } from "react";
import { AddAddressData, GetCheckoutData } from "./CartInterface";
import Modal from "../../commonComponents/modal";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes/routes";
const schema = yup.object().shape({
    pin: yup.number().required("pin is required"),
    house_no: yup.string().required("House Number is required"),
    state: yup.string().required("state is required"),
    city: yup.string().required("city is required"),
});
const Checkout = () => {
    const naviagte=useNavigate();
    const user_detail = useSelector((state: RootState) => state.root.user);
    const AuthStr = 'Bearer '.concat(user_detail?.token as string);
    const [checkoutData, setCheckoutData] = useState<GetCheckoutData[]>([]);
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const GetCheckout = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/get-order/${user_detail?.id}`, { headers: { Authorization: AuthStr } });
            setCheckoutData(res.data.data);
        } catch (error) {
            console.error("Error fetching checkout data", error);
        }
    };
    useEffect(() => {
        GetCheckout();
    }, [user_detail]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AddAddressData>({
        resolver: yupResolver(schema),

    });
    const onSubmit = async (data: AddAddressData) => {
        try {
            const res = await axios.post(`http://localhost:5000/add-address`, data, { headers: { Authorization: AuthStr } });
            if (res.data.success === true) {
                reset();
                closeModal();
                const Order_data={
                    user_id: user_detail?.id,
                    total_price: checkoutData.reduce((acc, item) => acc + item.total_price, 0),
                }
                await axios.post(`http://localhost:5000/add-order`, Order_data, { headers: { Authorization: AuthStr } })
                .then(res=>{
                    if(res.data.success === true) {
                        toast.success('Your Order Has been Placed Successfully', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        naviagte(routes.MYORDERS)
                    }
                })
                ;
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ margin: "2rem", fontWeight: "bold" }}>Checkout</h1>
            <div style={{ width: '50%', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: "aliceblue", display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "2rem" }}>
                <div className="cart-items">
                    {checkoutData.map(item => (
                        <div key={item._id} className="cart-item" >
                            <img src={item.image} alt={item.name} />
                            <div className="cart-item-details">
                                <h2>{item.name}</h2>
                                <p>Total Price: ${item.total_price}</p>
                                <p>Total Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <h3>Total: ${checkoutData.reduce((acc, item) => acc + item.total_price, 0)}</h3>
                    <button onClick={openModal} style={{ backgroundColor: "green", padding: "4px" }}>Place Order</button>
                </div>
            </div>
            <div>
                <Modal show={showModal} onClose={closeModal}>
                    <h2>Add Address</h2>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '80%', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }} noValidate>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="pin" style={{ display: 'block', marginBottom: '5px' }}>pin</label>
                            <input
                                {...register('pin')}
                                id="pin"
                                type="number"
                                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                            />
                            {errors.pin && <p style={{ color: 'red', marginTop: '5px' }}>{errors.pin.message}</p>}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="state" style={{ display: 'block', marginBottom: '5px' }}>state</label>
                            <input
                                {...register('state')}
                                id="state"
                                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                            />
                            {errors.state && <p style={{ color: 'red', marginTop: '5px' }}>{errors.state.message}</p>}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="city" style={{ display: 'block', marginBottom: '5px' }}>city</label>
                            <input
                                {...register('city')}
                                id="city"
                                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                            />
                            {errors.city && <p style={{ color: 'red', marginTop: '5px' }}>{errors.city.message}</p>}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="house_no" style={{ display: 'block', marginBottom: '5px' }}>Address</label>
                            <input
                                type="text"
                                {...register('house_no')}
                                id="house_no"
                                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                            />
                            {errors.house_no && <p style={{ color: 'red', marginTop: '5px' }}>{errors.house_no.message}</p>}
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#556cd6', color: '#fff', border: 'none', borderRadius: '5px' }}>Purchase</button>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default Checkout;
