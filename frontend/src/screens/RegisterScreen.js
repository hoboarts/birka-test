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
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { translate } from '../localisation';

export default function RegisterScreen(props) {
    const lang = useSelector(state => state.cart.localisation);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordErrMessage, setPasswordErrMessage] = useState('');
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;
    const dispatch = useDispatch();
    const submitHandler = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordErrMessage('A');
        } else {
            setPasswordErrMessage('');
            dispatch(register(name, email, password));
        }
    };
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>{translate(lang, 'createCreateAccount_Name')}</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {passwordErrMessage && <MessageBox variant="warn">{translate(lang, 'passwordNotMached_Name')}</MessageBox>}
                {error && <MessageBox variant="warn">{translate(lang, error)}</MessageBox>}
                <div>
                    <label htmlFor="name">{translate(lang, 'nameName_Name')}</label>
                    <input
                        type="text"
                        id="name"
                        placeholder={translate(lang, 'enterFirstName_Name')}
                        required
                        onChange={e => setName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="email">{translate(lang, 'email_Name')}</label>
                    <input
                        type="email"
                        id="email"
                        placeholder={translate(lang, 'enterEmail_Name')}
                        required
                        onChange={e => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">{translate(lang, 'password_Name')}</label>
                    <input
                        type="password"
                        id="password"
                        placeholder={translate(lang, 'enterPassword_Name')}
                        required
                        onChange={e => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">{translate(lang, 'confirmPassword_Name')}</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder={translate(lang, 'enterConfirmPassword_Name')}
                        required
                        onChange={e => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">{translate(lang, 'register_Name')}</button>
                </div>
                <div>
                    <label />
                    <div>{translate(lang, 'alreadyHaveAccount_Name')} {" "}
                        <Link to={`/signin?redirect=${redirect}`}>{translate(lang, 'singinOne_Name')}</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}