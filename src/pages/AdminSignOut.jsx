import { useNavigate } from "react-router-dom";

const AdminSignOut = ({setHeaderUpdated}) => {

    const navigate = useNavigate(); 

  function handleSignOut() {
    setHeaderUpdated(prevState => !prevState);
    localStorage.removeItem("psAdminSigninData");
    navigate("/admin-signin"); 
  }

    return <div className="signout-container">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="signout-text">Sign out from admin's account</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <button onClick={handleSignOut} type="submit" className="signout-btn">Sign out</button>
    </div>
  </div>
  
}

export default AdminSignOut;