import { useContext, useEffect } from "react";
import { AuthContext } from "./Services/AuthProvider";
import { useState } from "react";
import ScrollToTop from "./ScrollToTop";
import { Link } from "react-router-dom";
import BookingDetailsCard from "./BookingDetailsCard";


const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user?.email}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [])

    {
        console.log(bookings);
    }


    return (
        <div>
            <h2 className="text-2xl text-center pt-5 font-semibold">Your Bookings Quantity: {bookings.length}</h2>
            <div className="max-w-[1200px] mx-auto p-4 flex flex-col gap-2">
                        {
                            bookings.map(booking => <BookingDetailsCard
                                key={booking._id}
                                booking={booking}
                                // handleDelete={handleDelete}
                                // handleBookingConfirm={handleBookingConfirm}
                            ></BookingDetailsCard>)
                        }
                   </div>
   


        </div>
    );
};

export default MyBookings;