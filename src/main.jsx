import React from 'react'
import ReactDOM from 'react-dom/client'
import Register from './Components/Services/Register/Register.jsx';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LayOut from './Components/LayOut.jsx';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Services/Login/Login.jsx';
import AuthProvider from './Components/Services/AuthProvider.jsx';
import ProtectedRoute from './Components/Services/ProtectedRoute/ProtectedRoute.jsx';
import AboutUs from './Components/OptionalPage/AboutUs.jsx';
import TermsAndConditions from './Components/OptionalPage/TermsAndConditions.jsx';
import PrivacyPolicy from './Components/OptionalPage/PrivacyPolicy.jsx';
import ErrorPage from './Components/Error/ErrorPage.jsx';
import AddProduct from './Components/AddProduct.jsx';
import UpdateProduct from './Components/UpdateProduct.jsx';
import MyCart from './Components/MyCart.jsx';
import Apple from './Components/Brand/Apple.jsx';
import Google from './Components/Brand/Google.jsx';
import Intel from './Components/Brand/Intel.jsx';
import Samsung from './Components/Brand/Samsung.jsx';
import Sony from './Components/Brand/Sony.jsx';
import Lenovo from './Components/Brand/Lenovo.jsx';
import RoomDetails from './Components/Home/RoomDetails.jsx';
import Rooms from './Components/Rooms/Rooms.jsx';
import MyBookings from './Components/MyBookings.jsx';
import UpdateBookings from './Components/UpdateBookings.jsx';
import Review from './Components/Review.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut></LayOut>,
    errorElement: <ErrorPage></ErrorPage>,

    children:[
      {
        path: '/',
        element: <Home></Home>,
        // loader: ()=>fetch('/data.json')

      },
      {
        path: '/rooms/:id',
        element: <ProtectedRoute> <RoomDetails></RoomDetails></ProtectedRoute>,
        loader: ({params})=>fetch(`https://ass11-hotel-server1.vercel.app/rooms/${params.id}`),
        
      },
      {
        path: 'bookings',
        element: <ProtectedRoute><MyBookings></MyBookings></ProtectedRoute>,
        
        
      },
      {
        path: '/updateBookings/:id',
        element: <ProtectedRoute><UpdateBookings></UpdateBookings></ProtectedRoute>,
        loader: ({params})=>fetch(`https://ass11-hotel-server1.vercel.app/bookings/${params.id}`),
        
      },
      {
        path: '/review/:id',
        element: <UpdateBookings><Review></Review></UpdateBookings>,
        loader: ({params})=>fetch(`https://ass11-hotel-server1.vercel.app/rooms/${params.id}`),
        
      },

      {
        path: '/Apple',
        element: <Apple></Apple>,
        loader: ()=>fetch('https://ass11-hotel-server1.vercel.app/product'),
        
      },
      {
        path: '/rooms',
        element: <Rooms></Rooms>,
        loader: ()=>fetch('https://ass11-hotel-server1.vercel.app/rooms'),
        
      },
      {
        path: '/Google',
        element: <Google></Google>,
        loader: ()=>fetch('https://ass11-hotel-server1.vercel.app/product'),
        
      },
      {
        path: '/Intel',
        element: <Intel></Intel>,
        loader: ()=>fetch('https://ass11-hotel-server1.vercel.app/product'),
        
      },
      {
        path: '/Samsung',
        element: <Samsung></Samsung>,
        loader: ()=>fetch('https://ass11-hotel-server1.vercel.app/product'),
        
      },
      {
        path: '/Sony',
        element: <Sony></Sony>,
        loader: ()=>fetch('https://ass11-hotel-server1.vercel.app/product'),
        
      },
      {
        path: '/Lenovo',
        element: <Lenovo></Lenovo>,
        loader: ()=>fetch('https://ass11-hotel-server1.vercel.app/product'),
        
      },
      {
        path: '/addProduct',
        element: <ProtectedRoute> <AddProduct></AddProduct> </ProtectedRoute>,
        loader: ()=>fetch('/data.json'),
        
      },
      {
        path: '/myCart',
        element: <ProtectedRoute> <MyCart></MyCart> </ProtectedRoute>,
        loader: ()=>fetch('https://ass11-hotel-server1.vercel.app/product'),
        
      },
      {
        path: '/updateProduct/:id',
        element: <ProtectedRoute><UpdateProduct></UpdateProduct></ProtectedRoute>,
        loader: ({params})=>fetch(`https://ass11-hotel-server1.vercel.app/product/${params.id}`)
        
      },

      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },      
      {
        path: '/about-us',
        element: <AboutUs></AboutUs>
      },
      {
        path: '/terms',
        element: <TermsAndConditions></TermsAndConditions>
      },
      {
        path: '/privacy',
        element: <PrivacyPolicy></PrivacyPolicy>
      },

    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <AuthProvider>
 <RouterProvider router={router} />
       </AuthProvider>
  </React.StrictMode>,
)
