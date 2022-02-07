import React from 'react';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Api_base = `https://lets-do-gru.herokuapp.com/`

const Home = () => {


    const [todos, setTodos] = useState([])
    const [completedNumber, setCompletedNumber] = useState(0)
    const [displayTodo, setDisplayTodo] = useState(false)
    let [refresh, setRefresh] = useState(0)

    const ref = () => {
        setRefresh(++refresh % 2)
    }

    useEffect(() => {
        getTodos()
        arrangeTodos()
    }, [refresh])

    const getTodos = async () => {
        try {
            const rawtodos = await fetch(Api_base + 'todos/')
            const todolist = await rawtodos.json()
            setTodos(todolist)
            getCompletedTodos()
            return todolist
        } catch (error) {
            console.log(error.message);
        }
    }

    const arrangeTodos = async () => {
        try {
            const todos = await getTodos();
            const completed = todos.filter(todo => todo.completed === true)
            const incomplete = todos.filter(todo => todo.completed === false)
            setTodos([...incomplete, ...completed])
        }
        catch (error) {
            console.log(error.message)
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
                getCompletedTodos()
                arrangeTodos()
                return list
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteTodo = async id => {
        try {
            await fetch(Api_base + 'todos/' + id, { method: "DELETE" })
            ref()
            setTodos(() => todos.filter(todo => todo._id !== id))
        } catch (error) {
            console.log(error.message)
        }
    }


    const getCompletedTodos = async () => {
        const data = await fetch(Api_base + 'todos/').then(res => res.json())
        const completed = data.filter(todo => todo.completed)
        setCompletedNumber(completed.length)
    }

    const toggleDisplay = (todo) => {
        setDisplayTodo(!displayTodo)
    }

    // () => completeTodo(todo._id)
    return <div>

        <div className="hero">
            <h1 className="title">Let's do</h1>
            <div className="stats">
                <div className="total">{todos.length} <span>Total</span></div>
                <div className="completed">{completedNumber} <span>Completed</span> </div>
            </div>
        </div>
        <h4 className="sec-title">List of Todos</h4>
        <div className="todos">
            {todos.map((todo) => {
                const isdone = (todo.completed) ? "todo isdone" : "todo"
                return (
                    <div className={isdone} key={todo._id} onClick={() => toggleDisplay(todo)}>
                        <div className="check"><i className="fas fa-check-square"></i></div>
                        <div className="todo-title">{todo.title}</div>
                        <div className="delete-btn" onClick={() => deleteTodo(todo._id)}><i className="fas fa-trash"></i></div>
                        {/* {(displayTodo) ? (
                            <div>hello</div>
                        ) : ""} */}
                    </div>
                )
            })}
        </div>

        <Link to='/create'>
            <div className="addpopup"><img src="https://img.icons8.com/ios-filled/50/000000/add--v1.png" /></div>
        </Link>
    </div>;
};

export default Home;
