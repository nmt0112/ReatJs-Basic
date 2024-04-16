import React, { useState, useEffect } from 'react';
import axios from 'axios';
function ResetPassword() {
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            setToken(token);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8080/api/v1/auths/ResetPassword/${token}`, {
                password
            });
            console.log(response.data);
            if (response.data.success) {
                alert('Đổi mật khẩu thành công!');
                window.location.href = '/Login'
            } else {
                alert('Lỗi!');
            }
        } catch (error) {
            console.error('Lỗi!:', error);
            alert('Lỗi!');
        }
    };

    return (
        <>
            <div className="container-fluid p-3" style={{ marginTop: '102px', backgroundColor: '#f0f0f0' }}>
                <div className="container">
                    <h5><a href="/">Trang chủ</a> / ResetPassword</h5>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 p-5 mt-5" style={{ left: '300px', top: '-100px', marginBottom: '-100px' }}>
                        <div className="text-center" style={{ maxWidth: '550px' }}>
                            <h4 style={{ marginTop: '100px' }}>EMBODY - Reset Password</h4>
                            <p>Xin chào, vui lòng nhập mật khẩu mới</p>
                            <form onSubmit={handleLogin}>
                                <input
                                    className="form-control my-3 p-2 taikhoan"
                                    type="text"
                                    placeholder="Nhập mật khẩu mới"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button className="btn btn-primary w-100 btn__login" type="submit">
                                    Xác nhận
                                </button>
                            </form>

                            <div className="mt-5">

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

export default ResetPassword;
