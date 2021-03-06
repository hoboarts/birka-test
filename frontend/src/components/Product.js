import React from 'react';
import { Link } from 'react-router-dom';
import { summDivis } from '../utils';
import Rating from './Rating';

export default function Product(props) {
    const { product, rate, lang } = props;
    return (
        <div key={product._id} className="card">
            <Link to={`/product/${product._id}`}>
                <div className="container-mark">
                    {product.discount && product.discount.on &&
                        <div className="discount-mark">
                            <i className='fa fa-tag'></i>
                        </div>
                    }
                    <img className="medium"
                        src={product.image[0]}
                        alt={product.name[lang]}
                        width="400px"
                        height="400px" />
                </div>
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <h2 className={product.discount && product.discount.on ? "discount-glow" : "common-prod"}>{product.name[lang]}</h2>
                </Link>
                <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                ></Rating>
                {rate !== 0 &&
                    <div className="price">
                        {summDivis((product.priceUSD * rate).toFixed(0))} ₴
                    </div>
                }
                {product.discount && product.discount.on &&
                    <div className="price-discount">
                        {summDivis((product.discount.withoutDiscountPriceUSD * rate).toFixed(0))} ₴
                    </div>
                }
            </div>
        </div>
    )
}