import { useContext } from "react";

import logoImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext.jsx";
import UserStepContex from "../store/UserStep.jsx";

import Button from "./ui/Button.jsx";

export default function Header() {
    const cartCtx = useContext(CartContext);
    const stepCtx = useContext(UserStepContex);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    const handleCartOpen = () => {
        stepCtx.showCart();
    };

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A restaurant" />
                <h1>Num-nums</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleCartOpen}>
                    Cart ({totalCartItems})
                </Button>
            </nav>
        </header>
    );
}
