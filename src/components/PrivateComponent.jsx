import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
    const getAdmin = localStorage.getItem("psAdminSigninData");

    return getAdmin ? <Outlet/> : <Navigate to="/admin-signin" />
}

export default PrivateComponent;