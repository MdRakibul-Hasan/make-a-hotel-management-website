import { useLoaderData } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import { getStoredProductData, saveProduct } from "../Utility/localStorage";
import Swal from "sweetalert2";
import ScrollToTop from "../ScrollToTop";
import { useNavigate, } from 'react-router-dom';
import { useContext, useState } from "react";
import { AuthContext } from "../Services/AuthProvider";

const RoomDetails = () => {
    const product = useLoaderData();
    console.log(product);
    const { _id, pricePerNight, title, imageURL, dateStates,
        name, brand, roomSize, reviews, bookingStatus,
        availability,
        rating, option, description, image } = product;

        const { pricePerNight: initialPricePerNight } = product;
        const {availability : availableRoom} = product;

    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [pricePerDay, setPricePerDay] = useState(initialPricePerNight); // Set your default price per night here
    const [price, setPrice] = useState(0);
    const [roomQuantity, setRoomQuantity] = useState(availableRoom);
    const {user} = useContext(AuthContext);

        const handleBookRoom = event =>{
            event.preventDefault();

            const form = event.target;
            const name = form.name.value;
            const phone = form.phone.value;
            const email = form.email.value;
            const roomName = form.room.value;
            const checkIn = form.checkin.value;
            const checkOut = form.checkout.value;
            const orderStatus = 'Active';

            const order = {
                customerName: name,
                email,
                phone,
                roomName,
                service_id: _id,
                price: price,
                checkInDate: checkIn,
                checkOutDate: checkOut,
                roomImage: imageURL,
                orderStatus,
                pricePerNight,
                roomQuantity,

            }

            
                  
// test

if (roomQuantity <= 0) {
    Swal.fire({
        title: 'Error!',
        text: 'Room is not Available, Already booked, check another Room',
        icon: 'error',
        confirmButtonText: 'Back',
        
    })
    return;
}  else {

    Swal.fire({
        title: "Are you sure?",
        text: `Room:${title}, Total Price: ${price}
        Date: From ${checkIn} to ${checkOut}, Description:${roomSize}` ,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Booking Now!"
      }).then((result) => {
        if (result.isConfirmed) {


    /////////////////////////////

    fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then(data => {    
        if(data.insertedId){
            setRoomQuantity(roomQuantity - 1);
            Swal.fire(
                'Good job!',
                'Room Booked Successful',
                'success'
            )
        }
    })
// update the availiblity
const currentRoom = (roomQuantity -1)
const newAvailablity = {currentRoom};

    fetch(`http://localhost:5000/rooms/${_id}`, {
        method: 'PUT',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(newAvailablity)
        
    })
    .then(res=> res.json())
    .then(data =>{
        console.log(data);
        console.log(`http://localhost:5000/rooms/${_id}`);
        if(data.modifiedCount > 0){
            // Swal.fire({
            //     title: 'Success!',
            //     text: 'Product Updated Successfully',
            //     icon: 'success',
            //     confirmButtonText: 'Ok'
            //   })
            console.log("Availablity modification done");
        }
    })

}


                });
 
            }

       
        }
    


        const handleCheckInChange = (event) => {
            // setCheckInDate(event.target.value);
            // updatePrice(event.target.value, checkoutDate);
            const selectedDate = new Date(event.target.value);
            const currentDate = new Date();
        
            if (selectedDate >= currentDate) {
                setCheckInDate(currentDate);
                updatePrice(event.target.value, checkOutDate);
            } else {
                const nextDate = new Date(currentDate);
                nextDate.setDate(currentDate.getDate() + 1); // Set to the next day
        
                const nextDateISO = nextDate.toISOString().split('T')[0];
                setCheckInDate(nextDateISO);
        
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please select a future date",
                
                  });
            }
    
    
    
        };

        const handleCheckOutChange = (event) => {
            const selectedDate = new Date(event.target.value);
            const currentDate = new Date();
        
            if (selectedDate >= currentDate) {
                setCheckOutDate(event.target.value);
                updatePrice(checkInDate, event.target.value);
            } else {
                const nextDate = new Date(currentDate);
                nextDate.setDate(currentDate.getDate() + 1); // Set to the next day
        
                const nextDateISO = nextDate.toISOString().split('T')[0];
                setCheckOutDate(nextDateISO);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please select a future date",
                
                  });
            }
    
    
        };

    const updatePrice = (checkIn, checkOut) => {
        const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const nights = Math.round(Math.abs((startDate - endDate) / oneDay));
        const calculatedPrice = pricePerDay * nights;
        setPrice(calculatedPrice);
        if(startDate === endDate){
            setPrice(pricePerNight);
        }
        
    };


    const navigate = useNavigate();




    return (
        <div>
            <ScrollToTop />

            <div className="flex justify-center mt-20 items-center w-full pb-5 px-10 max-md:flex-col max-md:px-3">
                <div className="w-1/2 max-md:w-full flex justify-center items-center">
                    <img className="w-[80%]" src={imageURL} />
                </div>

                <div className="w-1/2 max-md:w-full flex flex-col gap-1">
                    <h2 className=" text-2xl font-semibold">{title}</h2>


                    <p className=" text-sm"><span className="font-bold">Room-Size: </span>{roomSize}</p>
                    <p className=" text-sm font-bold">Price Per Night: 
                    <span className="font-bold  text-red-600">${pricePerNight}</span>
                    </p>
                    <p className=" text-sm font-bold">Availability:  
                    <span className="font-bold  text-red-600"> {roomQuantity}</span>
                    </p>

                    <p className=" text-sm"><span className="font-bold">Description: </span>{description}</p>
                    <div className="flex gap-2">
                        {/* <button onClick={handleClickOnAddToCart} className=" bg-red-500 text-white px-2 py-1 rounded-lg w-[30%] mt-4">Book Now</button> */}
                        <button onClick={() => navigate(-1)} className=" bg-red-500 text-white px-2 py-1 rounded-lg w-[30%] mt-4">Visit More</button>

                    </div>
                </div>
            </div>
            {/* Form for the booking rooms */}

            <form onSubmit={handleBookRoom} >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-10">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name"
                        defaultValue={user?.displayName} placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input type="text" name="phone" placeholder="phone" className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email"
                        defaultValue={user?.email} placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Room Name</span>
                        </label>
                        <input type="text" name="room" value={title} readOnly className="input input-bordered" required />
                    </div>
                    
                    <div className="form-control">
                            <label className="label">
                            <span className="label-text">Check-in Date:</span>
                        </label>
                            {/* <input type="date" name="checkin" 
                            value={checkInDate} onChange={handleCheckInChange} 
                            className="input input-bordered" required /> */}
                            <input
                            type="date"
                            name="checkin"
                            defaultValue={checkInDate}
                            onChange={handleCheckInChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="input input-bordered"
                            required
                        />
                            </div>
                    <div className="form-control">
                    <label className="label">
                            <span className="label-text">Check-out Date:</span>
                        </label>
                            
                            {/* <input type="date" name="checkout" value={checkOutDate}
                             onChange={handleCheckOutChange} 
                             className="input input-bordered" required/> */}
                              <input
                            type="date"
                            name="checkout"
                            defaultValue={checkOutDate}
                            onChange={handleCheckOutChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="input input-bordered"
                            required
                        />
                            </div>
                            <div className="form-control">
                            <label className="label">
                            <span className="label-text">Total Price:</span>
                        </label>
                            <input type="number" name="price" className="input input-bordered" required 
                            
                        value={price} readOnly onChange={(e) => setPricePerDay(parseInt(e.target.value) || 0)} />
                            </div>
                </div>
                <div className="form-control mt-6 mx-10">
                    <input className="btn btn-primary btn-block" type="submit" value="Book Now" />
                </div>
            </form>



            {/* Review services */}
            <div className="flex flex-col gap-1 mx-4 md:mx-10">
                <p className=" text-sm"><span className="font-bold text-lg">Review: </span></p>
                <hr />
                {reviews.map((review, index) => (
                    <div key={index}>

                        <p>{review.name}</p>

                        <div className="flex">
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;

                                return (
                                    <label key={index}>
                                        <FaStar
                                            className="star"
                                            color={ratingValue <= review.rating ? '#ffc107' : '#e4e5e9'}
                                            size={14}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                        <p>{review.comment}</p>
                        <p>{review.timestamp}</p>

                        <hr />
                    </div>
                ))}


            </div>

        </div>
    );
};

export default RoomDetails;

//rating star code
