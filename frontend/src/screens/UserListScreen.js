import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import { translate } from '../localisation';

export default function UserListScreen(props) {
    const lang = useSelector(state => state.cart.localisation);
    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userDelete = useSelector(state => state.userDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = userDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers());
        dispatch({
            type: USER_DETAILS_RESET,
        });
    }, [dispatch, successDelete]);
    const deleteHandler = user => {
        if (window.confirm(translate(lang, 'sureToDeleteUser_Name'))) {
            dispatch(deleteUser(user._id));
        }
    };
    return (
        <div>
            <h1>{translate(lang, 'users_Name')}</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="warn">{translate(lang, errorDelete)}</MessageBox>}
            {successDelete && (
                <MessageBox variant="success">{translate(lang, 'userDeleted_Name')}</MessageBox>
            )}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="warn">{translate(lang, error)}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>{translate(lang, 'id_Name')}</th>
                            <th>{translate(lang, 'nameName_Name')}</th>
                            <th>{translate(lang, 'email_Name')}</th>
                            <th>{translate(lang, 'admin_Name')}</th>
                            <th>{translate(lang, 'action_Name')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userID}>
                                <td>{user.userID}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? translate(lang, 'yes_Name') : translate(lang, 'no_Name')}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => props.history.push(`/user/${user._id}/edit`)}
                                    >
                                        {translate(lang, 'edit_Name')}
                                    </button>
                                    {user.userID !== 'ADMIN' &&
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() => deleteHandler(user)}
                                        >
                                            {translate(lang, 'delete_Name')}
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
