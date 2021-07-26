import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IState } from "../../interfaces";
import { getUserData } from "../../features/user/userSlice";

const UserPage: FC = () => {
    const { loading, data: { fname, lname, email }, error } = useSelector((state: IState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData());
    }, [])

    return (
        <div><h1>USERPAGE</h1></div>
    )
}

export default UserPage;

