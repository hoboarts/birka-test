import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';
import { translate } from '../localisation';

export default function OrderListScreen(props) {
    const lang = useSelector(state => state.cart.localisation);
    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;
    const orderDelete = useSelector(state => state.orderDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = orderDelete;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });
        dispatch(listOrders({}));//{ seller: sellerMode ? userInfo._id : '' }
    }, [dispatch, successDelete, userInfo._id]);
    const deleteHandler = (order) => {
        if (window.confirm(translate(lang, 'sureToDeleteOrder_Name'))) {
            dispatch(deleteOrder(order._id));
        }
    };
    return (
        <div>
            <h1>{translate(lang, 'orderHistory_Name')}</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="warn">{translate(lang, errorDelete)}</MessageBox>}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="warn">{translate(lang, error)}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>{translate(lang, 'id_Name')}</th>
                            <th>{translate(lang, 'user_Name')}</th>
                            <th>{translate(lang, 'date_Name')}</th>
                            <th>{translate(lang, 'total_Name')} (₴)</th>
                            <th>{translate(lang, 'paidPaid_Name')}</th>
                            <th>{translate(lang, 'deliveredDeliv_Name')}</th>
                            <th>{translate(lang, 'action_Name')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.shopOrderId}>
                                <td>{order.shopOrderId}</td>
                                <td>{order.user !== null ? order.user.name : translate(lang, 'userDeleted_Name')}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPriceUAH}</td>
                                <td>{order.paymentMethod === "InCash" ? translate(lang, 'uponReceipt_Name') : order.isPaid ? order.paidAt.substring(0, 10) : translate(lang, 'no_Name')}</td>
                                <td>
                                    {order.isDelivered
                                        ? order.deliveredAt.substring(0, 10)
                                        : translate(lang, 'no_Name')}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => {
                                            props.history.push(`/order/${order._id}`);
                                        }}
                                    >
                                        {translate(lang, 'details_Name')}
                                    </button>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => deleteHandler(order)}
                                    >
                                        {translate(lang, 'delete_Name')}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}