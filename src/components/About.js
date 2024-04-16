import React from 'react';

function About() {
    return (
        <div>
            <div className="container-fluid p-3" style={{ marginTop: '102px', backgroundColor: '#f0f0f0' }}>
                <div className="container">
                    <h5><a href="/">Trang chủ</a> / Giới thiệu</h5>
                </div>
            </div>

            <div className="mt-5 container p-5">
                <h1 className="text-center p-5">Về chúng tôi</h1>
                <div className="p-5">
                    <h5>TRONG 3 NĂM CỬA HÀNG CỦA CHÚNG TÔI ĐÃ TRỞ THÀNH MỘT TRONG NHỮNG CỬA HÀNG LỚN NHẤT CHO NỮ TRÊN TOÀN THẾ GIỚI.</h5>
                    <p>
                        Chúng tôi cung cấp cho khách hàng của chúng tôi với giá tốt nhất và hệ thống chiết khấu tuyệt vời. Khách hàng thường xuyên của chúng tôi nhận được ưu đãi đặc biệt, thẻ quà tặng và các ưu điểm tích lũy khác. Bộ sưu tập của cửa hàng chúng tôi được làm giàu với các mặt hàng và thương hiệu mới. Chúng tôi cộng tác với các thương hiệu nổi tiếng thế giới và duy trì các thương hiệu trẻ.
                    </p>
                    <p>
                        Phạm vi của chúng tôi sản phẩm bao gồm hơn 5000 mặt hàng và hàng chục các thương hiệu nước hoa tốt nhất. Bạn có thể tìm thấy hương thơm tươi hoặc nước hoa vani ngọt ngào. Sứ mệnh của cửa hàng chúng tôi là cung cấp cho mọi phụ nữ một phong cách và hương thơm độc đáo. Phương châm của chúng tôi là viết tắt của mỗi người phụ nữ là đẹp và xứng đáng với những điều tuyệt vời để có. Sự thoải mái là rất quan trọng trong các sản phẩm của chúng tôi khi chúng tôi đánh giá cao khách hàng của mình và tạo ra bộ sưu tập của chúng tôi với tình yêu và sự chú ý đến từng chi tiết.
                    </p>
                    <div className="row mt-5 d-flex align-content-around text-center">
                        <div className="col-md-3">
                            <h1 className="counter-value">225</h1>
                            <p>Thương hiệu</p>
                        </div>
                        <div className="col-md-3">
                            <h1 className="counter-value">2314</h1>
                            <p>Khách hàng</p>
                        </div>
                        <div className="col-md-3">
                            <h1 className="counter-value">14</h1>
                            <p>Cửa hàng</p>
                        </div>
                        <div className="col-md-3">
                            <h1 className="counter-value">623</h1>
                            <p>Quà thẻ đã được cấp</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <hr />
                <div className="row text-center py-5">
                    <div className="col-md-4">
                        <h5>Miễn phí vận chuyển</h5>
                        <p>Tin tốt! Bây giờ chúng tôi gửi miễn phí trong phạm vi Hoa Kỳ và Canada! Chúng tôi sử dụng các công ty vận chuyển UPS và USPS.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Hỗ trợ 24/7</h5>
                        <p>Chúng tôi có sẵn suốt ngày đêm! Nếu bạn có bất kỳ câu hỏi nào hoặc muốn đặt hàng, vui lòng liên hệ với chúng tôi!</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Quá trình thanh toán</h5>
                        <p>Chúng tôi có nhiều phương thức thanh toán khác nhau: chúng tôi lấy thẻ tín dụng và thẻ ghi nợ, thanh toán qua Paypal, séc và chuyển khoản ngân hàng.</p>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container p-5">
                <h2 className="text-center p-5">CHÚNG TÔI CÓ THỂ LÀM GÌ</h2>
                <div className="p-5">
                    Chúng tôi tạo ra các mô hình mới, hợp tác với các thương hiệu và nhà mỹ phẩm, làm một số mặt hàng được đặt làm và cung cấp cho khách hàng của chúng tôi một loạt các dịch vụ đi kèm. Thưởng thức lướt trang web của chúng tôi để biết thêm về chúng tôi!
                </div>
                <div className="px-5">
                    <div className="">
                        <span>Chất lượng</span>
                        <div className="bg-secondary position-relative mt-2" style={{ height: '5px', width: '100%' }}>
                            <div className="position-absolute" style={{ width: '100%', height: '5px', backgroundColor: '#28e0c8' }}>
                                <span className="position-absolute" style={{ right: '0', top: '-20px' }}>100%</span>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <span>Dịch vụ</span>
                        <div className="bg-secondary position-relative mt-2" style={{ height: '5px', width: '100%' }}>
                            <div className="position-absolute" style={{ width: '90%', height: '5px', backgroundColor: '#28e0c8' }}>
                                <span className="position-absolute" style={{ right: '0', top: '-20px' }}>90%</span>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <span>Hỗ trợ</span>
                        <div className="bg-secondary position-relative mt-2" style={{ height: '5px', width: '100%' }}>
                            <div className="position-absolute" style={{ width: '80%', height: '5px', backgroundColor: '#28e0c8' }}>
                                <span className="position-absolute" style={{ right: '0', top: '-20px' }}>80%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
