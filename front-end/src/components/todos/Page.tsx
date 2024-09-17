import { Checkbox, Container as MUIContainer, Paper, Stack, TextField, Typography, } from "@mui/material";
import apiClient from "src/apiClient";
import { initialState, reducer, addTodos, addTodo, changeNewTodo, toggleTodo, Todo } from "./state";
import { useEffect, useReducer } from "react";

const Container: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { newTodo, todos } = state;

    const fetchTodos = () => {
        apiClient.get('/todos')
            .then((response) => dispatch(addTodos(response.data)));
    };

    useEffect(fetchTodos, [todos.length]);

    const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(changeNewTodo(e.target.value));

    const handleNewTodoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        apiClient.post('/todos', { title: newTodo })
            .then((response) => dispatch(addTodo(response.data)));
    };

    const handleTodoChecked = (id: number) => {
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return;

        apiClient.patch(`/todos/${id}`, { completed: !todo.completed })
            .then(() => dispatch(toggleTodo(id)));
    };

    return <Page
        newTodo={newTodo}
        todos={todos}
        onNewTodoChange={handleNewTodoChange}
        onNewTodoKeyDown={handleNewTodoKeyDown}
        onTodoChecked={handleTodoChecked} />;
};

interface IProps {
    newTodo: string;
    todos: Todo[];
    onNewTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNewTodoKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onTodoChecked: (id: number) => void;
}

const Page: React.FC<IProps> = ({
    newTodo,
    todos,
    onNewTodoChange,
    onNewTodoKeyDown,
    onTodoChecked
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
                <Todos todos={todos} onTodoChecked={onTodoChecked} />
            </Stack>
        </Paper>
    </MUIContainer>;

interface ITodosProps {
    todos: Todo[];
    onTodoChecked: (id: number) => void;
}

const Todos: React.FC<ITodosProps> = ({ todos: value, onTodoChecked }) =>
    <Stack spacing={2}>
        {value.map(todo => <TodoItem key={todo.id} todo={todo} onTodoChecked={onTodoChecked} />)}
    </Stack>;

interface ITodoItemProps {
    todo: Todo;
    onTodoChecked: (id: number) => void;
}

const TodoItem: React.FC<ITodoItemProps> = ({ todo, onTodoChecked }) =>
    <Paper elevation={2} sx={{ padding: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
            <Checkbox checked={todo.completed} onChange={e => onTodoChecked(todo.id)} />
            <Typography>{todo.title}</Typography>
        </Stack>
    </Paper>;

export default Container;