import { useState, useEffect, useRef } from "react";
import api from 'src/api';

export function usePage() {
    const [newTodoTitle, setNewTodoTitle] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const newTodoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        newTodoInputRef.current?.focus();
    }, []);

    const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(e.target.value);
    };

    const handleAddTodo = () => {
        setIsLoading(true);
        // wait for 1 second
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
