import { useEffect, useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar/AdminSidebar';
import './AdminDashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	get5BestSellingProducts,
	get5HighestRatingProducts,
	get5LowestRatingProducts,
	getRevenueByCategory,
} from '../../../features/products/productsSlice';
import Chart from 'react-apexcharts';
import { getAllCategories } from '../../../features/categories/categoriesSlice';
import { Spinner } from '../../../components';

export const AdminDashboard = () => {
	const {
		highestRatingProducts,
		lowestRatingProducts,
		bestSellingProducts,
		revenueByCategories,
		isLoading,
	} = useSelector((state) => state.products);
	const { categories } = useSelector((state) => state.categories);
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [state, setState] = useState({
		options: {
			colors: ['#E91E63', '#FF9800'],
			chart: {
				id: 'basic-bar',
			},
			xaxis: {
				categories: [],
			},
		},
		series: [
			{
				name: 'Revenue',
				data: [],
			},
		],
	});
	const [pieState, setPieState] = useState({
		series: [],
		options: {
			chart: {
				width: 380,
				type: 'pie',
			},
			labels: [],
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
						},
						legend: {
							position: 'bottom',
						},
					},
				},
			],
		},
	});

	const dispatch = useDispatch();

	useEffect(() => {
		Promise.all([
			dispatch(get5BestSellingProducts()),
			dispatch(getRevenueByCategory()),
			dispatch(getAllCategories()),
		])
			.then(() => {
				setIsDataLoaded(true);
			})
			.catch((error) => {
				console.error('Error during dispatch:', error);
			});
	}, [dispatch]);

	useEffect(() => {
		Promise.all([
			dispatch(get5HighestRatingProducts()),
			dispatch(get5LowestRatingProducts()),
		]).catch((error) => {
			console.error('Error during dispatch:', error);
		});
	}, [dispatch]);

	useEffect(() => {
		if (isDataLoaded) {
			let revenueTotal = [];
			let revenueName = [];

			revenueByCategories.forEach((revenue) => {
				revenueTotal.push(revenue.total);
				revenueName.push(
					categories[categories.findIndex((cat) => cat._id === revenue._id)]
						.name
				);
			});

			let bestSellingTotal = [];
			let bestSellingName = [];

			bestSellingProducts.forEach((product) => {
				bestSellingName.push(product.product.name);
				bestSellingTotal.push(product.totalQuantity);
			});

			setState({
				options: {
					colors: ['#E91E63', '#FF9800'],
					chart: {
						id: 'basic-bar',
					},
					xaxis: {
						categories: revenueName,
					},
				},
				series: [
					{
						name: 'Revenue',
						data: revenueTotal,
					},
				],
			});

			setPieState({
				series: bestSellingTotal,
				options: {
					chart: {
						width: 380,
						type: 'pie',
					},
					labels: bestSellingName,
					responsive: [
						{
							breakpoint: 480,
							options: {
								chart: {
									width: 200,
								},
								legend: {
									position: 'bottom',
								},
							},
						},
					],
				},
			});
		}
	}, [categories, revenueByCategories, bestSellingProducts, isDataLoaded]);

	console.log(pieState);

	if (
		isLoading ||
		!Array.isArray(highestRatingProducts) ||
		!Array.isArray(lowestRatingProducts) ||
		!Array.isArray(bestSellingProducts) ||
		!Array.isArray(revenueByCategories)
	) {
		return <Spinner />;
	}

	return (
		<div className="d-flex" id="wrapper">
			<AdminSidebar />

			<div id="page-content-wrapper">
				<nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
					<div className="d-flex align-items-center">
						<i
							className="fas fa-align-left primary-text fs-4 me-3"
							id="menu-toggle"
						></i>
						<h2 className="fs-2 m-0">Dashboard</h2>
					</div>

					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
				</nav>

				<div className="container-fluid px-4">
					<div className="row my-5">
						<h3 className="fs-4 mb-3">Revenue</h3>
						<div className="charts-card" style={{ width: 700 }}>
							<Chart
								options={state.options}
								series={state.series}
								type="bar"
								width="750"
							/>
						</div>
					</div>

					<div className="row my-5">
						<div className="col-sm-6">
							<h3 className="fs-4 mb-3">5 highest rating products</h3>
							<table className="table bg-white rounded shadow-sm  table-hover">
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
						<div className="col-sm-6">
							<h3 className="fs-4 mb-3">5 lowest rating products</h3>
							<table className="table bg-white rounded shadow-sm  table-hover">
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

					<div className="row my-5">
						<h3 className="fs-4 mb-3">Top 5 hot products</h3>
						<div className="charts-card" style={{ width: 700 }}>
							<div className="donut">
								<Chart
									options={pieState.options}
									series={pieState.series}
									type="pie"
									width={500}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
