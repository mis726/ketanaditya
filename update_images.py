import json

# Read the products.json file
with open('products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Image mapping based on category and style
def get_image_url(product):
    category = product.get('category', '')
    style = product.get('style', '')
    
    # Alines
    if category == 'Aline':
        return 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Long%20Top%20Alines/Aline__Far.webp'
    
    # Capri
    if category == 'Capri':
        if style == 'Core':
            return 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Core%20Capri/Capri__CHS.webp'
    
    if category == 'Fancy Capri':
        return 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Fancy%20Capri/Capri_Denim%20_Cadd%2032%20no.webp'
    
    # Shorts
    if category == 'Shorts':
        if style == 'Core':
            return 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Core%20Shorts/Bloomer__BFC.webp'
    
    if category == 'Denim Shorts':
        return 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Fancy%20Shorts/Shorts_Denim_DSC3.webp'
    
    # Skirts
    if category == 'Skirts':
        if style == 'Core':
            return 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Core%20Skirts/Skirt__Box%20Seemar.webp'
        elif style == 'Fancy':
            return 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Fancy%20Skirts/Skirt_Denim_SDMS819.webp'
    
    if category == 'Denim Skirts':
        return 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Fancy%20Skirts/Skirt_Denim_SDMS819.webp'
    
    # Tops
    if category == 'Tops(T-shirt)':
        if style == 'Fancy':
            return 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Fancy%20Tops/Top__DT288.webp'
        # Note: No Core Tops in current data, but adding for completeness
        elif style == 'Core':
            return 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Core%20Tops/Top__GT144.webp'
    
    if category == 'Denim Top':
        return 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Fancy%20Tops/Top__DT288.webp'
    
    # Pants / Full Bottom
    if category == 'Denim Pants':
        return 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Fancy%20Full%20Bottom/Pant_Denim_Denim%20Basic%20Jegging.webp'
    
    # Sets - using Core Tops as default for now
    if category == 'Set':
        if style == 'Core':
            return 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Core%20Tops/Top__GT144.webp'
        elif style == 'Fancy':
            return 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Fancy%20Tops/Top__DT288.webp'
    
    # Default fallback (shouldn't reach here)
    return product.get('image_url', '')

# Update all products
updated_count = 0
for product in products:
    old_url = product.get('image_url', '')
    new_url = get_image_url(product)
    
    if new_url and new_url != old_url:
        product['image_url'] = new_url
        updated_count += 1
        print(f"Updated {product['design_name']} ({product['category']}, {product['style']})")

# Write back to file
with open('products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=4, ensure_ascii=False)

print(f"\n✅ Successfully updated {updated_count} products!")
print("Image mapping complete!")
