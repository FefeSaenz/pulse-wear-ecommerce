import React from 'react';

interface AnnouncementBarProps {
  messages: string[];
  speed?: number; // Opcional, para controlar la velocidad
}

// Subimos el default a 60. Más segundos = recorrido más lento y relajado.
const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ messages, speed = 60 }) => {
  return (
    <div className="bg-black text-white py-3 overflow-hidden relative">
      <div 
        className="flex w-max whitespace-nowrap marquee-container items-center text-[10px] font-black uppercase tracking-[5px]"
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="px-8">
            {messages.join(' ▪ ')}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .marquee-container {
          animation: marquee ${speed}s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;