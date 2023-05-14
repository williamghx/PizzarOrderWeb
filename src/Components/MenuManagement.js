import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useDataContext } from '../Contexts/DataContext';
import MenuList from "./MenuList";
import NewMenu from "./NewMenu";
import EditMenu from "./EditMenu";

const MenuManagement = () => {
    const { storeId } = useParams();
    const { stores, menu, fetchMenu } = useDataContext();
    const [newPizzaToMenuOpen, setNewPizzaToMenuOpen] = useState(false);
    const [existigPizzatoMenuOpen, setExistingPizzaToMenyOpen] = useState(false);

    const editMenu = id => {

    };

    useEffect(() => {
        fetchMenu(storeId).catch(console.error);
    })
    
    const store = stores.find(s => s.id === Number(storeId));

    return (
        <div className="container">
            <h2 className="mt-3 mb-5 text-center">Menu of {store.name}</h2>
            <div className="row">
                <MenuList menu={menu} buttonHandler={editMenu} buttonText="Edit" />
                <div className="col-10 col-lg-4 max-auto mb-5">
                    <Button onClick={()=> setExistingPizzaToMenyOpen(true)}>Add Existing Pizza to Menu</Button>
                </div>
                <div className="col-10 col-lg-4 max-auto mb-5">
                    <Button onClick={()=> setNewPizzaToMenuOpen(true)}>Add New Pizza to Menu</Button>
                </div>
            </div>
            <NewMenu storeId={storeId} isActive={newPizzaToMenuOpen} handleClose={()=> setNewPizzaToMenuOpen(false)} withNewPizza={true} />
            <NewMenu storeId={storeId} isActive={existigPizzatoMenuOpen} handleClose={()=> setExistingPizzaToMenyOpen(false)} withNewPizza={false} />
            
        </div>
    );
};

export default MenuManagement;