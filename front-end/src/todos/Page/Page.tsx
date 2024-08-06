import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogTitle, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { usePage } from "./usePage";
import DeleteIcon from '@mui/icons-material/Delete';

const Page: React.FC = () => {
    const {
        newTodo,
        handleAddTodo,
        activeRequests,
        items,
        handleCompletedChange,
        handleDeleteTodo,
        deleteConfirmationTarget,
        showDeleteConfirmation,
        hideDeleteConfirmation,
    } = usePage();

    console.log('Rendering Page');
    return (
        <Container>
            <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h2">Todos</Typography>
                {activeRequests > 0 && <CircularProgress />}
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
                                onChange={e => handleCompletedChange(item.id, e.target.checked)}
                            />
                            <ListItemText
                                primary={item.title}
                                onClick={e => handleCompletedChange(item.id, !item.completed)}
                                sx={{
                                    width: '400px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }} />
                            <IconButton edge="end" aria-label="delete" onClick={() => showDeleteConfirmation(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                            <Dialog id={`deleteConfirmationDialog${item.id}`} open={deleteConfirmationTarget === item.id} onClose={hideDeleteConfirmation}>
                                <DialogTitle>Are you sure you want to delete {item.title}?</DialogTitle>
                                <DialogActions>
                                    <Button onClick={() => handleDeleteTodo(item.id)}>Yes</Button>
                                    <Button onClick={hideDeleteConfirmation}>No</Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    </ListItem>
                ))}
            </List>

        </Container>
    )
};

export default Page;