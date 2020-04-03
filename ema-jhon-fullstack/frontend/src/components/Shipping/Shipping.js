import React from 'react';
import { useForm} from 'react-hook-form';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipping = () => {
  const { register, handleSubmit,errors } = useForm();
  const auth = useAuth();

  const onSubmit = data => { 
    const savedCart = getDatabaseCart();
    const orderDetails = {email:auth.user.email,cart:savedCart};

    fetch('http://localhost:8080/placeOrder',{
      method:'POST',
      body: JSON.stringify(orderDetails),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(data => {
      alert('Successfully Order Place');
      processOrder();
      console.log(data);
    })
    .catch(error => console.log(error))
  };

  return (
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
  )
};

export default Shipping;