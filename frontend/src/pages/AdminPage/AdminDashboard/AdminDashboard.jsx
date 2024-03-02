import { useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar/AdminSidebar';
import './AdminDashboard.css';
import { FaGift, FaHandHoldingUsd, FaTruck, FaChartLine } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
	get5HighestRatingProducts,
	get5LowestRatingProducts,
} from '../../../features/products/productsSlice';

export const AdminDashboard = () => {
	const dispatch = useDispatch();

	const { highestRatingProducts, lowestRatingProducts } = useSelector(
		(state) => state.products
	);

	useEffect(() => {
		Promise.all([
			dispatch(get5HighestRatingProducts()),
			dispatch(get5LowestRatingProducts()),
		]).catch((error) => {
			console.error('Error during dispatch:', error);
		});
	}, [dispatch]);

	return (
		<div class="d-flex" id="wrapper">
			<AdminSidebar />

			<div id="page-content-wrapper">
				<nav class="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
					<div class="d-flex align-items-center">
						<i
							class="fas fa-align-left primary-text fs-4 me-3"
							id="menu-toggle"
						></i>
						<h2 class="fs-2 m-0">Dashboard</h2>
					</div>

					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
				</nav>

				<div class="container-fluid px-4">
					<div class="row g-3 my-2">
						<div class="col-md-3">
							<div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
								<div>
									<h3 class="fs-2"></h3>
									<p class="fs-5">Products</p>
								</div>
								<FaGift />
							</div>
						</div>

						<div class="col-md-3">
							<div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
								<div>
									<h3 class="fs-2"></h3>
									<p class="fs-5">Orders</p>
								</div>
								<FaHandHoldingUsd />
							</div>
						</div>

						<div class="col-md-3">
							<div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
								<div>
									<h3 class="fs-2"></h3>
									<p class="fs-5">Sellers</p>
								</div>
								<FaTruck />
							</div>
						</div>

						<div class="col-md-3">
							<div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
								<div>
									<h3 class="fs-2"></h3>
									<p class="fs-5">Accounts</p>
								</div>
								<FaChartLine />
							</div>
						</div>
					</div>

					<div class="row my-5">
						<div class="col-sm-6">
							<h3 class="fs-4 mb-3">Top 5 hot products</h3>
							<table class="table bg-white rounded shadow-sm  table-hover">
								<thead>
									<tr>
										<th scope="col">Product Name</th>
										<th scope="col">Total Sold Quantity</th>
									</tr>
								</thead>
								<tbody>
									{/* <c:forEach items="${hList}" var="c">
										<tr>
											<td>${c.productID}</td>
											<td>${c.name}</td>
											<td>${c.totalQuantity}</td>
										</tr>
									</c:forEach> */}
								</tbody>
							</table>
						</div>
						<div class="col-sm-6">
							<h3 class="fs-4 mb-3">The 5 worst products</h3>
							<table class="table bg-white rounded shadow-sm  table-hover">
								<thead>
									<tr>
										<th scope="col">Product Name</th>
										<th scope="col">Total Sold Quantity</th>
									</tr>
								</thead>
								<tbody>
									{/* <c:forEach items="${wList}" var="c">
										<tr>
											<td>${c.productID}</td>
											<td>${c.name}</td>
											<td>${c.totalQuantity}</td>
										</tr>
									</c:forEach> */}
								</tbody>
							</table>
						</div>
					</div>

					<div class="row my-5">
						<div class="col-sm-6">
							<h3 class="fs-4 mb-3">5 highest rating products</h3>
							<table class="table bg-white rounded shadow-sm  table-hover">
								<thead>
									<tr>
										<th scope="col">Product Name</th>
										<th scope="col">Rating</th>
									</tr>
								</thead>
								<tbody>
									{highestRatingProducts.map((product) => {
										return (
											<tr>
												<td>{product.name}</td>
												<td>{product.rating}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
						<div class="col-sm-6">
							<h3 class="fs-4 mb-3">5 lowest rating products</h3>
							<table class="table bg-white rounded shadow-sm  table-hover">
								<thead>
									<tr>
										<th scope="col">Product Name</th>
										<th scope="col">Rating</th>
									</tr>
								</thead>
								<tbody>
									{lowestRatingProducts.map((product) => {
										return (
											<tr>
												<td>{product.name}</td>
												<td>{product.rating}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>

					<div class="row my-5">
						<h3 class="fs-4 mb-3">Revenue</h3>
						<div class="charts-card">
							<div id="bar-chart"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
