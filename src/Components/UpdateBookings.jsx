import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "./Services/AuthProvider";
import Swal from "sweetalert2";


const UpdateBookings = () => {
    const booking = useLoaderData();
    const { _id, roomName,email,
        pricePerNight, price, checkInDate, roomQuantity, orderStatus,
        checkOutDate, roomImage, phone, customerName } = booking;

    const {  pricePerNight: initialPricePerNight  } = booking;
    const { roomQuantity: availableRoom } = booking;

    const [checkinDate, setCheckInDate] = useState(checkInDate);
    const [checkoutDate, setCheckOutDate] = useState("");
    const [pricePerDay, setPricePerDay] = useState(initialPricePerNight); // Set your default price per night here
    const [prices, setPrices] = useState(price);
    const [roomQuantitynow, setRoomQuantitynow] = useState(availableRoom);
    const { user } = useContext(AuthContext);
    const [emailnow, setEmailnow] = useState(email);


    const handleUpdateBookRoom = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const roomName = form.room.value;
        const checkIn = form.checkin.value;
        const checkOut = form.checkout.value;
        const emailValue = form.email.value;
        setEmailnow(emailValue);

        const updateBooking = {
            customerName: name,
            email,
            phone,
            roomName,
            service_id: _id,
            price: prices,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            roomImage: roomImage,

        }
        // send update data to the backend
        fetch(`http://localhost:5000/bookings/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateBooking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Updated Success!",
                        text: "Your bookings has been updated.",
                        icon: "success"
                    });
                }
            })
    }


    const handleCheckInChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const currentDate = new Date();
    
        if (selectedDate >= currentDate) {
            setCheckInDate(event.target.value);
            updatePrice(event.target.value, checkoutDate);
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
            updatePrice(checkinDate, event.target.value);
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
        setPrices(calculatedPrice);
        if(startDate === endDate){
            setPrices(pricePerNight);
        }

    };

    // /////////// cancel operation /////////////////////



    const handleCancelBooking = () => {
        const currentDate = new Date();
        const checkinDate2 = new Date(checkinDate);
    
        const timeDifference = checkinDate2.getTime() - currentDate.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);
    
        if (daysDifference > 1) {
            const updateBooking = {
                customerName: customerName,
                email: emailnow,
                phone: phone,
                roomName: roomName,
                service_id: _id,
                price: prices,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                roomImage: roomImage,
                orderStatus: 'Cancelled'
            };
    
            // send update data to the backend
            fetch(`http://localhost:5000/bookings/${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updateBooking)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Cancelled Success!",
                        text: "Your bookings have been cancelled.",
                        icon: "success"
                    });
                }
            });
    
            console.log('Booking cancellation successful.');
        } else {
            console.log('Sorry, you can only cancel your booking 1 day prior to the check-in date.');
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You can cancel it before 1 day of the check-in date",
            });
            return;
        }
    };







        // send update data to the backend

    //     const handleCancelBooking = () => {
    //     const currentDate = new Date();
    //     const checkinDate2 = new Date(checkinDate); // Use the correct state variable name
    
    //     const timeDifference = checkinDate2.getTime() - currentDate.getTime();
    //     const daysDifference = timeDifference / (1000 * 3600 * 24);
        
    //     const updateBooking = {

    //         orderStatus: 'Cancelled'
    //                 }

    //     if (daysDifference > 1) {
    //         // Implement cancellation logic here        
    //             // send update data to the backend
    //             fetch(`http://localhost:5000/bookings/${_id}`, {
    //                 method: 'PUT',
    //                 headers: {
    //                     'content-type': 'application/json'
    //                 },
    //                 body: JSON.stringify(updateBooking)
    //             })
    //                 .then(res => res.json())
    //                 .then(data => {
    //                     console.log(data);
    //                     if (data.modifiedCount > 0) {
    //                         Swal.fire({
    //                             title: "Cancelled Success!",
    //                             text: "Your bookings has been cancelled.",
    //                             icon: "success"
    //                         });
    //                     }
    //                 })
            
     
    //         console.log('Booking cancellation successful.');
    //     } else {
    //         console.log('Sorry, you can only cancel your booking 1 days prior to the check-in date.');
    //         Swal.fire({
    //             icon: "error",
    //             title: "Oops...",
    //             text: "You can cancel it before 1 day of check in date",
            
    //           });
    //           return;
            
    //     }

    // }

    
   

// ///////////////////////cancel booking end/////////

  

    return (
        <div>
            <h2 className=" text-2xl mt-14 font-semibold text-center
            p-8">Update Booking Information</h2>

            <form onSubmit={handleUpdateBookRoom} >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-10">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name"
                            defaultValue={customerName} placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input type="text" name="phone" defaultValue={phone} placeholder="phone" className="input input-bordered" required />

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
                        <input type="text" name="room" defaultValue={roomName} className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Check-in Date:</span>
                        </label>
                        {/* <input type="date" name="checkin" defaultValue={checkInDate} onChange={handleCheckInChange}  className="input input-bordered" required /> */}
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

                        {/* <input type="date" name="checkout" defaultValue={checkOutDate} onChange={handleCheckOutChange} className="input input-bordered" required />
                         */}
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

                            value={prices} readOnly onChange={(e) => setPricePerDay(parseInt(e.target.value) || 0)} />
                    </div>
                </div>
                <div className="form-control mt-6 mx-10">
                    <input className="btn btn-primary btn-block" type="submit" value="Update" />
                </div>
            </form>

            <div className="pt-8 pb-20 mx-10">
                <h2 className=" text-center text-base font-semibold pb-2">Do you want to cancel the Booking?</h2>
                <button onClick={handleCancelBooking} className="bg-red-500 hover:bg-red-700 flex justify-center items-center px-4 py-3 
                text-base font-medium w-full mx-auto text-center text-white 
                rounded-md">CANCEL MY BOOKING</button>

            </div>
            
        </div>
    );
};

export default UpdateBookings;