import { render, screen } from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import { createMemoryHistory } from "@remix-run/router";
import StoreList from "../Components/StoreList"

describe(StoreList, () => {

    const stores = [
        {
            id: 1,
            name: "Test Store 1",
            location: {
                streetNo: 1,
                streetName: "Test1",
                streetType: "St",
                suburb: "Test",
                state: "QLD",
                postcode: "4000"
            },
            phone: "01234567890"
        },
        {
            id: 2,
            name: "Test Store 2",
            location: {
                streetNo: 2,
                streetName: "Test2",
                streetType: "Rd",
                suburb: "Test2",
                state: "QLD",
                postcode: "4001"
            },
            phone: "09876543210"
        }
    ];

    it("should list the stores", () => {
        const history = createMemoryHistory({initialEntries: ["/"]});
        render(<Router history={history}><StoreList stores={stores} /></Router>)

        for(let store of stores){
            let link = screen.getByText(store.name);
            expect(link).toBeInTheDocument();
            let address = screen.getByText(`${store.location.streetNo} ${store.location.streetName} ${store.location.streetType}, ${store.location.suburb}, ${store.location.state} ${store.location.postcode}`);
            expect(address).toBeInTheDocument();
            let phone = screen.getByText(store.phone);
            expect(phone).toBeInTheDocument();
        }
    });
});