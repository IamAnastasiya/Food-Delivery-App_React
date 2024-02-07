import { currencyFormatter } from "../util/formatting";

export default function CartItem({ quantity, name, price, onIncrease, onDecrease }) {
    return (
        <li className="cart-item">
            <p>
                {name} - {quantity} x {currencyFormatter.format(price)}
            </p>
            <div className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </div>
        </li>
    );
}
