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
import Axios from 'axios';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { translate } from '../localisation';
import { currRateLoader } from '../utils';

export default function ProductEditScreen(props) {
    const lang = useSelector(state => state.cart.localisation);
    const [rate, setRate] = useState(0);
    const productId = props.match.params.id;
    const [nameRu, setNameRu] = useState('');
    const [nameUa, setNameUa] = useState('');
    const [nameUk, setNameUk] = useState('');
    const [priceUSD, setPriceUSD] = useState('');
    const [discountOn, setDiscountOn] = useState(false);
    const [withoutDiscountPriceUSD, setWithoutDiscountPriceUSD] = useState('');
    const [image, setImage] = useState([]);
    const [categoryRu, setCategoryRu] = useState('');
    const [categoryUa, setCategoryUa] = useState('');
    const [categoryUk, setCategoryUk] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [descriptionRu, setDescriptionRu] = useState('');
    const [descriptionUa, setDescriptionUa] = useState('');
    const [descriptionUk, setDescriptionUk] = useState('');
    const [errorNoImg, setErrorNoImg] = useState('');
    const [errorMaxImg, setErrorMaxImg] = useState('');
    const [errorDiscount, setErrorDiscount] = useState('');
    const [gate, setGate] = useState(true);

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        let mounted = true;
        currRateLoader().then(res => {
            if (mounted) {
                return setRate(res);
            }
        });
        if (successUpdate) {
            props.history.push('/productlist');
        }
        if (!product || product._id !== productId || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detailsProduct(productId));
        } else if (gate) {
            setNameRu(product.name.RU);
            setNameUa(product.name.UA);
            setNameUk(product.name.UK);
            setPriceUSD(product.priceUSD);
            setImage(product.image);
            setCategoryRu(product.category.RU);
            setCategoryUa(product.category.UA);
            setCategoryUk(product.category.UK);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescriptionRu(product.description.RU);
            setDescriptionUa(product.description.UA);
            setDescriptionUk(product.description.UK);
            if (product.discount) {
                setDiscountOn(product.discount.on);
                setWithoutDiscountPriceUSD(product.discount.withoutDiscountPriceUSD);
            }
            setGate(false);
        }
        if (errorNoImg) {
            setTimeout(() => { setErrorNoImg('') }, 5000);
        }
        if (errorMaxImg) {
            setTimeout(() => { setErrorMaxImg('') }, 5000);
        }
        if (errorDiscount) {
            setTimeout(() => { setErrorDiscount('') }, 5000);
        }
        return () => mounted = false;
    }, [product, dispatch, productId, successUpdate, props.history, gate, errorNoImg, errorMaxImg, errorDiscount]);

    const submitHandler = e => {
        e.preventDefault();
        if (image.length > 0) {
            if(discountOn && withoutDiscountPriceUSD <= priceUSD) {
                setErrorDiscount('A');
                return;
            }
            dispatch(
                updateProduct({
                    _id: productId,
                    name: {
                        RU: nameRu,
                        UA: nameUa,
                        UK: nameUk
                    },
                    priceUSD,
                    discount: {
                        on: discountOn,
                        withoutDiscountPriceUSD: withoutDiscountPriceUSD,
                    },
                    image,
                    category: {
                        RU: categoryRu,
                        UA: categoryUa,
                        UK: categoryUk
                    },
                    brand,
                    countInStock,
                    description: {
                        RU: descriptionRu,
                        UA: descriptionUa,
                        UK: descriptionUk
                    },
                })
            );
        } else {
            setErrorNoImg('A');
        }
    };
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const uploadFileHandler = async e => {
        if (image.length < 3) {
            const file = e.target.files[0];
            const bodyFormData = new FormData();
            bodyFormData.append('image', file);
            setLoadingUpload(true);
            try {
                const { data } = await Axios.post('/api/uploads', bodyFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                });
                setImage(arr => [...arr, data]);
                setLoadingUpload(false);
            } catch (error) {
                setErrorUpload(error.message);
                setLoadingUpload(false);
            }
        } else {
            setErrorMaxImg('A');
        }
    };

    const handleDiscount = () => {
        setDiscountOn(!discountOn);
        setWithoutDiscountPriceUSD(0);
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>{translate(lang, "editProduct_Name")}{product ? product.prodCode : ""}</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="warn">{translate(lang, errorUpdate)}</MessageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="warn">{translate(lang, error)}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="nameRu">{translate(lang, "name_Name")} (RU)</label>
                            <input
                                id="nameRu"
                                type="text"
                                placeholder="Enter nameRu"
                                value={nameRu}
                                onChange={e => setNameRu(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="nameUa">{translate(lang, "name_Name")} (UA)</label>
                            <input
                                id="nameUa"
                                type="text"
                                placeholder="Enter nameUa"
                                value={nameUa}
                                onChange={e => setNameUa(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="nameUk">{translate(lang, "name_Name")} (ENG)</label>
                            <input
                                id="nameUk"
                                type="text"
                                placeholder="Enter nameEng"
                                value={nameUk}
                                onChange={e => setNameUk(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="price">{translate(lang, "price_Name")} ($)</label>
                            <input
                                id="price"
                                type="number"
                                placeholder="Enter price $"
                                value={priceUSD}
                                onChange={e => setPriceUSD(e.target.value)}
                                min={0}
                                step={0.01}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="priceUAH">{translate(lang, "price_Name")} (₴)</label>
                            <input
                                className="readonly"
                                id="priceUAH"
                                type="text"
                                value={(priceUSD * rate).toFixed(0)}
                                readOnly
                            ></input>
                        </div>
                        <div className="icon-frame-2">
                            <div>
                                <label htmlFor="discountSwitch">{translate(lang, "discount_Name")}</label>
                                <input
                                    id="discountSwitch"
                                    type="checkbox"
                                    value={discountOn}
                                    onChange={handleDiscount}
                                    checked={discountOn}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="discountPrice">{translate(lang, "priceWithoutDiscount_Name")} ($)</label>
                                <input
                                    className={discountOn ? "" : "readonly"}
                                    id="discountPrice"
                                    type="number"
                                    value={withoutDiscountPriceUSD}
                                    onChange={e => setWithoutDiscountPriceUSD(e.target.value)}
                                    min={0}
                                    step={0.01}
                                    readOnly={!discountOn}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="discountPriceUAH">{translate(lang, "priceWithoutDiscount_Name")} (₴)</label>
                                <input
                                    className="readonly-discount"
                                    id="discountPriceUAH"
                                    type="text"
                                    value={(withoutDiscountPriceUSD * rate).toFixed(0)}
                                    readOnly
                                ></input>
                            </div>
                        </div>
                        <div className="flex">
                            {image &&
                                image.map(image => (
                                    <div className="icon-frame-2" key={image}>
                                        <img src={image} alt={product.name[lang]} className="small"></img>
                                    </div>
                                ))}
                        </div>
                        {errorMaxImg && (
                            <div>
                                <MessageBox variant="warn">{translate(lang, 'exceededImageErr_Name')}</MessageBox>
                            </div>
                        )}
                        <div>
                            {/*<label htmlFor="image">{translate(lang, "image_Name")} (PATH)</label>
                            <input
                                id="image"
                                type="text"
                                placeholder="Enter image"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            ></input>*/}
                            <input
                                type="button"
                                onClick={() => setImage([])}
                                value={translate(lang, "cleanImage_Name").toUpperCase()}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="imageFile">{translate(lang, "addImage_Name")} (FILE)</label>
                            <input
                                id="imageFile"
                                type="file"
                                label="Choose Image"
                                onChange={uploadFileHandler}
                            ></input>
                            {loadingUpload && <LoadingBox></LoadingBox>}
                            {errorUpload && (
                                <MessageBox variant="warn">{translate(lang, errorUpload)}</MessageBox>
                            )}
                        </div>
                        <div>
                            <label htmlFor="categoryRu">{translate(lang, "category_Name")} (RU)</label>
                            <input
                                id="categoryRu"
                                type="text"
                                placeholder="Enter categoryRu"
                                value={categoryRu}
                                onChange={e => setCategoryRu(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="categoryUa">{translate(lang, "category_Name")} (UA)</label>
                            <input
                                id="categoryUa"
                                type="text"
                                placeholder="Enter categoryUa"
                                value={categoryUa}
                                onChange={e => setCategoryUa(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="categoryUk">{translate(lang, "category_Name")} (ENG)</label>
                            <input
                                id="categoryUk"
                                type="text"
                                placeholder="Enter categoryEng"
                                value={categoryUk}
                                onChange={e => setCategoryUk(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="brand">{translate(lang, "brand_Name")}</label>
                            <input
                                id="brand"
                                type="text"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={e => setBrand(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="countInStock">{translate(lang, "countInStock_Name")}</label>
                            <input
                                id="countInStock"
                                type="text"
                                placeholder="Enter qty in stock"
                                value={countInStock}
                                onChange={e => setCountInStock(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="descriptionRu">{translate(lang, "description_Name")} (RU)</label>
                            <textarea
                                id="descriptionRu"
                                rows="3"
                                type="text"
                                placeholder="Enter descriptionRu"
                                value={descriptionRu}
                                onChange={e => setDescriptionRu(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="descriptionUa">{translate(lang, "description_Name")} (UA)</label>
                            <textarea
                                id="descriptionUa"
                                rows="3"
                                type="text"
                                placeholder="Enter descriptionUa"
                                value={descriptionUa}
                                onChange={e => setDescriptionUa(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="descriptionUk">{translate(lang, "description_Name")} (ENG)</label>
                            <textarea
                                id="descriptionUk"
                                rows="3"
                                type="text"
                                placeholder="Enter descriptionEng"
                                value={descriptionUk}
                                onChange={e => setDescriptionUk(e.target.value)}
                            ></textarea>
                        </div>
                        {errorNoImg && (
                            <div>
                                <MessageBox variant="warn">{translate(lang, "addImageErr_Name")}</MessageBox>
                            </div>
                        )}
                        {errorDiscount && (
                            <div>
                                <MessageBox variant="warn">{translate(lang, "discountSmallError_Name")}</MessageBox>
                            </div>
                        )}
                        <div>
                            <label></label>
                            <button className="primary" type="submit">
                                {translate(lang, "update_Name")}
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}