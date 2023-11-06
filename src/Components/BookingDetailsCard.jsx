import { Link } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";


const BookingDetailsCard = ({booking}) => {
    const {_id, roomName, price, checkInDate,
        checkOutDate, roomImage, phone} = booking;
    return (
        <div><ScrollToTop />
        

<div className=" max-md:flex-col max-md:items-center flex justify-between bg-slate-100 rounded-lg p-3">
            <img className="w-[150px] rounded-lg" src={roomImage}/>
            <h2 className=" text-sm font-bold text-center">Booking Room <br /> <span className=" text-xs font-normal pt-4 flex flex-col justify-center items-center max-md:pt-0 max-md:pb-3"> {roomName}</span></h2>
            <h2 className=" text-sm font-bold text-center">Check-In-Date <br /> <span className=" text-xs font-normal pt-4 flex flex-col justify-center items-center max-md:pt-0 max-md:pb-3">{checkInDate}</span></h2>
            <h2 className=" text-sm font-bold text-center">Check-Out-Date <br /> <span className=" text-xs font-normal pt-4 flex flex-col justify-center items-center max-md:pt-0 max-md:pb-3">{checkOutDate}</span></h2>
            <h2 className=" text-sm font-bold text-center">Price <br /> <span className=" text-xs font-normal pt-4 flex flex-col justify-center items-center max-md:pt-0 max-md:pb-3">{price}</span></h2>
            <h2 className=" text-sm font-bold text-center">Phone <br /> <span className=" text-xs font-normal pt-4 flex flex-col justify-center items-center max-md:pt-0 max-md:pb-3">{phone}</span></h2>
            
            <div className="flex flex-col justify-center items-center gap-1">
            <button className=" bg-red-500 hover:bg-red-700 flex justify-center
            items-center px-4 py-2 text-sm font-medium w-full
            text-center text-white rounded-md">Delete</button>
            <button className=" bg-red-500 hover:bg-red-700 flex justify-center
            items-center px-4 py-2 text-sm font-medium w-full
            text-center text-white rounded-md">Update Date</button>
            <button className=" bg-red-500 hover:bg-red-700 flex justify-center
            items-center px-4 py-2 text-sm font-medium w-full 
            text-center text-white rounded-md">Review</button>
            </div>


        </div>
</div>

    


        
    );
};

export default BookingDetailsCard;