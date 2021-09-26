import React from 'react';
import { useSelector } from 'react-redux';
import { translate } from '../localisation';
import { rusCorEndNames } from '../utils';

export default function Rating(props) {
    const lang = useSelector(state => state.cart.localisation);
    const { rating, numReviews, caption } = props;
    return (
        <div className="rating">
            <span>
                <i className={
                    rating >= 1
                        ? "fa fa-star"
                        : rating >= 0.5
                            ? "fa fa-star-half-o"
                            : "fa fa-star-o"
                }
                ></i>
            </span>
            <span>
                <i className={
                    rating >= 2
                        ? "fa fa-star"
                        : rating >= 1.5
                            ? "fa fa-star-half-o"
                            : "fa fa-star-o"
                }
                ></i>
            </span>
            <span>
                <i className={
                    rating >= 3
                        ? "fa fa-star"
                        : rating >= 2.5
                            ? "fa fa-star-half-o"
                            : "fa fa-star-o"
                }
                ></i>
            </span>
            <span>
                <i className={
                    rating >= 4
                        ? "fa fa-star"
                        : rating >= 3.5
                            ? "fa fa-star-half-o"
                            : "fa fa-star-o"
                }
                ></i>
            </span>
            <span><i className={
                rating >= 5
                    ? "fa fa-star"
                    : rating >= 4.5
                        ? "fa fa-star-half-o"
                        : "fa fa-star-o"
            }
            ></i>
            </span>
            {caption ? (
                <span>{caption}</span>
            ) : (
                <span>
                    {numReviews + " "}
                    {rusCorEndNames(
                        numReviews,
                        [
                            translate(lang, 'reviewPluralOne_Name'),
                            translate(lang, 'reviewPluralTwo_Name'),
                            translate(lang, 'reviewPluralThree_Name')
                        ]
                    )}
                </span>
            )}
        </div>
    )
}