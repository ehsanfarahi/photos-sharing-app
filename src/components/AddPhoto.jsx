import { useState } from "react";
import { useNavigate } from "react-router-dom"

// React Toastify
import { ToastContainer, toast } from "react-toastify";

// React Icons
import { FaCheck } from "react-icons/fa6";
import { FcStackOfPhotos } from "react-icons/fc";

// Components
import Loading from "./Loading";
import GoBack from "./GoBack";

const AddPhoto = () => {
  const [uploadMessage, setUploadMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [error, setError] = useState("");

  const userId = JSON.parse(localStorage.getItem("psUser"))?._id;

  function handlePhotoChange(e) {
    const files = Array.from(e.target.files);
    setPhoto(files);
  } 

  async function handleSubmit(e) {
    e.preventDefault();
    try {
     if(photo.length > 0) {
      setLoading(true); 
  
      const formData = new FormData();  
  
      photo.forEach((photo) => {
        formData.append(`file`, photo); 
      }) 
     
      formData.append("userId", userId);  
  
  
      let response = await fetch(`http://127.0.0.1:3001/photoUpload`, { 
          method: "POST",
          body: formData, 
        });
  
        if(!response.ok) {
          throw new Error("Failed to upload photo")
        }
  
        const result = await response.json();
  
        if(result) {
          setUploadMessage(true);
          setLoading(false);
          setError("");
        }  
     } else {
      failedPhotoUploaded();
     }
    } catch (error){
      setError(error);
    }
  } 

  function failedPhotoUploaded()  {toast.warning("No photo selected");}

    return <div className="w-[70%] md:w-[90%] sm:w-full mx-auto mt-[2rem] sm:px-4 sm:mb-[7rem]">
     <GoBack/>
     {error && <p>Error: {error}</p>}
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white rounded mb-4">
     
      <div className="mb-4">
        <label className="block text-gray-700 text-xl md:text-lg sm:text-lg font-bold mb-2" htmlFor="username">
          Photo 
        </label>    
      
<div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
      
       <ClickToUploadIcon/>

        <input onChange={handlePhotoChange} multiple accept="image/*" id="dropzone-file" type="file" name="photo" className="hidden" />  
    </label> 
</div>   
      </div>
      
      <div className="">
        <button type="submit" className="bg-teal-600 hover:bg-teal-700 font-bold w-full py-1 sm:py-2 px-4 rounded flex text-xl md:text-lg sm:text-lg items-center justify-center focus:outline-none text-teal-100 focus:shadow-outline">
          {loading && <Loading/>} Upload
        </button>
        
      </div>
    </form>
    {uploadMessage && <UploadMessage loadingStyle="w-[1rem]" setPhoto={setPhoto} setUploadMessage={setUploadMessage} />}

<ToastContainer
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
  </div>
}

export default AddPhoto;

function ClickToUploadIcon() {
  return  <div className="flex flex-col items-center justify-center pt-5 pb-6">
  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
  </svg>
  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. any size)</p>
</div>
}


function UploadMessage({setUploadMessage, setPhoto}) {
  const navigate = useNavigate();


  function handleSeePhotos() {
    setUploadMessage(false);
    navigate("/");
  }

  function handleUploadMore() {
    setUploadMessage(false);
    setPhoto("");
  }

  return <div className="fixed top-0 right-0 bottom-0 left-0">
      <div onClick={()=>setUploadMessage(false)} className="bg-black opacity-35 w-full h-full"></div>
      <div  className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  z-50">
  <div className="relative max-w-md h-full md:h-auto">
      
      <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button onClick={()=>setUploadMessage(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
          </button>
          <FcStackOfPhotos className="w-11 h-11 mb-3.5 mx-auto" />
          <p className="mb-4 text-nowrap flex items-center text-green-600 dark:text-green-300"><FaCheck className="mr-2 text-lg" /> Photo uploaded successfully!</p>
          <div className="flex justify-center items-center space-x-4">
              <button onClick={handleSeePhotos} type="button" className="py-2 px-3 text-nowrap text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  See uploaded photos
              </button>
              <button onClick={handleUploadMore} type="submit" className="py-2 px-3 text-nowrap text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-900">
                  Upload more
              </button>
          </div>
      </div>
  </div>
</div>
  </div>
}