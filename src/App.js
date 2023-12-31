import React, { useState } from "react";
import "./App.css";
import { CompletedTasks } from "./components/Helper";
import { PendingTasks } from "./components/Helper";

function App() {
    const [toDos, setTodos] = useState([]);
    const [toDo, setTodo] = useState("");
    const [err, setError] = useState(null);

    const [deletedTasks, setDeletedTasks] = useState([]);

    const deleteList = (id) => {
        const deletedTask = toDos.find((task) => task.id === id);
        setDeletedTasks([...deletedTasks, deletedTask]);
        const newList = toDos.filter((task) => task.id !== id);
        setTodos(newList);
    };

    return (
        <div className="app">
            <div className="mainHeading">
                <h1>ToDo List</h1>
            </div>
            <div className="subHeading">
                <br />
                <h2>📝 Available List Of Task</h2>
            </div>
            <div className="input">
                <input
                    type="text"
                    value={toDo}
                    onChange={(e) => {
                        setError("");
                        setTodo(e.target.value);
                    }}
                    placeholder="📝 Enter Your Word Title!"
                />
                <i
                    onClick={() => {
                        setTodo("");
                        const regex = /^[^\s+\W][\w\W\s+]{3,29}$/gim;
                        /*to validate the input text. 
                        It checks if the text contains 3 to 30 characters 
                        and starts with a non-space, non-special character.*/
                        if (regex.test(toDo.trim())) {
                            const findIndex = toDos.find((elem) => elem.text.toLowerCase() === toDo.toLowerCase());
                            if (findIndex) {
                                setError("Item Already Exist!");
                            } else {
                                setTodos([
                                    ...toDos,
                                    {
                                        id: new Date().getTime(),
                                        added: new Date().toLocaleString("en-IN"),
                                        text: toDo,
                                        status: false,
                                    },
                                ]);
                            }
                        } else {
                            setError("Invalid Item!");
                        }
                    }}
                    className="fas fa-plus"
                ></i>
            </div>
            <div className="labels">
                <div className="left">
                    <code className="error-label">{err}</code>
                </div>
                <div className="right">
                    <code style={{ color: `${30 - toDo.length < 27 && 30 - toDo.length >= 0 ? "white" : "red"}` }}>
                        {30 - toDo.length < 30 ? 30 - toDo.length + "/30" : ""}
                        {/* calculates the remaining characters and changes the text color to white 
                    if the character count is within the limit (27 characters) 
                    and red if it exceeds the limit (30 characters) */}
                    </code>
                </div>
            </div>
            <div className="todos">
                {toDos.map((obj) => {
                    return (
                        <div className="todo">
                            <div className="left">
                                <input
                                    type="checkbox"
                                    checked={obj.status}
                                    onChange={(e) => {
                                        setTodos(
                                            toDos.filter((obj2) => {
                                                if (obj2.id === obj.id) {
                                                    obj2.status = e.target.checked;
                                                    obj2.completed = new Date().toLocaleString("en-IN");
                                                }
                                                return obj2;
                                            })
                                        );
                                    }}
                                    name=""
                                    id=""
                                />
                                <p>
                                    Time : {obj.added}
                                    <br />
                                    Task : {obj.text}
                                </p>
                            </div>
                            <div className="right">
                                <i
                                    onClick={() => {
                                        deleteList(obj.id);
                                    }}
                                    className="fas fa-times"
                                ></i>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex-items" style={{ display: "inline-flex" }}>
                <div className="list-task">
                    <h2 style={{ marginTop: "10px" }}>
                        ✅ Completed Tasks (<CompletedTasks ToDo={toDos} />)
                    </h2>
                    {toDos.map((obj) =>
                        obj.status ? (
                            <div key={obj.id}>
                                <div className="left1">
                                    <p>
                                        Completed : {obj.completed}
                                        <br />
                                        Task : {obj.text}
                                    </p>
                                </div>
                            </div>
                        ) : null
                    )}
                </div>

                <div>
                    <div className="list-task">
                        <h2 style={{ marginTop: "10px" }}>
                            ⌛ Pending Tasks (<PendingTasks ToDo={toDos} />)
                        </h2>
                        {toDos.map((obj) =>
                            !obj.status ? (
                                <div key={obj.id}>
                                    <div className="left2">
                                        <p>
                                            Pending : {obj.added}
                                            <br />
                                            Task : {obj.text}
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        )}
                    </div>
                </div>

                <div className="list-task">
                    <h2 style={{ marginTop: "10px" }}>🗑️ Deleted Tasks ({deletedTasks.length})</h2>
                    {deletedTasks.map((task) => (
                        <div key={task.id} className="left3">
                            <p>
                                Deleted : {new Date().toLocaleString("en-IN")}
                                <br />
                                Task : {task.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
