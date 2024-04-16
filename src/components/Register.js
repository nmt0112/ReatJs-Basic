import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8080/api/v1/auths/Register', {
                username,
                password,
                email
            });
            if (response.data.success) {
                alert("Đăng ký thành công! Vui lòng đăng nhập");
                window.location.href = '/Login'
            } else {
                alert('Đăng Ký thất bại!');
            }
        } catch (error) {
            console.error('Đăng Ký thất bại:', error);
            alert('Đăng Ký thất bại!');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center bg-info h-100" >
                    <img src="/assets/images/login_banner.svg" style={{ marginTop: '250px' }} alt="" />
                </div>
                <div className="col-md-6 p-5 mt-5">
                    <div className="text-center" style={{ maxWidth: '550px' }}>
                        <h4 style={{ marginTop: '100px' }}>EMBODY - Đăng ký</h4>
                        <p>Xin chào, vui lòng nhập thông tin đăng ký</p>
                        <form onSubmit={handleRegister}>
                            <input
                                className="form-control my-3 p-2 taikhoan"
                                type="text"
                                placeholder="Tên đăng ký"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input
                                className="form-control my-3 p-2 matkhau"
                                type="password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <input
                                className="form-control my-3 p-2 matkhau"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <a className="float-left mb-2" href="/ForgotPassword">
                                Quên mật khẩu
                            </a>

                            <button className="btn btn-primary w-100 btn__Register" type="submit">
                                Đăng ký
                            </button>
                        </form>

                        <div className="mt-5">
                            <p style={{ color: '#ccc' }}>Chưa đã có khoản EMBODY? <a href="/Login">Đăng nhập ngay</a></p>
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
        </div >
    );
}

export default Register;
