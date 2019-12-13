import React from "react";
import styles from './RemoteCursor.module.css';
export class RemoteCursor extends React.PureComponent {
  render() {
    const {
      cursorPosition: {
        x,
        y
      }
    } = this.props;
    return React.createElement("div", {
      style: {
        left: x + window.scrollX,
        top: y + window.scrollY
      },
      className: styles.cursorContainer
    }, React.createElement("div", {
      className: styles.cursorDefault
    }));
  }

}