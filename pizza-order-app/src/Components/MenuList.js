import { Modal, Button } from "react-bootstrap";

const MenuList = ({menu, buttonHandler, buttonText}) => {
    return (
        <>
            {
                menu.map(menuItem => (
                    <div className="col-10 col-lg-4 max-auto mb-5">
                        <div className="card">
                            <div className="row card-body">
                                <div className="col-sm-12">
                                    <h3 className="card-title mt-2 mb-3">
                                        {menuItem.pizza.name}
                                    </h3>
                                    <p className="card-text">
                                        {menuItem.pizza.description}
                                    </p>
                                    <p className="card-text">
                                        ${menuItem.price}
                                    </p>
                                    <Button onClick={()=> {buttonHandler(menuItem.id)}}>{buttonText}</Button>

                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default MenuList;