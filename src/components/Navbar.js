import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
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
