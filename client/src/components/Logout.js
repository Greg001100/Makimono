import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authentication";

const Logout = () => {
    const dispatch = useDispatch();
    const handleClick = () => dispatch(logout())

    return (
        <>
            <button className='justify-self-end align-self-start sp-text my-3' onClick={handleClick}>Logout</button>
        </>
    )
}

export default Logout;
