import { Container as MUIContainer, Paper, Stack, TextField, } from "@mui/material";
import apiClient from "src/apiClient";
import { initialState, reducer, addTodos, addTodo, changeNewTodo, Todo } from "./state";
import { useEffect, useReducer } from "react";

const Container: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { newTodo, todos } = state;

    useEffect(() => { fetchTodos(); }, []);

    const fetchTodos = () => {
        apiClient.get('/todos')
            .then((response) => dispatch(addTodos(response.data)));
    };

    const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(changeNewTodo(e.target.value));

    const handleNewTodoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        apiClient.post('/todos', { title: newTodo })
            .then((response) => dispatch(addTodo(response.data)));
    };

    return <Page
        newTodo={newTodo}
        todos={todos}
        onNewTodoChange={handleNewTodoChange}
        onNewTodoKeyDown={handleNewTodoKeyDown} />;
};

interface IProps {
    newTodo: string;
    todos: Todo[];
    onNewTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNewTodoKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Page: React.FC<IProps> = ({
    newTodo,
    todos,
    onNewTodoChange,
    onNewTodoKeyDown
}: IProps) =>
    <MUIContainer sx={{ paddingTop: 2 }}>
        <Paper elevation={1} sx={{ padding: 2 }}>
            <Stack spacing={2}>
                <TextField
                    label="Add Todo"
                    variant="outlined"
                    value={newTodo}
                    onChange={onNewTodoChange}
                    onKeyDown={onNewTodoKeyDown} />
                <Todos value={todos} />
            </Stack>
        </Paper>
    </MUIContainer>;

const Todos: React.FC<{ value: Todo[] }> = ({ value }) =>
    <Stack spacing={2}>
        {value.map(todo => <TodoItem key={todo.id} value={todo} />)}
    </Stack>;

const TodoItem: React.FC<{ value: Todo }> = ({ value }) =>
    <Paper elevation={2} sx={{ padding: 2 }}>{value.title}</Paper>;

export default Container;