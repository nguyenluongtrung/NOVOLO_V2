import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Spinner } from '../../../../../components';
import './AddPromotion.css';
import { FaTimes } from 'react-icons/fa';
import { getAllProducts } from '../../../../../features/products/productsSlice';
import { useEffect, useState } from 'react';
import { createPromotion } from '../../../../../features/promotion/promotionsSlice';

export const AddPromotion = ({ setIsOpenAddForm }) => {
	const dispatch = useDispatch();

	const [selectedProducts, setSelectedProducts] = useState([]);

	const {
		products,
		isError: productError,
		isSuccess: productSuccess,
		isLoading: productLoading,
		message: productMessage,
	} = useSelector((state) => state.products);

	const {
		isLoading: promotionLoading,
		isSuccess: promotionSuccess,
		isError: promotionError,
		message: promotionMessage,
	} = useSelector((state) => state.promotions);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleCloseBtn = () => {
		setIsOpenAddForm(false);
	};

	const onSubmit = async (data) => {
		const promotionData = {
			...data,
			productIds: selectedProducts,
		};

		await dispatch(createPromotion(promotionData));

		if (promotionSuccess) {
			toast.success('Create promotion successfully!');
			handleCloseBtn();
		}
	};

	useEffect(() => {
		if (productError) {
			toast.error(productMessage);
		}

		Promise.all([dispatch(getAllProducts(''))]).catch((error) => {
			console.error('Error during dispatch:', error);
		});
	}, [dispatch, productError, productMessage]);

	const handleProductDeselect = (productId) => {
		const updatedSelectedProducts = selectedProducts.filter(
			(product) => product !== productId
		);
		setSelectedProducts(updatedSelectedProducts);
	};

	if (promotionLoading) {
		return <Spinner />;
	}

	return (
		<div>
			<div className="overlay-addPromotion"></div>
			<div className="content">
				<div className="addPromotionForm">
					<p
						style={{
							fontSize: '30px',
							fontWeight: 'bold',
							textAlign: 'center',
						}}
					>
						ADD NEW PROMOTION
					</p>

					<div className="column">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div
								onClick={() => setIsOpenAddForm(false)}
								className="close-btn"
							>
								<FaTimes size={25} />
							</div>
							<div className="input-box">
								<label>
									Product <span className="text-danger">*</span>
								</label>
								<select
									size={6}
									{...register('productIds')}
									multiple
									onChange={(e) => {
										setSelectedProducts([...selectedProducts, e.target.value]);
									}}
								>
									{products.map((product) => {
										if (
											selectedProducts.findIndex(
												(selectedId) => selectedId == product._id
											) == -1
										)
											return (
												<option key={product._id} value={product._id}>
													{product.name}
												</option>
											);
									})}
								</select>
							</div>
							<div className="selected-products">
								<p>Selected Products:</p>
								<ul>
									{selectedProducts.map((selectedId) => {
										return (
											<li key={selectedId}>
												{
													products[
														products.findIndex(
															(product) => product._id == selectedId
														)
													].name
												}
												<button
													className="delete-btn-pname"
													onClick={() => handleProductDeselect(selectedId)}
												>
													<FaTimes />
												</button>
											</li>
										);
									})}
								</ul>
							</div>

							<div className="input-box">
								<label>
									Promotion Name <span className="text-danger">*</span>
								</label>

								<input
									type="text"
									{...register('promotionName')}
									placeholder="Enter Sale name"
									required
								/>

								<label>
									Promotion Value <span className="text-danger">*</span>
								</label>
								<input
									type="text"
									{...register('promotionValue')}
									placeholder="Enter value"
									required
									min="0"
								/>
							</div>

							<div className="input-box">
								<label>
									Start Date <span className="text-danger">*</span> &nbsp;
									&nbsp;
								</label>
								<input
									type="date"
									{...register('startDate')}
									min={new Date().toISOString().split('T')[0]}
									required
								/>
								<label>
									End Date <span className="text-danger">*</span> &nbsp; &nbsp;
								</label>
								<input
									type="date"
									{...register('endDate')}
									min={new Date().toISOString().split('T')[0]}
									required
								/>
							</div>

							<div className="input-box">
								<label>
									Promotion code <span className="text-danger">*</span> &nbsp;
									&nbsp;
									<span className="text-danger" id="error-image"></span>
								</label>
								<input
									type="text"
									{...register('promotionCode')}
									placeholder="Enter promotion code"
									required
								/>
								<label>
									Quantity <span className="text-danger">*</span> &nbsp; &nbsp;
									<span className="text-danger" id="error-image"></span>
								</label>
								<input
									type="number"
									{...register('promotionQuantity')}
									placeholder="Enter promotion code"
									required
								/>
							</div>

							<button className="submit-sale" type="submit">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
