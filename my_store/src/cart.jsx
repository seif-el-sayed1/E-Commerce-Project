import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import empty_cart from "../src/assets/empty_cart.png";

const Cart = () => {
    
    const [cart, setCart] = useState(JSON.parse(localStorage.cart));
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.cart) || [];
        setCart(savedCart);
        calculateTotal(savedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        calculateTotal(cart);
    }, [cart]);

    const calculateTotal = (cart) => {
        const totalAmount = cart.map((ele) => {
            return (ele.price)*(ele.number)
        }).reduce((acc, curr) => {
            return parseFloat((acc + curr).toFixed(1))
        },0)
        setTotal(totalAmount);
    };

    const increase = (item) => {
        const updatedCart = cart.map((ele) =>
        ele.id === item.id ? { ...ele, number: ele.number + 1 } : ele
        );
        setCart(updatedCart);
    };

    const decrease = (item) => {
        if (item.number === 1) {
            remove(item.id);
        } else {
            const updatedCart = cart.map((ele) =>
            ele.id === item.id ? { ...ele, number: ele.number - 1 } : ele
        );
        setCart(updatedCart);
        }
    };
    const remove = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
    };
    const deleteAll = () => {
        setCart([]);
    };

    if (cart.length === 0) {
        return (
        <div className="empty_cart text-center">
            <div className="container">
                <img src={empty_cart} alt="Empty Cart" />
                <h3 className="fw-bold fs-1 mb-4">Your Cart Is Empty</h3>
                <a href="/">
                    <button className="shop_btn px-5 py-1 overflow-hidden fw-bold position-relative">Shop now</button>
                </a>
            </div>
        </div>
        );
    }
    return (
        <div className="cart py-4">
            <div className="container-lg">
                <button
                type="button"
                className="btn delete_all fw-bold mb-2 px-4"
                data-bs-toggle="modal"
                data-bs-target="#deleteAllModal">
                Delete All
                </button>
                <div className="modal fade" id="deleteAllModal">
                    <div className="modal-dialog">
                        <div className="modal-content floating_area">
                            <div className="modal-header">
                                <h1 className="warning fw-bold modal-title fs-3" id="deleteAllModalLabel">Warning</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body warning_text fw-bold fs-5">
                                Are you sure you want to delete the cart?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary cancel_btn" data-bs-dismiss="modal">Cancel</button>
                                <button onClick={deleteAll} type="button"  className="btn delete_all" data-bs-dismiss="modal"> Delete All</button>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="m-auto w-100">
                    <thead className="fw-bold">
                        <tr>
                            <td className="p-2 text-center fw-bold fs-5">Product</td>
                            <td className="p-2 text-center fw-bold fs-5 w-50">Title</td>
                            <td className="p-2 text-center fw-bold fs-5">Count</td>
                            <td className="p-2 text-center fw-bold fs-5">Price</td>
                            <td className="p-2 text-center fw-bold fs-5">Total</td>
                            <td className="p-2 text-center fw-bold fs-5"></td>
                            <td className="p-2 text-center fw-bold fs-5"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.id}>
                                <td className="p-2 text-center">
                                    <img src={item.image} alt={item.title} />
                                </td>
                                <td className="p-2 text-center">{item.title}</td>
                                <td className="p-2 text-center">{item.number}</td>
                                <td className="p-2 text-center">{item.price} $</td>
                                <td className="p-2 text-center">
                                    {(item.price * item.number).toFixed(2)} $
                                </td>
                                <td className="p-2 text-center">
                                    <FontAwesomeIcon onClick={() => decrease(item)} className="btns p-1 mx-1 rounded-circle" icon={faMinus}/>
                                    <FontAwesomeIcon onClick={() => increase(item)} className="btns add p-1 mx-1 rounded-circle" icon={faPlus} />
                                </td>
                                <td className="p-2 text-center">
                                    <button onClick={() => remove(item.id)} className="delete p-1">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colSpan={6} className="total p-2 text-center fw-bold fs-5">
                            Total: <span>{total}</span> $
                        </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Cart;