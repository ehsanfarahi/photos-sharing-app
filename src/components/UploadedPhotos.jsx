import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// React Icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { FcPicture } from "react-icons/fc";
import { FcStackOfPhotos } from "react-icons/fc";

// Components
import LoadingPage from "./LoadingPage";

const UploadedPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [photoId, setPhotoId] = useState("");
    const [fullPreview, setFullPreview] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const user = JSON.parse(localStorage.getItem("psUser"));

    useEffect(() => {
        getPhotos(); 
    }, [])

    async function getPhotos() {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`http://127.0.0.1:3001/photoUpload`);   
            
            if(!response.ok) throw new Error("Something went wrong while fetching data");

            const result = await response.json();

            const sortedData = result.sort((a,b) => {
                return new Date(b.date) - new Date(a.date);
            })

            setPhotos(sortedData); 

        } catch (error) {
            if(error.name !== "AbortError") {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function viewFull(id) {
        const response = await fetch(`http://127.0.0.1:3001/photoUpload?id=${id}`);

        const result = await response.json();
        setPhotoId(result); 
        setFullPreview(true); 
    }

    function handleDeleteIcon(id) {
        setDeleteMessage(true);
        setPhotoId(id);
    } 

    async function handleDelete() {
        await fetch(`http://127.0.0.1:3001/photoUpload/${photoId}`, {
            method: "delete"
        });

        setDeleteMessage(false);  
        getPhotos();
    }

    return <div className="px-4 mb-10 mt-4 w-[70%] md:w-[90%] sm:w-[100%] mx-auto">
        {error && <p>Error: {error}</p>}
        {loading && <LoadingPage/>}
        <div>
        <div className="mb-6 font-semibold">
<p className="text-lg sm:text-[1rem] font-bold text-green-800">Welcome {user && user.name} to our wedding ceremony!</p>
</div>
            <p className="font-semibold text-lg sm:text-[1rem] mb-2">My uploaded photos {photos.filter(fp => fp.userId === user?._id).length > 0 && <small>({photos.filter(fp => fp.userId === user?._id).length})</small>}</p>
            <div className="h-[.4rem] w-[6rem] bg-blue-400 rounded-lg opacity-80 sm:h-[.3rem] mb-8 sm:w-[5rem]"></div>
            <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-3">
               {photos.filter(fp => fp.userId === user?._id).length > 0 ? <>{photos?.filter(p => p.userId === user?._id)?.map(photo => photo.photo.map((pho, i) => {
                return (
                    <div key={i} className="relative">
                    <div className="absolute flex items-center text-4xl top-2 right-2">
                    <RiDeleteBin6Line onClick={()=>handleDeleteIcon(photo._id)} className="hover:bg-gray-300 cursor-pointer bg-white p-2 rounded-full" />
                    </div>
                    {
                        <img onClick={()=>viewFull(photo._id)} className="shadow w-full aspect-[5/4] cursor-pointer border border-green-100 rounded"  src={require("../uploads/" + pho)} alt="Wedding" />
                    }
                    
                    </div>
                )
               }))}</> : <NoUploadedPhotos/>}
            </div>
        </div>
        {deleteMessage && <DeleteMessage handleDelete={handleDelete} setDeleteMessage={setDeleteMessage} />}
        {fullPreview && <ImagePreview photo={photoId} setFullPreview={setFullPreview} />}
    </div>
}

export default UploadedPhotos;

function DeleteMessage({setDeleteMessage, handleDelete}) {
    return <div className="fixed top-0 right-0 bottom-0 left-0">
        <div onClick={()=>setDeleteMessage(false)} className="bg-black opacity-35 w-full h-full"></div>
        <div  className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  z-50">
    <div className="relative max-w-md h-full md:h-auto">
        
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button onClick={()=>setDeleteMessage(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
            <p className="mb-4 text-nowrap text-gray-500 dark:text-gray-300">Are you sure you want to delete this photo?</p>
            <div className="flex justify-center items-center space-x-4">
                <button onClick={()=>setDeleteMessage(false)} type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    No, cancel
                </button>
                <button onClick={handleDelete} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Yes, I'm sure
                </button>
            </div>
        </div>
    </div>
</div>
    </div>
}

function ImagePreview({photo, setFullPreview}) {
    return <div className="fixed top-0 right-0 bottom-0 left-0">
        <div onClick={()=>setFullPreview(false)} className="w-full h-full absolute bg-black opacity-70"></div>
        <div>
        <img className="w-[40%] sm:w-full md:w-[70%] aspect-auto absolute left-[50%] translate-x-[-50%] sm:left-0 md:left-[50%] sm:translate-x-0  md:translate-x-[-50%] sm:right-0 top-[50%] translate-y-[-50%]"  src={require("../uploads/" + photo.photo)} alt="Wedding" />
        </div>
    </div>
}


function NoUploadedPhotos() {
    const navigate = useNavigate();

    return <div className="absolute left-[50%] translate-x-[-50%] mt-20 md:mt-12 sm:mt-8 text-center flex flex-col items-center">
        <p className="flex items-center text-xl sm:text-[1.2rem] whitespace-nowrap">You have not uploaded any <FcStackOfPhotos className="mx-1 text-4xl" /> yet.</p>
        <p className="md:hidden sm:hidden">Click on the image below to add one!</p>
        <p className="hidden md:block sm:block md:text-lg md:mt-4">Tap on the image below to add one!</p>
        <FcPicture onClick={()=>navigate("/add-photo")} className="text-[12rem] cursor-pointer sm:text-[8rem] md:text-[10rem]" />
    </div> 
}