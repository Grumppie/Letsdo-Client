import React from 'react';
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faHouseChimney } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";

const Api_base = `https://lets-do-gru.herokuapp.com/`
// const Api_base = 'http://localhost:4000/'

library.add([faHouse, faHouseChimney])

const Update = () => {

    const params = useParams()
    const [todo, setTodo] = useState({})
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState()
    const [content, setContent] = useState("")
    const [completed, setcompleted] = useState()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const goback = () => navigate('/', { replace: true })

    useEffect(() => data(), [])

    const data = async () => {
        try {
            const rawtodos = await fetch(Api_base + 'todos/' + `${params.todoId}`)
            const todo = await rawtodos.json()
            setTodo(todo)
            setTitle(todo.title)
            setCategory(todo.category)
            setContent(todo.content)
            setcompleted(todo.completed)
            setLoading(true)
        } catch (error) {
            console.log(error.message)
        }
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
                body: JSON.stringify({ "title": title, "category": category, completed, content })
            }).then(res => res.json)
            goback()
        } catch (error) {
            console.log(error.message)
        }
    }

    const toggleComplete = () => {
        setcompleted(!completed)
        goback()
    }

    return (
        <div className='update-page'>
            <div className="up-header">
                <span className="up-title">My todo</span>
                <i className="fas fa-edit"></i>
            </div>
            {loading ? (
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
                        <textarea name="new-des" id="new-des" cols="30" rows="3" autoComplete='false' onChange={handleContent} value={content}></textarea>
                    </div>

                    <div className="btns">
                        <div className="btn-container" onClick={updateTodo}>
                            Save Todo
                            <i className="fas fa-location-arrow"></i>
                        </div>
                    </div>
                </form>
            ) :
                (<div className="loader"><ReactBootStrap.Spinner animation="border" variant="info" /></div>)}

            {/* <div className="work-in-progress">
                work in progress <img src="https://img.icons8.com/material-outlined/50/000000/work.png" />
            </div> */}
            <div className="home-btn" onClick={goback}>
                <FontAwesomeIcon icon="fa-solid fa-house-chimney" />
            </div>
        </div>
    );

};

export default Update