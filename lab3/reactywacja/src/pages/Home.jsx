import { useState } from "react";
import ListItem from "../components/ListItem";

const Home = ({ todos }) => {
    const [query, setQuery] = useState("");
    const handleQuery = (e) => {
        setQuery(e.target.value);
    };

    const todosHTML = todos.filter((it) => it.includes(query)).map((it) => <ListItem key={it} text={it} />);
    return (
        <main>
            <input className="App-input" value={query} onChange={handleQuery} />
            {todosHTML}
        </main>
    );
};

export default Home;
