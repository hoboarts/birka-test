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



import bcrypt from 'bcryptjs';

const data = {
    config: [
        {
            type: "ShopOrdCounter",
            value: 110097,
            useIt: true,
        },
        {
            type: "currencyRate",
            value: 27.33,
            useIt: true,
        },
        {
            type: "ProductCounter",
            value: 8,
            useIt: true,
        },
        {
            type: "UserCounter",
            value: 1,
            useIt: true,
        },
    ],
    users: [
        {
            name: "James",
            email: "admin@example.com",
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: "Vasia",
            email: "user@example.com",
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: "Шубка белая Prada",
            category: "Шубы",
            image: "/img/p1a.jpeg",
            price: 450,
            countInStock: 2,
            brand: "Prada",
            rating: 4.2,
            numReviews: 1,
            description: "Супер шубка"
        },
        {
            name: "Кроссовки Nike крас.",
            category: "Обувь",
            image: "/img/sh1a.jpg",
            price: 65,
            countInStock: 10,
            brand: "Nike",
            rating: 4.7,
            numReviews: 3,
            description: "Супер обувь"
        },
        {
            name: "Кроссовки Nike син.",
            category: "Обувь",
            image: "/img/sh2a.jpg",
            price: 47,
            countInStock: 5,
            brand: "Nike",
            rating: 0.6,
            numReviews: 6,
            description: "Супер спортивня обувь"
        },
        {
            name: "Брюки розовые Guh",
            category: "Брюки",
            image: "/img/pn1a.jpg",
            price: 88,
            countInStock: 8,
            brand: "Guh",
            rating: 3.9,
            numReviews: 25,
            description: "Супер Брюки"
        },
        {
            name: "Куртка беж. Arctic",
            category: "Куртки",
            image: "/img/jk2a.jpg",
            price: 55,
            countInStock: 3,
            brand: "Arctic",
            rating: 2.4,
            numReviews: 135,
            description: "Супер Куртка"
        },
        {
            name: "Велосипед бел. Framed",
            category: "Шубы",
            image: "/img/bk1a.jpg",
            price: 230,
            countInStock: 0,
            brand: "Framed",
            rating: 5,
            numReviews: 0,
            description: "Супер Велосипед"
        },
        {
            name: "Скейтборд Framed",
            category: "Спорт",
            image: "/img/sh1b.jpg",
            price: 89,
            countInStock: 1,
            brand: "Framed",
            rating: 4.2,
            numReviews: 3,
            description: "Супер Скейтборд"
        },
    ],
};
export default data;