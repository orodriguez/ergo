import React from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import Page from "./Page";
import { server } from 'src/mocks/node'
import { HttpResponse, PathParams, http } from 'msw';
import { CreateRequest, Response } from "../types";
import { Http } from "@mui/icons-material";

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Page Component', () => {
    beforeEach(() => {
        server.use(
            http.get('http://localhost:3000/todos', () => {
                const todos = [
                    { id: 1, title: 'First todo', completed: false },
                    { id: 2, title: 'Second todo', completed: false },
                    { id: 3, title: 'Third todo', completed: false }
                ];

                return HttpResponse.json(todos);
            })
        );
    });

    test('renders todos', async () => {
        render(<Page />);
        const listItems = await screen.findAllByRole('listitem');
        const todoTitles = listItems.map(item => item.textContent);
        expect(todoTitles).toEqual(['First todo', 'Second todo', 'Third todo']);
    });

    test('adds a new todo', async () => {
        server.use(http.post('http://localhost:3000/todos', ({ }) => {
            const todo: Response = {
                id: 4,
                title: 'New todo',
                description: 'New todo description',
                completed: false
            };
            console.log(todo);
            return HttpResponse.json(todo);
        }));

        render(<Page />);

        // fill the input
        const newTodoInput: HTMLInputElement = await screen.findByRole('textbox');
        fireEvent.change(newTodoInput, { target: { value: 'New todo' } });

        const addButton = screen.getByRole('button', { name: /add/i });
        fireEvent.click(addButton);

        await waitFor(async () => {
            const listItems = await screen.findAllByRole('listitem');
            const todoTitles = listItems.map(item => item.textContent);
            expect(todoTitles).toEqual(['New todo', 'First todo', 'Second todo', 'Third todo']);
        })
    });
});

expect(true).toBe(true);