import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addTask = async () => {
    if (!task) return;
    await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, { task });
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = async (index) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${index}`);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Todo App</h1>
      <input
        type="text"
        value={task}
        placeholder="Enter task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask} style={{ marginLeft: "10px" }}>
        Add
      </button>
      <ul>
        {tasks.map((t, i) => (
          <li key={i}>
            {t}{" "}
            <button
              onClick={() => deleteTask(i)}
              style={{ marginLeft: "5px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;