const validateProductData = (data,imageUrl) => {
    const errors = [];
  
    if (!data.title || typeof data.title !== 'string' || data.title.length < 2 || data.title.length > 255) {
      errors.push('Product title is required and must be between 2 and 255 characters.');
    }
  
    if (!data.description || typeof data.description !== 'string') {
      errors.push('Product description is required.');
    }
  
    if (typeof data.price !== 'number' || data.price < 0) {
      errors.push('Product price is required and must be a non-negative number.');
    }
  
    if (!data.category || typeof data.category !== 'string') {
      errors.push('Product category is required.');
    }
  
    if (!data.brand || typeof data.brand !== 'string') {
      errors.push('Product brand is required.');
    }
  
    if (typeof data.inventory !== 'number' || data.inventory < 0) {
      errors.push('Product inventory is required and must be a non-negative number.');
    }
  
    if (!imageUrl || typeof imageUrl !== 'string') {
      errors.push('Product image URL is required.');
    }
  
    if (data.ratings !== undefined && (typeof data.ratings !== 'number' || data.ratings < 0 || data.ratings > 5)) {
      errors.push('Product ratings must be a number between 0 and 5.');
    }
  
    if (!data.size || !['XS', 'S', 'M', 'L', 'XL'].includes(data.size)) {
      errors.push('Product size is required and must be one of "XS", "S", "M", "L", "XL".');
    }
  
    if (!data.color || typeof data.color !== 'string') {
      errors.push('Product color is required.');
    }
  
    // if (data.variants && !Array.isArray(data.variants)) {
    //   errors.push('Product variants must be an array.');
    // }
  
    if (data.tags && !Array.isArray(data.tags)) {
      errors.push('Product tags must be an array.');
    }
  
    return errors;
  };

  export {validateProductData};