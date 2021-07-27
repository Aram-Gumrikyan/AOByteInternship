import { FC, useState, useEffect } from "react"
import classNames from "classnames";

import { errorMessages } from "../../constants";
import styles from "./Error.module.scss"

interface IErrorProps {
    status: string;
}

const Error: FC<IErrorProps> = ({ status }) => {
    const [message, setMessage] = useState<string>(errorMessages[status]);
    const [visible, setVisibility] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            console.log("clos");

            setVisibility(true);
        }, 3000);
    }, [])

    const errorClassName = classNames(styles.error, { [styles.closed]: visible })

    return <div className={errorClassName}>{message}</div>
}

export default Error;