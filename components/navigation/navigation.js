import { useRouter } from 'next/router';
import React from 'react'
import styles from './navigation.module.css'


const Navigation = ({ setIsNavOpen }) => {
    const router = useRouter();


    return (
        <div className={styles.page}>
            <div className={styles.navCloseContainer}>
                <div className={styles.navClose} onClick={() => { setIsNavOpen(false) }} />
            </div>

            <div className={styles.navLinks}>
                <div className={styles.navLink}
                    onClick={() => { router.push('/') }}
                >
                    <div className={styles.navLinkText}>Home</div>
                </div>

                <div className={styles.navLink}
                    onClick={() => { router.push('/store') }}
                >
                    <div className={styles.navLinkText}>store</div>
                </div>

                <div className={styles.navLink}
                    onClick={() => { router.push('/cart') }}
                >
                    <div className={styles.navLinkText}>Cart</div>
                </div>

                <div className={styles.navLink}
                    onClick={() => { router.push('/shopping-list') }}
                >
                    <div className={styles.navLinkText}>Shopping List</div>
                </div>

                <div className={styles.navLink}
                    onClick={() => { router.push('/orders') }}
                >
                    <div className={styles.navLinkText}>Orders</div>
                </div>
            </div>
        </div>
    )
}

export default Navigation