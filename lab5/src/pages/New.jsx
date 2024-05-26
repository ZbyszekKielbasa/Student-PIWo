import { useState } from "react";
import ListItem from "../components/ListItem";

const New = ({ todos, setTodos }) => {
    const [newTodo, setNewTodo] = useState("");

    const handleNewTodo = () => {
        setTodos(todos.concat([newTodo]));
        setNewTodo("");
    };

    const todosHTML = todos.map((it) => <ListItem key={it} text={it} />);
    return (
        <main>
            <input className="App-input" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
            <button className="App-mini-button" onClick={handleNewTodo}>
                Add new TODO
            </button>
            {todosHTML}
        </main>
    );
};

export default New;
