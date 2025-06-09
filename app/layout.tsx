import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WalletContextProvider } from '@/components/wallet/WalletContextProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Solana Gaming Prizes - Chess & Poker',
  description: 'Skill-based gaming platform with prize competitions on Solana',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletContextProvider>
          {children}
          <Toaster position="top-right" />
        </WalletContextProvider>
      </body>
    </html>
  );
}