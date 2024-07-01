const routes = {

    HOME: '/dashboard',
    LOGIN: '/login',
    REGISTER: "/register",
    MYPROFILE: '/profile',
    USERS: '/users',
    USERS_ADD: '/user_add',
    ROLES:'/roles',
    ROLES_ADD: '/roles_add',
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

]

export default routes;