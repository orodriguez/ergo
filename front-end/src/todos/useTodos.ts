import { useState, useEffect } from 'react';
import api from './api';
import { Todo } from './todo';

const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const todos = await api.fetch();
                setTodos(todos);
            } catch (error) {
                console.error('Error fetching todos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    const addTodo = async (text: string) => {
        try {
            const newTodo = await api.add(text);
            setTodos((prevTodos) => [...prevTodos, newTodo]);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await api.remove(id);
            setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const completeTodo = async (id: number) => {
        try {
            const updatedTodo = await api.complete(id);
            setTodos((prevTodos) =>
                prevTodos.map(todo => (todo.id === id ? updatedTodo : todo))
            );
        } catch (error) {
            console.error('Error completing todo:', error);
        }
    };

    return {
        todos,
        loading,
        addTodo,
        deleteTodo,
        completeTodo,
    };
};

export default useTodos;
