import { render, screen, fireEvent } from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import { createMemoryHistory } from "@remix-run/router";
import MenuList from "../Components/MenuList";

describe(MenuList, () => {
    const menu = [
        {
            id: 1,
            pizza: {
                name: "Test1",
                description: "Test Description 1",
            },
            price: "10"
        },
        {
            id: 2,
            pizza: {
                name: "Test2",
                description: "Test Description 2",
            },
            price: "20"
        }
    ];

    var buttonStatus = [
        {
            id: 1,
            clicked: false
        },
        {
            id: 2,
            clicked: false
        }
    ];

    const buttonHandler = (id) => {
        buttonStatus.find(b => b.id === id).clicked = true;
    };

    const buttonText = "Test";

    it("should list menu", () => {
        const history = createMemoryHistory({initialEntries: ["/"]});
        render(<Router history={history}><MenuList menu={menu} buttonHandler={buttonHandler} buttonText={buttonText} /></Router>);

        for(let menuItem of menu){
            const pizzaName = screen.getByText(menuItem.pizza.name);
            expect(pizzaName).toBeInTheDocument();
            const pizzaDescription = screen.getByText(menuItem.pizza.description);
            expect(pizzaDescription).toBeInTheDocument();
            const price = screen.getByText(`$${menuItem.price}`);
            expect(price).toBeInTheDocument();
        }

        const buttons = screen.getAllByText(buttonText);
        expect(buttons).toHaveLength(2); 
    });

    it("should invoke the handlers when buttons are clicked", () => {
        const history = createMemoryHistory({initialEntries: ["/"]});
        render(<Router history={history}><MenuList menu={menu} buttonHandler={buttonHandler} buttonText={buttonText} /></Router>);

        const buttons = screen.getAllByRole("button");

        for(let button of buttons){
            fireEvent.click(button);
        }

        for(let status of buttonStatus){
            expect(status.clicked).toBe(true);
        }
    })
});