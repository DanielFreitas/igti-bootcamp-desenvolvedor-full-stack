import React, { Component } from "react";

import css from "./progress-bar.module.css";

export default class ProgressBar extends Component {
  render() {
    const { netS, discINSS, discIRPF } = this.props;

    return (
      <div>
        <div className={css.container}>
          <div className={`${css.square} ${css.squareGreen}`}>
            Salário Líquido
          </div>
          <div className={`${css.square} ${css.squareOrange}`}>Desc. INSS</div>
          <div className={`${css.square} ${css.barColorRed}`}>Desc. IRPF</div>
        </div>

        <div className={css.bar}>
          <div
            style={{
              height: "100%",
              backgroundColor: "#e67e22",
              width: `${discINSS}%`,
              float: "left",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
          ></div>
          <div
            style={{
              height: "100%",
              backgroundColor: "rgb(255, 69, 0)",
              width: `${discIRPF}%`,
              float: "left",
            }}
          ></div>
          <div
            style={{
              height: "100%",
              backgroundColor: "#16a085",
              width: `${netS}%`,
              float: "left",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          ></div>
        </div>
      </div>
    );
  }
}
