const routes = {

    HOME: '/admin/dashboard',
    LOGIN: '/admin/login',
    REGISTER: "/admin/register",
    MYPROFILE: '/admin/profile',
    USERS: '/admin/users',
    USERS_ADD: '/admin/user_add',
    ROLES:'/admin/roles',
    ROLES_ADD: '/admin/roles_add',
    PRODUCT_CATEGORY: '/admin/product_category',
    PRODUCTS: '/admin/products',
    PRODUCTS_ADD: '/admin/products_add',
}


export const beforeLoginRoutes = [
    routes.LOGIN,
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

]

export default routes;