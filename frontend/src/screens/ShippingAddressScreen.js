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
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import MaskInput from 'react-maskinput';
import { translate } from '../localisation';

export default function ShippingAddressScreen(props) {
    const lang = useSelector(state => state.cart.localisation);
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!userInfo) {
        props.history.push('/signin');
    }
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [address, setAddress] = useState('');
    const [postOfficeId, setPostOfficeId] = useState('');
    const [city, setCity] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {
        if (shippingAddress.firstName &&
            shippingAddress.lastName &&
            shippingAddress.phoneNum &&
            shippingAddress.address &&
            shippingAddress.postOfficeId &&
            shippingAddress.city) {
            setFirstName(shippingAddress.firstName);
            setLastName(shippingAddress.lastName);
            setPhoneNum(shippingAddress.phoneNum);
            setAddress(shippingAddress.address);
            setPostOfficeId(shippingAddress.postOfficeId);
            setCity(shippingAddress.city);
        }
    }, [shippingAddress]);
    const submitHandler = e => {
        e.preventDefault();
        dispatch(saveShippingAddress({ firstName, lastName, phoneNum, address, postOfficeId, city }));
        props.history.push('/payment');
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>{translate(lang, 'shippingAddress_Name')}</h1>
                </div>
                <div>
                    <label htmlFor="firstName">{translate(lang, 'firstName_Name')}</label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder={translate(lang, 'enterFirstName_Name')}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="lastName">{translate(lang, 'lastName_Name')}</label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder={translate(lang, 'enterLastName_Name')}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="phoneNum">{translate(lang, 'phoneNumber_Name')}</label>
                    <MaskInput
                        id="phoneNum"
                        placeholder="+38-"
                        value={phoneNum}
                        onChange={e => setPhoneNum(e.target.value)}
                        mask={'+38-(000)-000-00-00'}
                        required
                    ></MaskInput>
                </div>
                <div>
                    <label htmlFor="address">{translate(lang, 'address_Name')}</label>
                    <input
                        type="text"
                        id="address"
                        placeholder={translate(lang, 'enterAddress_Name')}
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="postOfficeId">{translate(lang, 'postOfficeId_Name')}</label>
                    <input
                        type="text"
                        id="postOfficeId"
                        placeholder={translate(lang, 'enterPostOfficeId_Name')}
                        value={postOfficeId}
                        onChange={e => setPostOfficeId(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="city">{translate(lang, 'city_Name')}</label>
                    <input
                        type="text"
                        id="city"
                        placeholder={translate(lang, 'enterCity_Name')}
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="country">{translate(lang, 'country_Name')}</label>
                    <input
                        className="readonly"
                        type="text"
                        id="country"
                        value={translate(lang, 'ukraine_Name')}
                        readOnly
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">{translate(lang, 'continue_Name')}</button>
                </div>
            </form>
        </div>
    );
}