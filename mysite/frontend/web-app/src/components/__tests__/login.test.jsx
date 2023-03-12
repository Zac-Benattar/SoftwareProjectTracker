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
    const passInput = screen.getByPlaceholderText(/password/i);
    expect(passInput).toBeInTheDocument();
})

test('button input should be rendered', () => {
    render(<Router><LoginPage/></Router>);
    const buttonInput = screen.getByRole('button');
    expect(buttonInput).toBeInTheDocument();
})

test('username input should be empty', () => {
    render(<Router><LoginPage/></Router>);
    const userNameInput = screen.getByPlaceholderText(/username/i);;
    expect(userNameInput.value).toBe("");
})

test('password input should be empty', () => {
    render(<Router><LoginPage/></Router>);
    const passInput = screen.getByPlaceholderText(/password/i);;
    expect(passInput.value).toBe("");
})


test('button input should be disabled', () => {
    render(<Router><LoginPage/></Router>);
    const buttonInput = screen.getByRole('button');
    expect(buttonInput).toBeDisabled();
})

