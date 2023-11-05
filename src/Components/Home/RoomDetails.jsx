import { useLoaderData } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import { getStoredProductData, saveProduct } from "../Utility/localStorage";
import Swal from "sweetalert2";
import ScrollToTop from "../ScrollToTop";
import { useNavigate, } from 'react-router-dom';
import { useState } from "react";

const RoomDetails = () => {
    const product = useLoaderData();
    console.log(product);
    const { _id, pricePerNight, title, imageURL, dateStates,
        name, brand, roomSize, reviews, bookingStatus,
        rating, option, description, image } = product;

        const { pricePerNight: initialPricePerNight } = product;

    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [pricePerDay, setPricePerDay] = useState(initialPricePerNight); // Set your default price per night here
    const [price, setPrice] = useState(0);

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
        setPrice(calculatedPrice);
    };

    // const idInt = parseInt(_id);
    const navigate = useNavigate();
    const handleClickOnAddToCart = () => {
        const storedProductIds = getStoredProductData();

        const myObject = product;
        const idArray = storedProductIds;

        if (idArray.includes(myObject._id)) {
            Swal.fire({
                title: 'Error!',
                text: 'You have already Booked this room',
                icon: 'error',
                confirmButtonText: 'Back'
            })
        } else {
            saveProduct(_id);
            Swal.fire(
                'Good job!',
                'Room Booked Successful',
                'success'
            )
        }

    }

    return (
        <div>
            <ScrollToTop />

            <div className="flex justify-center items-center w-full pb-5 px-10 mt-10 max-md:flex-col max-md:px-3">
                <div className="w-1/2 max-md:w-full flex justify-center items-center">
                    <img className="w-[80%]" src={imageURL} />
                </div>

                <div className="w-1/2 max-md:w-full flex flex-col gap-1">
                    <h2 className=" text-2xl font-semibold">{title}</h2>


                    <p className=" text-sm"><span className="font-bold">Room-Size: </span>{roomSize}</p>
                    <p className=" text-sm font-bold">Price Per Night: <span className="font-bold  text-red-600">${pricePerNight}</span>
                    </p>

                    <p className=" text-sm"><span className="font-bold">Description: </span>{description}</p>
                    <div className="flex gap-2">
                        <button onClick={handleClickOnAddToCart} className=" bg-red-500 text-white px-2 py-1 rounded-lg w-[30%] mt-4">Book Now</button>
                        <button onClick={() => navigate(-1)} className=" bg-red-500 text-white px-2 py-1 rounded-lg w-[30%] mt-4">Visit More</button>

                    </div>
                </div>
            </div>
            {/* Form for the booking rooms */}

            <form >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-10">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input type="text" placeholder="phone" className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    {/* <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required />
                    </div> */}
                    
                    <div className="form-control">
                            <label className="label">
                            <span className="label-text">Check-in Date:</span>
                        </label>
                            <input type="date" value={checkInDate} onChange={handleCheckInChange}  className="input input-bordered" required />
                            </div>
                    <div className="form-control">
                    <label className="label">
                            <span className="label-text">Check-out Date:</span>
                        </label>
                            
                            <input type="date" value={checkOutDate} onChange={handleCheckOutChange} className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                            <label className="label">
                            <span className="label-text">Total Price:</span>
                        </label>
                            <input type="number" className="input input-bordered" required
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

                        <hr />
                    </div>
                ))}


            </div>

        </div>
    );
};

export default RoomDetails;

//rating star code