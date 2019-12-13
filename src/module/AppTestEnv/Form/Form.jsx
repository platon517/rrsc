import React from "react";
import styles from "./Form.module.css";

export class Form extends React.PureComponent {
  state = {
    login: "",
    email: "",
    password: "",
    testData: "",
    text: ""
  };

  changeHandler = (val, prop) => {
    this.setState({
      [prop]: val
    });
  };

  sendTestData = () => {
    const { login, email } = this.state;

    this.setState({
      testData: `Thank you, ${login}! We have sent you an email to ${email}.`
    });
  };

  render() {
    const { login, email, password, testData, text } = this.state;
    return (
      <div className={styles.formContainer}>
        <span className={styles.scrollable}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sollicitudin massa ac luctus egestas. Sed hendrerit auctor tellus id
          auctor. Praesent viverra ante eget velit egestas, sed laoreet augue
          consectetur. Ut vulputate justo eget libero ultricies, et euismod
          metus tristique. Proin tristique sit amet lectus scelerisque maximus.
          Vivamus condimentum neque non justo cursus ullamcorper. Nunc euismod
          est ac est pellentesque tempor. Nunc et varius turpis, et ultrices
          nulla. Nullam at dolor ac ligula vestibulum iaculis. Aenean nec odio
          at tellus eleifend vulputate. Fusce sed magna eu massa aliquet
          vestibulum ac a nibh. Ut ullamcorper viverra finibus. Mauris a sapien
          porta, facilisis nisi et, ornare lorem. Nulla cursus, elit ut iaculis
          tempor, metus nulla tempus ante, at cursus leo erat eu urna. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Nulla id nulla non diam feugiat sollicitudin. Nunc nisl
          urna, tincidunt sed malesuada ut, tincidunt ut quam. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Cras vel mi sapien.
          Etiam est purus, bibendum auctor ex nec, malesuada luctus nisi.
          Vivamus ultrices pulvinar luctus. In elit magna, sollicitudin vitae
          mauris nec, laoreet interdum nisl. Ut sit amet pulvinar libero, in
          hendrerit neque. Vestibulum metus sapien, facilisis nec facilisis sed,
          efficitur quis libero. Aliquam efficitur risus in turpis pulvinar
          efficitur. Nullam pellentesque nulla et turpis commodo, eu venenatis
          sem ornare. Sed erat neque, vestibulum vel massa id, semper consequat
          nunc. Pellentesque fringilla accumsan turpis ac iaculis. Duis non
          mauris finibus, fringilla urna eu, fringilla nisl. Mauris mi massa,
          iaculis at posuere vel, luctus in tortor. Vestibulum dictum magna vel
          molestie pellentesque. Morbi sed massa dui. Etiam aliquam, elit et
          congue efficitur, enim augue placerat augue, quis placerat tellus
          felis non nisl. Suspendisse viverra lorem in neque euismod luctus. Sed
          sit amet pretium nulla, ac pharetra purus. Sed pretium faucibus massa,
          et porta nisl laoreet vitae. Sed pharetra sem tortor, quis maximus est
          congue sed. Mauris vel volutpat est, eget fermentum ex. Nullam et nibh
          felis. Quisque commodo nisl non velit porta, nec aliquam enim dictum.
          Etiam pretium dolor suscipit mauris laoreet, at ultrices erat
          scelerisque. Mauris nec velit ut odio facilisis ornare. Donec non
          pulvinar enim, eget scelerisque leo. Integer convallis sagittis nibh,
          congue fermentum sem accumsan ac. Nullam lorem lacus, lacinia et ipsum
          vel, varius ullamcorper tellus. Suspendisse ac nibh ac sem imperdiet
          maximus vitae et massa. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia Curae; Maecenas dui enim, lacinia
          sollicitudin urna sit amet, hendrerit faucibus lacus. Aliquam
          vulputate vitae mi ut congue. Fusce feugiat arcu sit amet rhoncus
          imperdiet. Donec pulvinar, nulla sed egestas facilisis, massa turpis
          volutpat nibh, eget luctus lorem dui eu urna. Nam laoreet nisl at
          massa tempor, a tempor est varius. Praesent quis eleifend dolor. Morbi
          facilisis leo est, vitae imperdiet lorem iaculis nec. Mauris eu nunc
          et purus placerat hendrerit non et est. Cras eget tortor vitae libero
          iaculis posuere. Duis vitae pellentesque diam, eget commodo neque. Ut
          suscipit erat sem. Nulla rhoncus sagittis ipsum, quis imperdiet elit
          auctor vitae. Mauris eget ex vel lacus pretium molestie.
        </span>
        <span className={styles.scrollableX}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sollicitudin massa ac luctus egestas. Sed hendrerit auctor tellus id
          auctor. Praesent viverra ante eget velit egestas, sed laoreet augue
          consectetur. Ut vulputate justo eget libero ultricies, et euismod
          metus tristique. Proin tristique sit amet lectus scelerisque maximus.
          Vivamus condimentum neque non justo cursus ullamcorper. Nunc euismod
          est ac est pellentesque tempor. Nunc et varius turpis, et ultrices
          nulla. Nullam at dolor ac ligula vestibulum iaculis. Aenean nec odio
          at tellus eleifend vulputate. Fusce sed magna eu massa aliquet
          vestibulum ac a nibh. Ut ullamcorper viverra finibus. Mauris a sapien
          porta, facilisis nisi et, ornare lorem. Nulla cursus, elit ut iaculis
          tempor, metus nulla tempus ante, at cursus leo erat eu urna. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Nulla id nulla non diam feugiat sollicitudin. Nunc nisl
          urna, tincidunt sed malesuada ut, tincidunt ut quam. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Cras vel mi sapien.
          Etiam est purus, bibendum auctor ex nec, malesuada luctus nisi.
          Vivamus ultrices pulvinar luctus. In elit magna, sollicitudin vitae
          mauris nec, laoreet interdum nisl. Ut sit amet pulvinar libero, in
          hendrerit neque. Vestibulum metus sapien, facilisis nec facilisis sed,
          efficitur quis libero. Aliquam efficitur risus in turpis pulvinar
          efficitur. Nullam pellentesque nulla et turpis commodo, eu venenatis
          sem ornare. Sed erat neque, vestibulum vel massa id, semper consequat
          nunc. Pellentesque fringilla accumsan turpis ac iaculis. Duis non
          mauris finibus, fringilla urna eu, fringilla nisl. Mauris mi massa,
          iaculis at posuere vel, luctus in tortor. Vestibulum dictum magna vel
          molestie pellentesque. Morbi sed massa dui. Etiam aliquam, elit et
          congue efficitur, enim augue placerat augue, quis placerat tellus
          felis non nisl. Suspendisse viverra lorem in neque euismod luctus. Sed
          sit amet pretium nulla, ac pharetra purus. Sed pretium faucibus massa,
          et porta nisl laoreet vitae. Sed pharetra sem tortor, quis maximus est
          congue sed. Mauris vel volutpat est, eget fermentum ex. Nullam et nibh
          felis. Quisque commodo nisl non velit porta, nec aliquam enim dictum.
          Etiam pretium dolor suscipit mauris laoreet, at ultrices erat
          scelerisque. Mauris nec velit ut odio facilisis ornare. Donec non
          pulvinar enim, eget scelerisque leo. Integer convallis sagittis nibh,
          congue fermentum sem accumsan ac. Nullam lorem lacus, lacinia et ipsum
          vel, varius ullamcorper tellus. Suspendisse ac nibh ac sem imperdiet
          maximus vitae et massa. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia Curae; Maecenas dui enim, lacinia
          sollicitudin urna sit amet, hendrerit faucibus lacus. Aliquam
          vulputate vitae mi ut congue. Fusce feugiat arcu sit amet rhoncus
          imperdiet. Donec pulvinar, nulla sed egestas facilisis, massa turpis
          volutpat nibh, eget luctus lorem dui eu urna. Nam laoreet nisl at
          massa tempor, a tempor est varius. Praesent quis eleifend dolor. Morbi
          facilisis leo est, vitae imperdiet lorem iaculis nec. Mauris eu nunc
          et purus placerat hendrerit non et est. Cras eget tortor vitae libero
          iaculis posuere. Duis vitae pellentesque diam, eget commodo neque. Ut
          suscipit erat sem. Nulla rhoncus sagittis ipsum, quis imperdiet elit
          auctor vitae. Mauris eget ex vel lacus pretium molestie.
        </span>
        <input
          value={login}
          onChange={e => this.changeHandler(e.target.value, "login")}
          placeholder={"login"}
        />
        <input
          value={email}
          onChange={e => this.changeHandler(e.target.value, "email")}
          placeholder={"email"}
        />
        <input
          value={password}
          onChange={e => this.changeHandler(e.target.value, "password")}
          placeholder={"password"}
          type={"password"}
        />
        <textarea
          value={text}
          onChange={e => this.changeHandler(e.target.value, "text")}
        />
        <button onClick={this.sendTestData}>test</button>
        {testData && <span>{testData}</span>}
        <div className={styles.testDiv} onClick={this.sendTestData}>click me</div>
      </div>
    );
  }
}
