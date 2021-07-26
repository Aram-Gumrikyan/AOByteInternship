import { FC } from "react";
import { Icon } from 'semantic-ui-react'

import styles from "./Loading.module.scss";

const Loading: FC = () => {
  return (
    <div className={styles.loading}>
      <Icon loading name='spinner' size="big" color="blue" />
    </div>
  )
}
export default Loading;