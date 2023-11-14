import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";

function NewTodoForm() {

    const { postNewTodo } = useContext(UserContext)

    const [input, setInput] = useState({ todo: '' })

    function handleChange(e) {
        const { name, value } = e.target
        setInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        postNewTodo(input)
        setInput({ todo: '' })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="todo"
                value={input.todo}
                placeholder="Add new todo"
                onChange={handleChange}
            />
            <button>Add Todo</button>
        </form>
    );
}

export default NewTodoForm;