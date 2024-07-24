import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DropdownManager = () => {
  const [categories, setCategories] = useState([]);
  const [assetAccounts, setAssetAccounts] = useState([]);
  const [incomeAccounts, setIncomeAccounts] = useState([]);
  const [expenseAccounts, setExpenseAccounts] = useState([]);
  const [preferredVendors, setPreferredVendors] = useState([]);
  const [selectedType, setSelectedType] = useState('categories');
  const [selectedItem, setSelectedItem] = useState({});
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    fetchDropdownData();
  }, []);

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

  const handleAdd = async () => {
    try {
      await axios.post(`http://LAPTOP-LMDOPUS7:8080/drop/add${selectedType}`, { name: itemName });
      alert(`${selectedType} added successfully`);
      fetchDropdownData();
    } catch (error) {
      console.error(`Error adding ${selectedType}:`, error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://LAPTOP-LMDOPUS7:8080/drop/update${selectedType}/${selectedItem.id}`, { name: itemName });
      alert(`${selectedType} edited successfully`);
      fetchDropdownData();
    } catch (error) {
      console.error(`Error editing ${selectedType}:`, error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://LAPTOP-LMDOPUS7:8080/drop/delete${selectedType}/${selectedItem.id}`);
      alert(`${selectedType} deleted successfully`);
      fetchDropdownData();
    } catch (error) {
      console.error(`Error deleting ${selectedType}:`, error);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedType(e.target.value);
    setSelectedItem({});
    setItemName('');
  };

  const handleItemChange = (e) => {
    const itemId = e.target.value;
    const selectedList = getListByType(selectedType);
    const selectedItem = selectedList.find(item => item.id.toString() === itemId);
    setSelectedItem(selectedItem || {});
    setItemName(selectedItem ? selectedItem.name : '');
  };

  const getListByType = (type) => {
    switch (type) {
      case 'categories':
        return categories;
      case 'assetAccounts':
        return assetAccounts;
      case 'incomeAccounts':
        return incomeAccounts;
      case 'expenseAccounts':
        return expenseAccounts;
      case 'preferredVendors':
        return preferredVendors;
      default:
        return [];
    }
  };

  return (
    <div>
      <h1>Dropdown Manager</h1>
      <select onChange={handleSelectChange} value={selectedType}>
        <option value="categories">Categories</option>
        <option value="assetAccounts">Asset Accounts</option>
        <option value="incomeAccounts">Income Accounts</option>
        <option value="expenseAccounts">Expense Accounts</option>
        <option value="preferredVendors">Preferred Vendors</option>
      </select>

      <select onChange={handleItemChange} value={selectedItem.id || ''}>
        <option value="">Select Item</option>
        {getListByType(selectedType).map(item => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleEdit} disabled={!selectedItem.id}>Edit</button>
      <button onClick={handleDelete} disabled={!selectedItem.id}>Delete</button>
    </div>
  );
};

export default DropdownManager;
