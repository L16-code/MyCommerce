import Sidebar from "../sidebar";
import Navbar from "../navbar";
const AddRoles = () => {
    return (
        <div className="wrapper">
            <Sidebar isAuthenticated={true} />
            <div className="main">
                <Navbar />
                <main className="content">
                    <div className="container-fluid p-0">
                        <h1 className="h3 mb-3">Roles Page</h1>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Roles Add</h5>
                                    </div>
                                    <div className="card-body">
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

export default AddRoles