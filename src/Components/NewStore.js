import { Modal, Button } from "react-bootstrap";
import { TextCell, SubmitCell, SelectCell } from "./Form";
import { useEffect, useState,  } from "react";
import { useDataContext } from '../Contexts/DataContext';

const NewStore = ({isActive, handleClose}) => {

    const {
        states, 
        streetTypes, 
        fetchStates, 
        fetchStreetTypes, 
        addStore
    } = useDataContext();

    const initialNewStore = {
        name: "",
        location: {
            streetNo: "",
            streetName: "",
            streetType: "",
            suburb: "",
            postcode: "",
            state: ""
        },
        phone: ""
    };

    const [newStore, setNewStore] = useState(initialNewStore);
    const [validation, setValidation] = useState(null);

    const updateNewStore = (property, value, updateLocation = false) => {
        const store = newStore;
        if(updateLocation)
            store["location"][property] = value;
        else
            store[property] = value;
        setNewStore(store);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(newStore));
        const res = await addStore(newStore);
        if(res.status === 201){
            alert("Created!");
            setValidation(null);
            setNewStore(initialNewStore);
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
            setNewStore(initialNewStore);
        }
        
    };

    useEffect(() => {
        fetchStates().catch(console.error);
        fetchStreetTypes().catch(console.error);
        updateNewStore("state",states[0], true);
        updateNewStore("streetType",streetTypes[0], true);

    });

    return (
        <Modal show={isActive} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    New Store
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={e => {handleSubmit(e)}}>
                    <div className="container">
                        <div className="row mt5">
                            <TextCell 
                                id="storeName"
                                label="Store Name"
                                width={12}
                                warning={validation?.errors.find(err => err?.fieldName === "Name")?.reason??""}
                                value={newStore.name}
                                onChange={e => updateNewStore("name", e.target.value)}
                                required={true}
                            />
                            <TextCell 
                                id="streetNo"
                                label="Street No."
                                width={3}
                                warning={validation?.errors.find(err => err?.fieldName === "Location.StreetNo")?.reason??""}
                                value={newStore.location.streetNo}
                                onChange={e => updateNewStore("streetNo", e.target.value, true)}
                                required={true}
                            />
                            <TextCell 
                                id="streetName"
                                label="Street Name"
                                width={5}
                                warning={validation?.errors.find(err => err?.fieldName === "Location.StreetName")?.reason??""}
                                value={newStore.location.streetName}
                                onChange={e => updateNewStore("streetName", e.target.value, true)}
                                required={true}
                            />
                            <SelectCell 
                                id="streetType"
                                label="Street Type"
                                width={4}
                                // warning={validation?.errors.find(err => err?.fieldName === "streetType")?.reason??""}
                                value={newStore.location.streetType}
                                options={streetTypes.map(s => {return {value: s, label: s};})}
                                onChange={e => updateNewStore("streetType", e.target.value, true)}
                                required={true}
                            />
                            <TextCell 
                                id="suburb"
                                label="Suburb"
                                width={6}
                                warning={validation?.errors.find(err => err?.fieldName === "Location.Suburb")?.reason??""}
                                value={newStore.location.suburb}
                                onChange={e => updateNewStore("suburb", e.target.value, true)}
                                required={true}
                            />
                            <SelectCell 
                                id="state"
                                label="State"
                                width={3}
                                // warning={validation?.errors.find(err => err?.fieldName === "state")?.reason??""}
                                value={newStore.location.state}
                                options={states.map(s => {return {value: s, label: s};})}
                                onChange={e => updateNewStore("state", e.target.value, true)}
                                required={true}
                            />
                            <TextCell 
                                id="postcode"
                                label="Postcode"
                                width={3}
                                warning={validation?.errors.find(err => err?.fieldName === "Location.Postcode")?.reason??""}
                                value={newStore.location.postcode}
                                onChange={e => updateNewStore("postcode", e.target.value, true)}
                                required={true}
                            />
                            <TextCell 
                                id="phone"
                                label="Phone Number"
                                width={12}
                                warning={validation?.errors.find(err => err?.fieldName === "Phone")?.reason??""}
                                value={newStore.phone}
                                onChange={e => updateNewStore("phone", e.target.value)}
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
                    setNewStore(initialNewStore);
                    handleClose();}}>
                    Close
                </Button>
            </Modal.Footer>         
        </Modal>
    );
    
};

export default NewStore;