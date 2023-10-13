import { Route, Routes } from "react-router-dom"
import AddClient from "../views/AddClient"
import AddAction from "../views/AddAction"
import Login from "../views/Login"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/add-client" element={<AddClient />} />
            <Route path="/add-action" element={<AddAction />} />
        </Routes>
    )
}

export default AppRoutes;