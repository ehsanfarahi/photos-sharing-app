import { useState, useEffect } from "react";

// React Toastify
import { ToastContainer, toast } from 'react-toastify';

// Components
import LoadingPage from "../components/LoadingPage";


const Admin = ({setHeaderUpdated}) => {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [dateOfParty, setDateOfParty] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const [getPartyInfo, setGetPartyInfo] = useState([]);

    const adminId = JSON.parse(localStorage.getItem("psAdminSigninData"))?._id;

    async function handleSubmit(e) {
        e.preventDefault();
       try {
        setHeaderUpdated(false);
        setLoading(true);
     

    let response = await fetch(`http://127.0.0.1:3001/partyInfoUpload/660f3343a5fd6699574474f0`, { 
        method: "put",  
        body: JSON.stringify({
          name1,
          name2, 
          dateOfParty, 
          address,
          message,
          adminId,
        }),
        headers: { "Content-Type": "application/json" },
      }); 

      if(!response.ok) {
        throw new Error("Failed to update data");
      }

      const result = await response.json();
      if(result) {
        setLoading(false);
        setHeaderUpdated(true);
        dataUpdated();
      }  
       } catch(error) {
        setError(error);
       }
    }

    useEffect(()=> {
      async function getData() {
       try {
        setLoading(true);

        const response = await fetch(`http://127.0.0.1:3001/partyInfoUpload`);

        if(!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json(); 
       if(result) {
        setGetPartyInfo(result.at(0));
        setName1(result.at(0).name1);
        setName2(result.at(0).name2);
        setDateOfParty(result.at(0).dateOfParty);
        setAddress(result.at(0).address);
        setMessage(result.at(0).message);
        setLoading(false);
       }
       } catch(error) {
        setError(error);
       }
      }
      getData();  
    }, [])


    function formatedDate(dateFormat) {
    const date = new Date(dateFormat);

    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    return `${dd}/${mm}/${yyyy}`;
  }

  function dataUpdated()  {toast.success("Data updated successfully!");}


    return <div className="sm:w-[90%] mb-[6rem] md:w-[50%] w-[25%]  mx-auto mt-8">
     
     {loading ? <LoadingPage/> : <>
     <p className="text-center font-semibold text-lg pb-2">Updating information</p>

{error && <p>Error: {error}</p>}

 <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 sm:px-4 pt-6 pb-8 mb-4 border-t-2 border-gray-100">

 <div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name1">
  Bride's Name
</label>
<input defaultValue={getPartyInfo.name1} onChange={e=>setName1(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name1" type="text" placeholder="Enter name" />
</div>






<div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name2">
  Groom's Name
</label>
<input defaultValue={getPartyInfo.name2} onChange={e=>setName2(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name2" type="text" placeholder="Enter name" />
</div>

<div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
  Date of ceremony
</label>
<div className="flex">
  <input value={formatedDate(getPartyInfo.dateOfParty)} disabled className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
<input value={getPartyInfo.dateOfParty} onChange={e=>setDateOfParty(e.target.value)} className="shadow appearance-none border w-[15%] rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date" />
</div> 
</div>

<div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
  Address
</label>
<input defaultValue={getPartyInfo.address} onChange={e=>setAddress(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="Enter address of ceremony" />
</div>

<div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name1">
  Message
</label>
<textarea defaultValue={getPartyInfo.message} onChange={e=>setMessage(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-40 leading-tight focus:outline-none focus:shadow-outline" id="name1" placeholder="Enter message" />
</div> 


<div>
<button className="w-full bg-teal-600 font-semibold text-lg text-teal-100 py-2 rounded" type="submit">Submit</button>
</div>


 

 </form>

 <ToastContainer
position="top-center"
autoClose={400}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss={false}
draggable={false}
pauseOnHover={false}
theme="light"
/>
     </>}
       
    </div>
}

export default Admin;