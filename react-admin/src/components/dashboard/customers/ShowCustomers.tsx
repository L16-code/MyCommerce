import Sidebar from "../sidebar";
import Navbar from "../navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../state_management/store/store";
import { useEffect, useState } from "react";
import { CustomerRead } from "./customersInterface";

const ShowCustomers = () => {
    const TOKEN = useSelector((state: RootState) => state.root.token);
    const [Customers, setCustomers] = useState<CustomerRead[]>([]);

    const ShowCustomersData = () => {
        axios.get('http://localhost:5000/user/customers-read', { headers: { Authorization: 'Bearer ' + TOKEN } })
            .then((res => {
                if (res.data.success) {
                    setCustomers(res.data.data);
                }
            }))
            .catch(error => {
                console.error("There was an error fetching the customers data!", error);
            });
    };

    useEffect(() => {
        ShowCustomersData();
    }, [TOKEN]);

    return (
        <div className="wrapper">
            <Sidebar isAuthenticated={true} />
            <div className="main">
                <Navbar />
                <main className="content">
                    <div className="container-fluid p-0">
                        <h1 className="h3 mb-3">Customers Page</h1>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Customers View</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1" style={{ width: "100%" }}>
                                            <div className="card flex-fill">
                                                <div className="table-responsive">
                                                    <table className="table table-hover my-0">
                                                        <thead>
                                                            <tr>
                                                                <th className="d-none d-xl-table-cell">Id</th>
                                                                <th className="d-none d-xl-table-cell">Name</th>
                                                                <th className="d-none d-xl-table-cell">Email</th>
                                                                <th className="d-none d-xl-table-cell">Dob</th>
                                                                <th className="d-none d-xl-table-cell">Gender</th>
                                                                <th className="d-none d-xl-table-cell">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Customers.map((customer, index) => {
                                                                const dateString = customer.dob;
                                                                const indexOfT = dateString.indexOf('T');
                                                                const dateWithoutTime = dateString.substring(0, indexOfT);
                                                                return (
                                                                    <tr key={customer._id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{customer.username}</td>
                                                                        <td>{customer.email}</td>
                                                                        <td>{dateWithoutTime}</td>
                                                                        <td>{customer.gender}</td>
                                                                        <td>
                                                                            {customer.status === "active" ? (
                                                                                <span className="badge bg-success">Active</span>
                                                                            ) : (
                                                                                <span className="badge bg-danger">Inactive</span>
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
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
    );
};

export default ShowCustomers;
