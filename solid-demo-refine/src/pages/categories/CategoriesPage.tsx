import React, { useState, useEffect } from "react";
import "./CategoriesPage.css";

interface Category {
  id: string;
  title: string;
  image: string;
  gradient: string;
  isExpanded: boolean;
}

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

  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Note: This API call may fail due to CORS restrictions
      // In a real application, you would need to proxy this request through your backend
      const response = await fetch('https://www.purplle.com/api/v2/shop/category_menu', {
        method: 'GET',
        headers: {
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'en-GB,en;q=0.9',
          'content-type': 'application/x-www-form-urlencoded',
          'is_ssr': 'false',
          'mode_device': 'mobile',
          'ngsw-bypass': 'true',
          'priority': 'u=1, i',
          'referer': 'https://www.purplle.com/wv/categories',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setApiData(data);
        console.log('API Response:', data);
        
        // If API data is available, you could update categories here
        // For now, we'll keep the static categories
      } else {
        console.error('Failed to fetch categories:', response.status);
        setApiError(`API request failed with status: ${response.status}`);
        // Continue with static categories even if API fails
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setApiError('Failed to connect to the API. Using static categories.');
      // Continue with static categories even if API fails
    } finally {
      setLoading(false);
    }
  };

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
    </div>
  );
};

export default CategoriesPage; 