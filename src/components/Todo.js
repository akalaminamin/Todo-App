import React, { useEffect, useState } from "react";
import "./css/todo.css";
import imgSrc from "./Images/todo.png";

const getDataLocalStorage = () => {
  let itemList = localStorage.getItem("list");
  if (itemList) {
    return JSON.parse(itemList);
  } else {
    return [];
  }
};

function Todo() {
  const [inputValue, setInputValue] = useState();
  const [items, setItems] = useState(getDataLocalStorage());
  const [editValue, setEditValue] = useState(false);
  const [isEditItem, setIsEditItem] = useState(null);

  //   Input value handle function
  const inputEvent = (e) => {
    setInputValue(e.target.value);
  };
  //   Add items function
  const addItems = () => {
    if (!inputValue) {
      alert("Please enter the value");
    } else if (inputValue && editValue) {
      setItems(
        items.map((element) => {
          if (isEditItem === element.id) {
            return { ...items, name: inputValue };
          }
          return element;
        })
      );
      setEditValue(false);
      setInputValue("");
      setIsEditItem(null);
    } else {
      let allInputData = {
        id: new Date().getTime().toString(),
        name: inputValue,
      };
      setItems([...items, allInputData]);
      setInputValue("");
      console.log(allInputData);
    }
  };
  // Delele items function
  const deleteItem = (id) => {
    const updateItem = items.filter((value, index) => {
      return id !== value.id;
    });
    setItems(updateItem);
  };
  //   Clear All items function
  const clearAllItems = () => {
    items == "" ? alert("Already data is Clear") : setItems([]);
    setInputValue("");
  };
  //   Edit items function
  const editItems = (id) => {
    let updateValue = items.find((value, indx) => {
      return value.id == id;
    });
    setEditValue(true);
    setInputValue(updateValue.name);
    setIsEditItem(id);
  };
  
  // value set local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, []);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={imgSrc} alt="" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItem">
            <input
              type="text"
              placeholder="Add Items..."
              name="fruit"
              value={inputValue}
              onChange={inputEvent}
            />
            {!editValue ? (
              <i
                className="fas fa-plus add-btn"
                title="Add Item"
                onClick={addItems}
              ></i>
            ) : (
              <i
                className="fas fa-edit add-btn"
                title="Edit Item"
                onClick={addItems}
              ></i>
            )}
          </div>
          <div className="showItems">
            {items.map((event, indx) => {
              return (
                <div className="everyItem" key={event.id}>
                  <h5>{event.name}</h5>
                  <div>
                    <i
                      class="fa fa-edit edit-btn"
                      title="Edit Item"
                      onClick={() => editItems(event.id)}
                    ></i>
                    <i
                      class="fa fa-trash trash-btn"
                      title="Delete Item"
                      onClick={() => deleteItem(event.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="check-btn">
            <button className="clear-btn" onClick={clearAllItems}>
              <span>Remove All</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Todo;
