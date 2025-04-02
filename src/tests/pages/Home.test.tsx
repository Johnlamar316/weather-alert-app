import { render, screen } from '@testing-library/react';
import Home from "../../pages/Home.tsx";


test('renders Hello World heading', () => {
    render(<Home/>);
    const heading = screen.getByRole('heading', { name: /hello world/i });
    expect(heading).toBeInTheDocument();
});
