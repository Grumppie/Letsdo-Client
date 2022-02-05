import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Api_base = `https://lets-do-gru.herokuapp.com/`

const Create = () => {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [content, setContent] = useState("")

    const navigate = useNavigate()
    const goback = () => navigate('/', { replace: true })

    const createTodo = async () => {
        try {
            await fetch(Api_base + 'todos/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "title": title, "content": content, "category": category })
            }).then(res => res.json)
            goback()
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
    return (
        <div className='createpage'>
            <div className="createpage-header">
                <span className="createpage-title">Add Todo</span>
                <i className="fas fa-pencil-ruler"></i>
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
                <div className="newtitle textbox">
                    <label htmlFor="new-title">Title</label>
                    <input type="text" id="new-title" onChange={handleTitle} value={title} />
                </div>
                <div className="newdes textbox">
                    <label htmlFor="new-des">Des.</label>
                    <textarea name="new-des" id="new-des" cols="30" rows="2" autoComplete='false' onChange={handleContent} value={content}></textarea>
                </div>
                <div className="btn-container" onClick={createTodo}>
                    Create Todo <i className="fas fa-location-arrow"></i>
                </div>
            </form>
        </div >
    );
};

export default Create;
