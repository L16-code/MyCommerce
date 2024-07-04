import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import { WithHeader } from './withHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../state_management/store/store';
// import PrivateRoute from './PrivateRoutes';
import Home from '../components/user/Home';
import Login from '../components/user/auth/Login';
import Register from '../components/user/auth/Register';

const PublicRoutes: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.root.isAuthenticated);

    return (
        <div>
            <Routes>
                {/* START END-USERPANEL ROUTES */}
                <Route
                    path={routes.HOME}
                    element={<WithHeader component={Home} route={routes.HOME} isAuthenticated={isAuthenticated} />}
                />
                <Route
                    path={routes.LOGIN}
                    element={<WithHeader component={Login} route={routes.LOGIN} isAuthenticated={isAuthenticated} />}
                />
                <Route
                    path={routes.REGISTER}
                    element={<WithHeader component={Register} route={routes.REGISTER} isAuthenticated={isAuthenticated} />}
                />
                {/* END  END-USERPANEL ROUTES */}
            </Routes>
        </div>
    );
};

export default PublicRoutes;
