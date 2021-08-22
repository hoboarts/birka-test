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
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from './actions/userActions';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import SearchScreen from './screens/SearchScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import SearchBox from './components/SearchBox';
import { setDefaultLanguage } from './actions/cartActions';
import { flagSet } from './utils';
import { translate } from './localisation';
import SettingScreen from './screens/SettingScreen';
import ChatBox from './components/ChatBox';
import { getPhoneNumbers } from './actions/settingActions';

function App() {
  const cart = useSelector(state => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems, localisation } = cart;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
    window.location.href = '/';
  };
  const phoneNumbers = useSelector(state => state.phoneNumbers);
  const {
    loading: loadingPhoneNum,
    error: errorPhoneNum,
    numbers,
  } = phoneNumbers;

  const productCategoryList = useSelector(state => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    if (!numbers) {
      dispatch(getPhoneNumbers());
    }
    dispatch(listProductCategories());
  }, [numbers, dispatch]);

  const setRU = () => {
    dispatch(setDefaultLanguage('RU'));
  }
  const setUA = () => {
    dispatch(setDefaultLanguage('UA'));
  }
  const setUK = () => {
    dispatch(setDefaultLanguage('UK'));
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div className="phonesSection">
            {loadingPhoneNum ? (
              <LoadingBox></LoadingBox>
            ) : errorPhoneNum ? (
              <MessageBox variant="warn">{errorPhoneNum}</MessageBox>
            ) : (numbers &&
              numbers.map(phone => (
                <div key={numbers.indexOf(phone)} className="phoneNumbers">{phone}</div>
              )))}
          </div>
          <div>
            <button type="button" className="open-sidebar" onClick={() => setSidebarIsOpen(true)}><i className="fa fa-bars"></i></button>
            <Link className="brand" to="/">{translate(localisation, 'logo_Name')} <i className='fa fa-tag'></i></Link>{/* БИРКА */}
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div className="menuSection">
            <Link to="/cart">{translate(localisation, 'cart_Name')}
              {cartItems.length > 0 && (
                <span style={{ backgroundImage: "url(/svg/bag.svg)" }} className="badge">{cartItems.length}</span>
              )}
            </Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li><Link to="/profile">{translate(localisation, 'profile_Name')} <i className='fa fa-user-o'></i></Link></li>
                    <li><Link to="/orderhistory">{translate(localisation, 'orderHistory_Name')}</Link></li>
                    <li><Link to="#signout" onClick={signoutHandler}>{translate(localisation, 'singout_Name')}</Link></li>
                  </ul>
                </div>
              ) :
                (
                  <Link to="/signin">{translate(localisation, 'singins_Name')}</Link>
                )
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">ADMIN {" "} <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">{translate(localisation, 'dashboard_Name')}</Link>
                  </li>
                  <li>
                    <Link to="/productlist">{translate(localisation, 'productlist_Name')}</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">{translate(localisation, 'orderlist_Name')}</Link>
                  </li>
                  <li>
                    <Link to="/userlist">{translate(localisation, 'userlist_Name')}</Link>
                  </li>
                  <li>
                    <Link to="/support">{translate(localisation, 'support_Name')}</Link>
                  </li>
                  <li>
                    <Link to="/setting">{translate(localisation, 'setting_Name')}</Link>
                  </li>
                </ul>
              </div>
            )}
            <div className="dropdown">
              <Link to="#lang"><img src={flagSet(localisation)} alt="cur_flag" height={20} width={20}></img> <i className="fa fa-caret-down"></i></Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="#lang#ru" onClick={setRU}>RU <img src={'/svg/ru.svg'} alt="ru_flag" height={20} width={20}></img></Link>
                </li>
                <li>
                  <Link to="#lang#ua" onClick={setUA}>UA <img src={'/svg/ua.svg'} alt="ua_flag" height={20} width={20}></img></Link>
                </li>
                <li>
                  <Link to="#lang#uk" onClick={setUK}>ENG <img src={'/svg/uk.svg'} alt="uk_flag" height={20} width={20}></img></Link>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>{translate(localisation, 'categories_Name')}</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="warn">{errorCategories}</MessageBox>
            ) : (
              categories.map(c => (
                <li key={c[localisation]}>
                  <Link
                    to={`/search/category/${c[localisation]}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c[localisation]}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category/name/:name" component={SearchScreen} exact></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>

          <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <AdminRoute path="/dashboard" component={DashboardScreen}></AdminRoute>
          <AdminRoute path="/support" component={SupportScreen}></AdminRoute>
          <AdminRoute path="/setting" component={SettingScreen}></AdminRoute>

          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div className="rightsReserved">{translate(localisation, 'rightsReserv_Name')}</div>
          <div className="hobologo">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/channel/UCJS-Ow6LOZRcrQ7VZ2_V0qA">
            <div className="row">
              <div className="createdBy">CREATED BY</div>
              <div><img src={'/img/hobologo.png'} alt="hobologo" height={40} width={40}></img></div>
            </div>
          </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
