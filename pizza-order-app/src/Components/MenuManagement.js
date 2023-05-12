import { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useDataContext } from '../Contexts/DataContext';
import MenuList from "./MenuList";

const MenuManagement = () => {
    const { storeId } = useParams();
    const { stores, menu, fetchMenu } = useDataContext();

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
                <div className="col-10 col-lg-8 max-auto mb-5">
                    <Button>Add New Menu</Button>
                </div>
            </div>
        </div>
    );
};

export default MenuManagement;