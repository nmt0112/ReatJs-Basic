import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Brands() {
    const [brands, setBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBrands, setTotalPages] = useState(1);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedBrandImage, setSelectedBrandImage] = useState({});
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

    const handleBrandImageChange = (event, brandId) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setSelectedBrandImage({ ...selectedBrandImage, [brandId]: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateBrand = async (id) => {
        try {
            const formData = new FormData();
            formData.append('name', document.getElementById(`brandName_${id}`).value);

            if (document.getElementById(`brandImage_${id}`).files.length > 0) {
                formData.append('image', document.getElementById(`brandImage_${id}`).files[0]);
            }

            await axios.put(`http://127.0.0.1:8080/api/v1/brands/${id}`, formData, { headers });
            fetchBrandsAndProducts();
            setSelectedImage('');
        } catch (error) {
            console.error('Error updating brand:', error);
        }
    };


    const handleAddBrand = async () => {
        try {
            const name = document.getElementById('brandName').value;
            const image = document.getElementById('brandImage').files[0];

            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', image);

            await axios.post(`http://127.0.0.1:8080/api/v1/brands`, formData, { headers });
            fetchBrandsAndProducts();
            setSelectedImage('');
        } catch (error) {
            console.log(error);
            console.error('Error adding brand:', error);
        }
    };

    const handleDeleteBrand = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8080/api/v1/brands/${id}`, { headers });
            fetchBrandsAndProducts();
        } catch (error) {
            console.error('Error deleting brand:', error);
        }
    };

    const fetchBrandsAndProducts = async () => {
        try {
            const [brandsResponse] = await Promise.all([
                axios.get(`http://127.0.0.1:8080/api/v1/brands?page=${currentPage}&limit=5`, { headers })
            ]);
            setBrands(brandsResponse.data.data.brands);
            setTotalPages(Math.ceil(brandsResponse.data.data.totalBrands / 5));
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
        if (currentPage < totalBrands) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="page-inner" style={{ paddingLeft: '17%' }}>
            <div className="page-header">
                <h4 className="page-title">Quản Lý Thương Hiệu</h4>
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
                        <a>Thương hiệu</a>
                    </li>
                </ul>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex align-items-center">
                                <h4 className="card-title">Thêm thương hiệu</h4>
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
                                                <label htmlFor="brandName">Tên Thương Hiệu:</label>
                                                <input type="text" className="form-control" id="brandName" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="brandImage">Ảnh Thương Hiệu:</label>
                                                <div>
                                                    {selectedImage && <img src={selectedImage} alt="Selected brand" style={{ width: '200px', height: 'auto' }} />}
                                                </div>
                                                <input type="file" className="form-control-file" id="brandImage" onChange={handleImageChange} />
                                            </div>
                                            <button className="btn btn-primary btn-round ml-auto" onClick={handleAddBrand} data-dismiss="modal">
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
                                            <th style={{ width: '190px' }}>Ảnh</th>
                                            <th style={{ width: '190px' }}>Trạng Thái</th>
                                            <th style={{ width: '190px' }}>Hành Động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {brands.map(brand => (
                                            <tr key={brand._id}>
                                                <td>{brand.name}</td>
                                                <td>
                                                    <img src={`http://127.0.0.1:8080/${brand.image}`} alt={brand.name} style={{ width: '100px', height: 'auto' }} />
                                                </td>
                                                <td>{brand.isDelete ? 'Đã Xóa' : 'Hoạt Động'}</td>
                                                <td>
                                                    <button type="button" className="btn btn-link btn-primary btn-lg btn-edit" data-toggle="modal" data-target={`#editPopup_${brand._id}`} title="Edit Task">
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-link btn-danger btn-lg btn-delete" data-toggle="modal" data-target={`#deletePopup_${brand._id}`} title="Remove">
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </td>
                                                {/* Popup Chỉnh sửa */}
                                                <div id={`editPopup_${brand._id}`} className="modal fade" tabIndex="-1" role="dialog">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="form-group">
                                                                    <label htmlFor={`brandName_${brand._id}`}>Tên Thương Hiệu:</label>
                                                                    <input type="text" className="form-control" id={`brandName_${brand._id}`} defaultValue={brand.name} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Ảnh Thương Hiệu thay đổi</label>
                                                                    <div>
                                                                        {selectedBrandImage[brand._id] && <img src={selectedBrandImage[brand._id]} alt="Selected brand" style={{ width: '200px', height: 'auto' }} />}
                                                                    </div>
                                                                    <input type="file" className="form-control-file" id={`brandImage_${brand._id}`} onChange={(e) => handleBrandImageChange(e, brand._id)} />
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-primary" onClick={() => handleUpdateBrand(brand._id)} data-dismiss="modal">Lưu Thay Đổi</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Popup Xóa */}
                                                <div id={`deletePopup_${brand._id}`} className="modal fade" tabIndex="-1" role="dialog">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <label>Bạn có muốn xóa {brand.name} hay không</label>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-primary" onClick={() => handleDeleteBrand(brand._id)} data-dismiss="modal">Lưu Thay Đổi</button>
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
                                        Trang {currentPage} / {totalBrands}
                                    </span>
                                    <button onClick={goToNextPage} disabled={currentPage === totalBrands}>
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

export default Brands;
