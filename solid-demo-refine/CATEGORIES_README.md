# Categories Page

This is a new Categories page implementation based on the Figma design provided. The page features a mobile-first responsive design with four main categories: Skincare, Makeup, Hair Care, and Personal Care.

## Features

- **Mobile-first responsive design** - Optimized for mobile devices with responsive breakpoints
- **Interactive category sections** - Each category can be expanded/collapsed
- **Beautiful gradient backgrounds** - Each category has a unique gradient background
- **Sparkle effects** - Animated sparkle effects on each category section
- **API integration** - Attempts to fetch data from the Purplle API (may fail due to CORS)
- **Accessibility features** - Focus states and reduced motion support
- **Smooth animations** - Hover effects and transitions

## Categories

1. **Skincare** - Light pink gradient with skincare emoji
2. **Makeup** - Vibrant pink gradient with makeup emoji  
3. **Hair Care** - Warm brown gradient with hair care emoji
4. **Personal Care** - Bright pink gradient with personal care emoji

## API Integration

The page attempts to fetch category data from:
```
https://www.purplle.com/api/v2/shop/category_menu
```

**Note**: This API call may fail due to CORS restrictions. In a production environment, you would need to proxy this request through your backend server.

## Usage

Navigate to `/categories` to view the Categories page. The page is accessible through the main navigation menu.

## Technical Details

- Built with React and TypeScript
- Uses CSS for styling with mobile-first responsive design
- Integrates with Refine.js framework
- Follows accessibility best practices
- Includes loading states and error handling

## File Structure

```
src/pages/categories/
├── CategoriesPage.tsx    # Main component
├── CategoriesPage.css    # Styles
└── index.ts             # Exports
```

## Customization

To customize the categories:
1. Modify the `categories` state in `CategoriesPage.tsx`
2. Update the gradients in the CSS file
3. Replace emoji placeholders with actual images
4. Modify the API integration logic as needed 