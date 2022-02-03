import { useState, useEffect } from 'react'
const Api_base = `https://lets-do-gru.herokuapp.com/`


function App() {
  const [todos, setTodos] = useState([])
  const [popUpActive, setPopUpActive] = useState(false)
  const [addTodo, setAddTodo] = useState("")
  let [refresh, setRefresh] = useState(0)

  const ref = () => {
    setRefresh(++refresh % 2)
  }

  useEffect(() => {
    getTodos()
  }, [refresh])

  const getTodos = async () => {
    try {
      const rawtodos = await fetch(Api_base + 'todos/')
      const todolist = await rawtodos.json()
      setTodos(todolist)
    } catch (error) {
      console.log(error.message);
    }
  }

  const completeTodo = async id => {

    try {
      const raw = await fetch(Api_base + 'todos/' + id)
      const data = await raw.json()

      setTodos(() => {
        const list = todos.map(todo => {
          if (todo._id === data._id) {
            todo.completed = data.completed
          }
          return todo
        })
        ref()
        return list
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteTodo = async id => {
    try {
      await fetch(Api_base + 'todos/' + id, { method: "DELETE" })

      setTodos(() => todos.filter(todo => todo._id !== id))
      ref()
    } catch (error) {
      console.log(error.message)
    }
  }

  const createTodo = async () => {
    try {
      await fetch(Api_base + 'todos/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: addTodo })
      }).then(res => res.json)
      ref()
      setPopUpActive(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="App">
      <h1 className="title">Let's do</h1>
      <h4 className="sec-title">List of Todos</h4>
      <div className="todos">
        {todos.map((todo) => {
          const isdone = (todo.completed) ? "todo isdone" : "todo"
          return (
            <div className={isdone} key={todo._id} onClick={() => completeTodo(todo._id)}>
              <div className="check"><i className="fas fa-check-square"></i></div>
              <div className="todo-title">{todo.title}</div>
              <div className="delete-btn" onClick={() => deleteTodo(todo._id)}><i className="fas fa-trash"></i></div>
            </div>
          )
        })}
      </div>
      <div className="addpopup" onClick={() => setPopUpActive(true)}><img src="https://img.icons8.com/ios-filled/50/000000/add--v1.png" /></div>
      {popUpActive ? (
        <div className="popup">
          <div className="header">
            <div className="add-todo-titile">Add todo</div>
            <div className="closePopUp" onClick={() => setPopUpActive(false)}><i class="fas fa-times-circle"></i></div>
          </div>
          <div className="add-content">
            <div className="newtodo-title">
              <span>Title</span>
              <input type="text" className="title-input" onChange={e => setAddTodo(e.target.value)} value={addTodo} />
            </div>
            <div className="create-btn" onClick={createTodo}><span>Create todo</span></div>
          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default App;
