import React, { useReducer, useEffect, useRef } from 'react';
import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogTitle, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import apiClient from "src/apiClient";
import { initialState } from 'src/store/state';
import * as actions from '../actions';
import { reducer } from 'src/store/reducer';

const Page: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const newTodoInputRef = useRef<HTMLInputElement>(null);
    const api = apiClient();

    useEffect(() => {
        newTodoInputRef.current?.focus();
        api.todos.fetch().then(todos => {
            dispatch(actions.setItems(todos));
        });
    }, [api]);

    const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setNewTodoTitle(e.target.value));
    };

    const handleAddTodo = () =>
        api.todos.add({ title: state.newTodoTitle }).then(newItem => {
            dispatch(actions.addItem(newItem));
            newTodoInputRef.current?.focus();
        });

    const handleNewTodoKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleAddTodo();
    };

    const handleCompletedChange = (id: number, completed: boolean) =>
        api.todos.update(id, { completed }).then(() => {
            dispatch(actions.updateItem(id, completed));
        });

    const handleDeleteTodo = (id: number) => {
        api.todos.remove(id).then(() => {
            dispatch(actions.removeItem(id));
            dispatch(actions.hideDeleteConfirmation());
        });
    };

    return (
        <Container>
            <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h2">Todos</Typography>
                {state.activeRequests > 0 && <CircularProgress />}
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
                <TextField
                    label="New Todo"
                    variant="standard"
                    value={state.newTodoTitle}
                    onChange={handleNewTodoChange}
                    onKeyDown={handleNewTodoKeyDown}
                    inputRef={newTodoInputRef}
                    sx={{ width: '40%' }}
                />
                <Button variant="contained" onClick={handleAddTodo}>Add Todo</Button>
            </Box>
            {state.todos.length === 0 && <Typography>No todos</Typography>}
            {state.todos.length > 0 && <List>
                {state.todos.map((item) => (
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
                                onClick={() => handleCompletedChange(item.id, !item.completed)}
                                sx={{
                                    width: '400px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }} />
                            <IconButton edge="end" aria-label="delete" onClick={() => dispatch(actions.showDeleteConfirmation(item.id))}>
                                <DeleteIcon />
                            </IconButton>
                            <Dialog id={`deleteConfirmationDialog${item.id}`} open={state.deleteConfirmationTarget === item.id} onClose={() => dispatch(actions.hideDeleteConfirmation())}>
                                <DialogTitle>Are you sure you want to delete {item.title}?</DialogTitle>
                                <DialogActions>
                                    <Button onClick={() => handleDeleteTodo(item.id)}>Yes</Button>
                                    <Button onClick={() => dispatch(actions.hideDeleteConfirmation())}>No</Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    </ListItem>
                ))}
            </List>}
        </Container>
    );
};

export default Page;