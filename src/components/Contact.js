import React from 'react';

function Contact() {
    return (
        <div>
            <div className="container-fluid p-3" style={{ marginTop: '102px', backgroundColor: '#f0f0f0' }}>
                <div className="container">
                    <h5><a href="/">Trang chủ</a> / Liên hệ</h5>
                </div>
            </div>

            <div className="container mt-5 p-5">
                <h1 className="text-center">Liên hệ</h1>
                <p className="lead text-center p-5">EMBODY được thành lập vào năm 2001. Nhờ sự yêu mến, quan tâm của đông đảo khách hàng gần xa nên chỉ sau hơn 5 năm ra đời, EMBODY đã trở thành một địa chỉ mua sắm nước hoa, mỹ phẩm cao cấp, chính hãng quen thuộc và đáng tin cậy của khách hàng...</p>
                <div className="row py-2">
                    <div className="col-md-2">
                        <i className="fas fa-map" style={{ color: 'red' }}></i><span className="ml-2">ĐỊA CHỈ</span>
                    </div>
                    <div className="col-md-10 mt-1">
                        Khu Công nghệ cao TP.HCM (SHTP), Xa lộ Hà Nội, P. Hiệp Phú, TP. Thủ Đức, TP.HCM
                    </div>
                </div>

                <div className="row py-2">
                    <div className="col-md-2">
                        <i className="fas fa-phone-volume" style={{ color: 'red' }}></i><span className="ml-2">SỐ ĐIỆN THOẠI</span>
                    </div>
                    <div className="col-md-10 mt-1">
                        0988886666
                    </div>
                </div>

                <div className="row py-2">
                    <div className="col-md-2">
                        <i className="fas fa-envelope" style={{ color: 'red' }}></i><span className="ml-2">EMAIL</span>
                    </div>
                    <div className="col-md-10 mt-1">
                        Hutech@edu.com.vn
                    </div>
                </div>
            </div>

            <div className="container mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2931471065383!2d106.78318431528933!3d10.855042692252569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527c3debb5aad%3A0x5fb58956eb4194d0!2s%C4%90%E1%BA%A1i%20H%E1%BB%8Dc%20Hutech%20Khu%20E!5e0!3m2!1sen!2s!4v1650463810783!5m2!1sen!2s" width="540" height="450" style={{ border: '0' }} allowfullscreen="" loading="lazy"></iframe>
                    </div>

                    <div className="col-md-6">
                        <h3>VIẾT NHẬN XÉT</h3>
                        <form action="">
                            <input type="text" className="form-control my-4" placeholder="Họ và tên" />
                            <input type="text" className="form-control my-4" placeholder="Số điện thoại" />
                            <input type="text" className="form-control my-4" placeholder="Email" />
                            <input type="text" className="form-control my-4 p-4" placeholder="Nội Dung" />
                        </form>
                        <button className="btn btn-success">Gửi liên hệ</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
