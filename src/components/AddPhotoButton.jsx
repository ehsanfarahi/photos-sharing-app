import { useNavigate } from "react-router-dom";

// React Icons
import { FaPlus } from "react-icons/fa6";

const AddPhotoButton = () => {
    const navigate = useNavigate();
    
    return <div onClick={()=>navigate("/add-photo")} className="text-green-700 bg-green-200 hover:bg-green-300 p-2 rounded-full text-4xl fixed cursor-pointer bottom-[4rem] right-[2rem]"> 
        <FaPlus />
    </div>
}

export default AddPhotoButton;