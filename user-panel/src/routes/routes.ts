const routes = {
    HOME:'/',
    LOGIN:'/login',

}


export const beforeLoginRoutes = [
    routes.LOGIN,
]
export const AfterLoginRoutes = [
    routes.HOME,
]

export default routes;