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
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { translate } from '../localisation';
import { currRateLoader, prices, ratings } from '../utils';

export default function SearchScreen(props) {
    const lang = useSelector(state => state.cart.localisation);
    const [rate, setRate] = useState(0);
    const {
        name = 'all',
        category = 'all',
        min = 0,
        max = 0,
        rating = 0,
        order = 'newest',
        pageNumber = 1,
        pageSize = 5,
    } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;

    const productCategoryList = useSelector(state => state.productCategoryList);
    const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;
    useEffect(() => {
        let mounted = true;
        currRateLoader().then(res => {
            if (mounted) {
                return setRate(res);
            }
        });
        dispatch(
            listProducts({
                pageNumber,
                pageSize,
                name: name !== 'all' ? name : '',
                category: category !== 'all' ? category : '',
                min,
                max,
                rating,
                order,
            })
        );
        return () => mounted = false;
    }, [category, rate, dispatch, max, min, name, order, rating, pageNumber, pageSize]);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || pageNumber;
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
    };
    return (
        <div>
            <div className="row">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="warn">{translate(lang, error)}</MessageBox>
                ) : (
                    <div>{products.length} {translate(lang, 'results_Name')}</div>
                )}
                <div>
                    {translate(lang, 'sortBy_Name')}{' '}
                    <select
                        value={order}
                        onChange={e => {
                            props.history.push(getFilterUrl({ order: e.target.value }));
                        }}
                    >
                        <option value="newest">{translate(lang, 'newestArrivals_Name')}</option>
                        <option value="lowest">{translate(lang, 'priceLowToHigh_Name')}</option>
                        <option value="highest">{translate(lang, 'priceHighToLow_Name')}</option>
                        <option value="toprated">{translate(lang, 'ratingReviews_Name')}</option>
                    </select>
                </div>
            </div>
            <div className="row top">
                <div className="col-1">
                    <h3>{translate(lang, 'section_Name')}</h3>
                    <div>
                        {loadingCategories ? (
                            <LoadingBox></LoadingBox>
                        ) : errorCategories ? (
                            <MessageBox variant="warn">{translate(lang, errorCategories)}</MessageBox>
                        ) : (
                            <ul>
                                <li>
                                    <Link
                                        className={'all' === category ? 'active' : ''}
                                        to={getFilterUrl({ category: 'all' })}
                                    >
                                        {translate(lang, 'any_Name')}
                                    </Link>
                                </li>
                                {categories.map(c => (
                                    <li key={c[lang]}>
                                        <Link
                                            className={c[lang] === category ? 'active' : ''}
                                            to={getFilterUrl({ category: c[lang] })}
                                        >
                                            {c[lang]}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <h3>{translate(lang, 'price_Name')}</h3>
                        <ul>
                            {prices.map(p => (
                                <li key={p.name}>
                                    <Link
                                        to={getFilterUrl({ min: p.min, max: p.max })}
                                        className={
                                            `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                                        }
                                    >
                                        {translate(lang, p.name)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>{translate(lang, 'customerReviews_Name')}</h3>
                        <ul>
                            {ratings.map(r => (
                                <li key={r.name}>
                                    <Link
                                        to={getFilterUrl({ rating: r.rating })}
                                        className={`${r.rating}` === `${rating}` ? 'active' : ''}
                                    >
                                        <Rating caption={translate(lang, 'andUp_Name')} rating={r.rating}></Rating>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-3">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="warn">{translate(lang, error)}</MessageBox>
                    ) : (
                        <>
                            {products.length === 0 && (
                                <MessageBox>{translate(lang, 'productNotFound_Name')}</MessageBox>
                            )}
                            <div className="row center">
                                {products.map(product => (
                                    <Product key={product._id} product={product} rate={rate} lang={lang}></Product>
                                ))}
                            </div>
                            <div className="row center pagination">
                                {/* [...Array(pages).keys()].map(x => (
                                    <Link
                                        className={x + 1 === page ? 'active' : ''}
                                        key={x + 1}
                                        to={getFilterUrl({ page: x + 1 })}
                                    >
                                        {x + 1}
                                    </Link>
                                )) */}
                                {pages > 1 && page > 1 &&
                                    <Link
                                        title="back_link"
                                        key="back"
                                        to={getFilterUrl({ page: page - 1 })}
                                    >
                                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                                    </Link>
                                }
                                {pages > 1 && pages !== page &&
                                    <Link
                                        title="next_link"
                                        key="next"
                                        to={getFilterUrl({ page: page + 1 })}
                                    >
                                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                    </Link>
                                }
                                <p>{translate(lang, 'page_Name')} {page} / {pages}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}