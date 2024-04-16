import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function LoginPartial({ setUser }) {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            axios.get('http://127.0.0.1:8080/api/v1/auths/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    setUserInfo(response.data.data);
                    setUser(response.data.data.role);
                })
                .catch(error => {
                    console.error('Lỗi khi lấy thông tin người đăng nhập:', error);
                });
        }
    }, []);

    const handleLogout = () => {
        const token = Cookies.get('token');
        if (token) {
            axios.post('http://127.0.0.1:8080/api/v1/auths/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    Cookies.remove('token');
                    setUserInfo(null);
                    alert('Bạn đã đăng xuất');
                    window.location.href = '/Login'
                })
                .catch(error => {
                    console.error('Lỗi khi đăng xuất:', error);
                });
        }
    };

    return (
        <div className="user p-3 col-md-4 position-relative">
            <i className="fas fa-user icon-user"></i>
            <div className="auth-form nav position-absolute">
                <ul className="navbar-nav m-auto w-100">
                    {userInfo ? (
                        <>
                            <li>Welcome: {userInfo.username}</li>
                            <li className="nav-item"><a className="nav-link text-dark pl-1" href="/profile"><i className="far fa-user-circle"></i>Profile</a></li>
                            <li className="nav-item"><a className="nav-link text-dark pl-1" href="/order"><i className="far fa-shopping-bag icon-bag"></i>Đơn hàng</a></li>
                            <li className="nav-item" onClick={handleLogout}><a className="nav-link text-dark pl-1" href="/"><i className="fa fa-sign-in" aria-hidden="true"></i>Log off</a></li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item"><a className="nav-link text-dark pl-1" href="/Register"><i className="icon-plus fas fa-user-plus"></i> Đăng ký</a></li>
                            <li className="nav-item"><a className="nav-link text-dark pl-1" href="/Login"><i className="far fa-user-circle"></i> Đăng nhập</a></li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default LoginPartial;
