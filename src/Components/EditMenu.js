import { Modal, Button } from "react-bootstrap";
import { TextCell, SubmitCell, SelectCell, LabelCell } from "./Form";
import { useEffect, useState,  } from "react";
import { useDataContext } from '../Contexts/DataContext';

const EditMenu = ({id, isActive, handleClose }) => {

    const {
        menu,
        modifyMenu
    } = useDataContext();

    const initialEditMenuItem = 
    {
        storeId: menu.find(m => m.id === id).store.id,
        pizza: {
            name: menu.find(m => m.id === id).pizza.name,
            description: menu.find(m => m.id === id).pizza.description
        },
        price: 0
    };


    const [updateMenuItem, setUpdateMenuItem] = useState(initialEditMenuItem);

    const updatePrice = (value) => {
        const menuItem = updateMenuItem;
        menuItem.price = value;
        setUpdateMenuItem(menuItem);
    };

    const [validation, setValidation] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await modifyMenu();
        if(res.status === 200){
            alert("Updated!");
            setValidation(null);
            setUpdateMenuItem(initialEditMenuItem);
        }
        else if(res.status === 400){
            const body = await res.json();
            if(body.errors){
                console.log(body.errors);
                setValidation(
                    {
                        errors: Object.keys(body.errors).map(key => {
                            return {
                                fieldName: key,
                                reason: "Required"
                            }
                        })
                    }
                );
            }
            else{
                setValidation(
                    {
                        errors: Object.keys(body).map(key => {
                            return {
                                fieldName: key,
                                reason: body[key][0]
                            }
                        })
                    }
                );
            }
        }
        else{
            alert("Something went wrong!");
            setValidation(null);
            setUpdateMenuItem(initialEditMenuItem);
        }
        
    };

    // useEffect(() => {
    //     fetchAvailablePizzas(storeId).catch(console.error);
    // });

    return (
        <Modal show={isActive} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    New Menu
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={e => {handleSubmit(e)}}>
                    <div className="container">
                        <div className="row mt5">   
                            <p>
                                {`Store: ${menu.find(m => m.id === Number(id)).store.name}`}
                            </p> 
                            <p>
                                {`Pizza: ${menu.find(m => m.id === Number(id)).pizza.name}`}
                            </p>
                            <p>
                                {menu.find(m => m.id === Number(id)).pizza.description}
                            </p>
                            <TextCell 
                                id="price"
                                label="Price"
                                width={12}
                                warning={validation?.errors.find(err => err?.fieldName === "Price")?.reason??""}
                                value={updateMenuItem.price}
                                onChange={e => updatePrice(e.target.value)}
                                required={true}
                            />
                            <SubmitCell 
                                width={6}
                                text="Submit"
                            />
                        </div>
                    </div>
                </form>
            </Modal.Body>  
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    setValidation(null);
                    setUpdateMenuItem(initialEditMenuItem);
                    handleClose();}}>
                    Close
                </Button>
            </Modal.Footer>         
        </Modal>
    );
    
};

export default EditMenu;