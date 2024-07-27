import Link from 'next/link';

const HEADER_OPTIONS = [
  { key: 'home', label: 'Home', icon: '', href: '/home' },
  { key: 'upload', label: 'Upload', icon: '', href: '/home/upload' },
  { key: 'profile', label: 'Profile', icon: '', href: '/home/profile' },
];

export const Header = () => {
  return (
    <nav
      className='flex items-center justify-between px-8 min-h-16'
      aria-label='Main Navigation'
    >
      <Link href='/home'>Uploader</Link>
      <div className='flex items-center gap-x-4'>
        {HEADER_OPTIONS.map((opt) => (
          <Link key={opt.key} href={opt.href}>
            {opt.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
