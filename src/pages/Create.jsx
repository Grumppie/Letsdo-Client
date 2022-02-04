import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Api_base = `https://lets-do-gru.herokuapp.com/`

const Create = () => {
    const [title, setTitle] = useState("")

    const navigate = useNavigate()
    const goback = () => navigate('/', { replace: true })

    const createTodo = async () => {
        try {
            await fetch(Api_base + 'todos/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title })
            }).then(res => res.json)
            goback()
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div>
            <div className="popup">
                <div className="header">
                    <div className="add-todo-titile">Add todo</div>
                    <div className="closePopUp"><i class="fas fa-times-circle"></i></div>
                </div>
                <div className="add-content">
                    <div className="newtodo-title">
                        <span>Title</span>
                        <input type="text" className="title-input" onChange={e => setTitle(e.target.value)} value={title} />
                    </div>
                    <button className="create-btn" onClick={createTodo}><span>Create todo</span></button>
                </div>
            </div>
        </div >
    );
};

export default Create;
