import { Button, Checkbox, CircularProgress, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { usePage } from "./usePage";
import DeleteIcon from '@mui/icons-material/Delete';

const Page: React.FC = () => {
    const {
        newTodo,
        handleAddTodo,
        isLoading,
        items,
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
            <List>
                {items.map((item) => (
                    <ListItem key={item.id}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Checkbox
                                edge="start"
                                checked={item.completed}
                                tabIndex={-1}
                                disableRipple
                                onChange={() => { }}
                            />
                            <ListItemText primary={item.title} />
                            <IconButton edge="end" aria-label="delete" onClick={() => { }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </ListItem>
                ))}
            </List>

        </Container>
    )
};

export default Page;