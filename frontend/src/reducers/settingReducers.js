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



import {
    PHONE_NUMBERS_FAIL,
    PHONE_NUMBERS_REQUEST,
    PHONE_NUMBERS_RESET,
    PHONE_NUMBERS_SUCCESS,
    SETTING_DETAILS_FAIL,
    SETTING_DETAILS_REQUEST,
    SETTING_DETAILS_SUCCESS,
    SETTING_UPDATE_FAIL,
    SETTING_UPDATE_REQUEST,
    SETTING_UPDATE_RESET,
    SETTING_UPDATE_SUCCESS,
} from "../constants/settingConstants";

export const phoneNumbersReducer = (state = {}, action) => {
    switch (action.type) {
        case PHONE_NUMBERS_REQUEST:
            return { loading: true };
        case PHONE_NUMBERS_SUCCESS:
            return { loading: false, numbers: action.payload };
        case PHONE_NUMBERS_FAIL:
            return { loading: false, error: action.payload };
        case PHONE_NUMBERS_RESET:
            return {};
        default:
            return state;
    }
};

export const settingDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case SETTING_DETAILS_REQUEST:
            return { loading: true };
        case SETTING_DETAILS_SUCCESS:
            return { loading: false, setting: action.payload };
        case SETTING_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const settingUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case SETTING_UPDATE_REQUEST:
            return { loading: true };
        case SETTING_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case SETTING_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case SETTING_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};