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



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import { translate } from '../localisation';
import { currRateLoader, rusCorEndNames, summDivis } from '../utils';

export default function CartScreen(props) {
    const lang = useSelector(state => state.cart.localisation);
    const [rate, setRate] = useState(0);
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const cart = useSelector(state => state.cart);
    const { cartItems, localisation } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
        let mounted = true;
        currRateLoader().then(res => {
            if(mounted) {
            return setRate(res);
        }});
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
        return () => mounted = false;
    }, [dispatch, rate, productId, qty]);
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };
    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    }
    return (
        <div className="row top">
            <div className="col-2">
            <Link to="/">{translate(lang, 'backToShoping_Name')}</Link>
                <h1>{translate(lang, 'shopingCart_Name')}</h1>
                {cartItems.length === 0 ? (
                    <MessageBox>
                        {translate(lang, 'shopingCartEmpty_Name')}. <Link to="/">{translate(lang, 'backToShoping_Name')}</Link>
                    </MessageBox>
                ) : (
                    <ul>
                        {cartItems.map(item => (
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
                                    <div>
                                        <select
                                            value={item.qty}
                                            onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {rate !== 0 &&
                                        <div>{summDivis((item.priceUSD * rate).toFixed(0))} ₴</div>
                                    }
                                    <div>
                                        <button type="button" onClick={() => removeFromCartHandler(item.product)}>{translate(lang, 'delete_Name')}</button>
                                    </div>
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                            {translate(lang, 'subtotal_Name')} ({cartItems.reduce((a, c) => a + c.qty, 0)} {' '}
                            {rusCorEndNames(cartItems.reduce((a, c) => a + c.qty, 0), [translate(lang, 'productPluralOne_Name'), translate(lang, 'productPluralTwo_Name'), translate(lang, 'productPluralThree_Name')])}) :{" "}
                                {summDivis(cartItems.reduce((a, c) => a + (c.priceUSD * rate).toFixed(0) * c.qty, 0))} ₴
                            </h2>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={checkoutHandler}
                                className="primary block"
                                disabled={cartItems.length === 0 || rate === 0}>
                                {translate(lang, 'proceedToCheckout_Name')}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}