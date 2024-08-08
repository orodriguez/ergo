import React from 'react';
import { useState, useEffect, useRef } from "react";
import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogTitle, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import apiClient from "src/apiClient";
import { Response } from "../types";

const Page: React.FC = () => {
    const [newTodoTitle, setNewTodoTitle] = useState<string>("");
    const [activeRequests, setActiveRequests] = useState<number>(0);
    const [items, setItems] = useState<Response[]>([]);
    const newTodoInputRef = useRef<HTMLInputElement>(null);
    const [deleteConfirmationTarget, setDeleteConfirmationTarget] = useState<number | null>(null);
    const api = apiClient(setActiveRequests);

    useEffect(() => {
        newTodoInputRef.current?.focus();
        api.todos.fetch().then(setItems);
    }, []);

    const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(e.target.value);
    };

    const handleAddTodo = () =>
        api.todos.add({ title: newTodoTitle }).then(newItem => {
            setItems(items => [newItem, ...items]);
            setNewTodoTitle("");
            newTodoInputRef.current?.focus();
        });

    const handleNewTodoKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleAddTodo();
    };

    const updateCompleted = (id: number, completed: boolean) =>
        setItems(items => items.map(item =>
            item.id === id ? { ...item, completed } : item));

    const handleCompletedChange = (id: number, completed: boolean) =>
        api.todos.update(id, { completed }).then(() => updateCompleted(id, completed));

    const handleDeleteTodo = (id: number) => {
        api.todos.remove(id).then(() => {
            setItems(prev => prev.filter(item => item.id !== id));
            hideDeleteConfirmation();
        });
    };

    const showDeleteConfirmation = (id: number) => setDeleteConfirmationTarget(id);

    const hideDeleteConfirmation = () => {
        setDeleteConfirmationTarget(null);
    };

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
                    value={newTodoTitle}
                    onChange={handleNewTodoChange}
                    onKeyDown={handleNewTodoKeyDown}
                    inputRef={newTodoInputRef}
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
    );
};

export default Page;
