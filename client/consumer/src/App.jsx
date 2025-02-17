import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AntdLayout from "./component/Layout/Layout"; // ✅ Consumer Layout
import Home from "./pages/consumer/Home/home";
import CartPage from "./pages/consumer/Carts";
import ContactForm from "./component/Contact_Form/Contact_Form";
import ProductList from "./component/ProductList/ProductList";
import Category from "./component/Category/Category";
import Product from "./component/Product/Product";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import AdminSignup from "./pages/admin/auth/AdminSignup";
import MainLayout from "./component/MainLayout/MainLayout"; // ✅ Admin Layout
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import InterestedUsers from "./pages/admin/InterestedUsers";
import Login from "./pages/consumer/Login/login";
import Signup from "./pages/consumer/Signup/signup";

// Authentication Protection
const ProtectedRoute = ({ children, role }) => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");

  if (role === "admin" && !adminToken) return <Navigate to="/admin/login" replace />;
  if (role === "consumer" && !userToken) return <Navigate to="/login" replace />;

  return children;
};

const PublicRoute = ({ children, role }) => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");

  if (role === "admin" && adminToken) return <Navigate to="/admin/dashboard" replace />;
  if (role === "consumer" && userToken) return <Navigate to="/" replace />;

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Consumer Login & Signup (Without AntdLayout) */}
        <Route path="/login" element={<PublicRoute role="consumer"><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute role="consumer"><Signup /></PublicRoute>} />

        {/* ✅ Admin Login & Signup (Without MainLayout) */}
        <Route path="/admin/login" element={<PublicRoute role="admin"><AdminLogin /></PublicRoute>} />
        <Route path="/admin/signup" element={<PublicRoute role="admin"><AdminSignup /></PublicRoute>} />

        {/* ✅ Consumer Protected Routes (Inside AntdLayout) */}
        <Route element={<ProtectedRoute role="consumer"><AntdLayout /></ProtectedRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact_form" element={<ContactForm />} />
          <Route path="/category/:categoryName/:subcategory" element={<ProductList />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/product/:productId" element={<Product />} />

          {/* ✅ Catch-All Route for Consumer Inside AntdLayout */}
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Route>

        {/* ✅ Admin Protected Routes (Inside MainLayout) */}
        <Route element={<ProtectedRoute role="admin"><MainLayout /></ProtectedRoute>}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/interested" element={<InterestedUsers />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;




// import React from 'react';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login/login';
// import Signup from './pages/Signup/signup';
// import Home from './pages/Home/home';
// import Carts from './pages/Carts';
// import ContactForm from './component/Contact_Form/Contact_Form';
// import AntdLayout from './component/Layout/Layout';
// import Product from './component/Product/Product';
// import Category from './component/Category/Category';
// import ProductList from './component/ProductList/ProductList';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Routes with AntdLayout */}
//         <Route element={<AntdLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/cart" element={<Carts />} />
//           <Route path="/contact_form" element={<ContactForm />} />
//           <Route path="/category/:categoryName/:subcategory" element={<ProductList />} />
//           <Route path="/category/:categoryName" element={<Category />} />
//           {/* Simplified Product Details Route */}
//           <Route path="/product/:productId" element={<Product />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;



// import React from 'react'
// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Login from './pages/Login/login'
// import Signup from './pages/Signup/signup'
// import Home from './pages/Home/home'
// import Carts from './pages/Carts'
// import ContactForm from './component/Contact_Form/Contact_Form'
// import AntdLayout from './component/Layout/Layout'
// import Product from './component/Product/Product'
// import Category from './component/Category/Category'
// import ProductList from './component/ProductList/ProductList'
// // import Navbar from './component/Navbar/Navbar'

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route element={<AntdLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           {/* <Route path="/" element={<AntdLayout />}> */}
//            {/* Dynamic category route */}
//           <Route path="/category/:categoryName" element={<Category />} />
//           <Route path="/category/:categoryName/:subcategory" element={<ProductList />} />
//               <Route path="/category/:categoryName/:subcategory/product/:productId" element={<Product />} />
//           {/* <Route path="/category/:subcategory" element={<ProductList />} /> */}

//           <Route path="/cart" element={<Carts />} />
//           <Route path="/contact_form" element={<ContactForm />} />
//         </Route>
//       </Routes>
//     </Router>

//   )
// }

// export default App


// {/* <Route path="/product" element={<Product />} /> */}




