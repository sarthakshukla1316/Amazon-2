import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from 'react-currency-formatter';

import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/client';

import { loadStripe } from "@stripe/stripe-js";

import Swal from 'sweetalert2';
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);


function Checkout() {
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const [session] = useSession();
    const router = useRouter();
    const Swal = require('sweetalert2');

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        // call the backend to create a checkout session
        const checkoutSession = await axios.post('/api/create-checkout-session',
        {
            items: items,
            email: session.user.email,
        });

        // Redirect user to stripe checkout page
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });

        if(result.error) alert(result.error.message);
    };

    return (
        <div className="bg-gray-100">
            <Header />
            
            <main className="lg:flex max-w-screen-2xl mx-auto">
                <div className="flex-grow m-5 shadow-sm">
                    <Image  
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain"
                    />

                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center">
                                    <p className="text-md text-gray-400">Your Amazon Basket is empty</p>
                                    <Image src="/empty_cart.png" height={500} width={400} objectFit="contain" />
                                    <h6 className="font-bold text-gray-800">Hey, it feels so light!</h6>
                                    <p className="text-sm text-gray-400 mt-2">There is nothing in your bag. Let's add some items.</p>
                                    <button onClick={() => router.push('/')} className="button mt-5">Continue Shopping</button>
                                </div>
                            ) : 'Shopping Basket'}
                        </h1>

                        {items.map(({ id, title, price, rating, description, category, image, hasPrime, i}) => (
                            <CheckoutProduct 
                                key={i}
                                id={id}
                                title={title}
                                price={price}
                                rating={rating}
                                description={description}
                                category={category}
                                image={image}
                                hasPrime={hasPrime}
                            />
                        ))}

                    </div>
                </div>

                {/* right side div */}

                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap">
                                Subtotal ({items.length} items): {" "}
                                <span className="font-bold">
                                    <Currency quantity={total*50} currency="INR" />
                                </span>
                            </h2>

                            <button 
                            role="Link"
                            onClick={createCheckoutSession}
                            disabled={!session}
                            className={`button mt-2 
                                        ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}
                                    `}>
                                {!session ? (
                                    <button className="focus:outline-none cursor-not-allowed"
                                        onClick={() => (
                                            Swal.fire({
                                                position: 'center',
                                                icon: 'error',
                                                title: 'Please Sign in to Continue!',
                                                showConfirmButton: true,
                                                timer: 2000
                                              })
                                        )}
                                    >Sign in to checkout</button>
                                ) : 'Proceed to checkout'}
                            </button>
                        </>
                    ) }
                </div>
            </main>
        </div>
    )
}

export default Checkout
