import React, { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { TransformedCategory } from "../../types/purplle";
import "./CategoriesPage.css";

// Using the TransformedCategory interface from types
type Category = TransformedCategory;

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "skincare",
      title: "Skincare",
      image: "🧴",
      gradient: "linear-gradient(135deg, #ffb3d9 0%, #ff8ab3 100%)",
      isExpanded: false,
    },
    {
      id: "makeup",
      title: "Makeup",
      image: "💄",
      gradient: "linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)",
      isExpanded: false,
    },
    {
      id: "haircare",
      title: "Hair Care",
      image: "💇‍♀️",
      gradient: "linear-gradient(135deg, #d2b48c 0%, #a0522d 100%)",
      isExpanded: false,
    },
    {
      id: "personalcare",
      title: "Personal Care",
      image: "🛁",
      gradient: "linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)",
      isExpanded: false,
    },
  ]);

  // Use custom hook to fetch categories from the API
  const { categories: apiCategories, loading, error: apiError, rawData: apiData } = useCategories();

  // Update categories with API data when available
  React.useEffect(() => {
    if (apiCategories && apiCategories.length > 0) {
      const transformedCategories = apiCategories.map((category: any) => ({
        id: category.id,
        title: category.title,
        image: category.image,
        gradient: category.gradient,
        isExpanded: false,
      }));
      setCategories(transformedCategories);
    }
  }, [apiCategories]);

  const toggleCategory = (categoryId: string) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? { ...category, isExpanded: !category.isExpanded }
          : category
      )
    );
  };

  if (loading) {
    return (
      <div className="categories-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>Categories</h1>
        {apiError && (
          <div className="api-error">
            <small>{apiError}</small>
          </div>
        )}
      </div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      
      <div className="categories-container">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-section ${category.isExpanded ? 'expanded' : ''}`}
            style={{ background: category.gradient }}
            onClick={() => toggleCategory(category.id)}
          >
            <div className="category-content">
              <div className="category-left">
                <h2 className="category-title">{category.title}</h2>
                <div className={`dropdown-icon ${category.isExpanded ? 'expanded' : ''}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="category-right">
                <div className="category-image">
                  <div className="image-placeholder">
                    <span className="category-emoji">{category.image}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sparkle-effects">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="sparkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                ></div>
              ))}
            </div>
            
            {category.isExpanded && (
              <div className="category-details">
                <div className="details-content">
                  <p>Explore our {category.title.toLowerCase()} collection</p>
                  <button className="explore-button">Explore Now</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {apiData && (
        <div>
          <h1>API Data</h1>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage; 