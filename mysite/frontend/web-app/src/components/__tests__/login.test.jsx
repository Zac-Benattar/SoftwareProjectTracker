import {render, screen, cleanup} from "@testing-library/react";
import LoginPage from "../../pages/LoginPage";
import { BrowserRouter as Router } from "react-router-dom";


test('username input should be rendered', () => {
    render(<Router><LoginPage/></Router>);
    const userNameInput = screen.getByPlaceholderText(/username/i);
    expect(userNameInput).toBeInTheDocument();
})

test('password input should be rendered', () => {
    render(<Router><LoginPage/></Router>);
    const userNameInput = screen.getByPlaceholderText(/password/i);
    expect(userNameInput).toBeInTheDocument();
})

test('button input should be rendered', () => {
    render(<Router><LoginPage/></Router>);
    const userNameInput = screen.getByRole('button');
    expect(userNameInput).toBeInTheDocument();
})