import Link from "next/link";

const footerLinks = [
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Contact Support", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background px-5 py-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
      <div className="text-center md:text-left">
        <p className="text-lg font-bold text-primary">Lumina Library</p>
        <p className="text-foreground/60">
          &copy; {new Date().getFullYear()} Lumina Library. All rights reserved.
        </p>
      </div>

      <ul className="flex items-center gap-6 text-foreground/60">
        {footerLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="hover:text-primary transition">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
