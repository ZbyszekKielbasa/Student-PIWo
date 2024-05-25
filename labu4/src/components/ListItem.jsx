import { useState } from "react";

const ListItem = ({ text }) => {
    const [isDone, setIsDone] = useState(false);

    return (
        <p
            className={isDone ? "striked" : ""}
            onClick={() => {
                setIsDone(!isDone);
            }}
        >
            {text}
        </p>
    );
};

export default ListItem;
