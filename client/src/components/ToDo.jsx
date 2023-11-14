import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import moment from 'moment';

function ToDo(props) {
    const { deleteTodo, editTodo } = useContext(UserContext);
    const { todo } = props;
    console.log(todo)

    const [edit, setEdit] = useState({ todo: todo.todo, completed: todo.completed });
    const [toggle, setToggle] = useState(true);

    function handleChange(e) {
        const { name, value } = e.target;
        setEdit(prev => ({
            ...prev,
            [name]: value
        }));
    }

    console.log(edit)
    function handleToggle() {
        setToggle(prev => !prev);
    }

    function handleCheckboxChange() {
        const updatedCompleted = !edit.completed;

        setEdit(prev => ({
            ...prev,
            completed: updatedCompleted
        }));

        editTodo(todo._id, { completed: updatedCompleted })

    }

    function handleSubmit(e) {
        e.preventDefault();
        editTodo(todo._id, edit);
        handleToggle();
    }

    const dateStamp = moment(todo.datePosted).format("MMMM Do YY");

    return (
        <>
            {toggle ?
                <div className="todo">
                    <h1>{todo.todo}</h1>
                    <label htmlFor="completed">Completed:</label>
                    <input
                        type="checkbox"
                        checked={edit.completed}
                        onChange={handleCheckboxChange}
                        name="completed"
                    />
                    <p>{dateStamp}</p>
                    <div className="todo-btns">
                        <button onClick={handleToggle}>Edit</button>
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </div>
                </div>
                :
                <form onSubmit={handleSubmit}>
                    <input
                        name="todo"
                        value={edit.todo}
                        onChange={handleChange}
                    />
                    <button type="submit">Submit Change</button>
                    <button onClick={handleToggle}>Cancel</button>
                </form>}
        </>
    );
}

export default ToDo;
