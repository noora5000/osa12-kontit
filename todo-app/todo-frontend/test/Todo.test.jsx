import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test('renders todo component', () => {
    const todo = { text: 'Test task', done: false };
    render(<Todo todo={todo}/>)
    const element = screen.getByText('Test task')
    expect(element).toBeDefined()
});