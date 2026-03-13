import React from 'react';
import profileImg from '../../assets/image1.png';

const ProfilePhoto = () => {
  return (
    <div className="fixed right-10 bottom-10 w-32 h-32 z-20 hidden lg:block hover:-translate-y-1 transition-transform duration-700">
      <div className="relative w-full h-full rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-ethereal flex items-center justify-center p-1.5 group hover:shadow-ethereal-hover transition-all">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indie-primary/20 to-indie-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="w-full h-full rounded-xl overflow-hidden relative z-10 bg-indie-surface/80">
          <img
            src={profileImg}
            alt="Portrait"
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;