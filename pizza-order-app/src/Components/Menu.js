import { useEffect } from "react";
import { useDataContext } from "../Contexts/DataContext";

const Menu = ({storeId}) => {

    const { menu, fetchMenu } = useDataContext();

    useEffect(() => {
        fetchMenu(storeId).catch(console.error);
    });

    return (
        <div className="container">
            {
                menu.map(menuItem => (
                    <div>
                        <h2>{menuItem.pizza.name}</h2>
                        <p>{menuItem.pizza.description}</p>
                        <p>$ {menuItem.price}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default Menu;