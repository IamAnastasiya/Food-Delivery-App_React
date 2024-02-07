import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

import { CartContextProvider } from "./store/CartContext.jsx";
import { UserStepProvider } from "./store/UserStep.jsx";

function App() {
    return (
        <UserStepProvider>
            <CartContextProvider>
                <Header />
                <Meals />
                <Cart />
                <Checkout />
            </CartContextProvider>
        </UserStepProvider>
    );
}

export default App;
