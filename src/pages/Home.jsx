import { useRef, useState } from "react";

// Components
import UploadedPhotos from "../components/UploadedPhotos";
import Loading from "../components/Loading";
import AddPhotoButton from "../components/AddPhotoButton";

const Home = () => {
    const [extendTerms, setExtendTerms] = useState(false);
    const [displayTerms, setDisplayTerms] = useState(true);

    const user = JSON.parse(localStorage.getItem("psUser"));


    return <div>
        {!user && displayTerms && <WelcomeContainer extendTerms={extendTerms} setExtendTerms={setExtendTerms} setDisplayTerms={setDisplayTerms} />}
        <UploadedPhotos/>
        <AddPhotoButton/> 
    </div>
}

export default Home;

function WelcomeContainer({extendTerms, setExtendTerms, setDisplayTerms}) {

    const [termsChecked, setTermsChecked] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");

    const checked = useRef();

    async function handleTerms() {
        setExtendTerms(false);
        setLoading(true);

        if(checked.current.value === "false") {
            setError(true)
        } else {
            setError(false)

            // const formData = new FormData();

            // formData.append("name", name); 
        
            let data = await fetch("http://127.0.0.1:3001/userUpload", { 
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name}),
              });   
        
              const result = await data.json();
              if(result) {
                setLoading(false);
                setDisplayTerms(false);
                localStorage.setItem("psUser", JSON.stringify(result))
              }  
        } 
    }
   
    return <div className="fixed transition-all z-10 inset-0 overflow-y-auto">
    <div className="flex items-center w-[30%] md:w-[50%] sm:w-[90%] mx-auto justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-black opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div className="sm:flex sm:items-start sm:justify-center">
                <div className="mt-3 text-center sm:mt-0 ">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Dear guest,
                    </h3>
                    <div className="mt-2">
                        <p className="text-sm leading-5 text-gray-500">
                            to continue, you must consent to our terms of use.
                        </p>
                        {error && <small className="text-red-500">You must check the agreement field</small>}
                    </div>
                </div>
            </div>
            <div className="mb-4 mt-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Name <small>(optional)</small>
      </label>
      <input onChange={(e)=>setName(e.target.value)}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" id="name" type="text" placeholder="Name" /> 
    </div>
    <div className=" mb-6">
    <div className="md:w-1/3"></div>
   <div className="flex items-center justify-start w-fit">
   <label className="md:w-2/3 text-gray-500 font-bold flex items-center">
      <input ref={checked} onChange={()=> {
        setTermsChecked(e=>!e);
        setError(false);
      }} value={termsChecked} className={`mr-2 leading-tight ${error && "outline outline-red-600"}`} type="checkbox"/>
      <span className="text-sm">
        Agree to
      </span>
    </label> <span onClick={()=> setExtendTerms(e=>!e)} className="text-blue-400 underline cursor-pointer whitespace-nowrap ml-1">terms of use</span>
   </div>
  </div>
  <div className={`${extendTerms ? "h-full" : "h-0 overflow-hidden"} transition duration-1000 ease-in-out`}>
    <ul className="list-disc pl-5">
    <li>Your photos will be shared with bride and groom's electronic album.</li>
    <li>Your photos might be kept as a memory.</li>
    <li>Your photos will be deleted from the database after bride and groom download them.</li>
    <li>Only bride, groom and admin have access to your shared photos.</li>
    <li>This is a family electronic album.</li>
    <li>By clicking on agree and continue, you consent to sharing your photos.</li>
    </ul>
  </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm ">
                    <button onClick={handleTerms} type="button"
                        className="justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-md sm:leading-5 flex items-center">
                        {loading && <Loading loadingStyle="py-0" />} Agree and continue
                    </button>
                </span>
                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                </span>
            </div>
        </div>
    </div>
</div>
}






