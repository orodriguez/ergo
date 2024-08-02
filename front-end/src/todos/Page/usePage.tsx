import { useState, useEffect, useRef } from "react";


export function usePage() {
    const [newTodoTitle, setNewTodoTitle] = useState<string>("");
    const newTodoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        newTodoInputRef.current?.focus();
    }, []);

    const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(e.target.value);
    };

    const handleAddTodo = () => {
        console.log(`Adding todo: ${newTodoTitle}`);
        setNewTodoTitle("");
    };

    const handleNewTodoKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleAddTodo();
        }
    };

    return {
        newTodoTitle,
        handleNewTodoChange,
        handleAddTodo,
        handleNewTodoKeyDown,
        newTodoInputRef
    };
}
