import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import Footer from './components/_layout/footer';
import Header from './components/_layout/header';
import HomePage from './components/Banner';
import AboutPage from './components/About';
import ProductPage from './components/Product';
import ContactPage from './components/Contact';
import ProfilePage from './components/profile';
import Login from './components/Login';
import Cart from './components/Cart';
import Register from './components/Register';
import Admin from './components/Admin/Home';
import ForgotPassword from './components/ForgotPassword';
import ERROR from './NotFoundPage';
import ResetPassword from './components/Resetpassword';
import AdHeader from './components/Admin/_layout/header';
import axios from 'axios';
import Cookies from 'js-cookie';
import AdUsers from './components/Admin/Users/index';
import AdBrands from './components/Admin/Brands/index';
import AdCategories from './components/Admin/Categories/index';
import AdProducts from './components/Admin/Products/index';
import AdOrders from './components/Admin/Orders/index';
import Order from './components/Order';
import ProductDetails from './components/ProductDetails';
function Home() {
  const [userInfo, setUser] = useState(null);
  const isAdmin = userInfo && userInfo.includes('ADMIN');
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      axios.get('http://127.0.0.1:8080/api/v1/auths/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setUser(response.data.data.role);
        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin người đăng nhập:', error);
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {isAdmin && (
          <Route path="/admin">
            <AdHeader />
            <Route path="/admin/home" component={Admin} />
            <Route path="/admin/users/index" component={AdUsers} />
            <Route path="/admin/brands/index" component={AdBrands} />
            <Route path="/admin/categories/index" component={AdCategories} />
            <Route path="/admin/products/index" component={AdProducts} />
            <Route path="/admin/orders/index" component={AdOrders} />
          </Route>
        )}
        <Route>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/product" component={ProductPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/Login" component={Login} />
            <Route path="/Cart" component={Cart} />
            <Route path="/Order" component={Order} />
            <Route path="/details/:productId" component={ProductDetails} />
            <Route path="/Register" component={Register} />
            <Route path="/ResetPassword" component={ResetPassword} />
            <Route path="/ForgotPassword" component={ForgotPassword} />
            <Route component={ERROR} />
          </Switch>
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Home;
