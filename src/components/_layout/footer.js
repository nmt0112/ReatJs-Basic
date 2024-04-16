import React from 'react';

function Footer() {
    return (
        <footer className="bg-dark py-4">
            <div className="container">
                <div className="row pt-3">
                    <div className="col-md-5">
                        <h4 className="text-white">Fanpage</h4>
                        <a href="/facebook"><i className="icon-facebook rounded fab fa-facebook"></i></a>
                        <a href="/twitter"><i className="icon-twitter rounded fab fa-twitter-square"></i></a>
                        <a href="/googleplus"><i className="icon-google-plus rounded fab fa-google-plus"></i></a>
                        <a href="/wechat"><i className="icon-wechat rounded fab fa-weixin"></i></a>
                    </div>

                    <div className="col-md-7 rounded">
                        <h4 className="text-white">Đăng ký nhận thông tin</h4>
                        <p className="text-white">Hãy cho chúng tôi email của bạn và bạn sẽ được cập nhật hàng ngày với các sự kiện mới nhất, chi tiết!</p>
                        <div className="bg-white d-flex">
                            <input className="w-100 border-0 pl-3" type="text" placeholder="Nhập email để đăng ký" />
                            <button className="btn col-md-2" style={{ backgroundColor: 'turquoise' }}>Đăng ký</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-4" style={{ marginRight: '100px' }}>
                <div className="row pt-3">
                    <div className="col-md-3">
                        <h4 className="text-white">Về chúng tôi</h4>
                        <ul className="navbar-nav footer__menu">
                            <li className="nav-item"><a className="nav-link text-secondary" href="#"><i className="fas fa-map-marker-alt"></i> Liêu Xá, Yên Mỹ, Hưng Yên</a></li>
                            <li className="nav-item"><a className="nav-link text-secondary" href="#"><i className="fas fa-phone"></i> 0368960711</a></li>
                            <li className="nav-item"><a className="nav-link text-secondary" href="#"><i className="fas fa-envelope"></i> tranvudai0210@gmail.com</a></li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h4 className="text-white">Chính sách</h4>
                        <ul className="navbar-nav footer__menu">
                            <li className="nav-item"><a className="nav-link text-secondary" href="">Chính sách bảo mật</a></li>
                            <li className="nav-item"><a className="nav-link text-secondary" href="">Chính sách bảo hành</a></li>
                            <li className="nav-item"><a className="nav-link text-secondary" href="">Chính sách vận chuyển</a></li>
                            <li className="nav-item"><a className="nav-link text-secondary" href="">Chính sách đổi hàng</a></li>
                            <li className="nav-item"><a className="nav-link text-secondary" href="">Quy định thanh toán</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer >
    );
}

export default Footer;
