import { Container as MUIContainer, TextField, } from "@mui/material";
import axios from "axios";
import { initialState, reducer, addTodo, changeNewTodo } from "./state";
import { useReducer } from "react";

const Container: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { newTodo } = state;

    const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(changeNewTodo(e.target.value));

    const handleNewTodoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        axios.post('http://localhost:3000/todos', { title: newTodo })
            .then((response) => dispatch(addTodo(response.data)));
    };

    return <Page
        newTodo={newTodo}
        onNewTodoChange={handleNewTodoChange}
        onNewTodoKeyDown={handleNewTodoKeyDown} />;
};

interface IProps {
    newTodo: string;
    onNewTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNewTodoKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Page: React.FC<IProps> = ({
    newTodo,
    onNewTodoChange,
    onNewTodoKeyDown
}: IProps) =>
    <MUIContainer sx={{ paddingTop: 3 }}>
        <TextField
            label="Add Todo"
            variant="outlined"
            value={newTodo}
            onChange={onNewTodoChange}
            onKeyDown={onNewTodoKeyDown} />
    </MUIContainer>;

export default Container;