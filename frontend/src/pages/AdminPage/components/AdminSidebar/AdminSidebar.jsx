import React from 'react';
import { Link } from 'react-router-dom';

export const AdminSidebar = () => {
	return (
		<div>
			<div className="bg-white" id="sidebar-wrapper">
				<div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
					<i className="fas fa-user-secret me-2"></i>MANAGER PAGE
				</div>
				<div className="list-group list-group-flush my-3">
					<Link
                        to={'/admin-page'}
						className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
					>
						<i className="fas fa-tachometer-alt me-2"></i>Dashboard
					</Link>
					<Link
                        to={'/product-admin'}
						className="list-group-item list-group-item-action bg-transparent second-text active fw-bold"
					>
						<i className="fas fa-tachometer-alt me-2"></i>Products
					</Link>
					<Link
                        to={'/orders-admin'}
						className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
					>
						<i className="fas fa-gift me-2"></i>Orders
					</Link>
					<Link
                        to={'/feedback-admin'}
						className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
					>
						<i className="fas fa-comment-dots me-2"></i>Feedbacks
					</Link>
					<Link
                        to={'/sale-admin'}
						className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
					>
						<i className="fas fa-comment-dots me-2"></i>Sales
					</Link>
					<Link
                        to={'/home'}
						className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
					>
						<i className="fas fa-power-off me-2"></i>Home page
					</Link>
				</div>
			</div>
		</div>
	);
};
