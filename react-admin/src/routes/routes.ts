const routes = {

    HOME: '/dashboard',
    LOGIN: '/login',
    REGISTER: "/register",
    MYPROFILE: '/profile',
    USERS: '/users',
    USERS_ADD: '/user_add'
}


export const beforeLoginRoutes = [
    routes.HOME,
    routes.LOGIN,
]
export const AfterLoginRoutes = [
    routes.HOME,
    routes.MYPROFILE,
    routes.USERS,
    routes.USERS_ADD,
]

export default routes;