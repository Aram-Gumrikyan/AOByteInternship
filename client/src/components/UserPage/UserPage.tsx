import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IState } from "../../interfaces";

const UserPage: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
    }, [])

    return (
        <div><h1>USERPAGE</h1></div>
    )
}

export default UserPage;

