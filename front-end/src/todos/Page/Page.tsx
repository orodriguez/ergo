import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { usePage } from "./usePage";

const Page: React.FC = () => {
    const {
        newTodo,
        handleAddTodo,
        isLoading,
    } = usePage();

    return (
        <Container>
            <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h2">Todos</Typography>
                {isLoading && <CircularProgress />}
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
                <TextField
                    label="New Todo"
                    variant="standard"
                    value={newTodo.title}
                    onChange={newTodo.handleChange}
                    onKeyDown={newTodo.handleKeyDown}
                    inputRef={newTodo.ref}
                    sx={{ width: '40%' }}
                />
                <Button variant="contained" onClick={handleAddTodo}>Add Todo</Button>
            </Box>
        </Container>
    )
};

export default Page;