import { Link, useLocation } from 'react-router-dom';
import { FaUserSecret, FaTachometerAlt, FaGift, FaPowerOff, FaCreditCard, FaUtensils } from 'react-icons/fa'
import './AdminSidebar.css';

export const AdminSidebar = () => {
	const location = useLocation();

	const isDashboardActive = location.pathname === '/admin-dashboard';
	const isProductsActive = location.pathname === '/admin-product';
	const isOrdersActive = location.pathname === '/admin-order';
	const isPromotionsActive = location.pathname === '/admin-promotion';
	const isComboActive = location.pathname === '/admin-combo';

	return (
		<div>
			<div className="bg-sidebar" id="sidebar-wrapper" style={{backgroundColor: '#c4e4cb'}}>
				<div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom text-sidebar">
					<FaUserSecret /> MANAGER PAGE
				</div>
				<div className="list-group list-group-flush my-3">
					<Link
                        to={'/admin-dashboard'}
						className={`${isDashboardActive ? 'list-group-item list-group-item-action bg-transparent second-text fw-bold item-navigate item-active' : 'list-group-item list-group-item-action bg-transparent second-text fw-bold item-navigate'}`}
					>
						<FaTachometerAlt /> &nbsp;Dashboard
					</Link>
					<Link
                        to={'/admin-product'}
						className={`${isProductsActive ? 'list-group-item list-group-item-action bg-transparent second-text fw-bold item-navigate item-active' : 'list-group-item list-group-item-action bg-transparent second-text fw-bold item-navigate'}`}
					>
						<FaTachometerAlt /> &nbsp;Products
					</Link>
					<Link
                        to={'/admin-order'}
						className={`${isOrdersActive ? 'list-group-item list-group-item-action bg-transparent second-text fw-bold item-navigate item-active' : 'list-group-item list-group-item-action bg-transparent second-text fw-bold item-navigate'}`}
					>
						<FaGift /> &nbsp;Orders
					</Link>
					<Link
                        to={'/admin-promotion'}
						className={`${isPromotionsActive ? 'list-group-item list-group-item-action bg-transparent second-text fw-bold item-navigate item-active' : 'list-group-item list-group-item-action bg-transparent second-text fw-bold item-navigate'}`}
					>
						<FaCreditCard /> &nbsp;Promotions
					</Link>
					<Link
                        to={'/admin-combo'}
						className={`${isComboActive ? 'list-group-item list-group-item-action bg-transparent second-text fw-bold item-navigate item-active' : 'list-group-item list-group-item-action bg-transparent second-text fw-bold item-navigate'}`}
					>
						<FaUtensils /> &nbsp;Combo
					</Link>
					<Link
                        to={'/home'}
						className="list-group-item list-group-item-action bg-transparent text-danger fw-bold item-navigate"
					>
						<FaPowerOff /> &nbsp;Home page
					</Link>
				</div>
			</div>
		</div>
	);
};
