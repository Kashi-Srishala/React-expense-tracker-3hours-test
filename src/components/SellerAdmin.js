import React, {useState, useEffect} from "react";

const SELLER_STORAGE_KEY = 'seller';
const SellerAdmin = () => {
        const [items, setItems] = useState([]);
        const [totalStockValue, setTotalStockValue] = useState(0);

        //Getting data from local storage
        useEffect (()=>{
            const sellerData = JSON.parse(localStorage.getItem(SELLER_STORAGE_KEY)) || {};
            const sellerItems = sellerData.items || [];
            const sellerTotalStockValue = sellerData.totalStockValue || 0;
            setItems(sellerItems);
            setTotalStockValue(sellerTotalStockValue);  
        }, []);

        // to save data to Local Storage:
        useEffect (() => {
            localStorage.setItem(SELLER_STORAGE_KEY, JSON.stringify({ items, totalStockValue }));

        }, [items, totalStockValue]);

        const addItem = (item) =>{
            setItems([...items, item])
            setTotalStockValue(totalStockValue + item.stock * item.price);

        }

        const removeItem = (index) =>{
            const itemToRemove = items[index];
    setItems(items.filter((item, i) => i !== index));
    setTotalStockValue(totalStockValue - itemToRemove.stock * itemToRemove.price);
        }

    return (
        <div>
      <h2>Seller Admin Page</h2>
      <p>Total Stock Value: Rs{totalStockValue}</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - Rs{item.price} - Stock: {item.stock}
            <button onClick={() => removeItem(index)}>Remove Item</button>
          </li>
        ))}
      </ul>
      <form onSubmit={(event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const price = Number(event.target.elements.price.value);
        const stock = Number(event.target.elements.stock.value);
        addItem({ name, price, stock });
      }}>
        <label htmlFor="name">Item Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" />
        <label htmlFor="stock">Stock:</label>
        <input type="number" id="stock" name="stock" />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};


export default SellerAdmin;