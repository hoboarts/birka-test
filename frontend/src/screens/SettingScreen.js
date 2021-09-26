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
import ReactModal from 'react-modal';
import { detailsSetting, updateSettings } from "../actions/settingActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import MaskInput from 'react-maskinput';
import { PHONE_NUMBERS_REQUEST, SETTING_UPDATE_RESET } from "../constants/settingConstants";
import { translate } from "../localisation";
import { rateLivePrivat } from "../utils";

export default function SettingScreen(props) {
    const lang = useSelector(state => state.cart.localisation);
    const [rate, setRate] = useState(0);
    const [useRate, setUseRate] = useState(false);
    const [privatRate, setPrivatRate] = useState(0);
    const [orderCounter, setOrderCounter] = useState(0);
    const [productCounter, setProductCounter] = useState(0);
    const [userCounter, setUserCounter] = useState(0);
    const [useDecrement, setUseDecrement] = useState(false);
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [keyPass, setKeyPass] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [targetNumber, setTargetNumber] = useState('');
    const [addNumber, setAddNumber] = useState('');
    const [addNumberError, setAddNumberError] = useState('');
    const [phoneNumbersError, setPhoneNumbersError] = useState('');
    const [gate, setGate] = useState(true);

    const settingDetails = useSelector(state => state.settingDetails);
    const { loading, error, setting } = settingDetails;

    const settingUpdate = useSelector(state => state.settingUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = settingUpdate;

    const dispatch = useDispatch();
    ReactModal.setAppElement('#root');
    useEffect(() => {
        let mounted = true;
        rateLivePrivat().then(res => {
            if (mounted) {
                return setPrivatRate(Number(res).toFixed(2));
            }
        });
        if (gate) {
            dispatch(detailsSetting());
            setGate(false);
        }
        if (successUpdate) {
            props.history.push('/');
        }
        if (!setting || successUpdate) {
            dispatch({ type: SETTING_UPDATE_RESET });
            dispatch(detailsSetting());
        } else {
            setRate(setting.currencyRate.value);
            setUseRate(setting.currencyRate.useIt);
            setOrderCounter(setting.shopOrderCounter.value);
            setProductCounter(setting.productCounter.value);
            setUserCounter(setting.userCounter.value);
            setUseDecrement(setting.itemDecrementer.useIt);
            setPhoneNumbers(setting.phoneNumbers.strArr);
        }
        if (errorUpdate) {
            setTimeout(() => { dispatch({ type: SETTING_UPDATE_RESET }) }, 5000);
        }
        if (addNumberError) {
            setTimeout(() => { setAddNumberError('') }, 5000);
        }
        if (phoneNumbersError) {
            setTimeout(() => { setPhoneNumbersError('') }, 5000);
        }
        return () => mounted = false;
    }, [setting, dispatch, successUpdate, props.history, gate, errorUpdate, addNumberError, phoneNumbersError]);

    const handleCleanPhone = number => {
        const temparr = [];
        const index = phoneNumbers.indexOf(number);
        phoneNumbers.map(num => { temparr.push(num); return 0 });
        delete temparr[index];
        temparr.sort();
        temparr.pop();
        setPhoneNumbers(temparr);
        setTargetNumber('');
        setShowModal(!showModal);
    }
    const handleProceedModal = number => {
        setTargetNumber(number);
        setShowModal(!showModal);
    }
    const handleAddPhone = () => {
        if (phoneNumbers.length < 3) {
            const temparr = [];
            phoneNumbers.length > 0 && phoneNumbers.map(num => { temparr.push(num); return 0 });
            temparr.push(addNumber);
            setPhoneNumbers(temparr);
            setAddNumber('');
        } else {
            setAddNumberError('A');
        }
    }


    const settingUpdateHandler = e => {
        e.preventDefault();
        if (phoneNumbers.length < 1) {
            setPhoneNumbersError('A');
        } else {
            dispatch(
                updateSettings({
                    currencyRate: rate,
                    useRate: useRate,
                    orderCounter: orderCounter,
                    productCounter: productCounter,
                    userCounter: userCounter,
                    useDecrementer: useDecrement,
                    phoneNumbers: phoneNumbers,
                    keyPass: keyPass,
                })
            );
            dispatch({ type: PHONE_NUMBERS_REQUEST });
        }
    }
    return (
        <div>
            <form className="form" onSubmit={settingUpdateHandler}>
                <div>
                    <h1>{translate(lang, 'setting_Name')}</h1>
                </div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="warn">{translate(lang, error)}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="rate">{translate(lang, 'currencyExchangeDB_Name')} ( $ USD {"->"} ₴ UAH ) </label>
                            <input
                                id="rate"
                                type="number"
                                value={rate}
                                min={0}
                                step={0.01}
                                onChange={e => setRate(Number(e.target.value).toFixed(2))}
                            ></input>
                        </div>
                        <div className="icon-frame-2">
                            <label htmlFor="rateSwitch">{translate(lang, 'useCurrencyExchangeDB_Name')}</label>
                            <input
                                id="rateSwitch"
                                type="checkbox"
                                value={useRate}
                                onChange={() => setUseRate(!useRate)}
                                checked={useRate}
                            ></input>
                        </div>
                        {privatRate === 0 ? (
                            <LoadingBox></LoadingBox>
                        ) :
                            <div>
                                <label htmlFor="ratePrivat">{translate(lang, 'currencyExchangePrivat_Name')} ( $ USD {"->"} ₴ UAH ) </label>
                                <input
                                    className="readonly"
                                    id="ratePrivat"
                                    type="number"
                                    value={privatRate}
                                    readOnly
                                ></input>
                            </div>
                        }
                        <div>
                            <label htmlFor="orderCounter">{translate(lang, 'shopOrderCounter_Name')}</label>
                            <input
                                id="orderCounter"
                                type="number"
                                value={orderCounter}
                                min={0}
                                onChange={e => setOrderCounter(Number(e.target.value).toFixed(0))}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="productCounter">{translate(lang, 'productCounter_Name')}</label>
                            <input
                                id="productCounter"
                                type="number"
                                value={productCounter}
                                min={0}
                                onChange={e => setProductCounter(Number(e.target.value).toFixed(0))}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="userCounter">{translate(lang, 'userCounter_Name')}</label>
                            <input
                                id="userCounter"
                                type="number"
                                value={userCounter}
                                min={0}
                                onChange={e => setUserCounter(Number(e.target.value).toFixed(0))}
                            ></input>
                        </div>
                        <div className="icon-frame-2">
                            <label htmlFor="decrementerSwitch">{translate(lang, 'decrementer_Name')}</label>
                            <input
                                id="decrementerSwitch"
                                type="checkbox"
                                value={useDecrement}
                                onChange={() => setUseDecrement(!useDecrement)}
                                checked={useDecrement}
                            ></input>
                        </div>
                        <div className="icon-frame-2">
                            <label>{translate(lang, 'phoneNumHeader_Name')}</label>
                            {phoneNumbers.length > 0 &&
                                phoneNumbers.map(phone => (
                                    <div className="deletePhone" key={phoneNumbers.indexOf(phone)} onClick={() => handleProceedModal(phone)}>{phone} <i className='fa fa-times'></i></div>
                                ))}
                        </div>
                        <div>
                            <label htmlFor="phoneNum">{translate(lang, 'addNumber_Name')}</label>
                            <MaskInput
                                id="phoneNum"
                                placeholder="+38-"
                                value={addNumber}
                                onChange={e => setAddNumber(e.target.value)}
                                mask={'+38-(000)-000-00-00'}
                            ></MaskInput>
                        </div>
                        <div>
                            <button type="button" onClick={handleAddPhone}>{translate(lang, 'add_Name')}</button>
                        </div>
                        {addNumberError && (
                            <MessageBox variant="warn">{translate(lang, 'exceededPhoneErr_Name')}</MessageBox>
                        )}
                        <div>
                            <ReactModal
                                isOpen={showModal}
                                className="modal"
                                overlayClassName="overlay">
                                <div className="center">
                                    <div>
                                        <p>{translate(lang, 'sureToDeleteNumber_Name')} {targetNumber} ?</p>
                                        <button type="button" onClick={() => handleCleanPhone(targetNumber)}>{translate(lang, 'yes_Name')}</button>
                                        <button type="button" onClick={() => setShowModal(!showModal)}>{translate(lang, 'no_Name')}</button>
                                    </div>
                                </div>
                            </ReactModal>
                        </div>
                        <div>
                            <label htmlFor="keyPass">Key-Pass</label>
                            <input
                                id="keyPass"
                                type="password"
                                placeholder={translate(lang, 'enterKeyPass_Name')}
                                value={keyPass}
                                onChange={e => setKeyPass(e.target.value)}
                            ></input>
                        </div>
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                        {errorUpdate && (
                            <MessageBox variant="warn">{translate(lang, errorUpdate)}</MessageBox>
                        )}
                        {phoneNumbersError && (
                            <MessageBox variant="warn">{translate(lang, 'addPhoneErr_Name')}</MessageBox>
                        )}
                        <div>
                            <label></label>
                            <button className="primary" type="submit">
                                {translate(lang, "update_Name")}
                            </button>
                        </div>
                        <div>
                            <label>BIRKA ENGINE Build 0.5.3 [React {React.version}]</label>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}