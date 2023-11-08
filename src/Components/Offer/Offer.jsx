import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from "react-parallax";


const Offer = () => {
    const [days, setDays] = useState(1);
    const [hours, setHours] = useState(22);
    const [minutes, setMinutes] = useState(24);
    const [seconds, setSeconds] = useState(49);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
          // Update the countdown values
          if (seconds > 0) {
            setSeconds(seconds - 1);
          } else if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else if (days > 0) {
            setDays(days - 1);
            setHours(23);
            setMinutes(59);
            setSeconds(59);
          } else {
            // Countdown has reached zero, you can handle this case as needed
            clearInterval(countdownInterval);
          }
        }, 1000);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(countdownInterval);
      }, [days, hours, minutes, seconds]);


    return (
<Parallax strength={600} bgImage="https://ebook.projectbd.com/wp-content/uploads/2023/11/home-image-3.jpg">
<div className='pb-10'>
            
            <div><h2 className="text-center italic font-bold text-4xl pt-20 pb-2 text-white">30% OFF</h2>        
            </div>
            <div><h2 className="text-center font-extrabold text-3xl pt-2 pb-4 text-white">Grab Your Offer Before It's Gone!</h2>        
            </div>

<div className="flex justify-center pb-8">
<div className="grid grid-flow-col gap-5 text-center auto-cols-max text-white">
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl text-white">
          <span style={{ "--value": days }}>{days}</span>
        </span>
        days
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl text-white">
          <span style={{ "--value": hours }}>{hours}</span>
        </span>
        hours
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl text-white">
          <span style={{ "--value": minutes }}>{minutes}</span>
        </span>
        min
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl text-white">
          <span style={{ "--value": seconds }}>{seconds}</span>
        </span>
        sec
      </div>
    </div>
</div>
<div className="flex justify-center items-center">
              <Link to="/rooms">
              <button className="mt-2 px-5 py-2 border-2 rounded-md text-white 
              text-center">Grab Now</button>
              </Link>
              </div>
{/* <div className='flex justify-center pb-16'>
    <Link to="/event"><button className="bg-blue-600 text-white text-lg py-2 px-4 rounded-lg hover:bg-blue-800"> Make Event</button></Link>
</div> */}

        </div>
</Parallax>
    );
};

export default Offer;