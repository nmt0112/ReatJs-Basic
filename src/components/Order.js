import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';

function Order() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const token = Cookies.get('token');
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/api/v1/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setOrders(response.data.data);
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        };

        fetchCartProducts();
    }, []);


    const formatPrice = (price) => {
        return parseFloat(price).toLocaleString('vi-VN');
    };

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY'); // Format date using moment.js
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
        <div className="container-fluid p-3" style={{ marginTop: '102px', backgroundColor: '#f0f0f0' }}>
            <div className="container">
                <h5><a href="/">Trang chủ</a> / Giỏ hàng</h5>
            </div>
            {orders.length === 0 ? (
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Bạn chả có đơn hàng nào!</h2>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <h2 style={{ textAlign: 'center' }}>THÔNG TIN GIỎ HÀNG</h2>
                        <table style={{ margin: 'auto', textAlign: 'center', border: '1px solid black', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ fontWeight: 'bold', border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', padding: '5px' }}> Mã khách hàng </td>
                                    <td style={{ border: '1px solid black', padding: '5px' }}> Ngày đặt hàng </td>
                                    <td style={{ border: '1px solid black', padding: '5px' }}> Tổng giá trị </td>
                                    <td style={{ border: '1px solid black', padding: '5px' }}> Trạng thái </td>
                                    <td style={{ border: '1px solid black', padding: '5px' }}> Chi tiết </td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(item => (
                                    <tr key={item._id} style={{ border: '1px solid black' }}>
                                        <td style={{ border: '1px solid black', padding: '5px' }}> {item.user} </td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}> {formatDate(item.createdAt)} </td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}> {formatPrice(item.totalPrice)} VNĐ </td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}> {item.status} </td>
                                        <td>
                                            <button type="button" className="btn btn-link btn-primary btn-lg btn-edit" onClick={() => fetchOrderDetails(item._id)} data-toggle="modal" data-target="#orderDetailsPopup" title="Chi tiết">
                                                Chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {/* Popup hiển thị thông tin chi tiết */}
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
    );
}

export default Order;
