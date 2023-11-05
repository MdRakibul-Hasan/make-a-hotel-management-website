import { useLoaderData } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import AvailableRooms from "../Home/AvailableRooms";

const Rooms = () => {
    const rooms = useLoaderData();
    console.log(rooms);
    const availableRooms = rooms.filter(room => room.bookingStatus === 'Available');

    return (
        <div><ScrollToTop />
       <div className="grid md:grid-cols-2 gap-6 mx-10 py-16">

{availableRooms.map(room => (
      <AvailableRooms key={room._id} room={room} />
    ))}
</div>
        </div>
    );
};

export default Rooms;