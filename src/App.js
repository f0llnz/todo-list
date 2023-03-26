import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        const initialItems = response.data.slice(0, 50).map(item => ({
          id: item.id,
          value: item.title,
          isChecked: item.completed
        }));
        setItems(initialItems);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  function addNewItem() {
    if (!newItem) {
      alert("Enter an item.");
      return;
    }
  
    const newItemObject = {
      id: items.length + 1,
      value: newItem,
      isChecked: false
    };
  
    setItems([newItemObject, ...items]);
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

  function editItem(id) {
    const itemToEdit = items.find(item => item.id === id);
    const editedValue = prompt("Edit item:", itemToEdit.value);
  
    if (editedValue) {
      const updatedItems = items.map(item => {
        if (item.id === id) {
          prompt(`Edited task: ${item.value} -> ${editedValue}`);
          return {
            ...item,
            value: editedValue
          };
        }
        return item;
      });
      setItems(updatedItems);
    }
  }

  return (
    <div className="App">
      <h1>Todo List</h1>

      <div className='InpBtn'>
        <input
          className='input-place'
          type="text"
          placeholder='Add an Item...'
          value={newItem}
          onChange={e => setNewItem(e.target.value)} />

        <button className='add-btn' onClick={addNewItem}>Add</button>
      </div>

      <ul>
        {items.map(item => {
          return (
            <li key={item.id} className={item.isChecked ? 'checked' : ''}>
              {item.value}
              <div className='buttons'>
                <button className="delete-button" onClick={() => deleteItem(item.id)}>❌</button>
                <button className='check-button' onClick={() => checkItem(item.id)}>✔️</button>
                <button className='edit-button' onClick={() => editItem(item.id)}>✏️</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;