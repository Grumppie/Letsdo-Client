import React from 'react';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap'

const Api_base = `https://lets-do-gru.herokuapp.com/`
// const Api_base = 'http://localhost:4000/'


const Home = () => {


    const [todos, setTodos] = useState([])
    const [completedNumber, setCompletedNumber] = useState(0)
    const [loading, setLoading] = useState(false)
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
            setLoading(true)
            return todolist
        } catch (error) {
            console.log(error.message);
        }
    }

    const arrangeTodos = async () => {
        try {
            const rawtodos = await fetch(Api_base + 'todos/')
            const todos = await rawtodos.json()
            const completed = todos.filter(todo => todo.completed === true)
            const incomplete = todos.filter(todo => todo.completed === false)
            setTodos([...incomplete, ...completed])
            setLoading(true)
        }
        catch (error) {
            console.log(error.message)
        }

    }

    const completeTodo = async id => {
        setLoading(false)
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
        setLoading(false)
        try {
            await fetch(Api_base + 'todos/' + id, { method: "DELETE" })
            ref()
            setTodos(() => todos.filter(todo => todo._id !== id))
            setLoading(true)
        } catch (error) {
            console.log(error.message)
        }
    }


    const getCompletedTodos = async () => {
        const rawtodos = await fetch(Api_base + 'todos/')
        const todos = await rawtodos.json()
        const completed = todos.filter(todo => todo.completed)
        setCompletedNumber(completed.length)
    }

    const categoryIcon = (category) => {
        // eslint-disable-next-line default-case
        switch (category) {
            case "work":
                return (<i className="fas fa-briefcase"></i>)
            case "chill":
                return (<i className="fas fa-laugh-beam"></i>)
            case "family":
                return (<i className="fas fa-users"></i>)
        }
    }

    // () => completeTodo(todo._id)
    return (
        <>
            <div className='home'>
                <div className="hero">
                    <h1 className="title">Let's do</h1>
                    <div className="stats">
                        <div className="total">{todos.length} <span>Total</span></div>
                        <div className="completed">{completedNumber} <span>Completed</span> </div>
                    </div>
                </div>
                <h4 className="sec-title">List of Todos</h4>
                {loading ? (
                    <><div className="todos">
                        {todos.map((todo) => {
                            const isdone = (todo.completed) ? "todo-contents isdone" : "todo-contents";
                            return (
                                <div className='todo' key={todo._id} onClick={() => completeTodo(todo._id)}>
                                    <div className={isdone}>
                                        <div className="check">
                                            {categoryIcon(todo.category)}
                                        </div>
                                        <div className="todo-title">{todo.title}</div>
                                        <div className="delete-btn" onClick={() => deleteTodo(todo._id)}><i className="fas fa-trash"></i></div>
                                    </div>
                                    <Link to={`todos/${todo._id}`} key={todo._id}>
                                        <div className="show-btn">show more</div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div><Link to='/create'>
                            <div className="addpopup"><img src="https://img.icons8.com/ios-filled/50/000000/add--v1.png" /></div>
                        </Link></>
                )
                    : (<div className="loader"><ReactBootStrap.Spinner animation="border" variant="info" /></div>)}
            </div>
        </>
    );
};

export default Home;
