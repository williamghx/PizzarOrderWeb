import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useDataContext } from '../Contexts/DataContext';
import MenuList from "./MenuList";

const Menu = () => {
    const { storeId } = useParams();
    const { stores, menu, toppings, fetchMenu, fetchToppings } = useDataContext();

    const [order, setOrder] = useState([]);

    const store = stores.find(s => s.id === Number(storeId));

    const menuSelect = id => {
        const max = order.length === 0 ? 0 : Math.max(...order.map(o => o.id));
        let menuItem = menu.find(m => m.id === id);
        let newOrder = [...order, {
            id: max + 1,
            storeId: Number(storeId),
            pizzaName: menuItem.pizza.name,
            pizzaDesc: menuItem.pizza.description,
            price: menuItem.price,
            qty: 1,
            toppings: toppings.map(t => {
                return {
                    id: t.id,
                    name: t.name,
                    price: t.price,
                    qty: 0
                };
            })
        }];
        console.log(newOrder);
        console.log(newOrder.filter(o=> o.storeId === 1));
        setOrder(newOrder);
    };

    const qtyIncrease = id => {
        let editOrder = order;
        editOrder.find(o => o.id === id).qty = editOrder.find(o => o.id === id).qty + 1;
        setOrder(editOrder);
    };

    const qtyDecrease = id => {
        let editOrder = order;
        if (editOrder.find(o => o.id === id).qty > 1)
            editOrder.find(o => o.id === id).qty = editOrder.find(o => o.id === id).qty - 1;
    };

    const toppingQtyIncrease = (orderId, toppingId) => {
        let editOrder = order;
        editOrder.find(o => o.id === orderId).toppings.find(t => t.id === toppingId).qty = editOrder.find(o => o.id === orderId).toppings.find(t => t.id === toppingId).qty + 1;
        setOrder(editOrder);
    };

    const toppingQtyDecrease = (orderId, toppingId) => {
        let editOrder = order;
        if (editOrder.find(o => o.id === orderId).toppings.find(t => t.id === toppingId).qty > 0)
            editOrder.find(o => o.id === orderId).toppings.find(t => t.id === toppingId).qty = editOrder.find(o => o.id === orderId).toppings.find(t => t.id === toppingId).qty - 1;
        setOrder(editOrder);
    };

    useEffect(() => {
        fetchMenu(storeId).catch(console.error);
        fetchToppings().catch(console.error);
    });

    return (
        <div className="container">
            <h2 className="mt-3 mb-5 text-center">Menu of {store.name}</h2>
            <div className="row">
                <MenuList menu={menu} buttonHandler={menuSelect} buttonText="Select" />
                {
                    order.filter(o => o.storeId == Number(storeId)).map(o => (
                        <>
                            <div className="col-10 col-lg-12 max-auto mb-5">
                                <div className="card">
                                    <div className="row card-body">
                                        <div className="col-sm-8">
                                            <h3 className="card-title mt-2 mb-3">{o.pizzaName}</h3>
                                            <p className="card-text">{o.pizzaDesc}</p>
                                            <p className="card-text">${o.price} x {o.qty} <Button onClick={() => { qtyIncrease(o.id) }}>+</Button> <Button onClick={() => { qtyDecrease(o.id) }}>-</Button></p>
                                            <p className="card-text">
                                                {
                                                    o.toppings.map(t => (
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-sm-4 mt-2 mb-3">{t.name}</div>
                                                                <div className="col-sm-2 mt-2 mb-3">${t.price}</div>
                                                                <div className="col-sm-2 mt-2 mb-3">x {t.qty}</div>
                                                                <div className="col-sm-2 mt-2 mb-3">
                                                                    <Button onClick={() => toppingQtyIncrease(o.id, t.id)}>+</Button>
                                                                </div>
                                                                <div className="col-sm-2 mt-2 mb-3">
                                                                    <Button onClick={() => toppingQtyDecrease(o.id, t.id)}>-</Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </p>
                                            <p className="card-text">Sub Total: {o.qty * (o.price + o.toppings.reduce((accum, topping) => accum + topping.qty * topping.price, 0))}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                    ))
                }
                <div className="col-10 col-lg-11 max-auto mb-5">
                    Total: {order.filter(o => o.storeId == Number(storeId)).reduce((accum, o) =>accum + (o.qty * (o.price + o.toppings.reduce((accum, topping) => accum + topping.qty * topping.price, 0))), 0) }
                </div>
                <div className="col-10 col-lg-1 max-auto mb-5">
                    <Button onClick={()=> setOrder([])}>Clear</Button>
                </div>
            </div>

        </div>
    );
};

export default Menu;