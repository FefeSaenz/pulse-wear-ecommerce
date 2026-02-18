
import React from 'react';

const LOCATIONS = [
  {
    name: 'PULSE Palermo',
    address: 'Honduras 4825, C1414 Cdad. Autónoma de Buenos Aires',
    hours: 'Lun - Sáb: 10:00 - 20:00',
    phone: '+54 11 1234 5678'
  },
  {
    name: 'PULSE Belgrano',
    address: 'Av. Cabildo 2100, C1428 Cdad. Autónoma de Buenos Aires',
    hours: 'Lun - Sáb: 10:00 - 20:00',
    phone: '+54 11 8765 4321'
  }
];

const LocationsSection: React.FC = () => {
  return (
    <section id="locals-section" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Nuestros Locales</h2>
          <div className="w-12 h-1 bg-black mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-12 order-2 lg:order-1">
            {LOCATIONS.map((loc, idx) => (
              <div key={idx} className="border-l-2 border-gray-100 pl-8 hover:border-black transition-colors">
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">{loc.name}</h3>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-4">{loc.address}</p>
                <div className="space-y-1 text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">
                  <p><i className="fa-regular fa-clock mr-2"></i>{loc.hours}</p>
                  <p><i className="fa-solid fa-phone mr-2"></i>{loc.phone}</p>
                </div>
                <button className="mt-6 text-[9px] font-black uppercase tracking-[3px] border border-black px-6 py-2 hover:bg-black hover:text-white transition-all">
                  Cómo llegar
                </button>
              </div>
            ))}
          </div>

          <div className="h-[450px] bg-gray-100 relative order-1 lg:order-2 overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
            {/* Embedded Google Map focusing on Palermo area for visual context */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d13136.212001712613!2d-58.43577324458008!3d-34.59016149999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb58971f5446f%3A0x7d6b3b55502c40c8!2sPalermo%2C%20CABA!5e0!3m2!1ses-419!2sar!4v1710345678901!5m2!1ses-419!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PULSE Locations Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
