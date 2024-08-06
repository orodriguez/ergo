import { useState, useEffect, useRef } from "react";
import apiClient from "src/apiClient";
import { Response } from "../types";

export interface UsePage {
    newTodo: {
        title: string;
        ref: React.RefObject<HTMLInputElement>;
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleKeyDown: (e: React.KeyboardEvent) => void;
    };
    handleAddTodo: () => void;
    items: Response[];
    activeRequests: number;
    handleCompletedChange: (id: number, completed: boolean) => void;
    handleDeleteTodo: (id: number) => void;
}

export function usePage(): UsePage {
    const [newTodoTitle, setNewTodoTitle] = useState<string>("");
    const [activeRequests, setActiveRequests] = useState<number>(0);
    const [items, setItems] = useState<Response[]>([]);
    const newTodoInputRef = useRef<HTMLInputElement>(null);
    const api = apiClient(setActiveRequests);

    useEffect(() => {
        newTodoInputRef.current?.focus();
        api.todos.fetch()
            .then(setItems);
    }, []);

    const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(e.target.value);
    };

    const handleAddTodo = () =>
        api.todos.add({ title: newTodoTitle })
            .then(newItem => {
                setItems(items => [newItem, ...items]);
                setNewTodoTitle("");
                newTodoInputRef.current?.focus();
            });

    const handleNewTodoKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleAddTodo();
    };

    const updateCompleted = (id: number, completed: boolean) =>
        setItems(items => items.map((item) =>
            item.id === id ? { ...item, completed } : item));

    const handleCompletedChange = (id: number, completed: boolean) =>
        api.todos
            .update(id, { completed })
            .then(() => updateCompleted(id, completed));

    const handleDeleteTodo = (id: number) =>
        api.todos
            .remove(id)
            .then(() => setItems(prev => prev.filter((item) => item.id !== id)));


    return {
        newTodo: {
            title: newTodoTitle,
            ref: newTodoInputRef,
            handleChange: handleNewTodoChange,
            handleKeyDown: handleNewTodoKeyDown
        },
        handleAddTodo,
        items,
        activeRequests,
        handleCompletedChange,
        handleDeleteTodo
    };
}
