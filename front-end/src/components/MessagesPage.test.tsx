import React from 'react';
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import MessagesPage from './MessagesPage'
import { MemoryRouter } from 'react-router-dom';

const server = setupServer(
    http.get('http://localhost:5047/messages', () => {
        return HttpResponse.json([
            { id: 1, content: 'Message 1' },
            { id: 2, content: 'Message 2' },
        ])
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const renderMessagesPage = () => render(
    <MemoryRouter initialEntries={['/messages']}>
        <MessagesPage />
    </MemoryRouter>
);

test('loads and displays greeting', async () => {
    renderMessagesPage();

    screen.getByRole('heading', { name: 'Messages' });

    const items = await screen.findAllByRole('listitem');
    const messages = items.map(item => item.textContent);

    expect(messages).toEqual(['Message 1', 'Message 2']);
})