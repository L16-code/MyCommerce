const routes = {
    ROOT:'/',
    HOME: '/admin/dashboard',
    LOGIN: '/admin/login',
    REGISTER: "/admin/register",
    MYPROFILE: '/admin/profile',
    USERS: '/admin/users',
    USERS_ADD: '/admin/user_add',
    USERS_EDIT: '/admin/user_edit',
    ROLES:'/admin/roles',
    ROLES_ADD: '/admin/roles_add',
    PRODUCT_CATEGORY: '/admin/product_category',
    PRODUCTS: '/admin/products',
    PRODUCTS_ADD: '/admin/products_add',
    PRODUCTS_EDIT: '/admin/products_edit',

}


export const beforeLoginRoutes = [
    routes.LOGIN,
    routes.ROOT
]
export const AfterLoginRoutes = [
    routes.HOME,
    routes.MYPROFILE,
    routes.USERS,
    routes.USERS_ADD,
    routes.ROLES,
    routes.ROLES_ADD,
    routes.PRODUCT_CATEGORY,
    routes.PRODUCTS,
    routes.PRODUCTS_ADD,
    routes.PRODUCTS_EDIT,
    routes.USERS_EDIT
]

export default routes;