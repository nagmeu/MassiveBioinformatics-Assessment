// Bottombar'ı, projenin yapılış amacını ve kendime ait bilgileri belirtmek için kullandım.  
// Farklı cihazlarda veya zoom in/out durumlarında tasarımın bozulmaması için Bootstrap sınıflarıyla responsive yapıyı bu kısım için de korumaya çalıştım.

import React from 'react';

const Bottombar = () => {
  return (
    <div className="absolute-bottom bg-dark text-white text-center py-3"> 
      {/* Bu kısımda, responsive olması adına bootstrap kullandım. */}
      <p className="mb-0" style={{ fontSize: '14px' }}>
        This website is created for the Massive Bioinformatics Long-Term Internship Program Web Design Assessment.
      </p>
      <p className="mb-0" style={{ fontSize: '14px' }}>
        Created by Nağme Uğurtan.<br />
        <a href="https://github.com/nagmeu" style={{ textDecoration: 'none' }}> https://github.com/nagmeu</a><br />
        <a href="https://www.linkedin.com/in/nağme-uğurtan/" style={{ textDecoration: 'none' }}> https://www.linkedin.com/in/nağme-uğurtan</a>
      </p>
    </div>
  );
};


export default Bottombar;
