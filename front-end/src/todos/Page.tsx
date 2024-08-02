import { Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react"

const Page: React.FC = () => {
    const [newTodoTitle, setNewTodoTitle] = React.useState<string>("");
    const newTodoInputRef = React.useRef<HTMLButtonElement>(null);
    useEffect(() => newTodoInputRef.current?.focus(), []);

    const handleAddTodo = () => {
        console.log(`Adding todo: ${newTodoTitle}`);
        setNewTodoTitle("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleAddTodo();
    };

    return (
        <Container>
            <Typography variant="h2">Todos</Typography>
            <Box display="flex" alignItems="center" gap={2}>
                <TextField
                    label="New Todo"
                    variant="standard"
                    value={newTodoTitle}
                    onChange={e => setNewTodoTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    inputRef={newTodoInputRef}
                    sx={{ width: '40%' }}
                />
                <Button variant="contained" onClick={handleAddTodo}>Add Todo</Button>
            </Box>
        </Container>
    )
};

export default Page;