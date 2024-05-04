import { useState } from "react";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// React Icons
import { TfiMenu } from "react-icons/tfi";
import { IoHome } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";

// Pages
import Admin from "./pages/Admin";
import AdminSignIn from "./pages/AdminSignIn";
import AdminAllPhotos from "./pages/AdminAllPhotos";
import AdminSignOut from "./pages/AdminSignOut";
import ShareApp from "./pages/ShareApp";

// Components
import Header from "./components/Header"; 
import Home from "./pages/Home";
import AddPhoto from "./components/AddPhoto";
import Footer from "./components/Footer";
import PrivateComponent from "./components/PrivateComponent";

// React Toastify
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const adminSignedIn = localStorage.getItem("psAdminSigninData");

  const [headerUpdated, setHeaderUpdated] = useState(true);

  return ( 
    <div>
      <Header headerUpdated={headerUpdated} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add-photo" element={<AddPhoto/>} />
          <Route path="/admin-signin" element={<AdminSignIn setHeaderUpdated={setHeaderUpdated} />} />
          <Route path="/admin-signout" element={<AdminSignOut setHeaderUpdated={setHeaderUpdated} />} />
          <Route element={<PrivateComponent/>}>
          <Route path="/admin-all-photos" element={<AdminAllPhotos/>} />
          <Route path="/admin" element={<Admin setHeaderUpdated={setHeaderUpdated} />} />
          </Route>
          <Route path="/share-app" element={<ShareApp/>} />
        </Routes>
        <Menu adminSignedIn={adminSignedIn} />
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;


function Menu({adminSignedIn}) {

  const [addOpenClass, setAddOpenClass] = useState(false);

  const navigate = useNavigate();

  return <div className="h-[12rem] w-[12rem] rounded-full bg-green-100 fixed bottom-[-4.3rem] left-[-6rem]">
      <div id="container">
  <div id="corner" className="absolute left-[6.5rem] bottom-[1rem] h-auto w-auto">
  <TfiMenu onClick={()=>setAddOpenClass(e=>!e)} className="mainbtn text-2xl cursor-pointer text-green-800" />
    </div>
</div>

<div className='circle-container text-green-700'>
<IoHome onClick={()=>{
  adminSignedIn?.split(",").length > 0 ? navigate("/admin-all-photos") : navigate("/");
  setAddOpenClass(false)
}} className={`deg0 icon ${addOpenClass && "open"}`} />
<IoMdSettings onClick={()=>{
  navigate("/admin");
  setAddOpenClass(false);
  sessionStorage.setItem("redirectUrl", window.location.href);
}} className={`deg30 icon ${addOpenClass && "open"}`} />
<FaUser onClick={()=>{
  if(adminSignedIn) {
    navigate("/admin-signout");
  } else {
    navigate("/admin-signin");
  }
  setAddOpenClass(false);
}} className={`deg60 icon ${addOpenClass && "open"}`} />
<FaShareAlt onClick={()=>{
  navigate("/share-app");
  setAddOpenClass(false);
}} className={`deg90 icon ${addOpenClass && "open"}`} /> 
</div>
  </div>
} 