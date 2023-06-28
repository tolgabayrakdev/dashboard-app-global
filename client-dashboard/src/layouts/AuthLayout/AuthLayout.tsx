import { Outlet } from "react-router-dom"


export default function AuthLayout() {
    return (
        <>
            <h1>Burası Auth Layout</h1>
            <Outlet />
        </>
    )
}