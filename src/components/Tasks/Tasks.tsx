import Tippy from "@tippyjs/react";
import { ReactNode, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../services/api";

import styles from "./styles/Tasks.module.scss";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/purple.css";
import "tippy.js/animations/perspective.css";
import { Dispatch } from "react";

enum TodoStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

type TaskType = {
  id: string;
  title: string;
  status: TodoStatus;
  description: string;
};

type TasksProps = {
  prevTodos: TaskType[];
  setTodos: Dispatch<SetStateAction<TaskType[] | undefined>>;
  id: string;
  title: string;
  status: TodoStatus;
  description: string;
  children?: ReactNode;
};

function Tasks(props: TasksProps) {
  const [isStatusActive, setIsStatusActive] = useState<boolean>(false);
  const [status, setStatus] = useState<TodoStatus>(props.status);
  const token = localStorage.getItem("token");

  async function updateStatus(status: TodoStatus) {
    try {
      await api.patch(
        `/tasks/${props.id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus(status);
      toast.success("Task status updated", {
        style: {
          fontFamily: "Roboto, sans-serif",
        },
        iconTheme: {
          primary: "#4c00c9",
          secondary: "#f0f0f0",
        },
      });
    } catch (err) {
      toast.error("An error occurred", {
        style: {
          fontFamily: "Roboto, sans-serif",
        },
        iconTheme: {
          primary: "#4c00c9",
          secondary: "#f0f0f0",
        },
      });
    }
  }

  async function deleteTask() {
    try {
      await api.delete(`/tasks/${props.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedTodos = props.prevTodos.filter(
        (prevTodo) => prevTodo.id !== props.id
      );
      props.setTodos(updatedTodos);
      toast.success("Task deleted", {
        style: {
          fontFamily: "Roboto, sans-serif",
        },
        iconTheme: {
          primary: "#4c00c9",
          secondary: "#f0f0f0",
        },
      });
    } catch (err) {
      toast.error("An error occurred", {
        style: {
          fontFamily: "Roboto, sans-serif",
        },
        iconTheme: {
          primary: "#4c00c9",
          secondary: "#f0f0f0",
        },
      });
    }
  }

  return (
    <div className={`${styles.task_container} ${styles[status]}`}>
      <header>
        <h2>{props.title}</h2>
        <div
          onClick={() => setIsStatusActive(!isStatusActive)}
          className={`${styles.accordion} ${
            isStatusActive ? styles.active : ""
          }`}
        ></div>
      </header>
      <p>{props.description}</p>
      <div
        className={styles.control}
        style={{
          display: `${isStatusActive ? "flex" : "none"}`,
        }}
      >
        <Tippy content="Done" animation="perspective" theme="purple">
          <div
            className={styles.done}
            onClick={() => updateStatus(TodoStatus.DONE)}
          ></div>
        </Tippy>
        <Tippy content="In progress" animation="perspective" theme="purple">
          <div
            className={styles.in_progress}
            onClick={() => updateStatus(TodoStatus.IN_PROGRESS)}
          ></div>
        </Tippy>
        <Tippy content="Open" animation="perspective" theme="purple">
          <div
            className={styles.open}
            onClick={() => updateStatus(TodoStatus.OPEN)}
          ></div>
        </Tippy>
        <Tippy content="Delete" animation="perspective" theme="purple">
          <i className="fa fa-trash" onClick={deleteTask}></i>
        </Tippy>
      </div>
    </div>
  );
}

export default Tasks;
