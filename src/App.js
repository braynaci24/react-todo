import { useEffect, useState, useRef} from 'react';
import './App.css';
import React from 'react';
import Todo from './components/Todo';

const LOCAL_STORAGE_KEY = 'todos'

function App() {

  const localTodos = JSON.parse(localStorage.getItem('todos')) || []
  const [todos, setTodos] = useState(localTodos)
  const todoNameRef = useRef(); 
  

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    const errorMessage = document.querySelector(".null-todo-message");
    if(todos.length === 0){
      errorMessage.style.display = "block";
    }else {
      errorMessage.style.display = "none";
    }
  })

  function addTodo() {
    const todoName = todoNameRef.current.value;
    if(todoName === '')return
      setTodos(prevTodos => {
        return [...prevTodos, {id: Math.floor(Math.random() * 100), name: todoName}]
      })
      todoNameRef.current.value = null
  }

  function deleteItem(id) {
    const filteredItems = todos.filter(function(item) {
      return item.id !== id
    })
    setTodos(filteredItems)
  }


  function handleKeyDown (e){
    if (e.key === 'Enter') addTodo()
  }

  function deleteAll() {
    setTodos([])
  }


  return (
    <div className="App">
      <h1>Todos</h1>
      <div>
        <input type="text" className='todo-input' ref={todoNameRef}  onKeyDown={handleKeyDown}  />
      </div>
      <div className='mt-30'>
        <button onClick={addTodo} className="todo-add-button button-group-button">Add</button>
        <button onClick={deleteAll} className="todo-remove-all-button button-group-button">All Delete</button>
      </div>
      {todos.map(item => {
        return <Todo todo={item} key={item.id} deleteItem={() => deleteItem(item.id)}/>
      })}
      <h5 className='null-todo-message'>Yapılacaklar listesi oluştur!</h5>
    </div>
  );
}

export default App;
