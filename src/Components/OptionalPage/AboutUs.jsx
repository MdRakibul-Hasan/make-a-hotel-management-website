import Helmet from 'react-helmet';
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    
    <div><Helmet><title>About Us</title></Helmet>
 <div className="pb-8 pt-6 mt-16 mb-4 px-12">
  <h2 className="text-3xl font-semibold mb-4">About Luxurious Hotel</h2>
  <p>
    Welcome to Luxurious Hotel, your premier destination for an unparalleled luxury experience. We pride ourselves on offering our guests a world-class stay in the heart of the city, complete with top-notch amenities and exceptional customer service.
  </p>
  <p>
    At Luxurious Hotel, we understand the importance of providing an unforgettable experience for our guests. Our mission is to ensure that every aspect of your stay, from the room service to the recreational facilities, exceeds your expectations and leaves you with cherished memories.
  </p>
  <h3 className="text-xl font-semibold mt-4">Our Services</h3>
  <ul className="list-disc pl-6 mt-2">
    <li>
      <strong>Luxurious Rooms:</strong> Indulge in our exquisitely designed and spacious rooms, each equipped with premium amenities and breathtaking views of the city skyline or scenic landscapes.
    </li>
    <li>
      <strong>Fine Dining:</strong> Delight your taste buds with our diverse selection of world-class cuisines, prepared by our expert chefs and served in an elegant and welcoming ambiance.
    </li>
    <li>
      <strong>Wellness and Relaxation:</strong> Rejuvenate your mind and body in our luxurious spa and wellness center, offering a range of revitalizing treatments and state-of-the-art facilities.
    </li>
    <li>
      <strong>Event Hosting:</strong> Host your special occasions and corporate events in our sophisticated and fully equipped event spaces, accompanied by our professional event planning and catering services.
    </li>
  </ul>
  <h3 className="text-xl font-semibold mt-4">Contact Us</h3>
  <p>
    Do you have any questions or require assistance with your reservation? Reach out to our dedicated customer support team at{' '}
    <a href="mailto:info@luxurioushotel.com" className="text-orange-600 hover:underline">
      info@luxurioushotel.com
    </a>
    . We are committed to ensuring that your stay with us is nothing short of extraordinary.
  </p>
  <p>
    Let Luxurious Hotel be your ultimate destination for an unforgettable experience, where luxury meets comfort and hospitality at its finest.
  </p>
</div>

    </div>
  );
};

export default AboutUs;
