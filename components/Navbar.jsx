import Image from 'next/image';
import logo from '@/assets/logo/logo.png';
import Link from 'next/link';

const links = [
  { label: 'sod', href: '/sod' },
  { label: 'about', href: '/about' },
  { label: 'videos', href: '/videos' },
  { label: 'my account', href: '/myAccount' },
  { label: 'cart', href: '/cart' },
  { label: 'need Help?', href: '/needhelp' },
];

const Navbar = () => {
  return (
    <nav>
      <div className="text-center">
        <Link href="/" className="inline-block">
          <Image width={400} src={logo} priority alt='sodinstalled.com'/>
        </Link>
      </div>

      <ul className="flex flex-col md:flex-row justify-center gap-5 bg-blue-700 text-white py-5">
        {links.map((item) => (
          <Link href={item.href} key={item.label} className="uppercase text-xl">
            {item.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
