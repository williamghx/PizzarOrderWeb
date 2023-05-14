import { Modal, Button } from "react-bootstrap";
import { TextCell, SubmitCell, SelectCell, LabelCell } from "./Form";
import { useEffect, useState,  } from "react";
import { useDataContext } from '../Contexts/DataContext';

const NewMenu = ({storeId, isActive, handleClose, withNewPizza}) => {

    const {
        stores,
        availablePizzas,
        fetchAvailablePizzas,
        addMenu
    } = useDataContext();

    const initialNewMenuItem = withNewPizza?
    {
        storeId: storeId,
        pizza: {
            name: "",
            description: ""
        },
        price: 0
    }: 
    {
        storeId: storeId,
        pizzaId: null,
        price: 0
    };

    const [newMenuItem, setNewMenuItem] = useState(initialNewMenuItem);

    const updateNewMenu = (property, value, updatePizza = false) => {
        const menuItem = newMenuItem;
        if(updatePizza){
            if(!menuItem.pizza)
                menuItem.pizza = {
                    name: "",
                    description: ""
                }
            else
                menuItem["pizza"][property] = value;
        }     
        else
            menuItem[property] = value;
        setNewMenuItem(menuItem);
    };

    const [validation, setValidation] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await addMenu(newMenuItem);
        if(res.status === 201){
            alert("Created!");
            setValidation(null);
            setNewMenuItem(initialNewMenuItem);
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
            setNewMenuItem(initialNewMenuItem);
        }
        
    };

    useEffect(() => {
        fetchAvailablePizzas(storeId).catch(console.error);
    });

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
                            <LabelCell
                                text = {`store: ${stores.find(s => s.id === Number(storeId)).name}`}
                                width = {12}
                            />    
                            <p>
                            {`store: ${stores.find(s => s.id === Number(storeId)).name}`}
                            </p> 
                            {
                                !withNewPizza && (
                                    <SelectCell 
                                        id="pizzas"
                                        label="Available Pizzas"
                                        width={8}
                                        // warning={validation?.errors.find(err => err?.fieldName === "streetType")?.reason??""}
                                        value={newMenuItem.pizzaId}
                                        options={availablePizzas.map(p => {return {value: p.id, label: p.name};})}
                                        onChange={e => updateNewMenu("pizzaId", e.target.value)}
                                        required={true}
                                    />
                                )
                            }
                            {
                                withNewPizza && (
                                    <>
                                        <TextCell 
                                            id="pizzaName"
                                            label="Pizza Name"
                                            width={12}
                                            warning={validation?.errors.find(err => err?.fieldName === "Pizza.Name")?.reason??""}
                                            value={newMenuItem.pizza.name}
                                            onChange={e => updateNewMenu("name", e.target.value, true)}
                                            required={true}
                                        />
                                        <TextCell 
                                            id="pizzaDescription"
                                            label="Pizza Description"
                                            width={12}
                                            warning={validation?.errors.find(err => err?.fieldName === "Pizza.Description")?.reason??""}
                                            value={newMenuItem.pizza.name}
                                            onChange={e => updateNewMenu("description", e.target.value, true)}
                                            required={true}
                                        />
                                    </>
                                )
                            }
                            <TextCell 
                                id="price"
                                label="Price"
                                width={12}
                                warning={validation?.errors.find(err => err?.fieldName === "Price")?.reason??""}
                                value={newMenuItem.price}
                                onChange={e => updateNewMenu("price", e.target.value)}
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
                    setNewMenuItem(initialNewMenuItem);
                    handleClose();}}>
                    Close
                </Button>
            </Modal.Footer>         
        </Modal>
    );
    
};

export default NewMenu;