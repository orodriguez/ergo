import { Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { usePage } from "./usePage";

const Page: React.FC = () => {
    const {
        newTodoTitle,
        handleNewTodoChange,
        handleAddTodo,
        handleNewTodoKeyDown,
        newTodoInputRef
    } = usePage();

    return (
        <Container>
            <Typography variant="h2">Todos</Typography>
            <Box display="flex" alignItems="center" gap={2}>
                <TextField
                    label="New Todo"
                    variant="standard"
                    value={newTodoTitle}
                    onChange={handleNewTodoChange}
                    onKeyDown={handleNewTodoKeyDown}
                    inputRef={newTodoInputRef}
                    sx={{ width: '40%' }}
                />
                <Button variant="contained" onClick={handleAddTodo}>Add Todo</Button>
            </Box>
        </Container>
    )
};

export default Page;