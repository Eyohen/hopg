// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import HomePage from './pages/HomePage';
// import Login from './pages/Login';
// import ProductsPage from './pages/ProductsPage';
// import ProductDetailPage from './pages/ProductDetailPage';
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
// import OrderSuccessPage from './pages/OrderSuccessPage';
// import NotFoundPage from './pages/NotFoundPage';

// import 'coinley-checkout/dist/style.css'
// import Profile from './pages/Profile';
// import AdminDashboard from './pages/AdminDashboard';
// import Register from './pages/Register';
// import AdminLogin from './pages/AdminLogin';



// function App() {
//   return (
//     <div className="flex flex-col min-h-screen">

//       <main className="flex-grow">
//         <Routes>

//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//            <Route path="/register" element={<Register />} />
//           <Route path="/products" element={<ProductsPage />} />
//           <Route path="/product/:id" element={<ProductDetailPage />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/checkout" element={<CheckoutPage />} />
//           <Route path="/order-success" element={<OrderSuccessPage />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/admin-login" element={<AdminLogin />} />
//           <Route path="/dashboard" element={<AdminDashboard />} />
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </main>

//     </div>

//   );
// }

// export default App;




// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import NotFoundPage from './pages/NotFoundPage';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';

import { CartProvider } from './context/CartContext';

import 'coinley-checkout/dist/style.css'

function App() {
  return (
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
  );
}

export default App;