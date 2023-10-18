import { Route, Routes } from "react-router-dom"
import AddClient from "../views/AddClient"
import AddAction from "../views/AddAction"
import Login from "../views/Login"
import ClientsList from "../views/ClientsList"
import EditClient from "../views/EditClient"

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path="/" element={<Login user={props.user} setUser={props.setUser} />} />
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/add-client" element={<AddClient />} />
            <Route path="/add-action" element={<AddAction />} />
            <Route path="/edit-client/:clientId" element={<EditClient />} />
        </Routes>
    )
}

export default AppRoutes;