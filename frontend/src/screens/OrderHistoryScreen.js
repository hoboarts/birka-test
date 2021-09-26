import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myHistoryListOrders } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { translate } from "../localisation";
import { dateFormat, summDivis } from "../utils";

export default function OrderHistoryScreen(props) {
    const lang = useSelector(state => state.cart.localisation);
    const orderHistoryList = useSelector(state => state.orderHistoryList);
    const { loading, error, orders } = orderHistoryList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(myHistoryListOrders());
    }, [dispatch]);
    return (
        <div className="table-backplate">
                <h1>{translate(lang, 'orderHistory_Name')}</h1>
                {loading ? <LoadingBox></LoadingBox> :
                    error ? <MessageBox variant="warn">{translate(lang, error)}</MessageBox>
                        : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>{translate(lang, 'id_Name')}</th>
                                        <th>{translate(lang, 'date_Name')}</th>
                                        <th>{translate(lang, 'total_Name')}</th>
                                        <th>{translate(lang, 'paidPaid_Name')}</th>
                                        <th>{translate(lang, 'deliveredDeliv_Name')}</th>
                                        <th>{translate(lang, 'action_Name')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order.shopOrderId}</td>
                                            <td>{dateFormat(order.createdAt).substring(0, 10)}</td>
                                            <td>{summDivis(order.totalPriceUAH)} ₴</td>
                                            <td>{order.paymentMethod === "InCash" ? translate(lang, 'uponReceipt_Name') : order.isPaid ? dateFormat(order.paidAt).substring(0, 10) : translate(lang, 'no_Name')}</td>
                                            <td>{order.isDelivered ? dateFormat(order.deliveredAt).substring(0, 10) : translate(lang, 'no_Name')}</td>
                                            <td>
                                                <button type="button" className="small"
                                                    onClick={() => { props.history.push(`/order/${order._id}`) }}
                                                >{translate(lang, 'details_Name')}</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                }
        </div>
    )
}