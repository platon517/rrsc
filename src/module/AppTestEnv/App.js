import React from "react";
import styles from "./App.module.css";
import { Form } from "./Form/Form";
import {RrscPlate} from "../../lib";

class App extends React.PureComponent {
  render() {
    return (
      <div className={styles.app}>
        <Form />
        <RrscPlate
          normalCursorKey={16}
          //videoContainer={CustomVideoContainer}
          //videoProps={{}}
          server={'ws://localhost:3000/'}
        />
      </div>
    );
  }
}

export default App;
