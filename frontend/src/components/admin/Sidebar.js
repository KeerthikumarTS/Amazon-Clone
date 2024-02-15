import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

export default function Sidebar () {

    const navigate = useNavigate();

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                <li>
                    <Link to="/admin/dashboard"><i className="fa-solid fa-chart-line"></i> Dashboard</Link>
                </li>
        
                <li>
                    <NavDropdown title={
                    <span>
                        <i className="fa-brands fa-product-hunt"></i>
                        Products
                    </span>
                }>
                        <NavDropdown.Item  onClick={() => navigate('/admin/products')} ><i className="fa-solid fa-table-list"></i>All Products</NavDropdown.Item>
                        <NavDropdown.Item  onClick={() => navigate('/admin/products/create')} ><i className="fa-solid fa-square-plus"></i>Create</NavDropdown.Item>
                    </NavDropdown>
                </li>

                <li>
                    <Link to="/admin/orders"><i className="fa-solid fa-truck-fast"></i> Orders</Link>
                </li>

                <li>
                    <Link to="/admin/users"><i className="fa-solid fa-users"></i> Users</Link>
                </li>

                <li>
                    <Link to="/admin/reviews"><i className="fa-solid fa-pen-to-square"></i> Reviews</Link>
                </li>
        
            </ul>
            </nav>
        </div>
    )
}