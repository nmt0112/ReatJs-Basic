import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
function ProductDetails() {
    const [product, setProduct] = useState(null);
    const [brand, setBrand] = useState(null);
    const [category, setCategory] = useState(null);
    const { productId } = useParams();
    const token = Cookies.get('token');
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8080/api/v1/products/${productId}`);
                console.log(response.data);
                const firstProduct = response.data.data[0];
                setProduct(firstProduct);

                // Lấy thông tin thương hiệu dựa vào brandId của sản phẩm
                const brandResponse = await fetchBrandById(firstProduct.brand);
                setBrand(brandResponse);

                // Lấy thông tin loại sản phẩm dựa vào categoryId của sản phẩm
                const categoryResponse = await fetchCategoryById(firstProduct.category);
                setCategory(categoryResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    const formatPrice = (price) => {
        return parseFloat(price).toLocaleString('vi-VN');
    };

    // Hàm lấy thông tin thương hiệu dựa vào brandId
    const fetchBrandById = async (brandId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/api/v1/brands/${brandId}`);
            return response.data.data[0];
        } catch (error) {
            console.error('Error fetching brand:', error);
            return null;
        }
    };

    // Hàm lấy thông tin loại sản phẩm dựa vào categoryId
    const fetchCategoryById = async (categoryId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/api/v1/categories/${categoryId}`);
            return response.data.data[0];
        } catch (error) {
            console.error('Error fetching category:', error);
            return null;
        }
    };
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
            <div className="container-fluid p-3" style={{ marginTop: '102px', backgroundColor: '#f0f0f0' }}>
                <div className="container">
                    <h5><a href="/">Sản phẩm</a> / Chi tiết</h5>
                </div>
            </div>
            <div className="container mt-3" style={{ marginBottom: '20px' }}>
                {product && (
                    <div className="row">
                        <div className="col-md-6">
                            <img className="border border-danger" src={`http://127.0.0.1:8080/${product.image}`} width="550" height="550" alt="" />
                        </div>

                        <div className="col-md-6">
                            <h1>{product.name}</h1>
                            <p>Tình trạng: <span style={{ color: 'red' }}>Còn hàng</span></p>
                            <div>
                                <p className="font-weight-bold">Giá tiền: {formatPrice(product.price)} VNĐ</p>
                            </div>
                            <div>
                                <p><span className="font-weight-bold">Thương hiệu:</span> {brand ? brand.name : ''}</p>
                                <p><span className="font-weight-bold">Loại sản phẩm:</span> {category ? category.name : ''}</p>
                            </div>
                            <div>
                                <h3 className="font-weight-bold">Mô tả sản phẩm</h3>
                                {product && product.description}
                            </div>
                            <div>
                                <button onClick={() => addToCart(product._id)} className="btn btn-success mt-3 w-100">Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </>
    );
}

export default ProductDetails;
