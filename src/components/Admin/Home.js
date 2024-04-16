import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
function Home() {
    const [totalBrands, setBrands] = useState([]);
    const [totalUsers, setUsers] = useState([]);
    const [totalCategories, setCategories] = useState([]);
    const [totalProducts, setProducts] = useState([]);
    const [totalOrders, setOrders] = useState([]);
    const token = Cookies.get('token');
    useEffect(() => {
        const fetchBrandsAndProducts = async () => {
            try {
                const [brandsResponse, userResponse, categoriesResponse, productsResponse, ordersResponse] = await Promise.all([
                    axios.get('http://127.0.0.1:8080/api/v1/brands'),
                    axios.get('http://127.0.0.1:8080/api/v1/users'),
                    axios.get('http://127.0.0.1:8080/api/v1/categories'),
                    axios.get('http://127.0.0.1:8080/api/v1/products'),
                    axios.get('http://127.0.0.1:8080/api/v1/orders/all', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                ]);
                setBrands(brandsResponse.data.data.totalBrands);
                setUsers(userResponse.data.data.totalUsers);
                setProducts(productsResponse.data.data.totalProducts);
                setCategories(categoriesResponse.data.data.totalCategories);
                setOrders(ordersResponse.data.data.numberOfOrders);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchBrandsAndProducts();
    }, []);

    return (
        <div class="main-panel">
            <div class="content">
                <tbody>
                    <div class="page-inner">
                        <h4 class="page-title">Trang Quản Trị</h4>
                        <div class="row">
                            <div className="col-sm-6 col-md-3" onClick={() => { window.location.href = '/Admin/Users/Index'; }}>
                                <div class="card card-stats card-primary card-round">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-5">
                                                <div class="icon-big text-center">
                                                    <i class="flaticon-users"></i>
                                                </div>
                                            </div>
                                            <div class="col-7 col-stats">
                                                <div class="numbers">
                                                    <p class="card-category">Tài Khoản</p>
                                                    <h4 class="card-title">{totalUsers}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3" onClick={() => { window.location.href = '/Admin/Brands/Index'; }}>
                                <div class="card card-stats card-info card-round">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-5">
                                                <div class="icon-big text-center">
                                                    <i class="flaticon-interface-6"></i>
                                                </div>
                                            </div>
                                            <div class="col-7 col-stats">
                                                <div class="numbers">
                                                    <p class="card-category">Thương hiệu</p>
                                                    <h4 class="card-title">{totalBrands}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3" onClick={() => { window.location.href = '/Admin/Categories/Index'; }}>
                                <div class="card card-stats card-success card-round">
                                    <div class="card-body ">
                                        <div class="row">
                                            <div class="col-5">
                                                <div class="icon-big text-center">
                                                    <i class="flaticon-analytics"></i>
                                                </div>
                                            </div>
                                            <div class="col-7 col-stats">
                                                <div class="numbers">
                                                    <p class="card-category">Danh mục</p>
                                                    <h4 class="card-title">{totalCategories}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3" onClick={() => { window.location.href = '/Admin/Products/Index'; }}>
                                <div class="card card-stats card-stats card-round">
                                    <div class="card-body ">
                                        <div class="row">
                                            <div class="col-5">
                                                <div class="icon-big text-center">
                                                    <i class="fas fa-ruler"></i>
                                                </div>
                                            </div>
                                            <div class="col-7 col-stats">
                                                <div class="numbers">
                                                    <p class="card-category">Sản phẩm</p>
                                                    <h4 class="card-title">{totalProducts}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3" onClick={() => { window.location.href = '/Admin/Orders/Index'; }}>
                                <div class="card card-stats card-danger card-round">
                                    <div class="card-body ">
                                        <div class="row">
                                            <div class="col-5">
                                                <div class="icon-big text-center">
                                                    <i class="flaticon-user"></i>
                                                </div>
                                            </div>
                                            <div class="col-7 col-stats">
                                                <div class="numbers">
                                                    <p class="card-category">Đơn hàng</p>
                                                    <h4 class="card-title">{totalOrders}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </tbody>
            </div>
            <footer class="footer">
                <div class="container-fluid">
                    <nav class="pull-left">
                        <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/Admin/home">
                                    Trang quản trị
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div class="copyright ml-auto">
                        <a>Chào mừng bạn đến với trang quản trị <i class="fa fa-heart heart text-danger"></i></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;