/*eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import moment from "moment";
import ListForm from "./ListForm";
import ListItem from "./ListItem";
//TODO create app component create singleItem component wire them and done

const App = () => {
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const listData = localStorage.getItem("todoList");
      const data = JSON.parse(listData);

      if (data) {
        if (data.length > 0 && typeof data[0] === "string") {
          const revised = data.map((str) => {
            return { title: str, list: [] };
          });
          const json = JSON.stringify(revised);
          localStorage.setItem("todoList", json);
        }
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      const listData = localStorage.getItem("todoList");
      const data = JSON.parse(listData);

      if (data) {
        setList(data);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const json = JSON.stringify(list);
    localStorage.setItem("todoList", json);
  }, [list]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!e.target.search.value) return;
    const obj = {};
    obj.title = e.target.search.value.trim();
    obj.list = [];
    setList(list.concat(obj));
    e.target.search.value = "";
  };

  const edit = (todo, newName) => {
    const newList = list.map(({ title, list }) => {
      if (title === todo) {
        return { title: newName, list };
      }
      return { title, list };
    });

    console.log("neew", newList);
    setList(newList);
  };

  const remove = (todo) => {
    const newList = list.filter(({ title }) => title !== todo);
    setList(newList);
  };

  const listAdd = (todo, listAdd) => {
    const newData = list.map(({ title, list }) => {
      if (title === todo) {
        return { title, list: [...list, listAdd] };
      }

      return { title, list };
    });

    setList(newData);
  };

  const listRemove = (todo, listRemove) => {
    const newData = list.map(({ title, list }) => {
      if (title === todo) {
        const newList = list.filter((tlist) => tlist !== listRemove);
        return { title, list: newList };
      }

      return { title, list };
    });

    setList(newData);
  };

  return (
    <div className="main">
      <h3 className="current-day">{moment().format("l")}</h3>
      <h3
        className="remove-all"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        +
      </h3>
      {isOpen && <ListForm className="list-form" onSubmit={onFormSubmit} />}

      {list.length === 0 && <p className="red-alert">Please add a Todo...</p>}
      {console.log(list)}
      {list.map((soloItem) => (
        <ListItem
          className="list-item"
          key={soloItem.title}
          todo={soloItem.title}
          list={soloItem.list}
          listAdd={listAdd}
          listRemove={listRemove}
          remove={remove}
          edit={edit}
        />
      ))}
    </div>
  );
};

export default App;
