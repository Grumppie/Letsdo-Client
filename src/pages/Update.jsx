import React from 'react';
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';

const Api_base = `https://lets-do-gru.herokuapp.com/`

const Update = () => {

    const params = useParams()
    const [todo, setTodo] = useState({})
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState()
    const [content, setContent] = useState("")
    const [completed, setcompleted] = useState(false)

    const navigate = useNavigate()
    const goback = () => navigate('/', { replace: true })

    useEffect(() => data(), [])

    const data = async () => {
        const rawtodos = await fetch(Api_base + 'todos/' + `${params.todoId}`)
        const todo = await rawtodos.json()
        setTodo(todo)
        setTitle(todo.title)
        setCategory(todo.category)
        setContent(todo.content)
    }

    const handleCategory = (e) => {
        e.preventDefault()
        setCategory(e.target.value);
    }

    const handleTitle = e => {
        e.preventDefault();
        setTitle(e.target.value)
    }

    const handleContent = e => {
        e.preventDefault();
        setContent(e.target.value)
    }

    const updateTodo = async () => {
        try {
            await fetch(Api_base + 'todos/' + `${params.todoId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "title": title, "category": category, "content": content, completed })
            }).then(res => res.json)
            goback()
        } catch (error) {
            console.log(error.message)
        }
    }

    const toggleComplete = () => {
        setcompleted(!completed)
    }


    return (
        <div className='update-page'>
            <div className="up-header">
                <span className="up-title">My todo</span>
                <i className="fas fa-edit"></i>
            </div>
            <form autoComplete="off">
                <div className="category textbox">
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" value={category} onChange={handleCategory}>
                        <option value={"work"} >work</option>
                        <option value={"chill"} >chill</option>
                        <option value={"family"} >family</option>
                    </select>
                </div>
                <div className="uptitle textbox">
                    <label htmlFor="new-title">Todo</label>
                    <input type="text" id="new-title" onChange={handleTitle} value={title} />
                </div>
                <div className="updes textbox">
                    <label htmlFor="new-des">Des.</label>
                    <textarea name="new-des" id="new-des" cols="30" rows="2" autoComplete='false' onChange={handleContent} value={content}></textarea>
                </div>
                <div className="btns">
                    <div className="completed-btn" onClick={toggleComplete}>
                        {!completed ? "completed" : "Incomplete"}
                        {!completed ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-times-circle"></i>)}
                    </div>
                    <div className="btn-container" onClick={updateTodo}>
                        Save Todo
                        <i className="fas fa-location-arrow"></i>
                    </div>
                </div>
            </form>
        </div>
    );

};

export default Update