<<<<<<< HEAD
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
    const createScript = () => {
        const script = document.createElement('script');
        script.src = "https://api.tascombank.com.ua/static_common/v1/checkout/ipsp.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);
    }
    useEffect(() => {
        if (!dat) {
            createScript();
            grabData();
        }
    }, [dat]);
    return ((!rate || isNaN(rate) || rate === null || !dat || !window.$ipsp) ? <LoadingBox></LoadingBox> :
        <div>
            <button className="primary block" onClick={payHandler} amount={0} orderid={'0'}>{translate(lang, 'pay_Name')}</button>
        </div>
    );
=======
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
    const createScript = () => {
        const script = document.createElement('script');
        script.src = "https://api.tascombank.com.ua/static_common/v1/checkout/ipsp.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);
    }
    useEffect(() => {
        if (!dat) {
            createScript();
            grabData();
        }
    }, [dat]);
    return ((!rate || isNaN(rate) || rate === null || !dat || !window.$ipsp) ? <LoadingBox></LoadingBox> :
        <div>
            <button className="primary block" onClick={payHandler} amount={0} orderid={'0'}>{translate(lang, 'pay_Name')}</button>
        </div>
    );
>>>>>>> e13636cd4367130a0fe8423b2c9c9538e7e8d390
}