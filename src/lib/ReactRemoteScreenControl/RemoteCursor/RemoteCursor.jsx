import React from "react";
import styles from './RemoteCursor.module.css';

export class RemoteCursor extends React.PureComponent{
  render() {

    const {cursorPosition: {x, y}} = this.props;

    return(
      <div style={{left: x + window.scrollX, top: y + window.scrollY}} className={styles.cursorContainer}>
        <div className={styles.cursorDefault}/>
      </div>
    );
  }
}
