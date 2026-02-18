import React from 'react';

interface NavbarLinkProps {
  href: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ href, label, onClick, className = "" }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`text-[11px] font-bold uppercase tracking-widest text-gray-800 hover:text-gray-500 transition-colors ${className}`}
    >
      {label}
    </a>
  );
};

export default NavbarLink;