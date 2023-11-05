// import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AvailableRooms = ({room}) => {
    const {_id, title, pricePerNight, imageURL} = room;
    return (
        <div>
           <Link to={`/rooms/${_id}`}> <div className=" bg-slate-200 rounded-md flex flex-col justify-center"><img className="w-[100%] h-[60vh] rounded-t-md" src={imageURL} alt="" />
            <h2 className="text-center text-lg font-semibold">{title}</h2>
            <h2 className="text-center font-bold text-red-600">${pricePerNight}</h2>
            </div></Link>
        </div>
    );
};

export default AvailableRooms;