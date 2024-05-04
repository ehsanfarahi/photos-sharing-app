import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import LoadingPage from "../components/LoadingPage";

const AdminSignIn = ({setHeaderUpdated}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
     
    try {
      let response = await fetch("http://127.0.0.1:3001/admin-signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if(!response.ok) {
      throw new Error("Failed to sign in")
    }

    const result  = await response.json();
    
    if(result) {
      navigate("/admin-all-photos");
      setHeaderUpdated(prevState => !prevState);
      setLoading(false);
    }

    localStorage.setItem("psAdminSigninData", JSON.stringify(result)); 

    const redirectUrl = sessionStorage.getItem("redirectUrl");
    if(redirectUrl) {
      sessionStorage.removeItem("redirectUrl");
      window.location.href = redirectUrl;
    } else {
      window.location.href = "/";
    }
    } catch(error) {
      setError(error);
    }
  }

    return <div className="flex w-[25%] md:w-[40%] sm:w-[95%] mx-auto min-h-full flex-col justify-center px-6 py-1 lg:px-8">
      {error & <p>Error: {error}</p>}
      {loading && <LoadingPage/>}
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-teal-800">Sign in to admin's account</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-teal-800">Email address</label>
          <div className="mt-2">
            <input onChange={(e)=>setEmail(e.target.value)} id="email" name="email" type="email" required className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-teal-800">Password</label>
           
          </div>
          <div className="mt-2">
            <input onChange={(e)=>setPassword(e.target.value)} id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">Sign in</button>
        </div>
      </form>
    </div>
  </div>
  
}

export default AdminSignIn;