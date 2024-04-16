import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8080/api/v1/auths/ForgotPassword', {
                email
            });
            console.log(response.data);
            if (response.data.success) {
                alert('Đã gửi xác nhận tới email!');
                window.location.href = '/'
            } else {
                alert('Gửi thất bại!');
            }
        } catch (error) {
            console.error('Gửi thất bại!:', error);
            alert('Gửi thất bại!');
        }
    };

    return (
        <>
            <div className="container-fluid p-3" style={{ marginTop: '102px', backgroundColor: '#f0f0f0' }}>
                <div className="container">
                    <h5><a href="/">Trang chủ</a> / Info</h5>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 p-5 mt-5" style={{ left: '300px', top: '-100px', marginBottom: '-100px' }}>
                        <div className="text-center" style={{ maxWidth: '550px' }}>
                            <h4 style={{ marginTop: '100px' }}>EMBODY - Quên mật khẩu</h4>
                            <p>Xin chào, vui lòng nhập email đã đăng ký</p>
                            <form onSubmit={handleLogin}>
                                <input
                                    className="form-control my-3 p-2 taikhoan"
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <button className="btn btn-primary w-100 btn__login" type="submit">
                                    Xác nhận
                                </button>
                            </form>

                            <div className="mt-5">
                                <p style={{ color: '#ccc' }}>Chưa có tài khoản EMBODY? <a href="/Register">Đăng ký ngay</a></p>
                                <div className="mb-2">
                                    <a href="/">Quay lại trang chủ</a>
                                </div>

                                <div className="row m-1">
                                    <div className="" style={{ cursor: 'pointer' }}>
                                        <span>
                                            <img src="/assets/images/la-co-viet-nam.png" width="25" alt="" /> Tiếng Việt
                                        </span>
                                    </div>

                                    <div className="ml-3" style={{ cursor: 'pointer' }}>
                                        <span>
                                            <img src="/assets/images/co_my.png" width="25" alt="" /> English
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ForgotPassword;
