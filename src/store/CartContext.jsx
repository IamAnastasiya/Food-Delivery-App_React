import { createContext, useReducer } from "react";

const CartContex = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

function cartReducer(state, action) {
    if (action.type === "ADD") {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingCartItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 };
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === "CLEAR_CART") {
        return { ...state, items: [] };
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    const cartContext = {
        items: cart.items,
        addItem: (item) => {
            dispatchCartAction({ type: "ADD", item });
        },
        removeItem: (id) => {
            dispatchCartAction({ type: "REMOVE", id });
        },
        clearCart: () => {
            dispatchCartAction({ type: "CLEAR_CART" });
        },
    };

    return <CartContex.Provider value={cartContext}>{children}</CartContex.Provider>;
}

export default CartContex;
