import { useProducts } from '@/hooks/useProducts';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/Admin.module.css';

import { upsertProduct, removeProduct } from '@/database/database_functions';
import { useRouter } from 'next/router';

function EditableProduct({ product: passedProduct, setIsLoading }) {

    const router = useRouter();


    const [product, setProduct] = useState(passedProduct);

    function handleNameChange(event) {
        setProduct({
            ...product,
            name: event.target.value,
        });
    }

    function handlePriceChange(event) {

        if (isNaN(event.target.value)) {
            return;
        }
        if (event.target.value === "") {
            setProduct({
                ...product,
                price: 0,
            });
            return;
        }


        if (event.target.value.startsWith("0") && event.target.value !== "0") {
            setProduct({
                ...product,
                price: event.target.value.substring(1),
            });
            return;
        }

        setProduct({
            ...product,
            price: event.target.value,
        });


    }



    function handleImageChange(event) {
        setProduct({
            ...product,
            image: event.target.value,
        });
    }

    function handleCategoryChange(event) {
        setProduct({
            ...product,
            category: event.target.value,
        });
    }

    async function handleSave() {
        setIsLoading(true);
        await upsertProduct(product);
        router.reload();
    }

    async function handleDelete() {
        setIsLoading(true);
        await removeProduct(product.id);
        router.reload();
    }



    return (
        <div className={styles.product} key={product.id}>
            <div className={styles.productImage}>
                <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.productName}>{product.name} ({product?.category})</div>
            <div className={styles.productPrice}>${product.price}</div>
            <div className={styles.inputs}>
                <label>
                    Name
                </label>
                <input type="text" value={product.name} onChange={handleNameChange} />
                <label>
                    Price
                </label>
                <input type="text" value={product.price} onChange={handlePriceChange} />
                <label>
                    Image
                </label>
                <input type="text" value={product.image} onChange={handleImageChange} />
                <label>
                    Category
                </label>
                <input type="text" value={product.category} onChange={handleCategoryChange} />

                <label>
                    Description
                </label>
                <input value={product.description} onChange={(event) => {
                    setProduct({
                        ...product,
                        description: event.target.value,
                    });
                }} />
            </div>

            <div className={styles.buttons}>
                <button className={styles.saveButton} onClick={handleSave}  >Save</button>
                <button className={styles.deleteButton} onClick={handleDelete} >Delete</button>
            </div>
        </div>

    )

}

function AddNewProduct({ setIsLoading }) {

    const [product, setProduct] = useState({});
    const router = useRouter();



    useEffect(() => {

        let uniqueIDOfString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        setProduct({
            id: uniqueIDOfString,
            name: "",
            price: "0",
            image: "",
            category: "",
            wishlistedBy: [],
        })
    }, [])


    function handleNameChange(event) {
        setProduct({
            ...product,
            name: event.target.value,
        });
    }


    function handlePriceChange(event) {

        if (isNaN(event.target.value)) {
            return;
        }
        if (event.target.value === "") {
            setProduct({
                ...product,
                price: 0,
            });
            return;
        }


        if (event.target.value.startsWith("0") && event.target.value !== "0") {
            setProduct({
                ...product,
                price: event.target.value.substring(1),
            });
            return;
        }

        setProduct({
            ...product,
            price: event.target.value,
        });


    }


    function handleImageChange(event) {
        setProduct({
            ...product,
            image: event.target.value,
        });
    }

    function handleCategoryChange(event) {
        setProduct({
            ...product,
            category: event.target.value,
        });
    }

    async function handleSave() {
        setIsLoading(true);
        await upsertProduct(product);
        router.reload();
    }

    return (
        <div
            style={{
                marginBottom: '40px',

            }}
        >
            <h1
                style={{
                    textAlign: 'center',
                    width: 'max-content',
                    margin: '0 auto'
                }}
            >
                Add New Product</h1>
            <div className={styles.product} key={product.id}>
                <div className={styles.productImage}>
                    <img src={product.image} alt={product.name} />
                </div>
                <div className={styles.productName}>{product.name} {product.category ? `(${product.category})` : ""}</div>
                <div className={styles.productPrice}>${product.price}</div>
                <div className={styles.inputs}>
                    <label>
                        Name
                    </label>
                    <input type="text" value={product.name} onChange={handleNameChange} />
                    <label>
                        Price
                    </label>
                    <input type="text" value={product.price} onChange={handlePriceChange} />
                    <label>
                        Image
                    </label>
                    <input type="text" value={product.image} onChange={handleImageChange} />
                    <label>
                        Category
                    </label>
                    <input type="text" value={product.category} onChange={handleCategoryChange} />
                    <label>
                        Description
                    </label>
                    <input value={product.description} onChange={(event) => {
                        setProduct({
                            ...product,
                            description: event.target.value,
                        });
                    }} />
                </div>
                <div className={styles.buttons}>
                    <button className={styles.saveButton} onClick={handleSave}>Save</button>
                </div>
            </div>

            <h1
                style={{
                    textAlign: 'center',
                    width: 'max-content',
                    margin: '30px auto'
                }}
            >
                Update Existing Products</h1>
        </div>

    )

}

function ProductManager({ logout }) {

    const { products } = useProducts();

    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) {
        return <div className={styles.page}>Loading...</div>
    }

    return (
        <div className={styles.page}>
            <div className={styles.logout} onClick={logout}>Log Out</div>
            <div className={styles.products}>
                <AddNewProduct
                    setIsLoading={setIsLoading}
                />
                {
                    products?.map((product) => (
                        <EditableProduct
                            setIsLoading={setIsLoading}
                            key={product.id} product={product} />
                    ))
                }
            </div>

        </div>
    );
}



function AdminPage() {
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const adminLoggedIn = localStorage.getItem('adminLoggedIn');
        setIsLoggedIn(adminLoggedIn === 'true');
    }, []);

    const handlePasswordChange = (event) => {
        setError(null);
        setPassword(event.target.value);
    };

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();
        if (password !== '12345') {
            setError('Incorrect password');
            return;
        }
        localStorage.setItem('adminLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    const handleLogoutButtonClick = () => {
        localStorage.removeItem('adminLoggedIn');
        setIsLoggedIn(false);
    };


    if (isLoggedIn) {
        return (
            <ProductManager logout={handleLogoutButtonClick} />
        );
    }

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#f5f5f5',
        }}>
            <label htmlFor="password"
                style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                }}

            >Enter password To Login As Admin</label>
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}

                style={{
                    fontSize: '20px',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid black',
                }}

            />
            {error &&
                <p style={{
                    color: 'red',
                    fontSize: '20px',
                    fontWeight: 'bold',
                }} >
                    {error}
                </p>
            }
            <button onClick={handleLoginFormSubmit}
                style={{
                    fontSize: '20px',
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: '#73b651',
                    color: 'white',
                }}
            >Login
            </button>
        </div>
    );



}

export default AdminPage;
