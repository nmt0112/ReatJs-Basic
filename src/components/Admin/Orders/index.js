import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
function Orders() {
    const [orders, setOrders] = useState([]);
    const token = Cookies.get('token');
    const [selectedOrder, setSelectedOrder] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/orders/all', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                setOrders(response.data.data.orders);
                fetchUsersInfo(response.data.data.orders);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    const fetchUsersInfo = (orders) => {
        orders.forEach(order => {
            axios.get(`http://localhost:8080/api/v1/users/${order.user}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(response => {
                    // Thay đổi user từ id sang username trong order
                    order.user = response.data.data[0].username;
                    setOrders([...orders]); // Cập nhật lại state
                })
                .catch(error => {
                    console.error(`Error fetching user info for order ${order._id}:`, error);
                });
        });
    }

    const handleConfirmOrder = (orderId) => {
        axios.post(`http://localhost:8080/api/v1/orders/confirm/${orderId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                alert('Đã xác nhận');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error confirming order:', error);
            });
    };
    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY'); // Format date using moment.js
    };
    const formatPrice = (price) => {
        return parseFloat(price).toLocaleString('vi-VN');
    };
    const fetchProductById = async (productId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/api/v1/products/${productId}`);
            return response.data.data[0];
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    };

    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/api/v1/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const orderItems = response.data.data;

            const productsPromises = orderItems.map(async (orderItem) => {
                const product = await fetchProductById(orderItem.product);
                return { ...orderItem, product };
            });

            const productsData = await Promise.all(productsPromises);
            setSelectedOrder(productsData);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    return (
        <div className="page-inner" style={{ paddingLeft: '17%' }}>
            <div className="page-header">
                <h4 className="page-title">Quản Lý Đơn Hàng</h4>
                <ul className="breadcrumbs">
                    <li className="nav-home">
                        <a href="/Admin/Home">
                            <i className="flaticon-home"></i>
                        </a>
                    </li>
                    <li className="separator">
                        <i className="flaticon-right-arrow"></i>
                    </li>
                    <li className="nav-item">
                        <a>Đơn hàng</a>
                    </li>
                </ul>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table fixed-table table-striped table-hover" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>ID Đơn Hàng</th>
                                            <th>Người Đặt Hàng</th>
                                            <th>Ngày Đặt Hàng</th>
                                            <th>Trạng Thái</th>
                                            <th style={{ width: '190px' }}>Hành Động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.user}</td>
                                                <td>{formatDate(order.createdAt)}</td>
                                                <td>{order.status}</td>
                                                <td>
                                                    <button type="button" className="btn btn-link btn-primary btn-lg btn-edit" onClick={() => fetchOrderDetails(order._id)} data-toggle="modal" data-target="#orderDetailsPopup" title="Chi tiết">
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-link btn-success btn-lg btn-confirm" data-toggle="modal" onClick={() => handleConfirmOrder(order._id)} title="Xác nhận đơn hàng">
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {selectedOrder && (
                                <div className="modal fade" id="orderDetailsPopup" tabIndex="-1" role="dialog" aria-labelledby="orderDetailsPopupLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-body">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Tên sản phẩm</th>
                                                            <th>Số lượng</th>
                                                            <th>Đơn giá</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedOrder.map(orderItem => (
                                                            <tr key={orderItem._id}>
                                                                <td>{orderItem.product.name}</td>
                                                                <td>{orderItem.quantity}</td>
                                                                <td>{formatPrice(orderItem.price)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <button style={{ marginLeft: '380px' }} type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;
