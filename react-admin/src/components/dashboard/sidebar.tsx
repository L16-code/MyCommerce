// import {User} from 'feather-icons'
import { FaUsers, FaSuitcaseRolling, FaUserClock } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import routes from "../../routes/routes";
import '../../../public/adminKit/js/app.js'
import { useSelector } from "react-redux";
import { RootState } from "../../state_management/store/store.js";
import { permissionData } from "../../interfaces/authInterface.js";
interface SidebarProps {
    isAuthenticated: boolean;
}
const sidebar: React.FC<SidebarProps> = () => {
    const navigate = useNavigate()
    const permissions = useSelector((state: RootState) => state.root.permission)
    let PermissionString = "";
    permissions.forEach((items: any) => {
        items.forEach((item: permissionData) => {
            PermissionString += item.name + " ";
        });
    });
    return (
        <nav id="sidebar" className="sidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
                <a className="sidebar-brand" href="index.html">
                    <span className="align-middle">AdminKit</span>
                </a>
                <ul className="sidebar-nav">
                    <li className="sidebar-header">Pages</li>
                    <li className="sidebar-item ">
                        <a className="sidebar-link" onClick={() => {
                            navigate(routes.HOME)
                        }}>
                            <i className="align-middle" />{<span>{<FaUserClock />}</span>}
                            <span className="align-middle">Dashboard</span>
                        </a>
                    </li>

                    {/* User Module */}
                    {
                        PermissionString.includes("user") &&
                        <li className="sidebar-item active" >
                            <a className="sidebar-link" onClick={() => {
                                navigate(routes.USERS)
                            }}>
                                <i className="align-middle" />{<span>{<FaUsers />}</span>}
                                <span className="align-middle">Users</span>
                            </a>
                        </li>
                    }
                    {/* roles Module */}

                    {
                        PermissionString.includes("roles") &&
                        <li className="sidebar-item " >
                            <a className="sidebar-link" onClick={() => {
                                navigate(routes.ROLES)
                            }}>
                                <i className="align-middle" />{<span>{<FaSuitcaseRolling />}</span>}
                                <span className="align-middle">Roles</span>
                            </a>
                        </li>
                    }
                    {/* Employee Module */}

                    {
                        PermissionString.includes("employee") &&
                        <li className="sidebar-item " >
                            <a className="sidebar-link" onClick={() => {
                                navigate(routes.ROLES)
                            }}>
                                <i className="align-middle" />{<span>{<FaSuitcaseRolling />}</span>}
                                <span className="align-middle">Employees</span>
                            </a>
                        </li>
                    }
                </ul>
            </div>
        </nav>

    )
}

export default sidebar