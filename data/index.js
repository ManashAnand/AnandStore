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
    {Product: "STATUS", uid: "status"},
    {Product: "ACTIONS", uid: "actions"},
  ];
  
  const users = [
    {
      id: 1,
      Product: "Tony Reichert",
      Category: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      email: "tony.reichert@example.com",
    },
    {
      id: 2,
      Product: "Zoey Lang",
      Category: "Technical Lead",
      team: "Development",
      status: "paused",
      age: "25",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      email: "zoey.lang@example.com",
    },
    {
      id: 3,
      Product: "Jane Fisher",
      Category: "Senior Developer",
      team: "Development",
      status: "active",
      age: "22",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      email: "jane.fisher@example.com",
    },
    {
      id: 4,
      Product: "William Howard",
      Category: "Community Manager",
      team: "Marketing",
      status: "vacation",
      age: "28",
      avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
      email: "william.howard@example.com",
    },
    {
      id: 5,
      Product: "Kristen Copper",
      Category: "Sales Manager",
      team: "Sales",
      status: "active",
      age: "24",
      avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
      email: "kristen.cooper@example.com",
    },
  ];
  

  export {categoryItems,sizes,taginitialState,colors,columns,users};