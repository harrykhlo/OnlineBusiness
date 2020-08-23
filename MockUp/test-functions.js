const customers = [{id: 1, name: "CustomerName1Modified", address: "CustomerAddress1Modified", sales: Array(0)},
{id: 2, name: "CustomerName2", address: "CustomerAddress2", sales: Array(0)},
{id: 3, name: "testPostFirstName1", address: "testPostAddress1", sales: Array(0)},
{id: 4, name: "testPostFirstName2", address: "testPostAddress2", sales: Array(0)}]

const products = [{id: 1, name: "ProductName1Modified", price: 10000, sales: Array(0)},
{id: 2, name: "ProductName2", price: 2, sales: Array(0)},
{id: 3, name: "ProductName3", price: 3, sales: Array(0)},
{id: 4, name: "ProductName4", price: 4, sales: Array(0)}]

const stores = [{id: 1, name: "StoreName1Modified", address: "StoreAddress1Modified", sales: Array(0)},
{id: 2, name: "StoreName2Modified", address: "StoreAddress2Modified", sales: Array(0)},
{id: 3, name: "TestStoreName1", address: "TestStoreAddress1", sales: Array(0)},
{id: 4, name: "TestStoreName2", address: "TestStoreAddress2", sales: Array(0)}]

const sales = [{id: 1, productId: 1, customerId: 1, storeId: 1, dateSold: "2020-08-21T00:00:00"},
{id: 2, productId: 2, customerId: 2, storeId: 2, dateSold: "2020-08-20T00:00:00"},
{id: 5, productId: 3, customerId: 3, storeId: 3, dateSold: "2020-07-19T00:00:00"},
{id: 6, productId: 3, customerId: 1, storeId: 2, dateSold: "2020-07-18T00:00:00"}]


console.log(customers)
console.log(products)
console.log(stores)
console.log(sales)

trial = sales.map((sale) => {return sale.id})
console.log(trial)

getStoreById = (storeId) => stores.find(store => store.id === storeId)
console.log(getStoreById(sales[1].storeId).name)
getProductById = (productId) => products.find(product => product.id === productId)
console.log(getProductById(sales[1].productId).name)
getCustomerById = (customerId) => customers.find(customer => customer.id === customerId)
console.log(getCustomerById(sales[1].customerId).name)

convertedSales = () => sales.map((sale) => {return{productName: getProductById(sale.productId).name, customerName: getCustomerById(sale.customerId).name, storeName: getStoreById(sale.storeId).name, dateSold: sale.dateSold}} )
console.log(convertedSales())