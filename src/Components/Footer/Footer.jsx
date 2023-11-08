import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer className="footer p-10 bg-slate-950 text-base-content">
  <aside>
    <img className="w-[30%]" src="https://ebook.projectbd.com/wp-content/uploads/2023/11/hotel-logo.png" alt="" />
    <p className=" text-white text-sm font-bold "> LUXURIOUS LIMITED &copy;2023 <br/>
    <span className=" text-white text-sm font-normal ">Enjoy Your Stay</span></p>
  </aside> 
  <nav>
    <header className="footer-title text-white">Services</header> 

    
    <Link to="/login"><a className="link link-hover text-white">Login</a></Link> 
    <Link to="/register"><a className="link link-hover text-white">Register</a></Link> 
    {/* <Link to="/myCart"><a className="link link-hover text-white">My Cart</a></Link>  */}
    
  </nav> 
  <nav>
    <header className="footer-title text-white">Company</header> 
    <Link to="/about-us"><a className="link link-hover text-white">About us</a></Link> 
    {/* <Link to="/login"><a className="link link-hover text-white">Contact</a></Link>  */}
    <Link to="/rooms"><a className="link link-hover text-white">Rooms</a></Link> 
    
  </nav> 
  <nav>
    <header className="footer-title text-white">Legal</header> 
    <Link to="/terms"><a className="link link-hover text-white">Terms of use</a></Link> 
    <Link to="/privacy"><a className="link link-hover text-white">Privacy policy</a></Link> 
    
  </nav>
</footer>
    );
};

export default Footer;