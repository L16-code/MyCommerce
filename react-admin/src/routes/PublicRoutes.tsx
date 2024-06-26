import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Home from '../components/home/Home';
import routes from './routes';
// import PrivateRoutes from './PrivateRoutes';
import { WithHeader } from './withHeader';
import Dashboard from '../components/dashboard/dashboard';
import CreateUsers from '../components/dashboard/users/CreateUsers';
import ShowUsers from '../components/dashboard/users/ShowUsers';
import Login from '../components/dashboard/auth/Login';
// import profile from '../components/profile/Profile';
// import Register from '../components/auth/Register';
// import { RootState } from '../state_Management/store/store';
// import { useSelector } from 'react-redux';



const PublicRoutes: React.FC = () => {
    // const isAuthenticated = useSelector((state: RootState) => state.root.isAuthenticated);
    const isAuthenticated = true;
    // const disptach = useDispatch()
    // const LogoutHandler = () => {
    //   disptach(logOutAction())
    // }
    return (
        <div>
            <Routes>
                <Route
                    path={routes.HOME}
                    element={<WithHeader component={Dashboard} route={routes.HOME} isAuthenticated={isAuthenticated} />}
                />
                <Route
                    path={routes.LOGIN}
                    element={<WithHeader component={Login} route={routes.LOGIN} isAuthenticated={isAuthenticated} />}
                />
                <Route
                    path={routes.USERS_ADD}
                    element={<WithHeader component={CreateUsers} route={routes.USERS_ADD} isAuthenticated={isAuthenticated} />}
                />
                <Route
                    path={routes.USERS}
                    element={<WithHeader component={ShowUsers} route={routes.USERS} isAuthenticated={isAuthenticated} />}
                />
                {/* <Route
                    element={<PrivateRoutes isAuthenticated={isAuthenticated} />}
                > */}
                {/* <Route
                        path={routes.MYORDERS}
                        element={<WithHeader component={MyOrders} route={routes.MYORDERS} isAuthenticated={isAuthenticated} />}
                    /> */}
                {/* <Route
                        path={routes.MYPROFILE}
                        element={<WithHeader component={profile} route={routes.MYPROFILE} isAuthenticated={isAuthenticated} />}
                    /> */}
                {/* </Route> */}
                {/* <Route
          path={routes.MYORDERS}
          element={<WithHeader component={MyOrders} route={routes.MYORDERS} isAuthenticated={isAuthenticated} onLogout={LogoutHandler } />}
        />
        <Route
          path={routes.MYPROFILE}
          element={<WithHeader component={profile} route={routes.MYPROFILE} isAuthenticated={isAuthenticated} onLogout={LogoutHandler } />}
        /> */}
            </Routes>
        </div>
    );
};

export default PublicRoutes;
