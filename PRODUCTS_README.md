# Product Data Management

## Overview
Product data is now stored in a separate JSON file (`products.json`) for easier management and updates.

## How to Update Products

### Adding New Products
1. Open `products.json`
2. Add a new product object to the array with the following structure:
```json
{
  "sr_no": 225,
  "category": "Category Name",
  "subcategory": "Subcategory Name",
  "design_name": "Product Design Name",
  "variants": [
    { "size": "22/32", "price": 150.0 },
    { "size": "34/38", "price": 180.0 }
  ],
  "prints_colour": "Prints or Colour",
  "style": "Core or Fancy",
  "image_url": "https://example.com/image.jpg"
}
```

### Editing Existing Products
1. Open `products.json`
2. Find the product by `sr_no` or `design_name`
3. Update the desired fields (price, category, image_url, etc.)
4. Save the file

### Removing Products
1. Open `products.json`
2. Find and delete the entire product object
3. Save the file

## Field Descriptions

- **sr_no**: Unique serial number for the product (must be unique)
- **category**: Main product category (e.g., "Capri", "Set", "Tops(T-shirt)", "Skirts", "Denim Pants")
- **subcategory**: Product subcategory (e.g., "Cotton Capri", "Lycra Capri", "Standard")
- **design_name**: Product design name/code
- **variants**: Array of size-price combinations
  - **size**: Size range (e.g., "22/32", "34/38")
  - **price**: Price for that size variant
- **prints_colour**: "Prints", "Colour", or "Print"
- **style**: "Core" or "Fancy" (Fancy products are marked as new arrivals)
- **image_url**: URL to the product image

## Important Notes

- The application automatically loads data from `products.json` on startup
- No code changes are needed when updating product data
- Make sure the JSON is valid (use a JSON validator if needed)
- The first variant's price is used as the default display price
- Products with `style: "Fancy"` are automatically marked as "New Arrivals"

## Example Workflow

To add a new product:
1. Copy an existing product object from `products.json`
2. Paste it at the end of the array (before the closing `]`)
3. Update all fields with the new product information
4. Ensure you add a comma after the previous product entry
5. Save the file
6. Refresh the application to see changes
