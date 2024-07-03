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
import ShowProductCategory from '../components/dashboard/product-category/ShowProductCategory';
import ShowProduct from '../components/dashboard/product/ShowProduct';
import AddProducts from '../components/dashboard/product/AddProducts';
import Home from '../components/user/Home';

const PublicRoutes: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.root.isAuthenticated);

    return (
        <div>
            <Routes>
                <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} requiredPermissions={permissions.users.CREATE_USER.name} />}
                >
                    <Route
                        path={routes.HOME}
                        element={<WithHeader component={Dashboard} route={routes.HOME} isAuthenticated={isAuthenticated} />}
                    />
                </Route>

                <Route
                    path={routes.LOGIN}
                    element={<WithHeader component={Login} route={routes.LOGIN} isAuthenticated={isAuthenticated} />}
                />
                {/* USERS ROUTES */}
                <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} requiredPermissions={permissions.users.CREATE_USER.name} />}
                >
                    <Route
                        path={routes.USERS_ADD}
                        element={<WithHeader component={CreateUsers} route={routes.USERS_ADD} isAuthenticated={isAuthenticated} />}
                    />
                </Route>
                <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} requiredPermissions={permissions.users.VIEW_USER.name} />}
                >
                    <Route
                        path={routes.USERS}
                        element={<WithHeader component={ShowUsers} route={routes.USERS} isAuthenticated={isAuthenticated} />}
                    />
                </Route>
                {/* END USERS ROUTES */}
                {/* ROLES ROUTES */}
                <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} requiredPermissions={permissions.roles.VIEW_ROLE.name} />}
                >
                    <Route
                        path={routes.ROLES}
                        element={<WithHeader component={ShowRoles} route={routes.ROLES} isAuthenticated={isAuthenticated} />}
                    />
                </Route>
                <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} requiredPermissions={permissions.roles.CREATE_ROLE.name} />}
                >
                    <Route
                        path={routes.ROLES_ADD}
                        element={<WithHeader component={AddRoles} route={routes.ROLES_ADD} isAuthenticated={isAuthenticated} />}
                    />
                </Route>
                {/* END ROLES ROUTES */}
                {/* PRODUCTS ROUTES */}
                <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} requiredPermissions={permissions.products.VIEW_PRODUCT.name} />}
                >
                    <Route
                        path={routes.PRODUCT_CATEGORY}
                        element={<WithHeader component={ShowProductCategory} route={routes.PRODUCT_CATEGORY} isAuthenticated={isAuthenticated} />}
                    />
                </Route>
                <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} requiredPermissions={permissions.products.VIEW_PRODUCT.name} />}
                >
                    <Route
                        path={routes.PRODUCTS}
                        element={<WithHeader component={ShowProduct} route={routes.PRODUCTS} isAuthenticated={isAuthenticated} />}
                    />
                </Route>
                <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} requiredPermissions={permissions.products.CREATE_PRODUCT.name} />}
                >
                    <Route
                        path={routes.PRODUCTS_ADD}
                        element={<WithHeader component={AddProducts} route={routes.PRODUCTS_ADD} isAuthenticated={isAuthenticated} />}
                    />
                </Route>
                {/* END PRODUCTS ROUTES */}

                
                {/* START END-USERPANEL ROUTES */}
                <Route
                    path={routes.USER_HOME}
                    element={<WithHeader component={Home} route={routes.USER_HOME} isAuthenticated={isAuthenticated} />}
                />
                {/* END  END-USERPANEL ROUTES */}
            </Routes>




        </div>
    );
};

export default PublicRoutes;
