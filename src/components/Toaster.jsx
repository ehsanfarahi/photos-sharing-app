// React Toastify
import { ToastContainer } from "react-toastify";

const Toaster = () => {
    return <ToastContainer
    position="top-center"
    autoClose={300}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover={false}
    theme="light"
    />
}

export default Toaster;