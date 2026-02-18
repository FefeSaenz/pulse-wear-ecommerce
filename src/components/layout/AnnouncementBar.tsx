import React from 'react';

interface AnnouncementBarProps {
  messages: string[];
  speed?: number; // Opcional, para controlar la velocidad
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ messages, speed = 30 }) => {
  return (
    <div className="bg-black text-white py-3 px-6 overflow-hidden relative">
      <div 
        className="flex whitespace-nowrap animate-marquee items-center text-[10px] font-black uppercase tracking-[5px]"
        style={{ animationDuration: `${speed}s` }}
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8">
            {messages.join(' ▪ ')}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;