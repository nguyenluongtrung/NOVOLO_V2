import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Spinner } from '../../../../../components';
import './UpdatePromotion.css';
import { FaTimes } from 'react-icons/fa';
import { getAllProducts } from '../../../../../features/products/productsSlice';
import { useEffect, useState } from 'react';
import { getAllPromotions, updatePromotion } from '../../../../../features/promotion/promotionsSlice';
import { formatDate, formatDateInput } from '../../../../../utils/format';

export const UpdatePromotion = ({ setIsOpenUpdateForm, chosenPromotionId }) => {
	const dispatch = useDispatch();

	const {
		products,
		isError: productError,
		message: productMessage,
	} = useSelector((state) => state.products);

	const {
		promotions,
		isLoading: promotionLoading,
		isSuccess: promotionSuccess,
	} = useSelector((state) => state.promotions);

	const [selectedProducts, setSelectedProducts] = useState(promotions[promotions.findIndex((promotion) => promotion._id == chosenPromotionId)].productIds);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleCloseBtn = () => {
		setIsOpenUpdateForm(false);
	};

	const onSubmit = async (data) => {
		const promotionData = {
			...data,
			productIds: selectedProducts,
		};

		const promotionId = chosenPromotionId;

		await dispatch(updatePromotion({promotionData, promotionId}));

		if (promotionSuccess) {
			toast.success('Update sale successfully!');
			handleCloseBtn();
		}
	};

	useEffect(() => {
		Promise.all([dispatch(getAllProducts(''))]).catch((error) => {
			console.error('Error during dispatch:', error);
		});
	}, [dispatch, productError, productMessage]);

	useEffect(() => {
		const asyncFn = async () => {
			if (!promotions) {
				await dispatch(getAllPromotions());
			}
		};
		asyncFn();
	}, [dispatch]);

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
			<div className="overlay-updatePromotion"></div>
			<div className="content">
				<div className="updatePromotionForm">
					<p
						style={{
							fontSize: '30px',
							fontWeight: 'bold',
							textAlign: 'center',
						}}
					>
						UPDATE PROMOTION
					</p>

					<div className="column">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div
								onClick={() => setIsOpenUpdateForm(false)}
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
									defaultValue={promotions[promotions.findIndex((promotion) => promotion._id == chosenPromotionId)].promotionName}
									required
								/>

								<label>
									Promotion Value <span className="text-danger">*</span>
								</label>
								<input
									type="text"
									{...register('promotionValue')}
									defaultValue={promotions[promotions.findIndex((promotion) => promotion._id == chosenPromotionId)].promotionValue}
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
									value={formatDateInput(promotions[promotions.findIndex((promotion) => promotion._id == chosenPromotionId)].startDate)}
									required
								/>
								<label>
									End Date <span className="text-danger">*</span> &nbsp; &nbsp;
								</label>
								<input
									type="date"
									{...register('endDate')}
									min={new Date().toISOString().split('T')[0]}
									value={formatDateInput(promotions[promotions.findIndex((promotion) => promotion._id == chosenPromotionId)].endDate)}
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
									defaultValue={promotions[promotions.findIndex((promotion) => promotion._id == chosenPromotionId)].promotionCode}
									required
								/>
								<label>
									Quantity <span className="text-danger">*</span> &nbsp; &nbsp;
									<span className="text-danger" id="error-image"></span>
								</label>
								<input
									type="number"
									{...register('promotionQuantity')}
									defaultValue={promotions[promotions.findIndex((promotion) => promotion._id == chosenPromotionId)].promotionQuantity}
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
