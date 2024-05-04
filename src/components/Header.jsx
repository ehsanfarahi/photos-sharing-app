import { useEffect, useState } from "react";

// Components
import LoadingPage from "./LoadingPage";

const Header = ({headerUpdated}) => {
    const [data, setData] = useState([]);
    const [photo, setPhoto] = useState("");
    const [uploadBtn, setUploadbtn] = useState(false);
    const [mainPhoto, setMainPhoto] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [loadingPhoto, setLoadingPhoto] = useState(false);

    useEffect(() => {
        async function getData() {
           try {
            setLoading(true);

            const response = await fetch(`http://127.0.0.1:3001/partyInfoUpload`);

            if(!response.ok) {
                throw new Error("Failed to fetch data")
            }

            const result = await response.json();

            setData(result.at(0));
            setLoading(false);
           } catch(error) {
            setError(error);
           }
        }

        headerUpdated && getData();
    }, [headerUpdated])
 
    useEffect(() => {
      async function getData() {
          const response = await fetch(`http://127.0.0.1:3001/mainPhotoUpload`);

          const result = await response.json();

          setMainPhoto(result.at(0));
      } 

      headerUpdated && getData();
  }, [headerUpdated]) 


    function formatedDate(dateFormat) {
        const date = new Date(dateFormat);
    
        const yyyy = date.getFullYear();
        const mm = date.getMonth() + 1;
        const dd = date.getDate();
    
        return `${dd}/${mm}/${yyyy}`;
      }

      function currentDate() {
        const date = new Date();
    
        const yyyy = date.getFullYear();
        const mm = date.getMonth() + 1;
        const dd = date.getDate();
    
        return `${dd}/${mm}/${yyyy}`;
      }

      const adminId = JSON.parse(localStorage.getItem("psAdminSigninData"))?._id;

      async function handleSubmit(e) {
        e.preventDefault();

       try {
        setLoadingPhoto(true);
        const formData = new FormData();   
 
        formData.append("file", photo);
        formData.append("adminId", adminId); 

    let response = await fetch(`http://127.0.0.1:3001/mainPhotoUpload/660fffb4bead7a9a08a71657`, { 
        method: "PUT",  
        body: formData, 
      }); 

      if(!response.ok) {
        throw new Error("Failed to update photo")
      }

      const result = await response.json();
      if(result) {
       setUploadbtn(false);  
       setLoadingPhoto(false);
      }  
       } catch(error) {
        setError(error)
       }
    } 

    const getAdmin = localStorage.getItem("psAdminSigninData")?.length;

    return <div className="bg-green-100 w-full">
        {error && <p>Error: {error}</p>}
        {loading && <LoadingPage/>}
        <div className="w-[70%] md:w-[95%] sm:w-[100%] mx-auto">
            <div className="py-6 mx-4">
                <div className="flex items-center relative">
                    <label htmlFor={getAdmin > 0 ? "photo" : ""}>{loadingPhoto ? <LoadingPage/> : <img onClick={()=>setUploadbtn(getAdmin > 0 && true)} className="rounded-full border-4 w-[7rem] h-[7rem] cursor-pointer border-green-200" src={mainPhoto ? require("../uploads/" + mainPhoto?.photo) : require("../images/bride-groom-cartoon.jpg")} alt="bride and groom"/>}</label>
                   <form onSubmit={handleSubmit}  encType="multipart/form-data" >
                   <input className="hidden" accept="image/*" type="file" id="photo" name="photo" onChange={(e)=>setPhoto(e.target.files[0])}  /> 
                   {uploadBtn && <button type="submit" className="rounded-full border-4 w-[7rem] h-[7rem] border-green-300 absolute left-0 top-0 bg-green-200 hover:bg-green-300"><span className="flex flex-col items-center font-semibold text-teal-700"><span>Upload</span> <span>photo</span></span></button>}
                   </form> 
                   

                    <div className="ml-6">
                    <h3 className="text-3xl text-green-800 font-semibold">{data?.name1 ? data?.name1 : "Bride"} & {data?.name2 ? data?.name2 : "Groom"}</h3>
                    <p className="pt-2 text-green-900 text-[.8rem] font-semibold">{data?.dateOfParty ? formatedDate(data?.dateOfParty) : currentDate()} - {data?.address ? data?.address : "Burgauerstr. 41, 81929 Munch"}</p>
                </div>
                </div>
                
            </div> 
        </div>
        <MovingHeader data={data} />
    </div>
}

export default Header;

function MovingHeader({data}) {
    return <div className="w-full bg-teal-600 shadow text-white uppercase px-2">
      <div className="px-8 w-[69%] md:w-[90%] sm:w-[97%] mx-auto flex flex-nowrap whitespace-nowrap overflow-x-hidden">
      <p className="moving-headline-text flex text-start py-1">{data?.message ? data?.message : "Groom and Bride heartfully welcome you to their wedding. Thank you for making this cermony so amazing and wonderful. We hope you enjoy your stay. Please enjoy the music and dances."}</p>
      </div>
    </div> 
}