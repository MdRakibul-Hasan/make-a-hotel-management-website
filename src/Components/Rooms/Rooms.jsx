import { useLoaderData } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import AvailableRooms from "../Home/AvailableRooms";
import { Helmet } from "react-helmet";

const Rooms = () => {
    const rooms = useLoaderData();
    console.log(rooms);
    const availableRooms = rooms.filter(room => room.bookingStatus === 'Available');

    return (
        <div><ScrollToTop /><Helmet><title>Rooms</title></Helmet>
       <div className="grid md:grid-cols-2 mt-14 gap-6 mx-10 py-16">

{availableRooms.map(room => (
      <AvailableRooms key={room._id} room={room} />
    ))}
</div>
        </div>
    );
};

export default Rooms;