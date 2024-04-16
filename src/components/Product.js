import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
function Product() {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [showBrands, setShowBrands] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalPages] = useState(1);
    const token = Cookies.get('token');
    useEffect(() => {
        const fetchBrandsAndProducts = async () => {
            try {
                const [brandsResponse, productsResponse, categoriesResponse] = await Promise.all([
                    axios.get('http://127.0.0.1:8080/api/v1/brands'),
                    axios.get(`http://127.0.0.1:8080/api/v1/products?page=${currentPage}&limit=5`),
                    axios.get('http://127.0.0.1:8080/api/v1/categories')
                ]);
                setBrands(brandsResponse.data.data.brands);
                setCategories(categoriesResponse.data.data.categories);
                setProducts(productsResponse.data.data.products);
                setTotalPages(Math.ceil(productsResponse.data.data.totalProducts / 5));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchBrandsAndProducts();
    }, [currentPage]);

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

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalProducts) {
            setCurrentPage(currentPage + 1);
        }
    };

    const toggleBrands = () => {
        setShowBrands(!showBrands);
    };
    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };
    const formatPrice = (price) => {
        return parseFloat(price).toLocaleString('vi-VN');
    };
    const countProductsByBrand = (brandId) => {
        const brand = brands.find(brand => brand._id === brandId);
        if (brand) {
            return brand.published.length;
        }
        return 0;
    };
    const countProductsByCategory = (categoryId) => {
        const category = categories.find(category => category._id === categoryId);
        if (category) {
            return category.published.length;
        }
        return 0;
    };

    return (
        <>
            <style>
                {`
                    ul li {
                        list-style: none; /* loại bỏ chấm đầu dòng của li */
                    }

                    ul li a {
                        color: black; /* đặt màu chữ là màu đen */
                        text-decoration: none; /* loại bỏ đường gạch chân */
                        margin-left: 0; /* loại bỏ khoảng trắng ở đầu mỗi liên kết */
                    }
                `}
            </style>
            <div className="container-fluid p-3" style={{ marginTop: '102px', backgroundColor: '#f0f0f0' }}>
                <div className="container">
                    <h5><a href="/">Trang chủ</a> / Sản phẩm</h5>
                </div>
            </div>

            <div class="container mt-3">
                <div class="row">
                    <div class="col-md-3">
                        <h3>Danh mục</h3>
                        <nav class="subnav">
                            <ul class="navbar-nav">
                                <li className="pl-3 nav-item row">
                                    <a class="nav-link text-dark col-md-10" onClick={toggleCategories}>Danh Sách Danh Mục</a>
                                </li>
                                {showCategories && (
                                    <ul>
                                        {categories.map(category => (
                                            <li key={category._id}>
                                                <a href={`/product/category/${category._id}`}>{category.name} ({countProductsByCategory(category._id)})</a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </ul>
                        </nav>

                        <h3>Thương hiệu</h3>
                        <nav className="subnav">
                            <ul className="navbar-nav">
                                <li className="pl-3 nav-item row">
                                    <a class="nav-link text-dark col-md-10" onClick={toggleBrands}>Danh Sách Thương Hiệu</a>
                                </li>
                                {showBrands && (
                                    <ul>
                                        {brands.map(brand => (
                                            <li key={brand._id}>
                                                <a href={`/product/brand/${brand._id}`}>{brand.name} ({countProductsByBrand(brand._id)})</a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </ul>
                        </nav>

                        <h3 className="mt-2">Sản phẩm nổi bật</h3>
                        <nav>
                            <ul className="navbar-nav">
                                {products.map(product => (
                                    <li key={product._id} className="nav-item border-bottom">
                                        <a href={`/details/${product._id}`} className="nav-link">
                                            <div className="d-flex">
                                                <div className="">
                                                    <img className="img-item" src={`http://127.0.0.1:8080/${product.image}`} alt="" />
                                                </div>
                                                <div className="">
                                                    <h6 className="name-item">{product.name}</h6>
                                                    <p className="new_price" id={`product-price-${product._id}`}>
                                                        {formatPrice(product.price)} VNĐ
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <a href="" className="text-dark">Xem thêm <i className="fas fa-angle-right fa"></i></a>
                        </nav>
                    </div>
                    <div className="col-md-9">
                        <div className="row d-flex" style={{ justifyContent: 'space-between' }}>
                            <div className="col-md-4">
                                <h3>Tất cả sản phẩm</h3>
                            </div>
                        </div>
                        <div className="card-deck mt-3" style={{ marginRight: '-15px', marginLeft: '5px' }}>
                            {products.map(product => (
                                <div key={product._id} className="row">
                                    <div className="col-md-4 product card" style={{ maxWidth: '85.333333%', paddingRight: '10px', paddingLeft: '10px' }}>
                                        <a href={`/details/${product._id}`}>
                                            <img className="product__img" src={`http://127.0.0.1:8080/${product.image}`} alt="" />
                                        </a>
                                        <h6 className="product__name">{product.name}</h6>
                                        <div className="product__price">
                                            <p className="new_price" id={`product-price-${product._id}`}>
                                                {formatPrice(product.price)} VNĐ
                                            </p>
                                        </div>
                                        <button onClick={() => addToCart(product._id)} className="btn btn-success mt-3 w-100">Thêm vào giỏ hàng</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ paddingLeft: '300px', margin: '10px' }}>
                            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                                {"<"}
                            </button>

                            <span>
                                Trang {currentPage} / {totalProducts}
                            </span>
                            <button onClick={goToNextPage} disabled={currentPage === totalProducts}>
                                {">"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Product;
