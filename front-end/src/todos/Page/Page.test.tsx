import React, { act } from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import Page from "./Page";
import { server } from 'src/mocks/node'
import { HttpResponse, http } from 'msw';
import { Response } from "../types";

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Page Component', () => {
    beforeEach(() => setupGetTodos([]));

    test('renders no todos', async () => {
        render(<Page />);

        await waitFor(() => screen.getByText(/No todos/i));
    });

    test('adds a new todo', async () => {
        setupPostTodo({
            id: 4,
            title: 'New todo',
            description: 'New todo description',
            completed: false
        });

        render(<Page />);
        await fillNewTodoInput('New todo');

        clickAddTodo();

        expect(await getTodoTitles()).toEqual(['New todo']);
    });
});

const setupGetTodos = (todos: Response[]) =>
    server.use(http.get('http://localhost:3000/todos', () => HttpResponse.json(todos)))

const setupPostTodo = (todo: Response) =>
    server.use(http.post('http://localhost:3000/todos',
        () => HttpResponse.json(todo)));

const fillNewTodoInput = async (title: string) => {
    const newTodoInput = await screen.findByRole('textbox');
    fireEvent.change(newTodoInput, { target: { value: 'New todo' } });
};

const clickAddTodo = async () => {
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);
};

const getTodoTitles = async () => {
    const listItems = await screen.findAllByRole('listitem');
    return listItems.map(item => item.textContent);
};