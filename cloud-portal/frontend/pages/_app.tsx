// frontend/pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '../context/AuthContext'; // ✅ make sure file is named correctly

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      
      <Component {...pageProps} />
    </UserProvider>
  );
}
