import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../../../../components';
import './PromotionDetails.css';
import { FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';
import {
	getAllPromotions,
} from '../../../../../features/promotion/promotionsSlice';
import { formatDate } from '../../../../../utils/format';
import { getAllProducts } from '../../../../../features/products/productsSlice';

export const PromotionDetails = ({
	setIsOpenPromotionDetails,
	chosenPromotionId,
}) => {
	const dispatch = useDispatch();

	const {
		products,
	} = useSelector((state) => state.products);

	const {
		promotions,
		isLoading: promotionLoading,
	} = useSelector((state) => state.promotions);

	useEffect(() => {
		const asyncFn = async () => {
			if (!promotions) {
				await dispatch(getAllPromotions());
			}

			await dispatch(getAllProducts(''));
		};
		asyncFn();
	}, [dispatch]);

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
						PROMOTION DETAILS
					</p>

					<div className="column">
						<div
							onClick={() => setIsOpenPromotionDetails(false)}
							className="close-btn"
						>
							<FaTimes size={25} />
						</div>
						<div>
							<div>
								Promotion products:
								{products.map((product) => {
									if (
										promotions[promotions.findIndex((promotion) => promotion._id == chosenPromotionId)].productIds.findIndex(
											(id) => id == product._id
										) != -1
									)
										return <span>{product.name} &nbsp;</span>;
								})}
							</div>
							<div>Promotion Name: {promotions[promotions.findIndex((promotion) => promotion._id == chosenPromotionId)].promotionName}</div>
							<div>Promotion Value: {promotions[promotions.findIndex((promotion) => promotion._id == chosenPromotionId)].promotionValue}</div>
							<div>Start Date: {formatDate(promotions[promotions.findIndex((promotion) => promotion._id == chosenPromotionId)].startDate)}</div>
							<div>End Date: {formatDate(promotions[promotions.findIndex((promotion) => promotion._id == chosenPromotionId)].endDate)}</div>
							<div>Promotion code: {promotions[promotions.findIndex((promotion) => promotion._id == chosenPromotionId)].promotionCode}</div>
							<div>Quantity: {promotions[promotions.findIndex((promotion) => promotion._id == chosenPromotionId)].promotionQuantity}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
