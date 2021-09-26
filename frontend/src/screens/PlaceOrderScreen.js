import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { currRateLoader, summDivis } from "../utils";
import { translate } from "../localisation";

export default function PlaceOrderScreen(props) {
    const [rate, setRate] = useState(0);
    const cart = useSelector(state => state.cart);
    const { localisation } = cart;
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = num => Number(num.toFixed(0));
    cart.totalPriceUAH = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * (c.priceUSD * rate).toFixed(0), 0));
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };
    useEffect(() => {
        let mounted = true;
        currRateLoader().then(res => {
            if(mounted) {
            return setRate(res);
        }});
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
        return () => mounted = false;
    }, [dispatch, rate, order, props.history, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>{translate(localisation, 'shipping_Name')}</h2>
                                <p>
                                    <strong>{translate(localisation, 'fullName_Name')}:</strong> {cart.shippingAddress.firstName}
                                    {' '}{cart.shippingAddress.lastName} <br />
                                    <strong>{translate(localisation, 'phoneNumber_Name')}:</strong> {cart.shippingAddress.phoneNum} <br />
                                    <strong>{translate(localisation, 'postOfficeId_Name')}:</strong> {cart.shippingAddress.postOfficeId} <br />
                                    <strong>{translate(localisation, 'address_Name')}:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>{translate(localisation, 'paymentMethod_Name')}</h2>
                                {cart.paymentMethod === "InCash" ? <p>{translate(localisation, 'inCash_Name')}</p> : <p>{translate(localisation, 'toAccount_Name')}</p>}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>{translate(localisation, 'orderItems_Name')}</h2>
                                <ul>
                                    {cart.cartItems.map(item => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img
                                                        src={item.image[0]}
                                                        alt={item.name[localisation]}
                                                        className="small"
                                                    ></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>{item.name[localisation]}</Link>
                                                </div>
                                                {rate !== 0 &&
                                                    <div>{item.qty} x {summDivis((item.priceUSD * rate).toFixed(0))} ₴ = {summDivis(item.qty * (item.priceUSD * rate).toFixed(0))} ₴</div>
                                                }
                                            </div>
                                        </li>
                                    ))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>{translate(localisation, 'orderSummary_Name')}</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>{translate(localisation, 'items_Name')}</div>
                                    {rate !== 0 &&
                                        <div>{summDivis(cart.totalPriceUAH)} ₴</div>
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>{translate(localisation, 'shipping_Name')}</div>
                                    <div className="notes">{translate(localisation, 'shippingTariffs_Name')}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong>{translate(localisation, 'orderTotal_Name')}</strong>
                                    </div>
                                    {rate !== 0 &&
                                        <div>
                                            <strong>{summDivis(cart.totalPriceUAH)} ₴</strong>
                                        </div>
                                    }
                                </div>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={placeOrderHandler}
                                    className="primary block"
                                    disabled={cart.cartItems.length === 0 || rate === 0}>
                                    {translate(localisation, 'placeOrder_Name')}
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="warn">{translate(localisation, error)}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}