import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPartial from '../LoginPartial';
import Cookies from 'js-cookie';
function Header() {
    const [userInfo, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const token = Cookies.get('token');
    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                if (token) {
                    const response = await axios.get('http://127.0.0.1:8080/api/v1/carts', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    setProducts(response.data.data.products);
                }
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        };

        fetchCartProducts();
    }, []);

    const formatPrice = (price) => {
        return parseFloat(price).toLocaleString('vi-VN');
    };
    const toggleCart = () => {
        setShowCart(!showCart);
    };

    return (
        <header className="py-3 bg-white fixed-top border-bottom border-dark">
            <div className="d-flex container align-items-center justify-content-between">
                <div>
                    <a href="/">
                        <img className="header__logo" src="/assets/images/logodep.jpg" height="70px" alt="" />
                    </a>
                </div>
                <nav className="header__menu">
                    <ul className="nav">
                        <li className="nav-item m-1" onMouseOver={addLiHover} onMouseOut={removeLiHover}><a className="nav-link text-dark" href="/">TRANG CHỦ</a></li>
                        <li className="nav-item m-1" onMouseOver={addLiHover} onMouseOut={removeLiHover}><a className="nav-link text-dark" href="/About">GIỚI THIỆU</a></li>
                        <li className="nav-item m-1" onMouseOver={addLiHover} onMouseOut={removeLiHover}><a className="nav-link text-dark" href="/Product">SẢN PHẨM</a></li>
                        <li className="nav-item m-1" onMouseOver={addLiHover} onMouseOut={removeLiHover}><a className="nav-link text-dark" href="/Contact">LIÊN HỆ</a></li>
                    </ul>
                </nav>
                {userInfo && userInfo.includes('ADMIN') && (
                    <a className="nav-item m-1" onMouseOver={addLiHover} onMouseOut={removeLiHover}><a className="nav-link text-dark" href="/Admin/Home">Quản lý</a></a>
                )}
                <div className="row">
                    <div className="bag p-3 col-md-4 position-relative" onMouseEnter={toggleCart} onMouseLeave={toggleCart}>
                        <a href="/Cart">
                            <i className="fas fa-shopping-bag icon-bag">
                                <sup>{products.length}</sup>
                            </i>
                        </a>
                        {showCart && (
                            <div className="no_card position-absolute">
                                <div className="cart-container" style={{ width: '320px', height: '160px', overflowY: 'auto' }}>
                                    {products.length === 0 ? (
                                        <figure className="border border">
                                            <img src="/assets/images/no-cart.png" alt="" />
                                            <figcaption className="text-center bg-white p-2">Chưa có sản phẩm</figcaption>
                                        </figure>
                                    ) : (
                                        products.map(product => (
                                            <div key={product.product._id} className="product-item" style={{ display: 'flex', flexWrap: 'wrap', background: '#969593' }}>
                                                <img src={`http://127.0.0.1:8080/${product.product.image}`} style={{ width: '100px', height: 'auto' }} alt={product.product.name} />
                                                <td style={{ width: '50%' }}>
                                                    <div className="product-info" style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span style={{ marginBottom: '5px', color: 'white' }} className="name">Tên: {product.product.name}</span>
                                                        <span style={{ marginBottom: '5px', color: 'white' }} className="price">Giá:  {formatPrice(product.product.price)} VNĐ</span>
                                                        <span style={{ color: 'white' }} className="quantity">Số lượng: {product.quantity}</span>
                                                    </div>
                                                </td>
                                                <div style={{ borderBottom: '1px solid white', width: '100%' }}></div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <LoginPartial setUser={setUser} />
                </div>
            </div>
        </header>
    );
}

export default Header;

// Hàm xử lý sự kiện mouseover và mouseout
function addLiHover(event) {
    event.target.classList.add("nav-item__after");
}

function removeLiHover(event) {
    event.target.classList.remove("nav-item__after");
}
