import "./globals.css";

import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh"
      className={`h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen w-full overflow-x-hidden bg-transparent">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
