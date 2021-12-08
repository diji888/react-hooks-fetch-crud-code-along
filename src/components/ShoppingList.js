import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect( ()=>{
    fetch("http://localhost:4000/items")
    .then(r => r.json())
    .then(data => setItems(data))
  }, [])

  function handleAddItem(item) {
    setItems([...items, item])
  }

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map( (item) => {
      if (updatedItem.id === item.id) {
        return updatedItem
      } else {
        return item
      }
    });
    setItems(updatedItems)
  }

  function handleDeleteItem(deleteItem) {
    const removedDeletedItem = items.filter((item)=> deleteItem.id !== item.id )
    setItems(removedDeletedItem)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
