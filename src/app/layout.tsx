import React from 'react';

export const metadata = {
  title: 'NextDoor Mart',
  description: 'Welcome to NextDoor Mart',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
