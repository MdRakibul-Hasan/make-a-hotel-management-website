import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "./Services/AuthProvider";


const UpdateBookings = () => {
const booking = useLoaderData();
const {_id, roomName, price, checkInDate,
    checkOutDate, roomImage, phone} = booking;

    const { price: initialPrice } = booking;
    const {availability : availableRoom} = booking;

const [checkinDate, setCheckInDate] = useState("");
const [checkoutDate, setCheckOutDate] = useState("");
const [pricePerDay, setPricePerDay] = useState(initialPrice); // Set your default price per night here
const [prices, setPrices] = useState(0);
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

        const order = {
            customerName: name,
            email,
            phone,
            roomName,
            service_id: _id,
            price: price,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            roomImage: roomImage,

        }
    }

    
    const handleCheckInChange = (event) => {
        setCheckInDate(event.target.value);
        updatePrice(event.target.value, checkOutDate);
    };

    const handleCheckOutChange = (event) => {
        setCheckOutDate(event.target.value);
        updatePrice(checkInDate, event.target.value);
    };

    const updatePrice = (checkIn, checkOut) => {
        const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const nights = Math.round(Math.abs((startDate - endDate) / oneDay));
        const calculatedPrice = pricePerDay * nights;
        setPrices(calculatedPrice);
        if(startDate === endDate){
            setPrices(prices);
        }
        
    };

    return (
        <div>
            
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
                        <input type="text" name="room" value={roomName} readOnly className="input input-bordered" required />
                    </div>
                    
                    <div className="form-control">
                            <label className="label">
                            <span className="label-text">Check-in Date:</span>
                        </label>
                            <input type="date" name="checkin" value={checkInDate} onChange={handleCheckInChange}  className="input input-bordered" required />
                            </div>
                    <div className="form-control">
                    <label className="label">
                            <span className="label-text">Check-out Date:</span>
                        </label>
                            
                            <input type="date" name="checkout" value={checkOutDate} onChange={handleCheckOutChange} className="input input-bordered" required/>
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

        </div>
    );
};

export default UpdateBookings;