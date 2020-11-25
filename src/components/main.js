import React, { useEffect, useState } from "react";
import "./main.css";

function Main() {
  const [inputField, setInputField] = useState("");
  const [filter, setFilter] = useState("all"); //default filter to all
  const [task, setTask] = useState([{ name: "some name", completed: true }]); //intial complted value
  const [filtered, setFiltered] = useState([]);

  //push new value anf clear input field
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputField !== "") {
      setTask([...task, { name: inputField, completed: false }]);
      setInputField("");
    }
  };

  const inputHandler = (e) => {
    setInputField(e.target.value);
  };

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  //filter function
  const _filter = () => {
    if (filter == "all") {
      setFiltered([...task]);
    } else if (filter == "active") {
      setFiltered(task.filter((item) => !item.completed));
    } else {
      setFiltered(task.filter((item) => item.completed));
    }
  };

  //on filter change call filter function
  useEffect(() => {
    _filter();
  }, [filter, task]);

  const _delete = (name) => {
    setTask(task.filter((item) => name !== item.name));
  };

  const _deleteall = () => {
    setTask(task.filter((item) => !item.completed));
  };

  const onChange = (index) => {
    let newArr = [...task];
    newArr[index]["completed"] = !newArr[index]["completed"];
    setTask(newArr);
  };

  const renderItems = () => {
    return filtered.map((item, index) => {
      return (
        <div key={index} className="rowitem">
          <div className="firstitem">
            <input
              name="isGoing"
              type="checkbox"
              checked={item.completed}
              onChange={() => onChange(index)}
            />
            <div
              className="name"
              style={{ textDecoration: item.completed ? "line-through" : null }}
            >
              {item.name}
            </div>
          </div>
          <div className="close" onClick={() => _delete(item.name)}></div>
        </div>
      );
    });
  };

  const renderFilter = () => {
    return (
      <div className="filter">
        <div>{task.filter((item) => !item.completed).length} remaining</div>
        <div className="radio-toolbar">
          <div>
            <input
              type="radio"
              name="all"
              value="all"
              checked={filter === "all"}
              onChange={onFilterChange}
            />
            <label>ALL</label>
          </div>
          <div>
            <input
              type="radio"
              name="active"
              value="active"
              checked={filter === "active"}
              onChange={onFilterChange}
            />
            <label>ACTIVE</label>
          </div>
          <div>
            <input
              type="radio"
              name="complteted"
              value="complteted"
              checked={filter === "complteted"}
              onChange={onFilterChange}
            />
            <label>COMPLETED</label>
          </div>
        </div>
        <div className="clearbtn" onClick={() => _deleteall()}>
          Clear completed
        </div>
      </div>
    );
  };

  return (
    <div className="main">
      <div className="header">my list</div>
      {renderFilter()}
      <form onSubmit={handleSubmit} className="form">
        <input
          className="inputtext"
          value={inputField}
          onChange={inputHandler}
          placeholder="What needs to be done?"
        />
      </form>
      {renderItems()}
    </div>
  );
}

export default Main;
