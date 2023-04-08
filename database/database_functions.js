import { app } from './firebase';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';
const database = getFirestore(app);



// Get a list of products from the database
// this function takes a category as a parameter
// if the category is not provided, it will return all products
// if the category is provided, it will return all products that match the category
async function getAllProducts(category) {
    const productsColumn = collection(database, 'products');
    const productsSnapshot = await getDocs(productsColumn);
    const productsList = productsSnapshot.docs.map(documents => documents.data());
    if (category) {
        return productsList.filter(product => product.category === category);
    }
    return productsList;
}

// a function to add a product to the database
// takes a product as a parameter
// if the product with the given product id does not exist in the database
// add the product to the database 
// if the product with the given product id already exists in the database
// update the product in the database

async function upsertProduct(product) {
    const productsCollection = collection(database, 'products');
    const matchingProductsQuery = query(productsCollection, where('id', '==', product.id));
    const matchingProductsSnapshot = await getDocs(matchingProductsQuery);

    if (matchingProductsSnapshot.size === 0) {
        await addDoc(productsCollection, product);
    } else {
        const matchingProductDoc = matchingProductsSnapshot.docs[0];
        await updateDoc(matchingProductDoc.ref, product);
    }
}


// a function to remove a product from the database
// takes a product id as a parameter
// remove a product from the database based on its ID
async function removeProduct(productID) {
    const productsCollection = collection(database, 'products');
    const matchingProductsQuery = query(productsCollection, where('id', '==', productID));
    const matchingProductsSnapshot = await getDocs(matchingProductsQuery);

    if (matchingProductsSnapshot.size === 0) {
        return null;
    }

    const matchingProductDoc = matchingProductsSnapshot.docs[0];
    await deleteDoc(matchingProductDoc.ref);

    return matchingProductDoc.data();
}


// each product has an id, name, price, category, and quantity and also an array named wishlistedBy
// wishlistedBy is an array of user ids that have wishlisted the product
// write a function that takesIn a product id and a user id
// if the user id is not in the wishlistedBy array of the product, add the user id to the array

async function addWishlistedBy(productID, userID) {
    const productsCollection = collection(database, 'products');
    const matchingProductsQuery = query(productsCollection, where('id', '==', productID));
    const matchingProductsSnapshot = await getDocs(matchingProductsQuery);

    if (matchingProductsSnapshot.size === 0) {
        return null;
    }

    const matchingProductDoc = matchingProductsSnapshot.docs[0];
    const productData = matchingProductDoc.data();
    const wishlistedBy = productData.wishlistedBy;
    if (!wishlistedBy.includes(userID)) {
        wishlistedBy.push(userID);
    }
    await updateDoc(matchingProductDoc.ref, { wishlistedBy });
    return matchingProductDoc.data();
}

async function removeWishlistedBy(productID, userID) {
    const productsCollection = collection(database, 'products');
    const matchingProductsQuery = query(productsCollection, where('id', '==', productID));
    const matchingProductsSnapshot = await getDocs(matchingProductsQuery);

    if (matchingProductsSnapshot.size === 0) {
        return null;
    }

    const matchingProductDoc = matchingProductsSnapshot.docs[0];
    const productData = matchingProductDoc.data();
    const wishlistedBy = productData.wishlistedBy;
    if (wishlistedBy.includes(userID)) {
        wishlistedBy.splice(wishlistedBy.indexOf(userID), 1);
    }
    await updateDoc(matchingProductDoc.ref, { wishlistedBy });
    return matchingProductDoc.data();
}

// a function that takes in a user id and returns all products that the user has wishlisted
async function getWishlistedProducts(userID) {
    const productsCollection = collection(database, 'products');
    const matchingProductsQuery = query(productsCollection, where('wishlistedBy', 'array-contains', userID));
    const matchingProductsSnapshot = await getDocs(matchingProductsQuery);
    return matchingProductsSnapshot.docs.map(documents => documents.data());
}

// order = {
//     cart: {
//         products: [
//             {
//                 id: 1,
//                 name: 'Product 1',
//                 price: 100,
//                 image: 'https://picsum.photos/200/300',
//                 category: 'Fruits',
//                 quantity: 5
//             }]
//         ,
//         total: 500,
//     },
//     orderID: "124",
//     orderStatus: "ongoing", // cancelled, ongoing, delivered
//     userID: "123",
//     location: {
//         address: "123, abc street, xyz city",
//         zipcode: "123456",
//         position: { lat: 12.9716, lng: 77.5946 }
//     },
//     deliveryPersonPosition: { lat: 12.9716, lng: 77.5946 },
//     date: "2021-05-02",
//     deliveryStartTime: "2021-05-02 12:30:00",
//     deliveryEndTime: "2021-05-02 13:00:00",
//     orderedBy: "123",
// }

// there is a collection called orders in the database

// write a function that takes in an order and adds it to the orders collection in the database
async function addOrder(order) {
    const ordersCollection = collection(database, 'orders');
    await addDoc(ordersCollection, order);
}

// write a function that takes in an order id and returns the order from the orders collection in the database
async function getOrder(orderID) {
    const ordersCollection = collection(database, 'orders');
    const matchingOrdersQuery = query(ordersCollection, where('orderID', '==', orderID));
    const matchingOrdersSnapshot = await getDocs(matchingOrdersQuery);
    if (matchingOrdersSnapshot.size === 0) {
        return null;
    }
    return matchingOrdersSnapshot.docs[0].data();
}

// write a function that takes in an userID, returns all the orders that the user has placed (userID maps to orderedBy)
async function getOrdersByUser(userID) {
    const ordersCollection = collection(database, 'orders');
    const matchingOrdersQuery = query(ordersCollection, where('orderedBy', '==', userID));
    const matchingOrdersSnapshot = await getDocs(matchingOrdersQuery);
    return matchingOrdersSnapshot.docs.map(documents => documents.data());
}

// write a function that takes in an orderID and updates the orderStatus to status
async function updateOrderStatus(orderID, status) {
    const ordersCollection = collection(database, 'orders');
    const matchingOrdersQuery = query(ordersCollection, where('orderID', '==', orderID));
    const matchingOrdersSnapshot = await getDocs(matchingOrdersQuery);
    if (matchingOrdersSnapshot.size === 0) {
        return null;
    }
    const matchingOrderDoc = matchingOrdersSnapshot.docs[0];
    await updateDoc(matchingOrderDoc.ref, { orderStatus: status });
    return matchingOrderDoc.data();
}


// write a function that takes in an orderID and updates the deliveryPersonPosition to position
async function updateDeliveryPersonPosition(orderID, position) {
    const ordersCollection = collection(database, 'orders');
    const matchingOrdersQuery = query(ordersCollection, where('orderID', '==', orderID));
    const matchingOrdersSnapshot = await getDocs(matchingOrdersQuery);
    if (matchingOrdersSnapshot.size === 0) {
        return null;
    }
    const matchingOrderDoc = matchingOrdersSnapshot.docs[0];
    await updateDoc(matchingOrderDoc.ref, { deliveryPersonPosition: position });
    return matchingOrderDoc.data();
}

// write a function that takes in an orderID and updates the deliveryStartTime to startTime
async function updateDeliveryStartTime(orderID, startTime) {
    const ordersCollection = collection(database, 'orders');
    const matchingOrdersQuery = query(ordersCollection, where('orderID', '==', orderID));
    const matchingOrdersSnapshot = await getDocs(matchingOrdersQuery);
    if (matchingOrdersSnapshot.size === 0) {
        return null;
    }
    const matchingOrderDoc = matchingOrdersSnapshot.docs[0];
    await updateDoc(matchingOrderDoc.ref, { deliveryStartTime: startTime });
    return matchingOrderDoc.data();
}

// write a function that takes in an orderID and updates the deliveryEndTime to endTime
async function updateDeliveryEndTime(orderID, endTime) {
    const ordersCollection = collection(database, 'orders');
    const matchingOrdersQuery = query(ordersCollection, where('orderID', '==', orderID));
    const matchingOrdersSnapshot = await getDocs(matchingOrdersQuery);
    if (matchingOrdersSnapshot.size === 0) {
        return null;
    }
    const matchingOrderDoc = matchingOrdersSnapshot.docs[0];
    await updateDoc(matchingOrderDoc.ref, { deliveryEndTime: endTime });
    return matchingOrderDoc.data();
}



export {
    getAllProducts, upsertProduct, removeProduct, addWishlistedBy, removeWishlistedBy, getWishlistedProducts,
    addOrder, getOrder, getOrdersByUser, updateOrderStatus, updateDeliveryPersonPosition, updateDeliveryStartTime, updateDeliveryEndTime
};