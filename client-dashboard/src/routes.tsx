import { Navigate, useRoutes } from "react-router-dom";
import NotFound from "./views/NotFound";
import { lazy } from "react";

const FullLayout = lazy(() => import("./layouts/FullLayout/FullLayout"))
const AuthLayout = lazy(() => import("./layouts/AuthLayout/AuthLayout"))


const Dashboard = lazy(() => import("./views/Dashboard/Dashboard"))
const Login = lazy(() => import("./views/Auth/Login"))



export default function Router() {
    const routes = useRoutes([
        {
            path: "/dashboard",
            element: <FullLayout />,
            children: [
                { element: <Navigate to="/dashboard/app" />, index: true },
                { path: "app", element: <Dashboard /> }
            ]
        },
        {
            path: "/auth",
            element: <AuthLayout />,
            children: [
                { path: "login", element: <Login /> }
            ]
        },
        {
            path: "*",
            element: <NotFound />
        }
    ])
    return routes
}