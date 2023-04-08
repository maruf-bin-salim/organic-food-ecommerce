import '@/styles/globals.css'
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig as config, app } from '@/database/firebase';


export default function App({ Component, pageProps }) {
  return (
    <FirebaseAppProvider firebaseConfig={config} firebaseApp={app}>
      <Component {...pageProps} />
    </FirebaseAppProvider>
  )
}

