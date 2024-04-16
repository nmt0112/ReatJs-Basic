import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
import Cookies from 'js-cookie';
function Banner() {
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const token = Cookies.get('token');
    const formatPrice = (price) => {
        return parseFloat(price).toLocaleString('vi-VN');
    };
    useEffect(() => {
        const fetchBrandsAndProducts = async () => {
            try {
                const [brandsResponse, productsResponse] = await Promise.all([
                    axios.get('http://127.0.0.1:8080/api/v1/brands'),
                    axios.get('http://127.0.0.1:8080/api/v1/products')
                ]);
                setBrands(brandsResponse.data.data.brands);
                setProducts(productsResponse.data.data.products);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchBrandsAndProducts();
    }, []);
    const addToCart = async (productId) => {
        try {
            await axios.post(
                'http://127.0.0.1:8080/api/v1/carts/add',
                { productId: productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            alert('Sản phẩm đã được thêm vào giỏ hàng thành công!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.');
        }
    }

    return (
        <>
            <div className="banner container-fluid p-0" style={{ marginTop: '102px' }}>
                <div id="demo" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" className="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="/assets/images/bannerdep.jpg" height="800px" alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/assets/images/andriyko-podilnyk-F4AMM1293ag-unsplash.jpg" height="800px" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/assets/images/pexels-beatrice-cornejo-3989775.jpg" height="800px" alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#demo" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#demo" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row my-2 text-white bg-danger">
                    <div className="col-md-6 title">
                        <h3 className="">SẢN PHẨM NỔI BẬT</h3>
                    </div>
                    <div className="col-md-6 mt-3">
                        <a href="sanpham.html" className="float-right text-white">Xem tất cả</a>
                    </div>
                </div>

                <OwlCarousel
                    className="owl-theme"
                    loop
                    margin={10}
                >
                    {brands.map(brand => (
                        <div key={brand._id} className="item thuonghieu p-5">
                            <a href="/Product">
                                <img src={`http://127.0.0.1:8080/${brand.image}`} height="174px" alt={brand.name} />
                            </a>
                        </div>
                    ))}
                </OwlCarousel>
            </div>

            <div className="container mt-5">
                <div className="row my-2 text-white bg-danger">
                    <div className="col-md-6 title">
                        <h3 className="">SẢN PHẨM NỔI BẬT</h3>
                    </div>
                    <div className="col-md-6 mt-3">
                        <a href="sanpham.html" className="float-right text-white">Xem tất cả</a>
                    </div>
                </div>

                <OwlCarousel
                    className="owl-theme"
                    loop
                    margin={10}
                >
                    {products.map(product => (
                        <div key={product._id} className="item border">
                            <div className="product px-2">
                                <a href={`/details/${product._id}`}>
                                    <img className="product-img" src={`http://127.0.0.1:8080/${product.image}`} alt="" />
                                </a>
                                <h6 className="product__name">{product.name}</h6>
                                <div className="product__price">
                                    <p className="new_price" id={`product-price-${product.Id}`}>
                                        {formatPrice(product.price)} VNĐ
                                    </p>
                                </div>
                                <button onClick={() => addToCart(product._id)} className="btn btn-success mt-3 w-100">Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    ))}
                </OwlCarousel>
            </div>

        </>
    );
}
export default Banner;