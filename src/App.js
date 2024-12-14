  import React, { useState } from "react";
  import FilterPanel from "./components/FilterPanel";
  import CharacterList from "./components/CharacterList";
  import Navbar from "./components/Navbar"; 
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Bottombar from "./components/Bottombar"; 

function App() {
  // Filtreler için bir state oluşturduk
  const [filters, setFilters] = useState({
    name: '',     // Karakter adı filtresi
    status: '',   // Karakterin durumu (Alive, Dead vb.)
    gender: '',   // Karakterin cinsiyeti
    species: '',  // Tür filtresi (Human, Alien vb.)
    type: ''      // Ek filtreleme tipi
  });
    //Karakterleri sıralama durumu için state oluşturduk
    const [sortCharacters, setSortCharacters] = useState(false);
  
    return (
    <div>
      {/* Sayfanın en üstünde bulunacak olan navbar bileşeni, websitesinin adını ve logo içeriyor. 
          İstenilenlerde yer alması durumunda buraya menu, about vb kısımlarını ekleyebilirdik. */}
      <Navbar />
      <div style={{ display: 'flex' }}>
        {/* Ana bileşen, bu kısımda filtre panelimiz ve karakter görüntüleme kısmı yer alıyor */}
        {/* Aşağıdaki iki satırda kullanacağımız fonksiyonlar için stateleri tanımlıyoruz */}
        <FilterPanel setFilters={setFilters} filters={filters} setSortCharacters={setSortCharacters} />
        <CharacterList filters={filters} setFilters={setFilters} sortCharacters={sortCharacters} />
      </div>
      {/* Sayfanın en altında yer alacak olan bottombar bileşeni */}
      <Bottombar />
    </div>
  );

  export default App;
  
