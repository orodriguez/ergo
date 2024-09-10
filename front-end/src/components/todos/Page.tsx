import { Container, TextField } from "@mui/material";
import { useState } from "react";

const Wrapper: React.FC = () => {
    const [newTodo, setNewTodo] = useState<string>('');

    const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value);

    const handleNewTodoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        setNewTodo('');
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
    <Container sx={{ paddingTop: 3 }}>
        <TextField
            label="Add Todo"
            variant="outlined"
            value={newTodo}
            onChange={onNewTodoChange}
            onKeyDown={onNewTodoKeyDown} />
    </Container>;

export default Wrapper;