import { Component } from "react";
import { createPortal } from "react-dom";
import style from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");
console.log(modalRoot);

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onClose);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onClose);
  }

  onClose = (event) => {
    if (event.code === "Escape" || event.target === event.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div className={style.overlay} onClick={this.onClose}>
        <div className={style.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
