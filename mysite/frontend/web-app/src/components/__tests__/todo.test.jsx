import {render, screen, cleanup} from "@testing-library/react";
import LoginPage from "../../pages/LoginPage";
import Todo from "../../pages/Todo"; 


test('should render login page', () => {
    render(<Todo/>);
    const loginElement = screen.getByTestId('todo-1');
    expect(loginElement).toBeInTheDocument();
})