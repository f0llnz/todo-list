import './App.css';
import React, { useState } from 'react';

function App() {
  const [newItem, setNewItem] = useState("")
  const [items, setItems] = useState([])
  const [isActive, setIsActive] = useState(false);

  
  function addNewItem() {
    if (!newItem){
      alert("Enter an item.");
      return
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem    
    };

    setItems(oldList => [...oldList, item]);
    setNewItem("");
  }

  function deleteItem(id) {
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray)
  }

  function checkItem(id) {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked
        }
      }
      return item
    });
    setItems(updatedItems);
  }




  return (
    <div className="App">
      {/* 1. Header */}
      <h1>Todo List</h1>

      {/* 2.Input (input bttn bttn) */}
      <input
      className='input-place'
      type="text"
      placeholder='Add an Item...'
      value={newItem}
      onChange={e => setNewItem(e.target.value)} />
      

      <button className='add-btn' onClick={() => addNewItem()}>Add</button>

      {/* 3. list of items (todo list unordered.) */}
      <ul>
        {items.map(item => {
          return (
            <li key={item.id} className={item.isChecked ? 'checked' : ''}>
              {item.value}
              <button className="delete-button" onClick={() => deleteItem(item.id)}>❌</button>
              <button className='check-button' onClick={() => checkItem(item.id)}>✔️</button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
