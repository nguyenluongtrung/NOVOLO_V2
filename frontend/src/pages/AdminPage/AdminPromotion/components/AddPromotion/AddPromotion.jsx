import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createPromotion } from '../../../../../features/promotions/promotionsSlice';
import { Spinner } from '../../../../../components';
import './AddSale.css';
import { FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export const AddPromotion = ({ setIsOpenAddForm, handleGetAllPromotions }) => {
	const dispatch = useDispatch();
	const [isSurprise, setIsSurprise] = useState(false);

	const {
		isLoading: promotionLoading,
		isSuccess: promotionSuccess,
		isError: promotionError,
		message: promotionMessage,
	} = useSelector((state) => state.promotions);

	const {
		categories,
		isError: categoryError,
		isLoading: categoryLoading,
		message: categoryMessage,
	} = useSelector((state) => state.categories);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleCloseBtn = () => {
		setIsOpenAddForm(false);
		handleGetAllPromotions();
	};

	const onSubmit = async (data) => {
		const addData = {
			...data,
			isSurprise: isSurprise,
		};

		if (promotionError) {
			toast.error(promotionMessage);
		}
		await dispatch(createPromotion(addData));
		if (promotionSuccess) {
			toast.success('Create new promotion successfully!');
			handleCloseBtn();
		}
	};

	useEffect(() => {
		if (categoryError) {
			toast.error(categoryMessage);
		}
		
	}, [dispatch, categoryError, categoryMessage]);

	if (promotionLoading || categoryLoading || !categories) {
		return <Spinner />;
	}

	return (
		<div>
			<div className="overlay-add"></div>
			<div className="content">
				<form className="addPromotionForm" onSubmit={handleSubmit(onSubmit)}>
					<p style={{ fontWeight: 'bold', textAlign: 'center' }}>
						ADD NEW Promotion
					</p>
					<div onClick={() => setIsOpenAddForm(false)} className="close-btn">
						<FaTimes />
					</div>
					<div className="column">
						<div className="input-box">
							<label>
								Promotion Name <span className="text-danger">*</span>
							</label>
							<input
								type="text"
								{...register('name')}
								placeholder="Enter product name"
								required
							/>
						</div>
					</div>
					<div className="column">
						<div className="input-box">
							<label>
								Price <span className="text-danger">*</span>
							</label>
							<input
								type="number"
								{...register('price')}
								placeholder="Enter price"
								required
								min="0"
							/>
						</div>
						<div className="input-box">
							<label>
								Image <span className="text-danger">*</span> &nbsp; &nbsp;
								<span className="text-danger" id="error-image"></span>
							</label>
							<input
								type="text"
								{...register('image')}
								placeholder="Enter image source"
								required
							/>
						</div>
					</div>
					<div className="column">
						<div className="input-box">
							<label className="mb-2">
								Category <span className="text-danger">*</span>
							</label>
							<select
								{...register('categoryID')}
								className="w-100 rounded"
								style={{ padding: '13px 13px', borderColor: '#e7e6e7' }}
							>
								{categories.map((category) => {
									return <option value={category._id}>{category.name}</option>;
								})}
							</select>
						</div>
						<div className="input-box">
							<label>
								Calories <span className="text-danger">*</span>
							</label>
							<input
								type="number"
								{...register('calories')}
								placeholder="Enter calories"
								required
								min="0"
							/>
						</div>
					</div>
					<div className="column">
						<div className="input-box">
							<label>
								Accumulated Point <span className="text-danger">*</span>
							</label>
							<input
								type="number"
								{...register('accumulatedPoint')}
								placeholder="Enter accumulated points"
								required
								min="0"
							/>
						</div>
						<div className="input-box">
							<label>
								Exchanged Point <span className="text-danger">*</span>
							</label>
							<input
								type="number"
								{...register('exchangedPoint')}
								placeholder="Enter exchanged points"
								required
								min="0"
							/>
						</div>
					</div>
					<div className="column">
						<div className="input-box">
							<label>
								Is surprise <span className="text-danger">*</span>
							</label>
							<input
								type="radio"
								name="isSurprise"
								onChange={() => setIsSurprise(true)}
							/>{' '}
							True
							<input
								type="radio"
								name="isSurprise"
								onChange={() => setIsSurprise(false)}
							/>{' '}
							False
						</div>
					</div>
					{isSurprise && (
						<div className="column">
							<div className="input-box">
								<label>Start day</label>
								<input
									type="date"
									{...register('startDate')}
									min={new Date().toISOString().split('T')[0]}
								/>
							</div>
							<div className="input-box">
								<label>End day</label>
								<input
									type="date"
									{...register('endDate')}
									min={new Date().toISOString().split('T')[0]}
								/>
							</div>
						</div>
					)}
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};
