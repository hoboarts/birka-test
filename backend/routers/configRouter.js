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



import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Config from '../models/configModel.js';
import { isAdmin, isAuth } from '../utils.js';

const configRouter = express.Router();

configRouter.get('/rate', expressAsyncHandler(async (req, res) => {
  const rate = await Config.find({ type: 'currencyRate' });
  res.send(rate);
}));

configRouter.get('/paymer', expressAsyncHandler(async (req, res) => {
  const data = {
    merchId: process.env.MERCH_ID,
    hostName: process.env.HOST_NAME,
  }
  res.send(data);
}));

configRouter.get('/phones', expressAsyncHandler(async (req, res) => {
  const phoneNumbers = await Config.find({ type: 'phoneNumbers' });
  res.send(phoneNumbers[0].strArr);
}));

configRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  const shopCounter = await Config.find({ type: 'ShopOrdCounter' });
  const prodCounter = await Config.find({ type: 'ProductCounter' });
  const currencyRate = await Config.find({ type: 'currencyRate' });
  const userCounter = await Config.find({ type: 'UserCounter' });
  const itemDecrementer = await Config.find({ type: 'StockQtyDecrementer' });
  const phoneNumbers = await Config.find({ type: 'phoneNumbers' });
  const setting = {
    shopOrderCounter: { value: shopCounter[0].value, useIt: shopCounter[0].useIt },
    currencyRate: { value: currencyRate[0].value, useIt: currencyRate[0].useIt },
    productCounter: { value: prodCounter[0].value, useIt: prodCounter[0].useIt },
    userCounter: { value: userCounter[0].value, useIt: userCounter[0].useIt },
    itemDecrementer: { value: itemDecrementer[0].value, useIt: itemDecrementer[0].useIt },
    phoneNumbers: { strArr: phoneNumbers[0].strArr },
  };
  res.send(setting);
}));

configRouter.put('/update', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  if (req.body.keyPass === process.env.KEY_PASS) {
    const shopCounter = await Config.find({ type: 'ShopOrdCounter' });
    const prodCounter = await Config.find({ type: 'ProductCounter' });
    const currencyRate = await Config.find({ type: 'currencyRate' });
    const userCounter = await Config.find({ type: 'UserCounter' });
    const itemDecrementer = await Config.find({ type: 'StockQtyDecrementer' });
    const phoneNumbers = await Config.find({ type: 'phoneNumbers' });
    shopCounter[0].value = req.body.orderCounter;
    currencyRate[0].value = req.body.currencyRate;
    currencyRate[0].useIt = req.body.useRate;
    prodCounter[0].value = req.body.productCounter;
    userCounter[0].value = req.body.userCounter;
    itemDecrementer[0].useIt = req.body.useDecrementer;
    phoneNumbers[0].strArr = req.body.phoneNumbers;
    const updatedShopCounter = await shopCounter[0].save();
    const updatedCurrencyRate = await currencyRate[0].save();
    const updatedProdCounter = await prodCounter[0].save();
    const updatedUserCounter = await userCounter[0].save();
    const updatedItemDecrementer = await itemDecrementer[0].save();
    const updatedPhoneNumbers = await phoneNumbers[0].save();
    res.send({ message: 4001, settings: [updatedShopCounter, updatedCurrencyRate, updatedProdCounter, updatedUserCounter, updatedItemDecrementer, updatedPhoneNumbers] });
  } else {
    res.status(404).send({ message: 1004 });
  }
}));

export default configRouter;