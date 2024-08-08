import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "./Page";


import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
    http.get('/todos', () => {
        const todos = [{ id: 1, title: 'First todo', completed: false }]
        return HttpResponse.json(todos);
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Page Component', () => {
    test('renders', async () => {
        render(<Page />);
        await screen.getByRole('heading', { name: 'Todos' });

        expect(true).toBe(true);
    });
});