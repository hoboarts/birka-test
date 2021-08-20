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
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { currRateLoader } from '../utils';
import { translate } from '../localisation';

export default function HomeScreen() {
    const lang = useSelector(state => state.cart.localisation);
    const [rate, setRate] = useState(0);

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        let mounted = true;
        currRateLoader().then(res => {
            if (mounted) {
                return setRate(res);
            }
        });
        dispatch(listProducts({}));
        return () => mounted = false;
    }, [dispatch, rate]);
    // eslint-disable-next-line
    console.log("////////////////////////////////////////////////////////////////////////////////////////////////\n\
//                      :==+=-.                                                               //\n\
//      .-+**+:       -@#+--=+%%-                                                             //\n\
//    =%%+-::=@*      @%       +@-                      :*%%%#=                               //\n\
//   *@-      :@*     %@.       @%                     *@=   +@=                              //\n\
//   @#        +@:    *@:       *@.                   %%.   -@@:                              //\n\
//  .@+         %%+=+#@=        =@-                  %@.   +@@:                               //\n\
//  :@+          :-=-.          -@=                 +@-   #@%.                                //\n\
//  :@+                         :@=                .@#   *@#                                  //\n\
//  :@+                         :@+                +@:   @@                                   //\n\
//  .@*                         :@+                %%    @%                                   //\n\
//  .@*          .=*###+.       :@+  .=*%%%%%*=.  .@*    =@+:=#%%%#+:        :=*###*+:        //\n\
//   @%         +@@@%%@@@:      :@+.*@*:     :+@#::@+     :+*+:   .=%%-    =@%=:. .:=#@+.     //\n\
//   %@.       :@@:    +@-      :@#@#.          *@*@=                =@* .%%:         .#@-    //\n\
//   *@:       :@+     %%       -@@%      =%@%+  +@@*          .*%#+  -@=%%      :*##-  *@:   //\n\
//   =@=        @#    +@:       -@@=      @@@@@  .@@%          *@%%@=  @@@=      @@@@@  .@#   //\n\
//   -@+        #@    @#        +@@+      .+*+.  =@@@-         .+##+  :@@@+      :*%#-  :@@   //\n\
//   .@*        -@-  :@+        #@@@:           :@@*@@.              -@@-%@.           .%@*   //\n\
//    @@.       .@+  :@%.      .@@:@@+.       .*@@* =@@=           -#@@- :@@-         =@@%    //\n\
//    +@@*-     +@+   *@@*-.  :%@+ :%@@#+===*%@@%-   -%@%+-:::-=+#@@%+    :%@@+-:::=*@@@+     //\n\
//     -%@@@@%%@@@:    =%@@@@@@@*    :*@@@@@@@*-       -#@@@@@@@@#+:        -#@@@@@@@%=.      //\n\
//       .=*###*=.       .-+++=:        .::.              ..::.                .---:          //\n\
//                                                                                            //\n\
//_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-//\n\
//                                                                                            //\n\
//                                                                                            //\n\
//                               contact:   hoboart@zoho.com                                  //\n\
//                           itch.io:   https://hoboart.itch.io                               //\n\
//              youtube:   https://www.youtube.com/channel/UCJS-Ow6LOZRcrQ7VZ2_V0qA           //\n\
//                        art:   https://www.artstation.com/hidey0shi                         //\n\
//                                                                                            //\n\
//                                                                               SIMON ORLOV  //\n\
////////////////////////////////////////////////////////////////////////////////////////////////");
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="warn">{translate(lang, error)}</MessageBox>
            ) : (
                <div className="row center">
                    {products.map(product => (
                        <Product key={product._id} product={product} rate={rate} lang={lang}></Product>
                    ))}
                </div>
            )}
        </div>
    );
}