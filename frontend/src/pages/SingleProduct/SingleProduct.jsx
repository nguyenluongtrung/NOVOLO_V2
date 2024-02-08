import './SingleProduct.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getProductById } from '../../features/products/productsSlice';
import { Spinner } from '../../components';
import { getCategoryById } from '../../features/categories/categoriesSlice';
import {
	FaShoppingCart,
	FaStar,
	FaThumbsUp,
	FaThumbsDown,
	FaCaretDown,
	FaCaretUp,
	FaEllipsisV,
	FaPenSquare,
	FaTrash,
} from 'react-icons/fa';
import {
	addProductsToCart,
	getUserInformation,
} from '../../features/auth/authSlice';
import {
	createComment,
	deleteComment,
	getAllProductComments,
	increaseDislikeCount,
	increaseLikeCount,
	replyComment,
} from '../../features/comments/commentsSlice';

export const SingleProduct = () => {
	const [quantity, setQuantity] = useState(0);
	const [comment, setComment] = useState('');
	const [reply, setReply] = useState('');
	const [showReplyMap, setShowReplyMap] = useState({});
	const [showRepliesMap, setShowRepliesMap] = useState({});
	const [showOpenOptionsMap, setShowOpenOptionsMap] = useState({});
	const { id } = useParams();

	const dispatch = useDispatch();
	const {
		products: product,
		isError: productError,
		isLoading: productLoading,
		isSuccess: productSuccess,
		message: productMessage,
	} = useSelector((state) => state.products);
	const {
		user,
		isError: authError,
		isLoading: authLoading,
		isSuccess: authSuccess,
		message: authMessage,
	} = useSelector((state) => state.auth);
	const {
		comments,
		isError: commentError,
		isLoading: commentLoading,
		isSuccess: commentSuccess,
		message: commentMessage,
	} = useSelector((state) => state.comments);

	const { categories: category } = useSelector((state) => state.categories);

	const formatDate = (dateString) => {
		const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		const formattedDate = new Date(dateString).toLocaleDateString(
			undefined,
			options
		);
		return formattedDate;
	};

	const addProductToCart = async (productId, quantity) => {
		await dispatch(
			addProductsToCart({ productId: productId, quantity: Number(quantity) })
		);
		if (authSuccess) {
			toast.success('Add to cart successfully!');
		} else if (authError) {
			toast.error(authMessage);
		}
	};

	const toggleRepliesVisibility = (commentId) => {
		setShowRepliesMap((prevMap) => ({
			...prevMap,
			[commentId]: !prevMap[commentId],
		}));
	};

	const toggleOpenOptionsVisibility = (commentId) => {
		setShowOpenOptionsMap((prevMap) => ({
			...prevMap,
			[commentId]: !prevMap[commentId],
		}));
	};

	const toggleReplyVisibility = (commentId) => {
		setShowReplyMap((prevMap) => ({
			...prevMap,
			[commentId]: !prevMap[commentId],
		}));
	};

	const sendComment = async (e, comment) => {
		e.preventDefault();

		const commentData = {
			content: comment,
			productId: id,
			userId: user._id,
		};

		await dispatch(createComment(commentData));
		await dispatch(getAllProductComments(id));

		setComment('');

		if (commentSuccess) {
			toast.success('Write comment successfully!');
		} else if (commentError) {
			toast.error(commentMessage);
		}
	};

	const sendReply = async (e, reply, commentId) => {
		e.preventDefault();

		const replyData = {
			content: reply,
			userId: user._id,
		};

		await dispatch(replyComment({ replyData, commentId }));
		if (commentSuccess) {
			toast.success('Reply comment successfully!');
		} else if (commentError) {
			toast.error(commentMessage);
		}
	};

	const handleDeleteComment = async (commentId) => {
		await dispatch(deleteComment(commentId));
		if (commentSuccess) {
			toast.success('Delete comment successfully!');
		} else if (commentError) {
			toast.error(commentMessage);
		}
	}

	const handleLikeAction = async (commentId) => {
		await dispatch(increaseLikeCount(commentId));
		await dispatch(getAllProductComments(id));
	};

	const handleDislikeAction = async (commentId) => {
		await dispatch(increaseDislikeCount(commentId));
		await dispatch(getAllProductComments(id));
	};

	useEffect(() => {
		const loadData = async () => {
			try {
				await dispatch(getProductById(id));
			} catch (error) {
				console.error('Error loading product data:', error);
			}
		};

		loadData();
	}, [dispatch, id]);

	useEffect(() => {
		if (product && product.categoryID) {
			dispatch(getCategoryById(product.categoryID));
		}
	}, [dispatch, product]);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				await dispatch(getAllProductComments(id));
				await dispatch(getUserInformation());
			} catch (error) {
				console.error('Error loading comments:', error);
			}
		};

		fetchComments();
	}, [dispatch, id]);

	if (productLoading || authLoading) {
		return <Spinner />;
	}

	return (
		<div>
			<div className="breadcrumb-section breadcrumb-bg">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 text-center">
							<div className="breadcrumb-text">
								<p>See more Details</p>
								<h1>Single Product</h1>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="single-product pt-150 pb-150 fix-ui">
				<div className="container">
					<div className="row">
						<div className="col-md-5">
							<div className="single-product-img">
								<img src={`/${product?.image}`} alt="" />
							</div>
						</div>
						<div className="col-md-7">
							<div className="single-product-content">
								<h3>{product?.name}</h3>
								<p className="single-product-pricing"></p>
								<div className="single-product-form">
									<p>Calories: {product?.calories}</p>
									<p>Categories: {category?.name}</p>
									<p>
										<strong>Rating: {product?.rating} /5.0</strong>
									</p>
									<input
										type="number"
										placeholder="0"
										onChange={(e) => setQuantity(e.target.value)}
										min="1"
									/>
									<br />
									{product?.productStatus ? (
										<a
											className="cart-btn"
											onClick={() => addProductToCart(id, quantity)}
										>
											<FaShoppingCart /> Add to Cart
										</a>
									) : (
										<a
											className="btn btn-danger px-4 py-2 text-white"
											onClick={() =>
												toast.error('This product is already sold out!')
											}
										>
											Sold out
										</a>
									)}
									<br />
									{/* <c:if test="${sessionScope.acc.role != null}">
										<a href="add-to-wishlist?productID=${product.productID}">
											<button className="btn btn-danger px-5 py-3">
												<i className="fas fa-heart"></i>
											</button>
										</a>
									</c:if> */}
								</div>
								<h4>Share:</h4>
								<ul className="product-share">
									<li>
										<a href="">
											<i className="fab fa-facebook-f"></i>
										</a>
									</li>
									<li>
										<a href="">
											<i className="fab fa-twitter"></i>
										</a>
									</li>
									<li>
										<a href="">
											<i className="fab fa-google-plus-g"></i>
										</a>
									</li>
									<li>
										<a href="">
											<i className="fab fa-linkedin"></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="row row-content">
						<div className="col-12">
							<h3 className="mx-auto text-black mt-5 mb-1 text-center">
								Feedback
							</h3>
						</div>
						<div className="col-9 offset-2 mx-auto">
							<div className="rating mx-auto">
								<div className="star">
									<input type="radio" name="rate" id="rate-1" value="5" />
									<label for="rate-1">
										<FaStar />
									</label>
									<input type="radio" name="rate" id="rate-2" value="4" />
									<label for="rate-2">
										<FaStar />
									</label>
									<input type="radio" name="rate" id="rate-3" value="3" />
									<label for="rate-3">
										<FaStar />
									</label>
									<input type="radio" name="rate" id="rate-4" value="2" />
									<label for="rate-4">
										<FaStar />
									</label>
									<input type="radio" name="rate" id="rate-5" value="1" />
									<label for="rate-5">
										<FaStar />
									</label>
								</div>
							</div>

							<div className="comment-session">
								<div className="post-comment">
									<form
										className="comment-box"
										onSubmit={(e) => sendComment(e, comment)}
									>
										<div className="user">
											<div className="image image-user">
												<img
													src={
														'https://bootdey.com/img/Content/avatar/avatar7.png'
													}
													alt="avatar"
													className="ml-3"
													style={{ width: '35px', height: '35px' }}
												/>
											</div>
											<div className="name user-name">{user.name}</div>
										</div>
										<textarea
											name="comment"
											value={comment}
											onChange={(e) => setComment(e.target.value)}
											required
										></textarea>
										<button type="submit" className="comment-submit">
											Comment
										</button>
									</form>

									{comments.map((comment) => {
										return (
											<div className="comment-list">
												<div className="flex">
													<div className="user">
														<div className="user-image">
															<img
																src={
																	'https://bootdey.com/img/Content/avatar/avatar7.png'
																}
																alt="avatar"
																className="ml-3"
																style={{ width: '35px', height: '35px' }}
															/>
														</div>
														<div className="user-meta">
															<div className="name">{comment.userId.name}</div>
															<div className="day">
																{formatDate(comment.date)}
															</div>
														</div>
													</div>
													<div className="reply">
														<div className="like icon">
															<span className="likeCount">
																{comment.likeCount}
															</span>
															<FaThumbsUp
																onClick={() => handleLikeAction(comment._id)}
															/>
														</div>
														<div className="dislike icon">
															<span className="dislikeCount">
																{comment.dislikeCount}
															</span>
															<FaThumbsDown
																onClick={() => handleDislikeAction(comment._id)}
															/>
														</div>
														<div
															className="re-comment"
															onClick={() => toggleReplyVisibility(comment._id)}
														>
															Reply
														</div>
														<div className="other-options">
															<FaEllipsisV
																onClick={() =>
																	toggleOpenOptionsVisibility(comment._id)
																}
															/>
															{showOpenOptionsMap[comment._id] && (
																<div className="options">
																	<div className="edit-option">
																		<FaPenSquare /> Edit
																	</div>
																	<div className="delete-option" onClick={() => handleDeleteComment(comment._id)}>
																		<FaTrash /> Delete
																	</div>
																</div>
															)}
														</div>
													</div>
												</div>

												<div className="comment">{comment.content}</div>
												{showReplyMap[comment._id] && (
													<form
														className="reply-box"
														onSubmit={(e) => sendReply(e, reply, comment._id)}
													>
														<div className="reply-section">
															<div className="user-image">
																<img
																	src={
																		'https://bootdey.com/img/Content/avatar/avatar7.png'
																	}
																	alt="avatar"
																	className="ml-3 mr-2"
																	style={{ width: '35px', height: '35px' }}
																/>
															</div>
															<input
																className="reply-content"
																placeholder="Add a reply..."
																onChange={(e) => setReply(e.target.value)}
																value={reply}
																required
															></input>
														</div>
														<div className="button-section">
															<button type="submit" className="reply-submit">
																Reply
															</button>
															<button
																type="button"
																className="cancel-submit mr-2"
																onClick={() => toggleReplyVisibility(comment._id)}
															>
																Cancel
															</button>
														</div>
													</form>
												)}
												{comment.replies.length > 0 && (
													<div
														className="show-replies"
														onClick={() => toggleRepliesVisibility(comment._id)}
													>
														{!showRepliesMap[comment._id] ? (
															<FaCaretUp />
														) : (
															<FaCaretDown />
														)}{' '}
														{comment.replies.length}{' '}
														{comment.replies.length > 1 ? 'replies' : 'reply'}
													</div>
												)}
												{showRepliesMap[comment._id] &&
													comment.replies.map((reply) => {
														return (
															<div className="replies">
																<div className="flex">
																	<div className="user">
																		<div className="user-image">
																			<img
																				src={
																					'https://bootdey.com/img/Content/avatar/avatar7.png'
																				}
																				alt="avatar"
																				className="ml-3"
																				style={{
																					width: '35px',
																					height: '35px',
																				}}
																			/>
																		</div>
																		<div className="user-meta">
																			<div className="name">
																				{reply.userId.name}
																			</div>
																			<div className="day">
																				{formatDate(reply.date)}
																			</div>
																		</div>
																	</div>
																	<div className="reply">
																		<div className="like icon">
																			<span className="likeCount">
																				{reply.likeCount}
																			</span>
																			<FaThumbsUp
																				onClick={() =>
																					handleLikeAction(reply._id)
																				}
																			/>
																		</div>
																		<div className="dislike icon">
																			<span className="dislikeCount">
																				{reply.dislikeCount}
																			</span>
																			<FaThumbsDown
																				onClick={() =>
																					handleDislikeAction(reply._id)
																				}
																			/>
																		</div>
																		<div className="re-comment">Reply</div>
																	</div>
																</div>
																<div className="comment">{reply.content}</div>
															</div>
														);
													})}
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="more-products mb-150">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 text-center">
							<div className="section-title">
								<h3>
									<span className="orange-text">Related</span> Products
								</h3>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Aliquid, fuga quas itaque eveniet beatae optio.
								</p>
							</div>
						</div>
					</div>
					{/* <div className="row">
						<c:forEach items="${relatedProducts}" var="c">
							<div className="col-lg-4 col-md-6 text-center">
								<div className="single-product-item">
									<div className="product-image">
										<a href="single-product?id=${c.productID}">
											<img src="${c.image}" style="width:100%;height:250px" />
										</a>
									</div>
									<h3>${c.name}</h3>
									<p className="product-price"> ${c.price}$ </p>
									<a
										href="add-to-cart?productID=${c.productID}"
										className="cart-btn"
									>
										<i className="fas fa-shopping-cart"></i> Add to Cart
									</a>
									<c:if test="${sessionScope.acc.role != null}">
										<a href="add-to-wishlist?productID=${c.productID}">
											<button className="btn btn-danger px-5 py-3">
												<i className="fas fa-heart"></i>
											</button>
										</a>
									</c:if>
								</div>
							</div>
						</c:forEach>
					</div> */}
				</div>
			</div>
		</div>
	);
};
