import React from 'react';
import { useSelector } from 'react-redux';
import { translate } from '../localisation';

export default function LoadingBox() {
    const lang = useSelector(state => state.cart.localisation);
    return (
        <div className="loading">
            <i className="fa fa-spinner fa-spin"></i>{translate(lang, 'loading_Name')}...
        </div>
    );
}