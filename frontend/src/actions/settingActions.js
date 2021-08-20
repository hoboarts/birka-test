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



import Axios from "axios";
import {
    PHONE_NUMBERS_FAIL,
    PHONE_NUMBERS_REQUEST,
    PHONE_NUMBERS_SUCCESS,
    SETTING_DETAILS_FAIL,
    SETTING_DETAILS_REQUEST,
    SETTING_DETAILS_SUCCESS,
    SETTING_UPDATE_FAIL,
    SETTING_UPDATE_REQUEST,
    SETTING_UPDATE_SUCCESS
} from "../constants/settingConstants";

export const getPhoneNumbers = () => async dispatch => {
    dispatch({
      type: PHONE_NUMBERS_REQUEST,
    });
    try {
      const { data } = await Axios.get('/api/configs/phones');
      dispatch({ type: PHONE_NUMBERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PHONE_NUMBERS_FAIL, payload: error.message });
    }
  };

export const detailsSetting = () => async (dispatch, getState) => {
    dispatch({ type: SETTING_DETAILS_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get('/api/configs', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: SETTING_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SETTING_DETAILS_FAIL, error: message });
    }
};

export const updateSettings = settings => async (dispatch, getState) => {
    dispatch({ type: SETTING_UPDATE_REQUEST});
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put('/api/configs/update', settings, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: SETTING_UPDATE_SUCCESS, payload: data});
    } catch (error) {
        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({ type: SETTING_UPDATE_FAIL, payload: message});
    }
}