import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Products() {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [totalProducts, setTotalPages] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedProductImage, setSelectedProductImage] = useState({});
    const headers = {
        Authorization: `Bearer ${Cookies.get('token')}`
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const getBrandName = (brandId) => {
        const brand = brands.find(brand => brand._id === brandId);
        return brand ? brand.name : '';
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(category => category._id === categoryId);
        return category ? category.name : '';
    };

    const handleProductImageChange = (event, productId) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setSelectedProductImage({ ...selectedProductImage, [productId]: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProduct = async (id) => {
        try {
            const formData = new FormData();
            formData.append('name', document.getElementById(`productName_${id}`).value);
            formData.append('price', document.getElementById(`productPrice_${id}`).value);
            formData.append('description', document.getElementById(`productDescription_${id}`).value);
            if (document.getElementById(`productImage_${id}`).files.length > 0) {
                formData.append('image', document.getElementById(`productImage_${id}`).files[0]);
            }
            formData.append('brand', document.getElementById(`productBrand_${id}`).value);
            formData.append('category', document.getElementById(`productCategory_${id}`).value);
            await axios.put(`http://127.0.0.1:8080/api/v1/products/${id}`, formData, { headers });
            fetchBrandsAndProducts();
            setSelectedImage('');
        } catch (error) {
            console.error('Error updating brand:', error);
        }
    };


    const handleAddProduct = async () => {
        try {
            const name = document.getElementById('productName').value;
            const price = document.getElementById('productPrice').value;
            const description = document.getElementById('productDescription').value;
            const image = document.getElementById('productImage').files[0];
            const brandId = document.getElementById('brand').value;
            const categoryId = document.getElementById('category').value;
            console.log(brandId);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('image', image);
            formData.append('brand', brandId);
            formData.append('category', categoryId);

            await axios.post(`http://127.0.0.1:8080/api/v1/products`, formData, { headers });
            fetchBrandsAndProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8080/api/v1/products/${id}`, { headers });
            fetchBrandsAndProducts();
        } catch (error) {
            console.error('Error deleting brand:', error);
        }
    };

    const fetchBrandsAndProducts = async () => {
        try {
            const [productsResponse, brandsResponse, categoriesResponse] = await Promise.all([
                axios.get(`http://127.0.0.1:8080/api/v1/products?page=${currentPage}&limit=5`, { headers }),
                axios.get(`http://127.0.0.1:8080/api/v1/brands`, { headers }),
                axios.get(`http://127.0.0.1:8080/api/v1/categories`, { headers })
            ]);
            setProducts(productsResponse.data.data.products);
            setBrands(brandsResponse.data.data.brands);
            setCategories(categoriesResponse.data.data.categories);
            setTotalPages(Math.ceil(productsResponse.data.data.totalProducts / 5));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchBrandsAndProducts();
    }, [currentPage]);

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

    return (
        <div className="page-inner" style={{ paddingLeft: '17%' }}>
            <div className="page-header">
                <h4 className="page-title">Quản Lý sản phẩm</h4>
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
                        <a>sản phẩm</a>
                    </li>
                </ul>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex align-items-center">
                                <h4 className="card-title">Thêm sản phẩm</h4>
                                <button className="btn btn-primary btn-round ml-auto" data-toggle="modal" data-target="#addRowModal">
                                    <i className="fa fa-plus"></i>
                                    Thêm Mới
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="modal fade" id="addRowModal" tabIndex="-1" role="dialog" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header no-bd">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label htmlFor="productName">Tên Sản Phẩm:</label>
                                                <input type="text" className="form-control" id="productName" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="productPrice">Giá:</label>
                                                <input type="text" className="form-control" id="productPrice" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="productDescription">Mô tả:</label>
                                                <input type="text" className="form-control" id="productDescription" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="productImage">Ảnh sản phẩm:</label>
                                                <div>
                                                    {selectedImage && <img src={selectedImage} alt="Selected product" style={{ width: '200px', height: 'auto' }} />}
                                                </div>
                                                <input type="file" className="form-control-file" id="productImage" onChange={handleImageChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="brand">sản phẩm:</label>
                                                <select id="brand" className="form-control">
                                                    <option value="">Chọn sản phẩm</option>
                                                    {brands.map(brand => (
                                                        <option key={brand._id} value={brand._id}>{brand.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="category">Danh mục:</label>
                                                <select id="category" className="form-control">
                                                    <option value="">Chọn danh mục</option>
                                                    {categories.map(category => (
                                                        <option key={category._id} value={category._id}>{category.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <button className="btn btn-primary btn-round ml-auto" onClick={handleAddProduct} data-dismiss="modal">
                                                <i className="fa fa"></i>
                                                Thêm Mới
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table fixed-table table-striped table-hover" >
                                    <thead>
                                        <tr>
                                            <th style={{ width: '200px' }}>Tên</th>
                                            <th style={{ width: '150px' }}>Ảnh</th>
                                            <th style={{ width: '100px' }}>Giá</th>
                                            <th style={{ width: '190px' }}>Mô Tả</th>
                                            <th style={{ width: '210px' }}>sản phẩm</th>
                                            <th style={{ width: '190px' }}>Danh Mục</th>
                                            <th style={{ width: '190px' }}>Trạng Thái</th>
                                            <th style={{ width: '200px' }}>Hành Động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product._id}>
                                                <td>{product.name}</td>
                                                <td>
                                                    <img src={`http://127.0.0.1:8080/${product.image}`} alt={product.name} style={{ width: '200px', height: 'auto' }} />
                                                </td>
                                                <td>{product.price}</td>
                                                <td>{product.description}</td>
                                                <td>{getBrandName(product.brand)}</td>
                                                <td>{getCategoryName(product.category)}</td>
                                                <td>{product.isDelete ? 'Đã Xóa' : 'Hoạt Động'}</td>
                                                <td>
                                                    <button type="button" className="btn btn-link btn-primary btn-lg btn-edit" data-toggle="modal" data-target={`#editPopup_${product._id}`} title="Edit Task">
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-link btn-danger btn-lg btn-delete" data-toggle="modal" data-target={`#deletePopup_${product._id}`} title="Remove">
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </td>
                                                {/* Popup Chỉnh sửa */}
                                                <div id={`editPopup_${product._id}`} className="modal fade" tabIndex="-1" role="dialog">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title">Chỉnh sửa sản phẩm</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="form-group">
                                                                    <label htmlFor={`productName_${product._id}`}>Tên sản phẩm:</label>
                                                                    <input type="text" className="form-control" id={`productName_${product._id}`} defaultValue={product.name} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor={`productPrice_${product._id}`}>Giá:</label>
                                                                    <input type="text" className="form-control" id={`productPrice_${product._id}`} defaultValue={product.price} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor={`productDescription_${product._id}`}>Mô tả:</label>
                                                                    <input type="text" className="form-control" id={`productDescription_${product._id}`} defaultValue={product.description} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Ảnh sản phẩm:</label>
                                                                    <div>
                                                                        {selectedProductImage[product._id] && <img src={selectedProductImage[product._id]} alt="Selected product" style={{ width: '200px', height: 'auto' }} />}
                                                                    </div>
                                                                    <input type="file" className="form-control-file" id={`productImage_${product._id}`} onChange={(e) => handleProductImageChange(e, product._id)} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>sản phẩm:</label>
                                                                    <select id={`productBrand_${product._id}`} className="form-control">

                                                                        {brands.map(brand => (
                                                                            <option key={brand._id} value={brand._id} selected={brand._id === product.brand}>{brand.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Danh mục:</label>
                                                                    <select id={`productCategory_${product._id}`} className="form-control">
                                                                        {categories.map(category => (
                                                                            <option key={category._id} value={category._id} selected={category._id === product.category}>{category.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>

                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-primary" onClick={() => handleUpdateProduct(product._id)} data-dismiss="modal">Lưu thay đổi</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Popup Xóa */}
                                                <div id={`deletePopup_${product._id}`} className="modal fade" tabIndex="-1" role="dialog">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <label>Bạn có muốn xóa {product.name} hay không</label>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-primary" onClick={() => handleDeleteProduct(product._id)} data-dismiss="modal">Lưu Thay Đổi</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div style={{ paddingLeft: '600px', margin: '10px' }}>
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
                </div>
            </div>
        </div>
    );
}

export default Products;
