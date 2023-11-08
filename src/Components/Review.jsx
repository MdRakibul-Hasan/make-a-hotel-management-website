import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "./Services/AuthProvider";
import Swal from "sweetalert2";

const Review = () => {
    const { user } = useContext(AuthContext);
    const room = useLoaderData();
const name = `${user?.displayName}`;

    const { id } = useParams();
    const [username, setUsername] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

   
    const addReview = event => {
        event.preventDefault();
        const reviewData = { username, rating, comment };
        console.log(reviewData);

        fetch(`https://ass11-hotel-server1.vercel.app/rooms/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Review added:', data);
                Swal.fire(
                        'Thank you!',
                        'Your Review Added Successfully',
                        'success'
                            )
            })
            .catch(error => {
                console.error('Error adding review:', error);
                
            });
    };

    return (
        <div>
            <h2 className=" text-center mt-20 font-semibold pb-4 pt-2 
            text-lg">Leave Comment & Review below</h2>
            <div className="max-w-[500px] mx-auto px-10 pb-8">
            <form onSubmit={addReview}>
                <div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name"
                            onChange={(e) => setUsername(e.target.value)} placeholder="Username"
                            required
                            defaultValue={user?.displayName} className="resize border rounded-md focus:outline-none 
                            focus:ring-2 focus:ring-slate-400 focus:border-transparent
                            w-full px-3 py-2 placeholder-gray-400 text-gray-700
                                bg-white text-sm shadow-md" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Comment</span>
                        </label>

                        <textarea
                            className="resize border rounded-md focus:outline-none 
                            focus:ring-2 focus:ring-slate-400 focus:border-transparent
                            w-full px-3 py-2 placeholder-gray-400 text-gray-700
                                bg-white text-sm shadow-md"
                            placeholder="Comment" onChange={(e) => setComment(e.target.value) & setUsername(name)}
                            required rows={5}
                        />
                        
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="Rating"
                        className="resize border rounded-md focus:outline-none 
                            focus:ring-2 focus:ring-slate-400 focus:border-transparent
                            w-full px-3 py-2 placeholder-gray-400 text-gray-700
                                bg-white text-sm shadow-md"
                        required
                    />
                    </div>
                    <div className="form-control mt-6 mx-auto">
                    <input className="btn btn-primary btn-block" type="submit" 
                    value="SUBMIT REVIEW" />
                </div>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Review;