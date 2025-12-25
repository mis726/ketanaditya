# WhatsApp Inquiry Message Format

## Overview
The WhatsApp inquiry feature now sends beautifully formatted, professional B2B inquiry messages with complete product details.

## Message Structure

### 1. **Empty Cart Message**
When no products are selected:
```
*Hello Ketan Aditya Textiles!*

I would like to inquire about your products.

Please share your catalog and pricing details.

Thank you!
```

### 2. **Full Inquiry Message**
When products are added to inquiry:

```
🛍️ B2B INQUIRY - KETAN ADITYA TEXTILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*1. Dori Capri*
   📦 Category: Capri
   🧵 Fabric: Cotton Capri
   📊 Total Quantity: *50 pieces*

   *Size Breakdown:*
   • Size 22/32: 30 pcs
   • Size 34/38: 20 pcs
   💰 Price Range: ₹145, ₹175

*2. GT 144*
   📦 Category: T-Shirt
   🧵 Fabric: Standard
   📊 Total Quantity: *100 pieces*

   *Size Breakdown:*
   • Size 22/32: 100 pcs
   💰 Price Range: ₹150

*3. PGDA 4998*
   📦 Category: Denim Pant
   🧵 Fabric: Standard
   📊 Total Quantity: *75 pieces*

   *Size Breakdown:*
   • Size 22/32: 75 pcs
   💰 Price Range: ₹275

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*📋 SUMMARY*
Total Designs: 3
Total Pieces: *225*

_Please provide your best wholesale rates for the above inquiry._
```

## Features

### ✅ Included Information
- **Design Number**: Product name/code
- **Category**: Product category (Capri, T-Shirt, Pants, etc.)
- **Fabric Type**: Material/subcategory
- **Total Quantity**: Sum of all sizes
- **Size Breakdown**: Detailed quantity per size
- **Price Range**: Available prices for different sizes (if available)
- **Summary**: Total designs and total pieces

### 🎨 Formatting Elements
- **Emojis**: Visual indicators for different sections
- **Bold Text**: Important information like design names and totals
- **Separators**: Clean visual separation using Unicode characters
- **Bullets**: Clear size breakdown listing
- **Italics**: Polite closing message

### 📱 WhatsApp Optimization
- Uses `%0A` for line breaks (WhatsApp URL encoding)
- Proper spacing for readability
- Professional B2B tone
- Mobile-friendly format
- Easy to read on small screens

## Example Use Cases

### Single Product Inquiry
```
🛍️ B2B INQUIRY - KETAN ADITYA TEXTILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*1. Elastic Capri*
   📦 Category: Capri
   🧵 Fabric: Cotton Capri
   📊 Total Quantity: *200 pieces*

   *Size Breakdown:*
   • Size 22/32: 120 pcs
   • Size 34/38: 80 pcs
   💰 Price Range: ₹180, ₹215

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*📋 SUMMARY*
Total Designs: 1
Total Pieces: *200*

_Please provide your best wholesale rates for the above inquiry._
```

### Multiple Products Inquiry
The format scales beautifully for multiple products, with each product clearly separated and all information organized.

## Technical Details

### Code Location
- **File**: `App.tsx`
- **Function**: `handleInquirySubmit()` in `ContactView` component
- **Lines**: ~258-311

### Data Sources
- Product information from `InquiryItem[]`
- Quantities from `Record<string, number>` (size → quantity mapping)
- Product details from `Product` interface
- Price information from `variants` array

### URL Encoding
All special characters are properly encoded for WhatsApp URLs:
- Line breaks: `%0A`
- Bold: `*text*`
- Italic: `_text_`
- Emojis: Direct Unicode characters

## Benefits

1. **Professional Presentation**: Makes a great first impression
2. **Complete Information**: All necessary details in one message
3. **Easy to Process**: Supplier can quickly understand requirements
4. **Mobile Optimized**: Looks great on WhatsApp mobile app
5. **Clear Summary**: Quick overview at the bottom
6. **Size Details**: Exact breakdown for production planning

## Future Enhancements

Potential additions:
- Customer name/company field
- Delivery location
- Expected delivery date
- Special requirements/notes
- Preferred payment terms

---

**Last Updated**: December 23, 2025
**WhatsApp Number**: +91 94797 14198
