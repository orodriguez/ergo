import React, { useReducer, useEffect, useRef } from 'react';
import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogTitle, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import apiClient from "src/apiClient";
import { Response } from "../types";
import { State } from 'src/store/state';

type Action =
    | { type: 'SET_NEW_TODO_TITLE'; payload: string }
    | { type: 'SET_ACTIVE_REQUESTS'; payload: number }
    | { type: 'SET_ITEMS'; payload: Response[] }
    | { type: 'ADD_ITEM'; payload: Response }
    | { type: 'UPDATE_ITEM'; payload: { id: number, completed: boolean } }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'SHOW_DELETE_CONFIRMATION'; payload: number }
    | { type: 'HIDE_DELETE_CONFIRMATION' };

const initialState: State = {
    newTodoTitle: '',
    activeRequests: 0,
    items: [],
    deleteConfirmationTarget: null,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_NEW_TODO_TITLE':
            return { ...state, newTodoTitle: action.payload };
        case 'SET_ACTIVE_REQUESTS':
            return { ...state, activeRequests: action.payload };
        case 'SET_ITEMS':
            return { ...state, items: action.payload };
        case 'ADD_ITEM':
            return { ...state, items: [action.payload, ...state.items], newTodoTitle: '' };
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? { ...item, completed: action.payload.completed } : item
                ),
            };
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(item => item.id !== action.payload) };
        case 'SHOW_DELETE_CONFIRMATION':
            return { ...state, deleteConfirmationTarget: action.payload };
        case 'HIDE_DELETE_CONFIRMATION':
            return { ...state, deleteConfirmationTarget: null };
        default:
            return state;
    }
}

// Action Creators
const setNewTodoTitle = (title: string) => ({ type: 'SET_NEW_TODO_TITLE', payload: title } as const);
const setActiveRequests = (count: number) => ({ type: 'SET_ACTIVE_REQUESTS', payload: count } as const);
const setItems = (items: Response[]) => ({ type: 'SET_ITEMS', payload: items } as const);
const addItem = (item: Response) => ({ type: 'ADD_ITEM', payload: item } as const);
const updateItem = (id: number, completed: boolean) => ({ type: 'UPDATE_ITEM', payload: { id, completed } } as const);
const removeItem = (id: number) => ({ type: 'REMOVE_ITEM', payload: id } as const);
const showDeleteConfirmation = (id: number) => ({ type: 'SHOW_DELETE_CONFIRMATION', payload: id } as const);
const hideDeleteConfirmation = () => ({ type: 'HIDE_DELETE_CONFIRMATION' } as const);

const Page: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const newTodoInputRef = useRef<HTMLInputElement>(null);
    const api = apiClient();

    useEffect(() => {
        newTodoInputRef.current?.focus();
        api.todos.fetch().then(todos => {
            dispatch(setItems(todos));
        });
    }, [api]);

    const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setNewTodoTitle(e.target.value));
    };

    const handleAddTodo = () =>
        api.todos.add({ title: state.newTodoTitle }).then(newItem => {
            dispatch(addItem(newItem));
            newTodoInputRef.current?.focus();
        });

    const handleNewTodoKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleAddTodo();
    };

    const handleCompletedChange = (id: number, completed: boolean) =>
        api.todos.update(id, { completed }).then(() => {
            dispatch(updateItem(id, completed));
        });

    const handleDeleteTodo = (id: number) => {
        api.todos.remove(id).then(() => {
            dispatch(removeItem(id));
            dispatch(hideDeleteConfirmation());
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
            {state.items.length === 0 && <Typography>No todos</Typography>}
            {state.items.length > 0 && <List>
                {state.items.map((item) => (
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
                            <IconButton edge="end" aria-label="delete" onClick={() => dispatch(showDeleteConfirmation(item.id))}>
                                <DeleteIcon />
                            </IconButton>
                            <Dialog id={`deleteConfirmationDialog${item.id}`} open={state.deleteConfirmationTarget === item.id} onClose={() => dispatch(hideDeleteConfirmation())}>
                                <DialogTitle>Are you sure you want to delete {item.title}?</DialogTitle>
                                <DialogActions>
                                    <Button onClick={() => handleDeleteTodo(item.id)}>Yes</Button>
                                    <Button onClick={() => dispatch(hideDeleteConfirmation())}>No</Button>
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