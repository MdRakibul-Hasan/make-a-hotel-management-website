import { useContext, useEffect } from "react";
import { AuthContext } from "./Services/AuthProvider";
import { useState } from "react";
import ScrollToTop from "./ScrollToTop";
import { Link } from "react-router-dom";
import BookingDetailsCard from "./BookingDetailsCard";
import Swal from "sweetalert2";
import axios from "axios";


const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `https://ass11-hotel-server1.vercel.app/bookings?email=${user?.email}`
    useEffect(() => {

        axios.get(url, {withCredentials: true})
        .then(res => {
            setBookings(res.data);
        })


        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => setBookings(data))
 }, []);


 const handleDelete = id =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

          fetch(`https://ass11-hotel-server1.vercel.app/bookings/${id}`,{
            method: 'DELETE'
          })
          .then(res=> res.json())
          .then(data => {
            if(data.deletedCount > 0){
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                console.log(data);
                const remaining = bookings.filter(booking => booking._id !== id);
                setBookings(remaining);
            }

          })

        }
      });
}

// const handleUpdate = id => {
//     fetch(`https://ass11-hotel-server1.vercel.app/bookings/${id}`, {
//         method: 'PATCH',
//         headers:{
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify({status: 'confirm'})
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         if(data.modifiedCount > 0){
//             console.log('update a dhukse');
//         }
//     })
// }




    return (
        <div>
            <h2 className="text-2xl text-center mt-14 pt-5 font-semibold">Your Bookings Quantity: {bookings.length}</h2>
            <div className="max-w-[1200px] mx-auto p-4 flex flex-col gap-2">
                        {
                            bookings.map(booking => <BookingDetailsCard
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                // handleUpdate={handleUpdate}
                            ></BookingDetailsCard>)
                        }
                   </div>
   


        </div>
    );
};

export default MyBookings;