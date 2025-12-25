import { readFileSync, writeFileSync } from 'fs';

// Read both files
const products = JSON.parse(readFileSync('products.json', 'utf8'));
const imageMapping = JSON.parse(readFileSync('progress.txt', 'utf8'));

// Create a map of Sr. No. to Image URL
const imageMap = new Map();
imageMapping.forEach(item => {
    const srNo = item['Sr. No.'];
    let imageUrl = item['Images'] || '';

    // Clean up the URL (trim whitespace)
    imageUrl = imageUrl.trim();

    // Skip placeholder images
    if (imageUrl && !imageUrl.includes('placeholder')) {
        imageMap.set(srNo, imageUrl);
    }
});

// Update products with correct images
let updatedCount = 0;
let notFoundCount = 0;

products.forEach(product => {
    const srNo = product.sr_no;

    if (imageMap.has(srNo)) {
        const newUrl = imageMap.get(srNo);
        const oldUrl = product.image_url;

        if (newUrl !== oldUrl) {
            product.image_url = newUrl;
            updatedCount++;
            console.log(`✅ Updated #${srNo}: ${product.design_name}`);
        }
    } else {
        notFoundCount++;
        console.log(`⚠️  No image found for #${srNo}: ${product.design_name}`);
    }
});

// Write back to file
writeFileSync('products.json', JSON.stringify(products, null, 4), 'utf8');

console.log(`\n${'='.repeat(50)}`);
console.log(`✅ Successfully updated ${updatedCount} products!`);
console.log(`⚠️  ${notFoundCount} products have no specific image mapping`);
console.log(`${'='.repeat(50)}`);
console.log('\nImage mapping from progress.txt applied successfully!');
