import { useContext } from "react";

import useHttp from "../hooks/useHttp";

import CartContext from "../store/CartContext";
import UserStepContex from "../store/UserStep";

import { currencyFormatter } from "../util/formatting";

import Modal from "./ui/Modal.jsx";
import Input from "./ui/Input.jsx";
import Button from "./ui/Button.jsx";
import Error from "./Error.jsx";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

export default function Checkout({}) {
    const cartCtx = useContext(CartContext);
    const stepCtx = useContext(UserStepContex);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData,
    } = useHttp("http://localhost:3000/orders", requestConfig);

    const cartTotal = cartCtx.items.reduce((total, item) => total + item.price * item.quantity, 0);

    const closeCheckoutHandler = () => {
        stepCtx.hideCheckout();
    };

    const handleFinish = () => {
        stepCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: userData,
                },
            })
        );
    };

    if (data && !isSending && !error) {
        return (
            <Modal open={stepCtx.step === "checkout"} onClose={handleFinish}>
                <h2>Your order was submitted successfully</h2>
                <p>We will contact You soon</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Ok</Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal open={stepCtx.step === "checkout"} onClose={closeCheckoutHandler}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="Email Address" type="email" id="email" />
                <Input label="Phone" type="text" id="phone" />

                <div className="control-row">
                    <Input label="City" type="text" id="city" />
                    <Input label="Address" type="text" id="address" />
                </div>

                {error && <Error title="Failed to send order. Please try again" />}

                {!isSending ? (
                    <p className="modal-actions">
                        <Button type="button" textOnly onClick={closeCheckoutHandler}>
                            Cancel
                        </Button>
                        <Button>Confirm</Button>
                    </p>
                ) : (
                    <span>Processing order...</span>
                )}
            </form>
        </Modal>
    );
}
