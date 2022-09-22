import React from 'react'

export default function Todo({ todo, deleteItem }) {

  return (
    <div>
      <label>
        <input type="checkbox" className='remove-item-checkbox' onClick={deleteItem}/>
        <p className="todo-item">{todo.name}</p>
      </label>
    </div>
  )
}
