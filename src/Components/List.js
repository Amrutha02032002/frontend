import React, { useState, useEffect } from 'react';
import './List.css'
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    sku: '',
    quantity: '',
    date: '',
    reorder: '',
    description: '',
    salesprice: '',
    salestax: '',
    purchasinginformation: '',
    cost: '',
    category_id: '',
    asset_account_id: '',
    income_account_id: '',
    expense_account_id: '',
    preferred_vendor_id: '',
  });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://LAPTOP-LMDOPUS7:8080/inventory/getdata');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    try {
      const response = await axios.post('http://LAPTOP-LMDOPUS7:8080/inventory/addinventory', newItem);
      setItems([...items, response.data]);
      setNewItem({
        name: '',
        sku: '',
        quantity: '',
        date: '',
        reorder: '',
        description: '',
        salesprice: '',
        salestax: '',
        purchasinginformation: '',
        cost: '',
        category_id: '',
        asset_account_id: '',
        income_account_id: '',
        expense_account_id: '',
        preferred_vendor_id: '',
      });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async (id, updatedItem) => {
    try {
      const response = await axios.put(`http://LAPTOP-LMDOPUS7:8080/inventory/updateinventory/${id}`, updatedItem);
      setItems(items.map(item => (item.id === id ? response.data : item)));
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://LAPTOP-LMDOPUS7:8080/inventory/deleteinventory/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingItem) {
      setEditingItem({ ...editingItem, [name]: value });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      updateItem(editingItem.id, editingItem);
    }
  };

  return (
    <div>
      <h1>Item List</h1>
      <div>
        {Object.keys(newItem).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key}
            value={editingItem ? editingItem[key] : newItem[key]}
            onChange={handleInputChange}
          />
        ))}
        <button onClick={editingItem ? handleSaveEdit : addItem}>
          {editingItem ? 'Save' : 'Add'}
        </button>
        {editingItem && <button onClick={handleCancelEdit}>Cancel</button>}
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {Object.keys(item).map((key) => (
              <span key={key}>{item[key]} </span>
            ))}
            <button onClick={() => handleEditClick(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
