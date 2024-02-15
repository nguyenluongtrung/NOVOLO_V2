import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
	getProductsByCategory,
	reset,
    updateProduct,
} from '../../../../../features/products/productsSlice';
import { toast } from 'react-toastify';
import { getAllNewestPrices } from '../../../../../features/prices/pricesSlice';

export const UpdateCombo = ({ setIsOpenUpdateForm, handleGetAllCombos, chosenComboId }) => {
	const [image, setImage] = useState('');
	const [discount, setDiscount] = useState(0);
	const [mainCourse, setMainCourse] = useState({
		product: {},
		quantity: 0,
	});
	const [sideDish, setSideDish] = useState({
		product: {},
		quantity: 0,
	});
	const [beverage, setBeverage] = useState({
		product: {},
		quantity: 0,
	});
	const {
		mainCourses,
		sideDishes,
		beverages,
		isLoading: productLoading,
		isSuccess: productSuccess,
		isError: productError,
		message: productMessage,
	} = useSelector((state) => state.products);
	const {
		prices,
		isError: priceError,
		isLoading: priceLoading,
		message: priceMessage,
	} = useSelector((state) => state.prices);

	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleCloseBtn = () => {
		setIsOpenUpdateForm(false);
		handleGetAllCombos();
	};

	const handleImage = (e) => {
		setImage(URL.createObjectURL(e.target.files[0]));
	};

	const onSubmit = async (data) => {
		const mainCoursePrice = prices.find((price) => price.productId == mainCourse.product._id).price * mainCourse.quantity;
		const sideDishPrice = prices.find((price) => price.productId == sideDish.product._id).price * sideDish.quantity;
		const beveragePrice = prices.find((price) => price.productId == beverage.product._id).price * beverage.quantity;

		const calories =
			mainCourse.product.calories * mainCourse.quantity +
			sideDish.product.calories * sideDish.quantity +
			beverage.product.calories * beverage.quantity;

		const comboIngredients = [ 
			{
				productId: mainCourse.product._id,
				quantity: mainCourse.quantity
			},
			{
				productId: sideDish.product._id,
				quantity: sideDish.quantity
			},
			{
				productId: beverage.product._id,
				quantity: beverage.quantity
			},
		]

		const updateData = {
			...data,
			categoryID: '65bf55ce65e2e3ced184149a',
			calories,
			isSurprise: false,
			price: parseFloat((beveragePrice + sideDishPrice + mainCoursePrice) * (1 - discount)).toFixed(1),
			image: image,
			comboIngredients
		};

		await dispatch(updateProduct({chosenProductId: chosenComboId, updateData }));
		if (productSuccess) {
			toast.success('Update product successfully!');
			dispatch(reset());
			handleCloseBtn();
		} else if (productError) {
			toast.error(productMessage);
		}
	};

	const getAllMainCourseProducts = (mainCourse) => {
		dispatch(getProductsByCategory({ data: mainCourse, type: 'mainCourse' }));
	};

	const getAllBeverageProducts = (beverage) => {
		dispatch(getProductsByCategory({ data: beverage, type: 'beverage' }));
	};

	const getAllSideDishProducts = (sideDish) => {
		dispatch(getProductsByCategory({ data: sideDish, type: 'sideDish' }));
	};

	useEffect(() => {
		dispatch(getAllNewestPrices())
	}, [dispatch])

	return (
		<div className="popup active" id="popup-2">
			<div className="overlay"></div>
			<div className="content2">
				<div className="close-btn" onClick={() => setIsOpenUpdateForm(false)}>
					&times;
				</div>
				<p style={{ fontWeight: 'bold', textAlign: 'center' }}>UPDATE COMBO</p>
				<br />
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<table className="table bg-white rounded shadow-sm  table-hover">
							<thead>
								<tr>
									<th scope="col" style={{ fontSize: '90%' }}></th>
									<th scope="col" style={{ fontSize: '90%' }}>
										Category Name
									</th>
									<th scope="col" style={{ fontSize: '90%' }}>
										Product Name
									</th>
									<th scope="col" style={{ fontSize: '90%' }}>
										Quantity
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Main course</td>
									<td>
										<select
											style={{ width: '200px', height: '30px' }}
											onChange={(e) => getAllMainCourseProducts(e.target.value)}
										>
											<option value="">Select</option>
											<option value="Chicken">Chicken</option>
											<option value="Burger">Burger</option>
											<option value="Spaghetti">Spaghetti</option>
											<option value="Taco">Taco</option>
										</select>
									</td>
									<td>
										<select
											required
											style={{ width: '200px', height: '30px' }}
											name="product"
											onChange={(e) =>
												setMainCourse({
													...mainCourse,
													product: mainCourses.find(
														(product) => product._id === e.target.value
													),
												})
											}
										>
											<option disabled selected>
												Select a product
											</option>
											{mainCourses.map((product) => {
												return (
													<option className="py-1" value={product._id}>
														{product.name}
													</option>
												);
											})}
										</select>
									</td>
									<td>
										<input
											style={{ height: '30px' }}
											type="number"
											name="quantity"
											min="1"
											required
											onChange={(e) =>
												setMainCourse({
													...mainCourse,
													quantity: e.target.value,
												})
											}
										/>
									</td>
								</tr>
								<tr>
									<td>Side dish</td>

									<td>
										<select
											style={{ width: '200px', height: '30px' }}
											onChange={(e) => getAllSideDishProducts(e.target.value)}
										>
											<option value="">Select</option>
											<option value="Sandwich">Sandwich</option>
											<option value="Salad">Salad</option>
											<option value="French Fries">French Fries</option>
										</select>
									</td>
									<td>
										<select
											required
											style={{ width: '200px', height: '30px' }}
											name="product"
											onChange={(e) =>
												setSideDish({
													...sideDish,
													product: sideDishes.find(
														(product) => product._id === e.target.value
													),
												})
											}
										>
											<option disabled selected>
												Select a product
											</option>
											{sideDishes.map((product) => {
												return (
													<option className="py-1" value={product._id}>
														{product.name}
													</option>
												);
											})}
										</select>
									</td>
									<td>
										<input
											style={{ height: '30px' }}
											type="number"
											name="quantity"
											min="1"
											required
											onChange={(e) =>
												setSideDish({
													...sideDish,
													quantity: e.target.value,
												})
											}
										/>
									</td>
								</tr>
								<tr>
									<td>Beverage</td>

									<td>
										<select
											style={{ width: '200px', height: '30px' }}
											onChange={(e) => getAllBeverageProducts(e.target.value)}
										>
											<option value="">Select</option>
											<option value="Beverage">Beverage</option>
										</select>
									</td>
									<td>
										<select
											required
											style={{ width: '200px', height: '30px' }}
											name="product"
											onChange={(e) =>
												setBeverage({
													...beverage,
													product: beverages.find(
														(product) => product._id === e.target.value
													),
												})
											}
										>
											<option disabled selected>
												Select a product
											</option>
											{beverages.map((product) => {
												return (
													<option className="py-1" value={product._id}>
														{product.name}
													</option>
												);
											})}
										</select>
									</td>
									<td>
										<input
											style={{ height: '30px' }}
											type="number"
											name="quantity"
											min="1"
											required
											onChange={(e) =>
												setBeverage({
													...beverage,
													quantity: e.target.value,
												})
											}
										/>
									</td>
								</tr>
							</tbody>
						</table>

						<table className="table bg-white rounded shadow-sm table-hover">
							<thead>
								<tr>
									<th scope="col" style={{ fontSize: '90%' }}>
										Combo Name
									</th>
									<th scope="col" style={{ fontSize: '90%' }}>
										Exchanged points
									</th>
									<th scope="col" style={{ fontSize: '90%' }}>
										Accumulated points
									</th>
									<th scope="col" style={{ fontSize: '90%' }}>
										Discount
									</th>
									<th scope="col" style={{ fontSize: '90%' }}>
										Image
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<input
											className="py-1"
											type="text"
											{...register('name')}
											placeholder="Please give a name..."
											required
										/>
									</td>
									<td>
										<input
											className="py-1"
											type="number"
											{...register('exchangedPoint')}
											min="1"
											required
										/>
									</td>
									<td>
										<input
											className="py-1"
											type="number"
											{...register('accumulatedPoint')}
											min="1"
											required
										/>
									</td>
									<td>
										<input
											className="py-1"
											type="number"
											name="discount"
											min="0"
											max="1"
											step="0.01"
											onChange={(e) => setDiscount(e.target.value)}
											required
										/>
									</td>
									<td>
										<input
											className="py-1"
											type="file"
											name="image"
											onChange={handleImage}
										/>
									</td>
								</tr>
								<tr>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td colspan="1">
										<button
											className="btn btn-success py-2"
											style={{ width: '100%' }}
											type="submit"
										>
											SUBMIT
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
			</div>
		</div>
	);
};
