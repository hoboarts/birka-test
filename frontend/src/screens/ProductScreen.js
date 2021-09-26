import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import { translate } from '../localisation';
import { currRateLoader, summDivis } from '../utils';

export default function ProductScreen(props) {
    const lang = useSelector(state => state.cart.localisation);
    const [rate, setRate] = useState(0);
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const [alertReview, setAlertReview] = useState('');
    const [successReview, setSuccessReview] = useState('');

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        loading: loadingReviewCreate,
        error: errorReviewCreate,
        success: successReviewCreate,
    } = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let mounted = true;
        currRateLoader().then(res => {
            if (mounted) {
                return setRate(res);
            }
        });
        if (successReviewCreate) {
            setAlertReview('');
            setSuccessReview('A');
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        };
        dispatch(detailsProduct(productId));
        return () => mounted = false;
    }, [dispatch, rate, productId, successReviewCreate, lang]);
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };
    const submitHandler = e => {
        e.preventDefault();
        if (comment && rating) {
            dispatch(
                createReview(productId, { rating, comment, name: userInfo.name })
            );
        } else {
            setAlertReview('A');
        }
    };
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="warn">{translate(lang, error)}</MessageBox>
            ) : product ? (
                <div>
                    {successReview && (
                        <MessageBox>{translate(lang, 'successReview_Name')}</MessageBox>
                    )}
                    <Link to="/">{translate(lang, 'backToShoping_Name')}</Link>
                    <div className="row top">
                        <div className="col-2">
                            <img id="big" className="large" src={product.image[0]} alt={product.name[lang]} width="500px" height="600px"></img>
                        </div>
                        {product.image.length > 1 &&
                            product.image.map(image => (
                                <div className="icon-frame" key={image}>
                                    <img src={image} alt={product.name[lang]} className="small" onClick={() => { document.getElementById("big").src = image }}></img>
                                </div>
                            ))}
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{product.name[lang]}</h1>
                                </li>
                                <li>
                                    <Rating
                                        rating={product.rating}
                                        numReviews={product.numReviews}
                                    ></Rating>
                                </li>
                                {product.discount && product.discount.on &&
                                <li className="price-discount-li">{translate(lang, 'priceWithoutDiscount_Name')} : {summDivis((product.discount.withoutDiscountPriceUSD * rate).toFixed(0))} ₴</li>
                                }
                                {rate !== 0 &&
                                    <li>{translate(lang, 'price_Name')} : {summDivis((product.priceUSD * rate).toFixed(0))} ₴</li>
                                }
                                <li>{translate(lang, 'productId_Name')} : {product.prodCode}
                                </li>
                                <li>{translate(lang, 'description_Name')} :
                                    <p>{product.description[lang]}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div>{translate(lang, 'price_Name')}</div>
                                            {rate !== 0 &&
                                                <div className="price">{summDivis((product.priceUSD * rate).toFixed(0) * qty)} ₴</div>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>{translate(lang, 'stock_Name')} :</div>
                                            <div>
                                                {product.countInStock > 0 ? (
                                                    <span className="success">{translate(lang, 'inStock_Name')}</span>
                                                ) : (
                                                    <span className="warn">{translate(lang, 'noStock_Name')}</span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                    {
                                        product.countInStock > 0 && (
                                            <>
                                                <li>
                                                    <div className="row">
                                                        <div>{translate(lang, 'qty_Name')}</div>
                                                        <div>
                                                            <select title="qty_select" value={qty} onChange={e => setQty(e.target.value)}>
                                                                {[...Array(product.countInStock).keys()].map(x => (
                                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button onClick={addToCartHandler} className="primary block">{translate(lang, 'addToCart_Name')}</button>
                                                </li>
                                            </>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 id="reviews">{translate(lang, 'reviews_Name')}</h2>
                        {product.reviews.length === 0 && (
                            <MessageBox>{translate(lang, 'noReviews_Name')}</MessageBox>
                        )}
                        <ul>
                            {product.reviews.map(review => (
                                <li key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating rating={review.rating} caption=" "></Rating>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </li>
                            ))}
                            <li>
                                {userInfo ? (
                                    <form className="form" onSubmit={submitHandler}>
                                        <div>
                                            <h2>{translate(lang, 'leaveReview_Name')}</h2>
                                        </div>
                                        <div>
                                            <label htmlFor="rating">{translate(lang, 'rating_Name')}</label>
                                            <select
                                                id="rating"
                                                value={rating}
                                                onChange={e => setRating(e.target.value)}
                                            >
                                                <option value="">{translate(lang, 'select_Name')}...</option>
                                                <option value="1">1- {translate(lang, 'poor_Name')}</option>
                                                <option value="2">2- {translate(lang, 'fair_Name')}</option>
                                                <option value="3">3- {translate(lang, 'good_Name')}</option>
                                                <option value="4">4- {translate(lang, 'veryGood_Name')}</option>
                                                <option value="5">5- {translate(lang, 'excelent_Name')}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="comment">{translate(lang, 'comments_Name')}</label>
                                            <textarea
                                                id="comment"
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label />
                                            <button className="primary" type="submit">
                                                {translate(lang, 'submit_Name')}
                                            </button>
                                        </div>
                                        {alertReview && (
                                            <MessageBox variant='warn'>{translate(lang, 'enterCommentReview_Name')}</MessageBox>
                                        )}
                                        <div>
                                            {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                            {errorReviewCreate && (
                                                <MessageBox variant="warn">
                                                    {translate(lang, errorReviewCreate)}
                                                </MessageBox>
                                            )}
                                        </div>
                                    </form>
                                ) : (
                                    <MessageBox>
                                        {translate(lang, 'please_Name')} <Link to="/signin">{translate(lang, 'singinOne_Name')}</Link> {translate(lang, 'toLeaveReview_Name')}
                                    </MessageBox>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <MessageBox variant="warn">{translate(lang, 2001)}</MessageBox>
            )}
        </div>

    )
}