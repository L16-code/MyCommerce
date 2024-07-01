import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import { WithHeader } from './withHeader';
import Dashboard from '../components/dashboard/dashboard';
import CreateUsers from '../components/dashboard/users/CreateUsers';
import ShowUsers from '../components/dashboard/users/ShowUsers';
import Login from '../components/dashboard/auth/Login';
import ShowRoles from '../components/dashboard/roles/ShowRoles';
import { useSelector } from 'react-redux';
import { RootState } from '../state_management/store/store';
import PrivateRoute from './PrivateRoutes';
import permissions from './Permissions';
import AddRoles from '../components/dashboard/roles/AddRoles';

const PublicRoutes: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.root.isAuthenticated);

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
                {/* USERS ROUTES */}
                <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} requiredPermissions={permissions.users.CREATE_USER} />}
                >
                    <Route
                        path={routes.USERS_ADD}
                        element={<WithHeader component={CreateUsers} route={routes.USERS_ADD} isAuthenticated={isAuthenticated} />}
                    />
                </Route>
                <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} requiredPermissions={permissions.users.VIEW_USER} />}
                >
                    <Route
                        path={routes.USERS}
                        element={<WithHeader component={ShowUsers} route={routes.USERS} isAuthenticated={isAuthenticated} />}
                    />
                </Route>
                {/* END USERS ROUTES */}
                {/* ROLES ROUTES */}
                <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} requiredPermissions={permissions.roles.VIEW_ROLE} />}
                >
                    <Route
                        path={routes.ROLES}
                        element={<WithHeader component={ShowRoles} route={routes.ROLES} isAuthenticated={isAuthenticated} />}
                    />
                </Route>
                <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} requiredPermissions={permissions.users.VIEW_USER} />}
                >
                    <Route
                        path={routes.ROLES_ADD}
                        element={<WithHeader component={AddRoles} route={routes.ROLES_ADD} isAuthenticated={isAuthenticated} />}
                    />
                </Route>
                {/* END ROLES ROUTES */}
            </Routes>
        </div>
    );
};

export default PublicRoutes;
