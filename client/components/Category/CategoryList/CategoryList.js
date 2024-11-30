"use client";

import React, { useEffect, useState } from "react";
import styles from "./CategoryList.module.css";
import { getAllCategories } from "@/api/categories/actions";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories(); // Ensure this returns the expected response
        if (response.success) {
          setCategories(response.data); // Extract the 'data' array from the response
        } else {
          console.error("Failed to fetch categories:", response.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (categories.length === 0) {
    return <p>No categories found.</p>;
  }

  return (
    <div className={styles.categoryList}>
      <h2 className={styles.category}>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.categoryId}>
            {category.name}
            <hr className={styles.divider} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
