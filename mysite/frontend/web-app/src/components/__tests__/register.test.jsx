import {render, screen, cleanup} from "@testing-library/react";
import LoginPage from "../../pages/LoginPage";
// import </REgister> from "../../pages/LoginPage";
import Register from "../../pages/Register";
import { BrowserRouter as Router } from "react-router-dom";


test('renders registeration link', () => {
    render(<Router><Register/></Router>);
    const registerLink = screen.getByTestId("link-button");
    expect(registerLink).toBeInTheDocument();
})

test('renders input boxes', () => {
    render(<Router><Register/></Router>);
    const registerLink = screen.getAllByTestId("input-boxes");
    expect(registerLink.length).toBe(7);
}) 