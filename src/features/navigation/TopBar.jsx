import React from 'react';

const TopBar = () => (
  <nav className="fixed top-0 left-0 w-full z-[100] px-12 py-6 flex justify-between items-center backdrop-blur-md border-b border-[#997B30]/10">
    <div className="font-mono text-[#997B30] text-xl tracking-tighter">
      &lt; DEV.WEB /&gt;
    </div>
    <div className="flex items-center gap-10">
      {['L\'Artisan', 'Le Coffre', 'Les Dossiers'].map((item, i) => (
        <a key={i} href={`#${['hero', 'stack', 'projects'][i]}`} className="text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-[#997B30] transition-colors">
          {item}
        </a>
      ))}
      <a href="#contact" className="px-6 py-2 border border-[#997B30] text-[#997B30] text-[10px] uppercase tracking-[0.3em] hover:bg-[#997B30] hover:text-black transition-all">
        Dépêche
      </a>
    </div>
  </nav>
);

export default TopBar;