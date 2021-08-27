////////////////////////////////////////////////////////////////////////////////////////////////
//                      :==+=-.                                                               //
//      .-+**+:       -@#+--=+%%-                                                             //
//    =%%+-::=@*      @%       +@-                      :*%%%#=                               //
//   *@-      :@*     %@.       @%                     *@=   +@=                              //
//   @#        +@:    *@:       *@.                   %%.   -@@:                              //
//  .@+         %%+=+#@=        =@-                  %@.   +@@:                               //
//  :@+          :-=-.          -@=                 +@-   #@%.                                //
//  :@+                         :@=                .@#   *@#                                  //
//  :@+                         :@+                +@:   @@                                   //
//  .@*                         :@+                %%    @%                                   //
//  .@*          .=*###+.       :@+  .=*%%%%%*=.  .@*    =@+:=#%%%#+:        :=*###*+:        //
//   @%         +@@@%%@@@:      :@+.*@*:     :+@#::@+     :+*+:   .=%%-    =@%=:. .:=#@+.     //
//   %@.       :@@:    +@-      :@#@#.          *@*@=                =@* .%%:         .#@-    //
//   *@:       :@+     %%       -@@%      =%@%+  +@@*          .*%#+  -@=%%      :*##-  *@:   //
//   =@=        @#    +@:       -@@=      @@@@@  .@@%          *@%%@=  @@@=      @@@@@  .@#   //
//   -@+        #@    @#        +@@+      .+*+.  =@@@-         .+##+  :@@@+      :*%#-  :@@   //
//   .@*        -@-  :@+        #@@@:           :@@*@@.              -@@-%@.           .%@*   //
//    @@.       .@+  :@%.      .@@:@@+.       .*@@* =@@=           -#@@- :@@-         =@@%    //
//    +@@*-     +@+   *@@*-.  :%@+ :%@@#+===*%@@%-   -%@%+-:::-=+#@@%+    :%@@+-:::=*@@@+     //
//     -%@@@@%%@@@:    =%@@@@@@@*    :*@@@@@@@*-       -#@@@@@@@@#+:        -#@@@@@@@%=.      //
//       .=*###*=.       .-+++=:        .::.              ..::.                .---:          //
//                                                                                            //
//_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-//
//                                                                                            //
//                                                                                            //
//                               contact:   hoboart@zoho.com                                  //
//                           itch.io:   https://hoboart.itch.io                               //
//              youtube:   https://www.youtube.com/channel/UCJS-Ow6LOZRcrQ7VZ2_V0qA           //
//                        art:   https://www.artstation.com/hidey0shi                         //
//                                                                                            //
//                                                                               SIMON ORLOV  //
////////////////////////////////////////////////////////////////////////////////////////////////



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import PayButton from "../components/PayButton";
import { ORDER_DELIVER_RESET } from "../constants/orderConstants";
import { translate } from "../localisation";
import { currRateLoader, dateFormat, summDivis } from "../utils";

export default function OrderScreen(props) {
    const lang = useSelector(state => state.cart.localisation);
    const [rate, setRate] = useState(0);
    const orderId = props.match.params.id;
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver;
    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        currRateLoader().then(res => {
            if(mounted) {
            return setRate(res);
        }});
        if (
            !order ||
            successDeliver ||
            (order && order._id !== orderId)
        ) {
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(detailsOrder(orderId));
        }
        return () => mounted = false;
    }, [dispatch, rate, orderId, order, successDeliver]);

    const deliverHandler = () => {
        if (window.confirm(translate(lang, 'confirmDelivery_Name'))) {
            dispatch(deliverOrder(order._id));
        }
    };
    return loading ? (<LoadingBox></LoadingBox>) :
        error ? (<MessageBox variant="warn">{translate(lang, error)}</MessageBox>)
            :
            (
                <div>
                    <div className="order"><h1>{translate(lang, 'orderID_Name')}{order.shopOrderId}</h1></div>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>{translate(lang, 'shipping_Name')}</h2>
                                        <p>
                                            <strong>{translate(lang, 'fullName_Name')}:</strong> {order.shippingAddress.firstName}
                                            {' '}{order.shippingAddress.lastName} <br />
                                            <strong>{translate(lang, 'phoneNumber_Name')}:</strong> {order.shippingAddress.phoneNum} <br />
                                            <strong>{translate(lang, 'postOfficeId_Name')}:</strong> {order.shippingAddress.postOfficeId} <br />
                                            <strong>{translate(lang, 'address_Name')}:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}
                                        </p>
                                        {order.isDelivered ? <MessageBox variant="success">{translate(lang, 'delivered_Name')} {dateFormat(order.deliveredAt)}</MessageBox>
                                            : <MessageBox variant="warn">{translate(lang, 'notDelivered_Name')}</MessageBox>}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>{translate(lang, 'paymentMethod_Name')}</h2>
                                        {order.paymentMethod === "InCash" ? <p>{translate(lang, 'inCash_Name')}</p> : <p>{translate(lang, 'toAccount_Name')}</p>}
                                        {order.paymentMethod === "ToAccount" &&
                                            order.isPaid ? <MessageBox variant="success">{translate(lang, 'paid_Name')} {dateFormat(order.paidAt)}</MessageBox>
                                            : order.paymentMethod === "ToAccount" && <MessageBox variant="warn">{translate(lang, 'notPaid_Name')}</MessageBox>}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>{translate(lang, 'orderItems_Name')}</h2>
                                        <ul>
                                            {order.orderItems.map(item => (
                                                <li key={item.product}>
                                                    <div className="row">
                                                        <div>
                                                            <img
                                                                src={item.image[0]}
                                                                alt={item.name[lang]}
                                                                className="small"
                                                            ></img>
                                                        </div>
                                                        <div className="min-30">
                                                            <Link to={`/product/${item.product}`}>{item.name[lang]}</Link>
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
                                        <h2>{translate(lang, 'orderSummary_Name')}</h2>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div className="notes">{translate(lang, 'items_Name')}</div>
                                            {rate !== 0 &&
                                                <div>{summDivis(order.totalPriceUAH)} ₴</div>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div className="notes">{translate(lang, 'shipping_Name')}</div>
                                            <div>{translate(lang, 'shippingTariffs_Name')}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row bott-top-notes-border">
                                            <div>
                                                <div className="notes">{translate(lang, 'orderTotal_Name')}</div>
                                            </div>
                                            {rate !== 0 &&
                                                <div>
                                                    <strong>{summDivis(order.totalPriceUAH)} ₴</strong>
                                                </div>
                                            }
                                        </div>
                                    </li>
                                    {!order.isPaid && order.paymentMethod === "ToAccount" && rate !== 0 &&
                                        <li>
                                            <PayButton amount={order.totalPriceUAH} orderid={order._id} rate={rate} lang={lang}></PayButton>
                                        </li>
                                    }
                                    {userInfo.isAdmin && (order.isPaid || order.paymentMethod === "InCash") && !order.isDelivered && (
                                        <li>
                                            {loadingDeliver && <LoadingBox></LoadingBox>}
                                            {errorDeliver && (
                                                <MessageBox variant="warn">{translate(lang, errorDeliver)}</MessageBox>
                                            )}
                                            <button
                                                type="button"
                                                className="primary block"
                                                onClick={deliverHandler}
                                            >
                                                {translate(lang, 'deliveredNow_Name')}
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
}