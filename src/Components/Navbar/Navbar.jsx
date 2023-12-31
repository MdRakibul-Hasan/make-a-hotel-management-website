import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Services/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

    const {user, logOut} = useContext(AuthContext);

    

const handleSignOut = () => {
  logOut()
  .then(result => {
    const notify2 = () => toast.success('Your Log Out is Successful', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  console.log(result.user);
  notify2();
  })
  .catch()

  // akahne task baki amar optional
}

const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };




    return (
<div>
<ToastContainer />

<nav className=" bg-slate-950 bg-opacity-100 fixed w-full z-20 top-0">
      <div className="container mx-auto py-2">
        <div className="flex items-center justify-between">
         
          <div> <Link to="/"><img className="w-[30%]" src="https://ebook.projectbd.com/wp-content/uploads/2023/11/hotel-logo.png" alt="" /></Link> </div>

         
          <div className="hidden md:flex space-x-4">

          <NavLink to="/" className={({isActive, isPending}) =>
isPending ? "pending" : isActive ? "text-orange-500 font-bold" : "text-white"}>Home</NavLink>
          <NavLink to="/rooms" className={({isActive, isPending}) =>
isPending ? "pending" : isActive ? "text-orange-500 font-bold" : "text-white"}>Rooms</NavLink>

            {/* <NavLink to="/addProduct" className={({isActive, isPending}) =>
isPending ? "pending" : isActive ? "text-orange-600 font-bold" : "text-black"}>Add Product</NavLink>
                        
            <NavLink to="/bookings" className={({isActive, isPending}) =>
isPending ? "pending" : isActive ? "text-orange-600 font-bold" : "text-black"}>My Cart</NavLink> */}
{
  user?.email ?
  <NavLink to="/bookings" className={({isActive, isPending}) =>
isPending ? "pending" : isActive ? "text-orange-500 font-bold" : "text-white"}>My Bookings</NavLink>
  : ""
}
          </div>

 

<div className="flex justify-center items-center mx-1 max-md:hidden">
{
 user ? 
 <img className=" bg-white rounded-full w-[6vh] mx-1" src={user.photoURL} alt="" />
 
    :
 <img className=" bg-white rounded-full w-[6vh] mx-1" src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg" alt="" />

 }

{/* {
 user ? 
 <h2 className="text-black text-xs">{user.displayName}</h2>
    :
    <h2 className="text-black text-xs">No User</h2>

 } */}





</div>


         
          {
 user ? 
<Link onClick={handleSignOut} to="/" className="hidden md:block bg-orange-600 text-white py-1 px-3 rounded-lg mt-1 hover:bg-orange-700">Log Out</Link>
    :
 <Link to="/login" className="hidden md:block bg-orange-600 text-white py-1 px-3 rounded-lg mt-1 hover:bg-orange-700">Login</Link>

 }

         
  <div className="md:hidden mr-3">
    <button
      onClick={toggleMobileMenu}
      className="text-white focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
        viewBox="0 0 24 24" stroke="currentColor"
      >
        <path
          strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </div>
</div>


        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="max-md:mx-3">
        <NavLink to="/" className={({isActive, isPending}) =>
isPending ? "pending" : isActive ? "text-orange-600 font-bold" : "text-white"}>Home</NavLink>
<br />
<NavLink to="/rooms" className={({isActive, isPending}) =>
isPending ? "pending" : isActive ? "text-orange-500 font-bold" : "text-white"}>Rooms</NavLink>
<br />
            {/* <NavLink to="/addProduct" className={({isActive, isPending}) =>
isPending ? "pending" : isActive ? "text-orange-600 font-bold" : "text-black"}>Add Product</NavLink>
   <br />                     
            <NavLink to="/myCart" className={({isActive, isPending}) =>
isPending ? "pending" : isActive ? "text-orange-600 font-bold" : "text-black"}>My Cart</NavLink> */}



<div className="flex my-2">
{
 user ? 
 <img className=" bg-white rounded-full w-[6vh] mx-1" src={user.photoURL} alt="" />
 
    :
 <img className=" bg-white rounded-full w-[6vh] mx-1" src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg" alt="" />

 }

{/* {
 user ? 
 <h2 className="text-black text-xs">{user.displayName}</h2>
    :
    <h2 className="text-black text-xs">No User</h2>

 } */}



</div>
{
  user?.email ?
  <NavLink to="/bookings" className={({isActive, isPending}) =>
isPending ? "pending" : isActive ? "text-orange-500 font-bold" : "text-white"}>My Bookings</NavLink>
  : ""
}

<br />
<br />
          {
 user ? 
<Link onClick={handleSignOut} to="/login" className="bg-white text-black py-1 px-4 rounded-lg mt-2 hover:bg-slate-300">Log Out</Link>
    :
 <Link to="/login" className="bg-white text-black py-1 px-4 rounded-lg mt-2 hover:bg-slate-300">Login</Link>

 }


        </div>

        </div>
      </div>
    </nav>




</div>




    )};
 

export default Navbar;