import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8080/api/v1/auths/login', {
                username,
                password
            });
            console.log(response.data);
            if (response.data.success) {
                Cookies.set('token', response.data.data, { expires: 7 });
                alert('Đăng nhập thành công');
                window.location.href = '/'
            } else {
                alert('Đăng nhập thất bại!');
            }
        } catch (error) {
            console.error('Đăng nhập thất bại:', error);
            alert('Đăng nhập thất bại!');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center bg-info h-100">
                    <img src="/assets/images/login_banner.svg" style={{ marginTop: '180px' }} alt="" />
                </div>
                <div className="col-md-6 p-5 mt-5">
                    <div className="text-center" style={{ maxWidth: '550px' }}>
                        <h4 style={{ marginTop: '100px' }}>EMBODY - Đăng nhập</h4>
                        <p>Xin chào, vui lòng nhập thông tin đăng nhập</p>
                        <form onSubmit={handleLogin}>
                            <input
                                className="form-control my-3 p-2 taikhoan"
                                type="text"
                                placeholder="Tên đăng nhập"
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

                            <a className="float-left mb-2" href="/ForgotPassword">
                                Quên mật khẩu
                            </a>

                            <button className="btn btn-primary w-100 btn__login" type="submit">
                                Đăng nhập
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
    );
}

export default Login;
