import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import { useRouter } from 'next/router';
import React from 'react'
import styles from './navigation.module.css'


const Navigation = ({ setIsNavOpen }) => {
    const router = useRouter();
    const { logOut, user } = useFirebaseAuth();


    return (
        <div className={styles.page}>
            <div className={styles.navCloseContainer}>
                <div className={styles.navClose} onClick={() => { setIsNavOpen(false) }} />
            </div>




            <div className={styles.navLinks}>

                <div className={styles.navLink}
                    style={{
                        backgroundColor: 'white',
                        color: 'black',
                        marginBottom: '10px',
                    }}
                >
                    <div className={styles.navLinkText}>{user?.email}</div>
                </div>

                <div className={styles.navLink}
                    onClick={() => { router.push('/') }}
                >
                    <div className={styles.navLinkText}>Home</div>
                </div>

                <div className={styles.navLink}
                    onClick={() => { router.push('/store') }}
                >
                    <div className={styles.navLinkText}>Organic Shop</div>
                </div>

                <div className={styles.navLink}
                    onClick={() => { router.push('/cart') }}
                >
                    <div className={styles.navLinkText}>My Cart</div>
                </div>

                <div className={styles.navLink}
                    onClick={() => { router.push('/saved-list') }}
                >
                    <div className={styles.navLinkText}>Saved List</div>
                </div>

                <div className={styles.navLink}
                    onClick={() => { router.push('/orders') }}
                >
                    <div className={styles.navLinkText}>Shopping List</div>
                </div>

                <div className={styles.navLink}
                    onClick={async () => { await logOut(); router.push('/'); }}
                >
                    <div className={styles.navLinkText}>Log out</div>
                </div>
            </div>
        </div>
    )
}

export default Navigation