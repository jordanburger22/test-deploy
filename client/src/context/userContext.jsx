import { createContext, useState } from "react";
import axios from 'axios'

export const UserContext = createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        todos: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)


    function signup(credentials) {
        axios.post("/api/auth/signup", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prevUserState => {
                    return {
                        ...prevUserState,
                        user,
                        token
                    }
                })
            })
            .catch(err => console.log(err.response.data.message))
    }


    function login(creds) {
        axios.post('/api/auth/login', creds)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: "",
            todos: []
        })
    }


    function handleAuthErr(errMsg) {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    }

    function resetAuthErr() {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        })
        )
    }

    async function getUserTodos() {
        try {
            const userTodos = await userAxios.get('/api/main/todos/user')

            console.log(userTodos)

            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    todos: userTodos.data
                }
            })

        } catch (err) {
            console.log(err)
        }
    }

    async function postNewTodo(data) {
        try {
            const res = await userAxios.post('/api/main/todos/', data)
            console.log(res)

            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    todos: [...prevUserState.todos, res.data]
                }
            })

        } catch (err) {
            console.log(err)
        }
    }

    async function deleteTodo(todoID) {
        try {
            const deletedTodo = await userAxios.delete(`/api/main/todos/${todoID}`)
            console.log(deletedTodo.data)
            setUserState(prevState => {
                return {
                    ...prevState,
                    todos: prevState.todos.filter(todo => todo._id !== todoID)
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    async function editTodo(todoID, edit){
        try{
            const response = await userAxios.put(`/api/main/todos/${todoID}`, edit)
            setUserState(prevState => {
                return {
                    ...prevState,
                    todos: prevState.todos.map(todo => todo._id !== todoID ? todo : response.data)
                }
            })
        }catch(err){
            console.log(err)
        }
    }


    return (
        <UserContext.Provider value={{
            ...userState,
            login,
            signup,
            resetAuthErr,
            handleAuthErr,
            logout,
            postNewTodo,
            getUserTodos,
            deleteTodo,
            editTodo,
            userAxios
        }}>
            {props.children}
        </UserContext.Provider>
    )

}