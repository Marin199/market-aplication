import { useId, useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "./CartContext";

export default function Cart({ user }) {
    const emailId = useId();
    const { cart, cartSum, handleAddProduct, handleRemoveProduct } =
        useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="cart-wrapper">
                <h1>Coșul tău</h1>
                <title>Coș | SuperM</title>
                <p>
                    Coșul tău este gol. Adaugă un produs din{" "}
                    <Link to="/products">pagina produse.</Link> 
                </p>
            </div>
        );
    }

    return (
        <div className="cart-wrapper">
            <h1>Coșul tău</h1>
            <title>Coș | SuperM</title>
            {cart.map((product) => (
                <div key={product.id} className="cart-product">
                    <img
                        src={product.thumbnail}
                        alt={product.name}
                        width="126"
                        height="84"
                    />
                    <div className="cart-product-details">
                        <div className="cart-product-name">
                            <p>{product.name}</p>
                            <ul className="cart-buttons">
                                <li>{product.quantity}</li>
                                <li>
                                    <button
                                        onClick={() =>
                                            handleAddProduct(product)
                                        }
                                    >
                                        +
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() =>
                                            handleRemoveProduct(product)
                                        }
                                    >
                                        -
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <p>${(product.final_price / 100).toFixed(2)}</p>
                    </div>
                    <p>
                        $
                        {(
                            (product.final_price * product.quantity) /
                            100
                        ).toFixed(2)}
                    </p>
                </div>
            ))}

            <div className="cart-total">
                <h2>Prețul dvs. total</h2>
                <p className="cart-total-value">
                    ${(cartSum / 100).toFixed(2)}
                </p>
            </div>
            <form onSubmit={(event) => event.preventDefault()}>
                <label className="label" htmlFor={emailId}>
                    Email<span className="required">*</span>:
                </label>
                <input
                    id={emailId}
                    type="email"
                    className="input"
                    placeholder="Enter your email"
                    defaultValue={user ? user.email : ""}
                />
                <p className="text-dimmed cart-notice">
                    Introdu adresa ta de e-mail, apoi apasă 
                    pe plată, iar produsele îți vor fi livrate în aceeași zi!
                </p>
                <p className="cart-notice cart-warning">
                    Aceasta este o versiune demonstrativă, deci formularul nu trimite nicio informație.
                </p>
                <div className="cart-button-wrapper">
                    <input type="submit" value="Plata" className="btn" />
                </div>
            </form>
        </div>
    );
}
