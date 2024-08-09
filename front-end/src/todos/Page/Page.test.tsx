import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "./Page";
import { server } from 'src/mocks/node'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Page Component', () => {
    test('renders', async () => {
        const { getByRole } = render(<Page />);
        await getByRole('heading', { name: 'Todos' });

        expect(true).toBe(true);
    });
});