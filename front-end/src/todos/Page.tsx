import { Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react"

const Page: React.FC = () => {
    const [newTodoTitle, setNewTodoTitle] = React.useState<string>("");

    return (
        <Container>
            <Typography variant="h2">Todos</Typography>
            <Box display="flex" alignItems="center" gap={2}>
                <TextField
                    label="New Todo"
                    variant="standard"
                    value={newTodoTitle}
                    onChange={e => setNewTodoTitle(e.target.value)}
                />
                <Button variant="contained">Add Todo</Button>
            </Box>
        </Container>
    )
};

export default Page;