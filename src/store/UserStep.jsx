import { createContext, useState } from "react";

const UserStepContex = createContext({
    step: "",
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});

export function UserStepProvider({ children }) {
    const [userStep, setUserStep] = useState("");

    const userStepCtx = {
        step: userStep,
        showCart: () => {
            setUserStep("cart");
        },
        hideCart: () => {
            setUserStep("");
        },
        showCheckout: () => {
            setUserStep("checkout");
        },
        hideCheckout: () => {
            setUserStep("");
        },
    };

    return <UserStepContex.Provider value={userStepCtx}>{children}</UserStepContex.Provider>;
}

export default UserStepContex;
