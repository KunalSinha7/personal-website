import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function Page() {
    return (
        <div className="flex grow w-full flex-col items-center justify-center min-h-[calc(100vh-80px)] overflow-y-auto py-12">

            {/* Content Container */}
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-6 text-center sm:px-12">

                {/* Avatar with Glow Effect */}
                <div className="relative h-48 w-48 shrink-0 rounded-full shadow-2xl shadow-blue-500/20 sm:h-64 sm:w-64">
                    <div className="absolute -inset-4 rounded-full bg-blue-500/20 blur-xl" />
                    <Image
                        src="/images/Avatar.svg"
                        alt="Kunal Sinha"
                        fill
                        className="relative z-10 rounded-full object-contain p-2 hover:scale-105 transition-transform duration-500"
                        priority
                    />
                </div>

                {/* Hero Text */}
                <div className="flex flex-col gap-6 backdrop-blur-sm">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Kunal Sinha</span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
                        A software developer, tech enthusiast, and leader.
                        Currently building products and leading teams at <span className="text-blue-300 font-semibold">CarGurus</span> in Boston, MA.
                    </p>

                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
                        In my free time, you might find me exploring the city, hacking on projects,
                        reading tech news, or watching soccer games (#HALAMADRID).
                    </p>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 w-full max-w-2xl">
                    <Link
                        href="/work"
                        className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 transition-all hover:bg-white/10 hover:scale-105 border border-white/10 text-left flex flex-col gap-4 no-underline"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <FontAwesomeIcon icon={faBriefcase} className="h-8 w-8 text-blue-400" />
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Work Experience</h3>
                        </div>
                    </Link>

                    <Link
                        href="/education"
                        className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 transition-all hover:bg-white/10 hover:scale-105 border border-white/10 text-left flex flex-col gap-4 no-underline"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <FontAwesomeIcon icon={faGraduationCap} className="h-8 w-8 text-emerald-400" />
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Education</h3>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
