import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import { WithHeader } from './withHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../state_management/store/store';
// import PrivateRoute from './PrivateRoutes';
import Home from '../components/user/Home';

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
                {/* END  END-USERPANEL ROUTES */}
            </Routes>
        </div>
    );
};

export default PublicRoutes;
