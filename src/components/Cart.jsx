import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";

import Button from "./ui/Button";
import Modal from "./ui/Modal";
import CartItem from "./CartItem";
import CartContext from "../store/CartContext";
import UserStepContex from "../store/UserStep";

export default function Cart({}) {
    const cartCtx = useContext(CartContext);
    const stepCtx = useContext(UserStepContex);

    const cartTotal = cartCtx.items.reduce((total, item) => total + item.price * item.quantity, 0);

    const closeCartHandler = () => {
        stepCtx.hideCart();
    };

    const goToCheckoutHandler = () => {
        stepCtx.showCheckout();
    };

    return (
        <Modal
            className="cart"
            open={stepCtx.step === "cart"}
            onClose={stepCtx.step === "cart" ? closeCartHandler : null}>
            <h2>Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        {...item}
                        onIncrease={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={closeCartHandler}>
                    Close
                </Button>
                {cartCtx.items.length > 0 && <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>}
            </p>
        </Modal>
    );
}
