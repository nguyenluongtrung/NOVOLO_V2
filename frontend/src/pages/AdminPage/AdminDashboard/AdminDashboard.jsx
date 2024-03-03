import { useEffect, useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar/AdminSidebar';
import './AdminDashboard.css';
import { FaGift, FaHandHoldingUsd, FaTruck, FaChartLine } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
	get5BestSellingProducts,
	get5HighestRatingProducts,
	get5LowestRatingProducts,
	getRevenueByCategory,
} from '../../../features/products/productsSlice';
import Chart from 'react-apexcharts';

export const AdminDashboard = () => {
	const { highestRatingProducts, lowestRatingProducts, bestSellingProducts, revenueByCategories } =
		useSelector((state) => state.products);

	const [state, setState] = useState({
		options: {
			colors: ['#E91E63', '#FF9800'],
			chart: {
				id: 'basic-bar',
			},
			xaxis: {
				categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
			},
		},
		series: [
			{
			  name: "Revenue",
			  data: [revenueByCategories[0].total, revenueByCategories[1].total, revenueByCategories[2].total, revenueByCategories[3].total, revenueByCategories[4].total, revenueByCategories[5].total],
			}
		  ],
	});
	const dispatch = useDispatch();

	useEffect(() => {
		Promise.all([
			dispatch(get5HighestRatingProducts()),
			dispatch(get5LowestRatingProducts()),
			dispatch(get5BestSellingProducts()),
			dispatch(getRevenueByCategory()),
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
					<div class="row my-5">
						<h3 class="fs-4 mb-3">Revenue</h3>
						<div class="charts-card" style={{ width: 700 }}>
							<Chart
								options={state.options}
								series={state.series}
								type="bar"
								width="750"
							/>
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
									{bestSellingProducts.map((product) => {
										return (
											<tr>
												<td>{product.product.name}</td>
												<td>{product.totalQuantity}</td>
											</tr>
										);
									})}
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
				</div>
			</div>
		</div>
	);
};
