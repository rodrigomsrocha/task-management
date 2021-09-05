import { FormEvent } from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../../components/Error/ErrorMessage";
import CreateTaskModal from "../../components/Modal/CreateTaskModal";
import Tasks from "../../components/Tasks/Tasks";

import { api } from "../../services/api";

import styles from "./styles/Todo.module.scss";

enum TodoStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

type TodoType = {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
};

function Todo() {
  const [todos, setTodos] = useState<TodoType[]>();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string[]>();

  let history = useHistory();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getTasks() {
      try {
        setLoading(true);
        const { data } = await api.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(data);
      } catch (err) {
        toast.error("You must be logged in", {
          style: {
            fontFamily: "Roboto, sans-serif",
          },
          iconTheme: {
            primary: "#4c00c9",
            secondary: "#f0f0f0",
          },
        });
        history.push("/signin");
      } finally {
        setLoading(false);
      }
    }
    getTasks();
  }, [history, token]);

  async function handleCreateTask(e: FormEvent) {
    e.preventDefault();
    try {
      const { data } = await api.post(
        "/tasks",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos((todos) => todos?.concat(data));
      toast.success("Task created successfully", {
        style: {
          fontFamily: "Roboto, sans-serif",
        },
        iconTheme: {
          primary: "#4c00c9",
          secondary: "#f0f0f0",
        },
      });
      setModalIsOpen(false);
    } catch (err: any) {
      setError(err.response.data.message);
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

  function handleSignOut() {
    localStorage.removeItem("token");
    history.push("/signin");
    toast("Bye Bye", {
      icon: "👋",
      style: {
        fontFamily: "Roboto, sans-serif",
      },
      iconTheme: {
        primary: "#4c00c9",
        secondary: "#f0f0f0",
      },
    });
  }

  return (
    <div className={styles.todo_container}>
      <CreateTaskModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <form onSubmit={handleCreateTask}>
          <ErrorMessage errors={error} />
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            name="title"
          />
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            name="description"
          ></textarea>
          <button disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </CreateTaskModal>
      <header className={styles.todo_header}>
        <h1>Your todos</h1>
        <div className={styles.buttons}>
          <button onClick={() => setModalIsOpen(true)}>+</button>
          <button onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i>
          </button>
        </div>
      </header>
      {todos?.length === 0 && <span>You don't have todos, create one.</span>}
      {todos?.map((todo) => (
        <Tasks
          key={todo.id}
          id={todo.id}
          status={todo.status}
          title={todo.title}
          description={todo.description}
          prevTodos={todos}
          setTodos={setTodos}
        />
      ))}
    </div>
  );
}

export default Todo;
