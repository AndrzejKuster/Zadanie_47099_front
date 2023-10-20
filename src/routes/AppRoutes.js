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
            <Route path="/clients/*">
                <Route index element={<ClientsList />} />
                <Route path="edit/:clientId/*">
                    <Route index element={<EditClient />} />
                    <Route path="actions/*">

                        <Route path="add" element={<AddAction />} />
                    </Route>
                </Route>
                <Route path="add" element={<AddClient />} />
            </Route>

        </Routes>
    )
}

export default AppRoutes;