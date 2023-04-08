import { app } from './firebase';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';
import { async } from '@firebase/util';
const database = getFirestore(app);



// Get a list of products from your database
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

// a function to add a product to your database
// takes a product as a parameter
// if the product with the given product id does not exist in the database
// add the product to your database 
// if the product with the given product id already exists in the database
// update the product in your database

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


// a function to remove a product from your database
// takes a product id as a parameter
// remove a product from your database based on its ID
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

export { getAllProducts, upsertProduct, removeProduct, addWishlistedBy, removeWishlistedBy, getWishlistedProducts };