import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/KunalSinha7/', icon: faGithub },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/kunalsinha98/', icon: faLinkedin },
    { name: 'Twitter', href: 'https://twitter.com/sinhaRMA', icon: faTwitter },
    { name: 'Resume', href: 'https://drive.google.com/open?id=1Ug2UJG2EeNNkOuP84khJy2Krdp5IG_hv', icon: faFileLines }
];

export function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Kunal Sinha. All rights reserved.
                </p>
                <div className="flex gap-6">
                    {socialLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 transition-all hover:text-white hover:scale-110"
                            aria-label={item.name}
                        >
                            <FontAwesomeIcon icon={item.icon} className="h-6 w-6" />
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
