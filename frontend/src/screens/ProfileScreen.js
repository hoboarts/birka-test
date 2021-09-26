import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { translate } from '../localisation';

export default function ProfileScreen() {
    const lang = useSelector(state => state.cart.localisation);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordErrMessage, setPasswordErrMessage] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
        if (passwordErrMessage) {
            setTimeout(() => { setPasswordErrMessage('') }, 5000);
        }
    }, [dispatch, userInfo._id, user,passwordErrMessage]);
    const submitHandler = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordErrMessage('A');
        } else {
            setPasswordErrMessage('');
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>{translate(lang, 'profile_Name')}</h1>
                </div>
                {loading ? <LoadingBox></LoadingBox>
                    :
                    error ? <MessageBox variant="warn">{translate(lang, error)}</MessageBox>
                        :
                        <>
                            {loadingUpdate && <LoadingBox></LoadingBox>}
                            {errorUpdate && <MessageBox variant="warn">{translate(lang, errorUpdate)}</MessageBox>}
                            {passwordErrMessage && <MessageBox variant="warn">{translate(lang, 'passwordNotMached_Name')}</MessageBox>}
                            {successUpdate && passwordErrMessage === '' && <MessageBox variant="success">{translate(lang, 'profileUpdated_Name')}</MessageBox>}
                            <div>
                                <label htmlFor="name">{translate(lang, 'nameName_Name')}</label>
                                <input id="name" type="text" placeholder={translate(lang, 'enterFirstName_Name')} value={name} onChange={e => setName(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="email">{translate(lang, 'email_Name')}</label>
                                <input id="email" type="email" placeholder={translate(lang, 'enterEmail_Name')} value={email} onChange={e => setEmail(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="password">{translate(lang, 'password_Name')}</label>
                                <input id="password" type="password" placeholder={translate(lang, 'enterPassword_Name')} onChange={e => setPassword(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">{translate(lang, 'confirmPassword_Name')}</label>
                                <input id="confirmPassword" type="password" placeholder={translate(lang, 'enterConfirmPassword_Name')} onChange={e => setConfirmPassword(e.target.value)}></input>
                            </div>
                            <div>
                                <label />
                                <button className="primary" type="submit">{translate(lang, 'update_Name')}</button>
                            </div>
                        </>
                }
            </form>
        </div>
    )
}