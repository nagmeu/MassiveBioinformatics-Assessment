// Navbar'ı websitesine ait isim ve logoyu belirtmek için kullandık. Bu assessment için gerekli olmasa da, 
// ihtiyaç duyulması halinde menü, hakkında, iletişim vb. kısımlar bu alanda bulunabilir ve navigasyon açısından daha efektif hale getirilebilirdi.

import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* Bu kısımda da responsive durumu korumak için bootstrap kullandık.*/}
      <div className="container">
        {/* Navbar içeriğini ortalamak için Bootstrap'in container sınıfı kullanılıyor. */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="https://pngimg.com/d/rick_morty_PNG17.png"
            alt="Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          Rick & Morty Characters
        </a>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default App;
