import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { translate } from '../localisation';
import LoadingBox from './LoadingBox';

export default function PayButton(props) {
    const { rate, lang } = props;
    const [dat, setDat] = useState("");

    const payHandler = () => {
        if (dat) {
            const button = window.$ipsp.get('button');
            button.setMerchantId(dat.merchId);
            button.setAmount(props.amount, 'UAH', true);
            button.setHost('api.tascombank.com.ua');
            button.setResponseUrl(`${dat.hostName}/api/orders/verif`);
            button.addField({
                'label': 'orderId',
                'name': `${props.amount}00`,
                'value': props.orderid,
                'readonly': true
            });
            window.location.href = button.getUrl();
        }
    };
    const grabData = async () => {
        const { data } = await Axios.get('/api/configs/paymer');
        setDat(data);
    }
    useEffect(() => {
        if (!dat) {
            grabData();
        }
    }, [dat]);
    return ((!rate || isNaN(rate) || rate === null || !dat || !window.$ipsp) ? <LoadingBox></LoadingBox> :
        <div>
            <button className="primary block" onClick={payHandler} amount={0} orderid={'0'}>{translate(lang, 'pay_Name')}</button>
        </div>
    );
}