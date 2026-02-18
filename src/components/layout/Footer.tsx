import React from 'react';
import NavbarLink from '../ui/NavbarLink';

/**
 * FOOTER DATA
 * Centralizar los links permite que el componente sea más limpio y fácil de editar.
 */
const INFO_LINKS = [
  { label: 'Talles', href: '#' },
  { label: 'Envíos', href: '#' },
  { label: 'Locales', href: '#locals-section', isScroll: true },
  { label: 'Contacto', href: '#' },
];

const Footer: React.FC = () => {
  
  /**
   * MANEJADOR DE NAVEGACIÓN
   * Mantiene la misma lógica de scroll suave que usamos en el Header.
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isScroll?: boolean) => {
    if (isScroll) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* COLUMNA 1: BRANDING */}
        <div className="md:col-span-2">
          <h2 className="text-4xl font-black tracking-tighter mb-6">PULSE</h2>
          <p className="text-xs text-gray-400 max-w-sm leading-relaxed uppercase tracking-widest">
            Diseñado en Paraná. Calidad premium, cortes contemporáneos y estilo urbano duradero.
          </p>
        </div>

        {/* COLUMNA 2: INFO LINKS (Usando NavbarLink) */}
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-[3px] mb-6 text-white">Info</h4>
          <ul className="flex flex-col space-y-3">
            {INFO_LINKS.map((link) => (
              <li key={link.label}>
                <NavbarLink 
                  href={link.href} 
                  label={link.label} 
                  onClick={(e) => handleNavClick(e, link.href, link.isScroll)}
                  className="text-gray-400 hover:text-white" 
                />
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMNA 3: NEWSLETTER */}
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-[3px] mb-6 text-white">Newsletter</h4>
          <div className="flex border-b border-gray-700 pb-2 group focus-within:border-white transition-colors">
            <input 
              type="email" 
              placeholder="TU@EMAIL.COM" 
              className="bg-transparent text-[10px] outline-none flex-1 placeholder:text-gray-600 font-black tracking-widest text-white"
            />
            <button className="text-[10px] font-black uppercase tracking-[2px] hover:text-gray-400 transition-colors">
              Unirse
            </button>
          </div>
        </div>

      </div>

      {/* COPYRIGHT DINÁMICO */}
      <div className="mt-24 text-center border-t border-gray-900 pt-8">
         <p className="text-[9px] font-black uppercase tracking-[4px] text-gray-600">
           © {new Date().getFullYear()} PULSE. PARANÁ, ENTRE RÍOS.
         </p>
      </div>
    </footer>
  );
};

export default Footer;