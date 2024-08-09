// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('http://localhost:3000/todos', () => {
        const todos = [{ id: 1, title: 'First todo', completed: false }]
        return HttpResponse.json(todos);
    }),
]