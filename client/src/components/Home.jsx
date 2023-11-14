import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import NewTodoForm from "./NewTodoForm";
import ToDo from "./ToDo";

function Home() {

    const { user, getUserTodos, todos } = useContext(UserContext)

    useEffect(() => {
        getUserTodos()
    }, [])

    const toDoList = todos.map(todo => {
        return (
            <ToDo
                key={todo._id}
                todo={todo}
            />
        )
    })

    return (
        <div className="main">
            <h3>Welcome {user.username}</h3>
            <NewTodoForm />
            {
                todos.length > 0 ?
                    <div className="todo-grid">
                        {toDoList}
                    </div>
                    :
                    <h1>Add a todo!</h1>
            }
        </div>
    );
}

export default Home;