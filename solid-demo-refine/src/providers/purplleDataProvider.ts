import { DataProvider, BaseRecord } from "@refinedev/core";
import { CategoryMenu, TransformedCategory } from "../types/purplle";

const API_BASE_URL = "https://www.purplle.com/api/v2";

export const purplleDataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    if (resource === "categories") {
      try {
        console.log('Fetching categories from Purplle API...');
        const response = await fetch(`${API_BASE_URL}/shop/category_menu`, {
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

        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CategoryMenu = await response.json();
        console.log('Raw API Response:', data);
        console.log('Response keys:', Object.keys(data));
        console.log('Menus array:', data?.menus);
        console.log('Menus length:', data?.menus?.length);
        
        // Transform the API response to match Refine's expected format
        // Based on the interface, the response has a 'menus' array
        let categories = data?.menus || [];
        
        // Fallback: if menus is not available, try other possible keys
        if (!categories || categories.length === 0) {
          console.log('No menus found, trying alternative keys...');
          const anyData = data as any;
          categories = anyData?.data?.categories || anyData?.categories || anyData?.data || [];
        }
        
        console.log('Categories to transform:', categories);
        const transformedData: TransformedCategory[] = categories.map((category, index) => ({
          id: category.id || index.toString(),
          title: category.name || `Category ${index + 1}`,
          image: category.image || category.mobile_image || "🛍️",
          gradient: getRandomGradient(),
          isExpanded: false,
          description: category.description,
          url: category.url,
          is_active: category.is_active,
          order_seq: category.order_seq,
          mobile_image: category.mobile_image,
          block: category.block,
          font_color: category.font_color,
          font_weight: category.font_weight,
          bg_color: category.bg_color,
          desktop_url: category.desktop_url,
          deeplink: category.deeplink,
          child: category.child || [],
        }));

        console.log('Transformed data:', transformedData);
        console.log('Total categories:', transformedData.length);
        
        return {
          data: transformedData as any,
          total: transformedData.length,
        };
      } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
    }

    // For other resources, you can implement as needed
    throw new Error(`Resource ${resource} not supported`);
  },

  getOne: async ({ resource, id, meta }) => {
    if (resource === "categories") {
      // For individual category, you might need a different endpoint
      // For now, we'll return a mock response
      const categoryData = {
        id,
        title: `Category ${id}`,
        image: "🛍️",
        gradient: getRandomGradient(),
        isExpanded: false,
      };
      return {
        data: categoryData as any,
      };
    }
    throw new Error(`Resource ${resource} not supported`);
  },

  create: async ({ resource, variables, meta }) => {
    // Implement if needed for creating categories
    throw new Error(`Create operation not supported for ${resource}`);
  },

  update: async ({ resource, id, variables, meta }) => {
    // Implement if needed for updating categories
    throw new Error(`Update operation not supported for ${resource}`);
  },

  deleteOne: async ({ resource, id, meta }) => {
    // Implement if needed for deleting categories
    throw new Error(`Delete operation not supported for ${resource}`);
  },

  getApiUrl: () => {
    return API_BASE_URL;
  },

  custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
    // Handle custom requests
    throw new Error("Custom requests not supported");
  },
};

// Helper function to generate random gradients
function getRandomGradient(): string {
  const gradients = [
    "linear-gradient(135deg, #ffb3d9 0%, #ff8ab3 100%)",
    "linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)",
    "linear-gradient(135deg, #d2b48c 0%, #a0522d 100%)",
    "linear-gradient(135deg, #87ceeb 0%, #4682b4 100%)",
    "linear-gradient(135deg, #98fb98 0%, #32cd32 100%)",
    "linear-gradient(135deg, #dda0dd 0%, #9932cc 100%)",
    "linear-gradient(135deg, #f0e68c 0%, #daa520 100%)",
    "linear-gradient(135deg, #ffa07a 0%, #ff6347 100%)",
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
} 