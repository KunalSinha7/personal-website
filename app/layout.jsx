import Image from 'next/image';
import '../styles/globals.css';
import { Footer } from '../components/footer';

export const metadata = {
    title: {
        template: '%s | Kunal Sinha',
        default: 'Kunal Sinha'
    },
    description: 'Personal website of Kunal Sinha, a Full-Stack Software Engineer.'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className="antialiased text-white bg-slate-950">
                {/* Global Background */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <Image
                        src="/images/bg2.webp"
                        alt="Background"
                        fill
                        className="object-cover opacity-70 blur-sm scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/50 to-slate-950/90" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col min-h-screen">
                    <main className="grow flex flex-col">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
