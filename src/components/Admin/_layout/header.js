import React from 'react';

const Header = () => {
    return (
        <header>
            <div class="main-header">
                <div class="logo-header" data-background-color="white">

                    <a href="/Admin/home" class="logo">
                        <img className="header__logo" src="/assets/images/logodep.jpg" height="50px" alt="" />
                    </a>
                    <button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon">
                            <i class="icon-menu"></i>
                        </span>
                    </button>
                    <button class="topbar-toggler more"><i class="icon-options-vertical"></i></button>
                    <div class="nav-toggle">
                        <button class="btn btn-toggle toggle-sidebar">
                            <i class="icon-menu"></i>
                        </button>
                    </div>
                </div>
                <nav class="navbar navbar-header navbar-expand-lg" data-background-color="white">
                    <div class="container-fluid">
                        <h1 style={{ color: 'black', fontWeight: 'bold', paddingLeft: '400px' }}>QUẢN LÝ CỬA HÀNG MỸ PHẨM</h1>
                    </div>
                </nav>
            </div>

            <div class="sidebar sidebar-style-2">
                <div class="sidebar-wrapper scrollbar scrollbar-inner">
                    <div class="sidebar-content">
                        <ul class="nav nav-primary">
                            <li class="nav-item active">
                                <a data-toggle="collapse" href="#dashboard" class="collapsed" aria-expanded="false">
                                    <i class="fas fa-home"></i>
                                    <p>Quản Lý</p>
                                    <span class="caret"></span>
                                </a>
                                <div class="collapse" id="dashboard">
                                    <ul class="nav nav-collapse">
                                        <li>
                                            <a href="~/Admin/Account/Index">
                                                <span class="sub-item">Tài khoản</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="~/Admin/News/Index">
                                                <span class="sub-item">Thương hiệu</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="~/Admin/Services/Index">
                                                <span class="sub-item">Danh mục</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="~/Admin/Styles/Index">
                                                <span class="sub-item">Sản phẩm</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="~/Admin/Barbers/Index">
                                                <span class="sub-item">Đơn hàng</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="mx-4 mt-2">
                                <a href="/" class="btn btn-primary btn-block"><span class="btn-label mr-2"> <i class="fa fa-heart"></i> </span>Trang Chủ</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
