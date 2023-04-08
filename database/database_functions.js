import { app } from './firebase';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';
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


export { getAllProducts, upsertProduct, removeProduct };