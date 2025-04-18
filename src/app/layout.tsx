import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import ReactQueryProvider from "@/providers/query-provider";
import ThemeProvider from "@/providers/theme-provider";
import AuthProvider from "@/providers/auth-provider";
import { Toaster } from "@/components/shadcn/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TuneSpace",
  description: "The best music platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-svh`}
      >
        <AuthProvider>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
