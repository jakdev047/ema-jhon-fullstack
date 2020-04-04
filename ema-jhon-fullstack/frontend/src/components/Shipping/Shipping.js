import React, { useState } from 'react';
import { useForm} from 'react-hook-form';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder} from '../../utilities/databaseManager';

import {loadStripe} from '@stripe/stripe-js';
import {Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Shipping = () => {
  const { register, handleSubmit,errors } = useForm();
  const [shipmentInfoAdded,setShipmentInfoAdded] = useState(null);

  const [orderSuccess,setOrderSuccess] = useState(null);

  const auth = useAuth();

  const onSubmit = data => { 
    setShipmentInfoAdded(data);
  };

  const placeDatabaseOrder = (payment) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {email:auth.user.email,cart:savedCart,shipment:shipmentInfoAdded,payment:payment};
    fetch('http://localhost:8080/placeOrder',{
      method:'POST',
      body: JSON.stringify(orderDetails),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(order => {
      setOrderSuccess(order._id)
      // clear cart from localstorage
      processOrder();
      // give thanks to the user
    })
    .catch(error => console.log(error));
  }

  const stripePromise = loadStripe('pk_test_S1XUBERB4VzlUWBE3QAJALR000Mp5cx0xE');

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6" style={{display: shipmentInfoAdded && 'none' }}>
          <h2>Shipment Information</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name"/>
            {errors.name && <span>Name is required</span>} <br/><br/>

            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email"/>
            {errors.email && <span>Email is required</span>} <br/><br/>

            <input name="addressLine1" ref={register({ required: true })} placeholder="Address One"/>
            {errors.addressLine1 && <span>Address is required</span>} <br/><br/>

            <input name="addressLine2" ref={register} placeholder="Addrees two"/>
            {errors.addressLine2 && <span>Address is required</span>} <br/><br/>

            <input name="city" ref={register({ required: true })} placeholder="City"/>
            {errors.city && <span>City is required</span>} <br/><br/>

            <input name="country" ref={register({ required: true })} placeholder="Country"/>
            {errors.country && <span>Country is required</span>} <br/><br/>

            <input name="zipcode" ref={register({ required: true })} placeholder="Zipcode" />
            {errors.zipcode && <span>Zipcode is required</span>} <br/><br/>
            
            <input type="submit" />

          </form>
        </div>
        <div className="col-md-6" style={{display: shipmentInfoAdded ? 'block' : 'none' }}>
          <h2>Payment Information</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm placeDatabaseOrder={placeDatabaseOrder}/>
          </Elements> <br/>
          { orderSuccess && <h3>Thank you for shoping with us and your id {orderSuccess}</h3>}
        </div>
      </div>
    </div>
  )
};

export default Shipping;



