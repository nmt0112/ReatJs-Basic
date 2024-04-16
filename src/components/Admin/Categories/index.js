import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCategories, setTotalPages] = useState(1);
    const headers = {
        Authorization: `Bearer ${Cookies.get('token')}`
    };

    const handleUpdateCategory = async (id) => {
        try {
            const categoryName = document.getElementById(`categoryName_${id}`).value;

            await axios.put(`http://127.0.0.1:8080/api/v1/categories/${id}`, { name: categoryName }, { headers });
            fetchBrandsAndProducts();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };



    const handleAddCategory = async () => {
        try {
            const categoryName = document.getElementById('categoryName').value;

            await axios.post('http://127.0.0.1:8080/api/v1/categories', { name: categoryName }, { headers });
            fetchBrandsAndProducts();
        } catch (error) {
            console.error('Error adding brand:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8080/api/v1/categories/${id}`, { headers });
            fetchBrandsAndProducts();
        } catch (error) {
            console.error('Error deleting brand:', error);
        }
    };

    const fetchBrandsAndProducts = async () => {
        try {
            const [categoriesResponse] = await Promise.all([
                axios.get(`http://127.0.0.1:8080/api/v1/categories?page=${currentPage}&limit=5`, { headers })
            ]);
            setCategories(categoriesResponse.data.data.categories);
            setTotalPages(Math.ceil(categoriesResponse.data.data.totalCategories / 5));
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
        if (currentPage < totalCategories) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="page-inner" style={{ paddingLeft: '17%' }}>
            <div className="page-header">
                <h4 className="page-title">Quản Lý Danh Mục</h4>
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
                        <a>Danh Mục</a>
                    </li>
                </ul>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex align-items-center">
                                <h4 className="card-title">Thêm danh mục</h4>
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
                                                <label htmlFor="categoryName">Tên Danh Mục:</label>
                                                <input type="text" className="form-control" id="categoryName" />
                                            </div>
                                            <button className="btn btn-primary btn-round ml-auto" onClick={handleAddCategory} data-dismiss="modal">
                                                <i className="fa fa"></i>
                                                Thêm Mới
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table fixed-table table-striped table-hover" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '190px' }}>Tên</th>
                                            <th style={{ width: '190px' }}>Trạng Thái</th>
                                            <th style={{ width: '190px' }}>Hành Động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map(category => (
                                            <tr key={category._id}>
                                                <td>{category.name}</td>
                                                <td>{category.isDelete ? 'Đã Xóa' : 'Hoạt Động'}</td>
                                                <td>
                                                    <button type="button" className="btn btn-link btn-primary btn-lg btn-edit" data-toggle="modal" data-target={`#editPopup_${category._id}`} title="Edit Task">
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-link btn-danger btn-lg btn-delete" data-toggle="modal" data-target={`#deletePopup_${category._id}`} title="Remove">
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </td>
                                                {/* Popup Chỉnh sửa */}
                                                <div id={`editPopup_${category._id}`} className="modal fade" tabIndex="-1" role="dialog">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="form-group">
                                                                    <label htmlFor={`categoryName_${category._id}`}>Tên Danh Mục:</label>
                                                                    <input type="text" className="form-control" id={`categoryName_${category._id}`} defaultValue={category.name} />
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-primary" onClick={() => handleUpdateCategory(category._id)} data-dismiss="modal">Lưu Thay Đổi</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Popup Xóa */}
                                                <div id={`deletePopup_${category._id}`} className="modal fade" tabIndex="-1" role="dialog">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <label>Bạn có muốn xóa {category.name} hay không</label>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-primary" onClick={() => handleDeleteCategory(category._id)} data-dismiss="modal">Lưu Thay Đổi</button>
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
                                        Trang {currentPage} / {totalCategories}
                                    </span>
                                    <button onClick={goToNextPage} disabled={currentPage === totalCategories}>
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

export default Categories;
