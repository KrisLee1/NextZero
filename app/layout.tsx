import "./globals.css";

import { createBootstrapStorageScript } from "@oriatheme/runtime-dom";
import { Providers } from "@/components/providers";

const bootstrapScript = createBootstrapStorageScript();

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
      <head>
        <script id="oria-theme-bootstrap" dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
      </head>
      <body className="min-h-screen w-full overflow-x-hidden bg-transparent">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
