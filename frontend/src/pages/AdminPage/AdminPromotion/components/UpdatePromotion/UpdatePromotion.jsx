import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getPromotionById, updatePromotion } from '../../../../../features/promotions/promotionsSlice';
import { Spinner } from '../../../../../components';
import './UpdateSale.css';
import { FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export const UpdatePromotion = ({ setIsOpenUpdateForm, chosenPromotionId, handleGetAllPromotions }) => {
	const [isSurprise, setIsSurprise] = useState(false);
	const dispatch = useDispatch();

	const {
		promotions: promotion,
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
		setIsOpenUpdateForm(false);
		handleGetAllPromotions();
	}

	const onSubmit = async (data) => {
		const updateData = {
			...data,
			isSurprise: isSurprise,
		};
		if (promotionError) {
			toast.error(promotionMessage);
		}
		await dispatch(updatePromotion({chosenPromotionId, updateData}));
		
		if (promotionSuccess) {
			toast.success('Update promotion successfully!');
			handleCloseBtn();
		}
	};

	useEffect(() => {
		if (categoryError) {
			toast.error(categoryMessage);
		}
		
	}, [dispatch, categoryError, categoryMessage]);

	if (promotionLoading || categoryLoading) {
		return <Spinner />;
	}

	return (
		<div>
			<div className="overlay-update"></div>
			<div className="content">
				<form className="updatePromotionForm" onSubmit={handleSubmit(onSubmit)}>
					<p style={{ fontWeight: 'bold', textAlign: 'center' }}>
						UPDATE Promotion
					</p>
					<div onClick={handleCloseBtn} className="close-btn">
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
								placeholder="Enter Promotion name"
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
					<div>
						<label>
							Promotion status <span className="text-danger">*</span>
						</label>
						<input type="radio" value={true} {...register('promotionStatus')} />{' '}
						True
						<input
							type="radio"
							value={false}
							{...register('promotionStatus')}
						/>{' '}
						False
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
