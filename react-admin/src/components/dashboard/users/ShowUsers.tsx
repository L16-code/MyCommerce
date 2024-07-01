import Sidebar from "../sidebar";
import Navbar from "../navbar";
// import '../../../../public/adminKit/js/app.js'

const ShowUsers = () => {
    return (
        <div className="wrapper">
            <Sidebar isAuthenticated={true} />
            <div className="main">
                <Navbar />
                <main className="content">
                    <div className="container-fluid p-0">
                        <h1 className="h3 mb-3">Users Page</h1>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">User View</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1" style={{width:"100%"}}>
                                            <div className="card flex-fill">
                                                <div className="card-header">
                                                    <button style={{
                                                        padding:"5px",
                                                        borderRadius:"5px",
                                                        border:"1px solid #000",
                                                        color:"#000",
                                                        backgroundColor:"green",
                                                    }}>Add User</button>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table table-hover my-0">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th className="d-none d-xl-table-cell">Email</th>
                                                                <th className="d-none d-xl-table-cell">Dob</th>
                                                                <th>Gender</th>
                                                                <th>Role</th>
                                                                <th className="d-none d-md-table-cell">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="d-none d-xl-table-cell">Project Apollo</td>
                                                                <td className="d-none d-xl-table-cell">01/01/2023</td>
                                                                <td className="d-none d-xl-table-cell">31/06/2023</td>
                                                                <td className="d-none d-xl-table-cell">31/06/2023</td>
                                                                <td><span className="badge bg-success">Male</span></td>
                                                                <td className="d-none d-md-table-cell">
                                                                    <button style={{
                                                                        padding:"5px",
                                                                        borderRadius:"5px",
                                                                        border:"1px solid #000",
                                                                        color:"#000",
                                                                        backgroundColor:"green",
                                                                    }}>Edit</button>
                                                                    <button style={{
                                                                        marginLeft:"5px",
                                                                        padding:"5px",
                                                                        borderRadius:"5px",
                                                                        border:"1px solid #000",
                                                                        color:"#000",
                                                                        backgroundColor:"red",
                                                                    }}>Delete</button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Project Fireball</td>
                                                                <td className="d-none d-xl-table-cell">01/01/2023</td>
                                                                <td className="d-none d-xl-table-cell">31/06/2023</td>
                                                                <td className="d-none d-xl-table-cell">31/06/2023</td>
                                                                <td><span className="badge bg-warning">Female</span></td>
                                                                <td className="d-none d-md-table-cell"><button style={{
                                                                        padding:"5px",
                                                                        borderRadius:"5px",
                                                                        border:"1px solid #000",
                                                                        color:"#000",
                                                                        backgroundColor:"green",
                                                                    }}>Edit</button>
                                                                    <button style={{
                                                                        marginLeft:"5px",
                                                                        padding:"5px",
                                                                        borderRadius:"5px",
                                                                        border:"1px solid #000",
                                                                        color:"#000",
                                                                        backgroundColor:"red",
                                                                    }}>Delete</button></td>
                                                            </tr>
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

export default ShowUsers