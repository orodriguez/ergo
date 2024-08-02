import { useState, useEffect, useRef } from "react";
import apiClient from "src/apiClient";

export function usePage() {
    const [newTodoTitle, setNewTodoTitle] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const newTodoInputRef = useRef<HTMLInputElement>(null);
    const api = apiClient(() => setIsLoading(true), () => setIsLoading(false));

    useEffect(() => {
        newTodoInputRef.current?.focus();
    }, []);

    const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(e.target.value);
    };

    const handleAddTodo = () => {
        setIsLoading(true);
        setTimeout(() => {
            api.todos.add({
                id: 0,
                title: newTodoTitle,
                description: "",
                completed: false
            }).then(() => {
                setNewTodoTitle("");
                newTodoInputRef.current?.focus();
                setIsLoading(false);
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
        isLoading
    };
}
