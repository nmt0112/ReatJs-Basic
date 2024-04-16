import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Users() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalPages] = useState(1);
    const headers = {
        Authorization: `Bearer ${Cookies.get('token')}`
    };

    const [includeRole, setIncludeRole] = useState(false);

    const handleAddUser = async () => {
        try {
            const username = document.getElementById('userName').value;
            const password = document.getElementById('password').value;
            const email = document.getElementById('email').value;
            const role = includeRole ? ["ADMIN"] : ["USER"];

            const userData = {
                username: username,
                password: password,
                email: email,
                role: role
            };

            await axios.post('http://127.0.0.1:8080/api/v1/users', userData, { headers });
            fetchBrandsAndProducts();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8080/api/v1/users/${id}`, { headers });
            fetchBrandsAndProducts();
        } catch (error) {
            console.error('Error deleting brand:', error);
        }
    };

    const fetchBrandsAndProducts = async () => {
        try {
            const [usersResponse] = await Promise.all([
                axios.get(`http://127.0.0.1:8080/api/v1/users?page=${currentPage}&limit=5`, { headers })
            ]);
            setUsers(usersResponse.data.data.users);
            setTotalPages(Math.ceil(usersResponse.data.data.totalUsers / 5));
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
        if (currentPage < totalUsers) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="page-inner" style={{ paddingLeft: '17%' }}>
            <div className="page-header">
                <h4 className="page-title">Quản Lý Tài khoản</h4>
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
                        <a>Tài khoản</a>
                    </li>
                </ul>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex align-items-center">
                                <h4 className="card-title">Thêm Tài khoản</h4>
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
                                                <label htmlFor="userName">Tên Tài khoản:</label>
                                                <input type="text" className="form-control" id="userName" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Mật khẩu:</label>
                                                <input type="password" className="form-control" id="password" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email:</label>
                                                <input type="email" className="form-control" id="email" />
                                            </div>
                                            <div className="form-group">
                                                <input type="checkbox" id="includeRole" checked={includeRole} onChange={() => setIncludeRole(!includeRole)} />
                                                <label htmlFor="includeRole">Bao gồm vai trò (role)</label>
                                            </div>
                                            <button className="btn btn-primary btn-round ml-auto" onClick={handleAddUser} data-dismiss="modal">
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
                                            <th style={{ width: '190px' }}>Email</th>
                                            <th style={{ width: '190px' }}>Role</th>
                                            <th style={{ width: '190px' }}>Trạng Thái</th>
                                            <th style={{ width: '190px' }}>Hành Động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user._id}>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>{user.status ? 'Đã Xóa' : 'Hoạt Động'}</td>
                                                <td>
                                                    <button type="button" className="btn btn-link btn-danger btn-lg btn-delete" data-toggle="modal" data-target={`#deletePopup_${user._id}`} title="Remove">
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </td>
                                                {/* Popup Xóa */}
                                                <div id={`deletePopup_${user._id}`} className="modal fade" tabIndex="-1" role="dialog">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <label>Bạn có muốn xóa {user.username} hay không</label>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-primary" onClick={() => handleDeleteUser(user._id)} data-dismiss="modal">Lưu Thay Đổi</button>
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
                                        Trang {currentPage} / {totalUsers}
                                    </span>
                                    <button onClick={goToNextPage} disabled={currentPage === totalUsers}>
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

export default Users;
