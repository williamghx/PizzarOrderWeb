import { Link } from "react-router-dom";

const StoreList = ({stores}) => {

    return (
        <>
            {
                stores.map(store => (
                    <div className="col-10 col-lg-4 max-auto mb-5">
                        <div className="card">
                            <div className="row card-body">
                                <div className="col-sm-12">
                                    <h3 className="card-title mt-2 mb-3">
                                        <Link data-testid="store-title-link" className="nav-link" to={String(store.id)}>{store.name}</Link>
                                    </h3>
                                    <p data-testid="store-address" className="card-text">
                                        {
                                            `${store.location.streetNo} ${store.location.streetName} ${store.location.streetType}, ${store.location.suburb}, ${store.location.state} ${store.location.postcode}`
                                        }
                                    </p>
                                    <p data-testid="store-phone" className="card-text">
                                        {
                                            store.phone
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default StoreList;