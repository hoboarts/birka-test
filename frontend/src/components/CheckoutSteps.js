import React from 'react';
import { useSelector } from 'react-redux';
import { translate } from '../localisation';

export default function CheckoutSteps(props) {
    const lang = useSelector(state => state.cart.localisation);
    return (
        <>
            <div className={'back-checkout'}></div>
            <div className={props.step2 && !props.step3 ? 'step2' : props.step3 && !props.step4  ? 'step3': props.step4 ? 'step4': ''}></div>
            <div className="row checkout-steps">
                <div className={props.step1 ? 'active' : ''}>{translate(lang, 'singin_Name')}</div>
                <div className={props.step2 ? 'active' : ''}>{translate(lang, 'shipping_Name')}</div>
                <div className={props.step3 ? 'active' : ''}>{translate(lang, 'payment_Name')}</div>
                <div className={props.step4 ? 'active' : ''}>{translate(lang, 'confirmationOrder_Name')}</div>
            </div>
        </>
    );
}