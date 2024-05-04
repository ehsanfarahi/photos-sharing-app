import { useNavigate } from "react-router-dom"

// React Icons
import { FaArrowLeftLong } from "react-icons/fa6";

const GoBack = () => {
    const navigate = useNavigate();

    return  <p onClick={()=>navigate(-1)} className="flex items-center cursor-pointer font-semibold mb-10"><FaArrowLeftLong className="text-xl mr-2" /> Go back</p>
}

export default GoBack;