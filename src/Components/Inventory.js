

import React, { useState, useEffect } from 'react';
import './Inventory.css';
import axios from 'axios';

const InventoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [assetAccounts, setAssetAccounts] = useState([]);
  const [incomeAccounts, setIncomeAccounts] = useState([]);
  const [expenseAccounts, setExpenseAccounts] = useState([]);
  const [preferredVendors, setPreferredVendors] = useState([]);
  const [isTypeChanging, setIsTypeChanging] = useState(false);
  const [type, setType] = useState('Inventory');

  const [formData, setFormData] = useState({
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
    preferred_vendor_id: ''
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const categoryResponse = await axios.get('http://LAPTOP-LMDOPUS7:8080/drop/getcategories');
        setCategories(categoryResponse.data);

        const assetAccountResponse = await axios.get('http://LAPTOP-LMDOPUS7:8080/drop/getassetAccounts');
        setAssetAccounts(assetAccountResponse.data);

        const incomeAccountResponse = await axios.get('http://LAPTOP-LMDOPUS7:8080/drop/getincomeAccounts');
        setIncomeAccounts(incomeAccountResponse.data);

        const expenseAccountResponse = await axios.get('http://LAPTOP-LMDOPUS7:8080/drop/getexpenseAccounts');
        setExpenseAccounts(expenseAccountResponse.data);

        const preferredVendorResponse = await axios.get('http://LAPTOP-LMDOPUS7:8080/drop/getpreferredVendors');
        setPreferredVendors(preferredVendorResponse.data);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const toggleTypeChange = () => {
    setIsTypeChanging(!isTypeChanging);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)

    axios.post('http://localhost:8080/inventory/addinventory', formData)
      .then(response => {
        alert('Inventory added successfully');

        setFormData({
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
          preferred_vendor_id: ''
        });
      })
      .catch(error => {
        console.error('There was an error adding the inventory!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="header">
        <h1>{type}</h1>
        {isTypeChanging ? (
          <select onChange={handleTypeChange} value={type}>
            <option value="Inventory">Inventory</option>
            <option value="Service">Service</option>
            <option value="Non-Inventory">Non-Inventory</option>
          </select>
        ) : (
          <a href="#!" onClick={toggleTypeChange}>Change type</a>
        )}
      </div>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} required />
      <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <input type="text" name="reorder" placeholder="Reorder Level" value={formData.reorder} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input type="number" step="0.01" name="salesprice" placeholder="Sales Price" value={formData.salesprice} onChange={handleChange} required />
      <input type="number" step="0.01" name="salestax" placeholder="Sales Tax" value={formData.salestax} onChange={handleChange} required />
      <input type="text" name="purchasinginformation" placeholder="Purchasing Information" value={formData.purchasinginformation} onChange={handleChange} required />
      <input type="number" step="0.01" name="cost" placeholder="Cost" value={formData.cost} onChange={handleChange} required />

      <select name="category_id" value={formData.category_id} onChange={handleChange} required>
        <option value="">Select Category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>

      <select name="asset_account_id" value={formData.asset_account_id} onChange={handleChange} required>
        <option value="">Select Asset Account</option>
        {assetAccounts.map(account => (
          <option key={account.id} value={account.id}>{account.name}</option>
        ))}
      </select>

      <select name="income_account_id" value={formData.income_account_id} onChange={handleChange} required>
        <option value="">Select Income Account</option>
        {incomeAccounts.map(account => (
          <option key={account.id} value={account.id}>{account.name}</option>
        ))}
      </select>

      <select name="expense_account_id" value={formData.expense_account_id} onChange={handleChange} required>
        <option value="">Select Expense Account</option>
        {expenseAccounts.map(account => (
          <option key={account.id} value={account.id}>{account.name}</option>
        ))}
      </select>

      <select name="preferred_vendor_id" value={formData.preferred_vendor_id} onChange={handleChange} required>
        <option value="">Select Preferred Vendor</option>
        {preferredVendors.map(vendor => (
          <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
        ))}
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default InventoryForm;