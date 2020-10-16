import React, { useState } from "react";
import ListForm from "./ListForm";

export default (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [inputTodo, setInputTodo] = useState(props.todo || "");
  const [newTodo, setNewTodo] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    props.edit(props.todo, e.target.hash.value.trim());
    setClicked(!clicked);
  };

  const listSubmit = (e) => {
    e.preventDefault();
    if (!e.target.search.value) return;

    props.listAdd(props.todo, e.target.search.value.trim());
    e.target.search.value = "";
  };
  console.log(newTodo);
  return (
    <div className="list__head" onDoubleClick={() => setClicked(!clicked)}>
      {clicked ? (
        <>
          <form className="list__item" onSubmit={onSubmit}>
            <input
              type="text"
              name="hash"
              value={inputTodo}
              onChange={(e) => setInputTodo(e.target.value)}
            />
          </form>
        </>
      ) : (
        <>
          <div className="list__item">
            <h3
              className="list__item--heading"
              onClick={() => setIsOpen(!isOpen)}
            >
              {props.todo}
            </h3>
            <>
              <h2 onClick={() => setNewTodo(!newTodo)}>+</h2>
              <button
                className="list__item--button-remove"
                onClick={() => {
                  props.remove(props.todo);
                }}
              >
                &#x02717;
              </button>
            </>
          </div>
        </>
      )}

      {isOpen && (
        <>
          {newTodo && <ListForm onSubmit={listSubmit} />}
          {props.list.length === 0 && (
            <div className="red-alert">No Data in {props.todo}</div>
          )}
          {props.list &&
            props.list.map((data) => {
              return (
                <div key={data} className="list__item-child">
                  <h3 className="list__item-child--heading">{data}</h3>
                  <button
                    className="list__item-child--button-remove"
                    onClick={() => {
                      props.listRemove(props.todo, data);
                    }}
                  >
                    &#x02717;
                  </button>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};
