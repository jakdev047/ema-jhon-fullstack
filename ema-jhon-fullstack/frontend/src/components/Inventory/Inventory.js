import React from 'react';
// import fakeData from '../../fakeData';

const Inventory = () => {

  // const handleInventory = () => {
  //   console.log(fakeData[0]);

  //   // const product = fakeData[0];
  //   fetch('http://localhost:8080/addproduct', {
  //     method:'POST',
  //     body: JSON.stringify(fakeData),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(res=>res.json())
  //   .then(data=> {
  //     console.log(data)
  //   })
  //   .catch(error => console.log(error)); 
  // }

  return (
    <div>
      <div className="container">
        <h2>Add Inventory to sale more...</h2>
        {/* <button onClick={handleInventory}>Add Inventory</button> */}
      </div>
    </div>
  );
};

export default Inventory;