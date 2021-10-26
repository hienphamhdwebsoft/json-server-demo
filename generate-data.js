const faker = require('faker');
const fs = require('fs'); // File system of NodeJS

// Set locale to use Vietnamese
faker.locale = 'vi';

// Random data
// console.log(faker.name.firstName());
// console.log(faker.name.lastName());
// console.log(faker.image.imageUrl());
// console.log(faker.phone.phoneNumber());
// console.log(faker.address.cityName());

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];
  // Loop and push category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });
  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];
  const productList = [];
  // Random data
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categorId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
      };
      productList.push(product);
    });
  }
  return productList;
};

// IIFE
(() => {
  // Random data
  const categoryList = randomCategoryList(5);
  const productList = randomProductList(categoryList, 5);

  // Prepare db object
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: 'Po',
    },
  };

  //   Overwrite data of db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate successfully!');
  });
})();
