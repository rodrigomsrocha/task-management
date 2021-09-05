import { ReactNode } from "react";
import Modal from "react-modal";

import styles from "./styles/CreateTaskModal.module.scss";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
  children: ReactNode;
};

Modal.setAppElement("#root");

function CreateTaskModal(props: ModalProps) {
  function closeModal() {
    props.setIsOpen(false);
  }
  return (
    <Modal
      className={styles.modal_container}
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={300}
    >
      <h1>Create a task</h1>
      <button className={styles.close_button} onClick={closeModal}>
        X
      </button>
      {props.children}
    </Modal>
  );
}

export default CreateTaskModal;
