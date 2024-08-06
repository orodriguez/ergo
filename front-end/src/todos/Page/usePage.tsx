import { useState, useEffect, useRef } from "react";
import apiClient from "src/apiClient";
import { Response } from "../types";

export function usePage() {
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

    const handleAddTodo = () => {
        setTimeout(() => {
            api.todos.add({ title: newTodoTitle })
                .then(() => {
                    setNewTodoTitle("");
                    newTodoInputRef.current?.focus();
                });
        }, 500);
    };

    const handleNewTodoKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleAddTodo();
        }
    };

    return {
        newTodo: {
            title: newTodoTitle,
            ref: newTodoInputRef,
            handleChange: handleNewTodoChange,
            handleKeyDown: handleNewTodoKeyDown
        },
        handleAddTodo,
        items,
        activeRequests
    };
}
