import { Link } from 'react-router-dom';
import { FaUserSecret, FaTachometerAlt, FaGift, FaCommentDots, FaPowerOff, FaCreditCard } from 'react-icons/fa'

export const AdminSidebar = () => {
	return (
		<div>
			<div className="bg-white" id="sidebar-wrapper">
				<div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
					<FaUserSecret />MANAGER PAGE
				</div>
				<div className="list-group list-group-flush my-3">
					<Link
                        to={'/admin-dashboard'}
						className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
					>
						<FaTachometerAlt />Dashboard
					</Link>
					<Link
                        to={'/admin-product'}
						className="list-group-item list-group-item-action bg-transparent second-text active fw-bold"
					>
						<FaTachometerAlt />Products
					</Link>
					<Link
                        to={'/admin-order'}
						className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
					>
						<FaGift />Orders
					</Link>
					<Link
                        to={'/admin-feedback'}
						className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
					>
						<FaCommentDots />Feedbacks
					</Link>
					<Link
                        to={'/admin-sale'}
						className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
					>
						<FaCreditCard />Sales
					</Link>
					<Link
                        to={'/admin-combo'}
						className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
					>
						<FaCreditCard />Combo
					</Link>
					<Link
                        to={'/home'}
						className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
					>
						<FaPowerOff />Home page
					</Link>
				</div>
			</div>
		</div>
	);
};
