const  categoryItems = [
    { value: "Electronics", label: "Electronics" },
    { value: "Sound", label: "Sound" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Mathematics", label: "Mathematics" },
  ];

  const sizes = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
  ];

  const taginitialState = [
    { value: "new-arrival", label: "New Arrival" },
    { value: "sale", label: "Sale" },
    { value: "best-seller", label: "Best Seller" },
    { value: "limited-edition", label: "Limited Edition" },
    { value: "exclusive", label: "Exclusive" },
  ];

  const colors = [
    { value: "Black", label: "Black" },
    { value: "White", label: "White" },
    { value: "Red", label: "Red" },
    { value: "Blue", label: "Blue" },
    { value: "Green", label: "Green" },
  ];

  // const columns = [
  //   {name: "Product", uid: "Product"},
  //   {name: "Category", uid: "Category"},
  //   {name: "STATUS", uid: "status"},
  //   {name: "ACTIONS", uid: "actions"},
  // ];
  const columns = [
    {Product: "Product", uid: "Product"},
    {Product: "Category", uid: "Category"},
    {Product: "Brand", uid: "Brand"},
    {Product: "ACTIONS", uid: "actions"},
  ];


  export {categoryItems,sizes,taginitialState,colors,columns};