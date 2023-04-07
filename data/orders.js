
let orders = [
    {
        date: "2021-05-01",
        cart: {
            products: [
                {
                    id: 1,
                    name: 'Product 1',
                    price: 100,
                    image: 'https://picsum.photos/200/300',
                    category: 'Fruits',
                    quantity: 1
                },
                {
                    id: 2,
                    name: 'Product 2',
                    price: 200,
                    image: 'https://picsum.photos/200/300',
                    category: 'Vegetables',
                    quantity: 1
                },
            ],
            total: 300,
        },
        orderID: "123",
        orderStatus: "cancelled", // cancelled, ongoing, delivered
        userID: "123",
        location: {
            address: "123, abc street, xyz city",
            zipcode: "123456",
            position: { lat: 12.9716, lng: 77.5946 }
        }
    },
    {
        date: "2021-05-02",
        cart: {
            products: [
                {
                    id: 1,
                    name: 'Product 1',
                    price: 100,
                    image: 'https://picsum.photos/200/300',
                    category: 'Fruits',
                    quantity: 5
                }]
            ,
            total: 500,
        },
        orderID: "124",
        orderStatus: "ongoing", // cancelled, ongoing, delivered
        userID: "123",
        location: {
            address: "123, abc street, xyz city",
            zipcode: "123456",
            position: { lat: 12.9716, lng: 77.5946 }
        }
    },
    {
        date: "2021-05-03",
        cart: {
            products: [
                {
                    id: 1,
                    name: 'Product 1',
                    price: 100,
                    image: 'https://picsum.photos/200/300',
                    category: 'Fruits',
                    quantity: 1
                },
                {
                    id: 2,
                    name: 'Product 2',
                    price: 200,
                    image: 'https://picsum.photos/200/300',
                    category: 'Vegetables',
                    quantity: 1
                },
            ],
            total: 300,
        },
        orderID: "125",
        orderStatus: "delivered", // cancelled, ongoing, delivered
        userID: "123",
        location: {
            address: "123, abc street, xyz city",
            zipcode: "123456",
            position: { lat: 12.9716, lng: 77.5946 }
        }
    },

];


export { orders }