// React ve axios modüllerini import ediyoruz.
import React, { useState, useEffect } from "react";
import axios from "axios";

const FilterPanel = ({ setFilters, filters }) => {

// Bu kısımda state'leri oluşturuyoruz ve uygulamanın filtreleme panelinin durumunu kontrol ediyoruz
// ve filtreleme panelinin açık mı kapalı mı olduğunu, api'dan çekilen species, status ve genderları tutacak stateleri oluşturmuş oluyoruz.
const [isOpen, setIsOpen] = useState(false);   
const [speciesOptions, setSpeciesOptions] = useState([]);  
const [statusOptions, setStatusOptions] = useState([]);    
const [genderOptions, setGenderOptions] = useState([]);    

  // Bu useEffect hook'u ile sayfa ilk yüklendiğinde API'den gerekli karakter verilerini çekiyoruz.
  // Bu şekilde filtreleme panelindeki dropdown menülerini doldurabiliyoruz.
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        let speciesSet = new Set();  
        let statusSet = new Set();   
        let genderSet = new Set();   

        let url = "https://rickandmortyapi.com/api/character";
        let nextUrl = url;

        // Pagination kontrolüyle tüm sayfalardan verileri çekiyoruz.
        while (nextUrl) {
          const response = await axios.get(nextUrl);
          const characters = response.data.results;

          // Her karakter için belirtilen attribute'ları kontrol edip unique özellikleri setlere ekliyoruz.
          characters.forEach((character) => {
            if (character.species) speciesSet.add(character.species); 
            if (character.status) statusSet.add(character.status);     
            if (character.gender) genderSet.add(character.gender);  
          });

          nextUrl = response.data.info.next;  
        }

        // State'e benzersiz filtre seçeneklerini setliyoruz.
        setSpeciesOptions(Array.from(speciesSet));  
        setStatusOptions(Array.from(statusSet));  
        setGenderOptions(Array.from(genderSet));

      } catch (error) {
        console.error('Failed to fetch characters', error);
      }
    };

    fetchCharacters();
  }, []);

  // Input alanına yazıldığında veya dropdown seçildiğinde filtre state'ini güncelleyen fonksiyon.
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // State güncellerken eski filtreleri koruyup yeni değeri setliyoruz.
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: prevFilters[name] === value ? '' : value 
    }));
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;

    // Dropdown seçim yapıldığında filtre state'ini güncelliyoruz.
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value  // Yeni seçimi state'e ekliyoruz.
    }));
  };

  return (
    <div>

      {/* Panel kapalı ise bu kısmı gösteriyoruz. */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)} 
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            backgroundColor: '#f0f0f0',
            padding: '15px',
            fontWeight: 'bold',
            textAlign: 'center',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            borderTopRightRadius: '5px',
            borderBottomRightRadius: '5px',
            cursor: 'pointer',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          Filters
        </div>
      )}

      {/* Panel açık ise bu kısmı gösteriyoruz. */}
      {isOpen && (
        <div
          style={{
            position: 'relative',
            height: '100%',
            width: '300px',
            backgroundColor: '#f4f4f9',
            padding: '20px',
            boxSizing: 'border-box',
            overflowY: 'auto',
            boxShadow: '2px 0px 10px rgba(0,0,0,0.3)',
          }}
        >

          {/* Paneli kapatma butonu */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              fontWeight: 'bold',
              cursor: 'pointer',
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
          >
            ✖
          </button>

          <h3>Filter Characters</h3>

          {/* Filter by Character Name - Ad filtreleme inputu */}
          <input
            placeholder="Character Name"
            name="name"
            onChange={handleInputChange}  // Input değiştiğinde state'i güncelleyen fonksiyon.
            style={{
              padding: '10px',
              width: '100%',
              borderRadius: '5px',
              fontSize: '16px',
              boxSizing: 'border-box',
              marginBottom: '10px',
            }}
          />

          {/* Filter by Status - Dropdown seçimiyle durum filtrele */}
          <div style={{ marginTop: '15px' }}>
            <h4>Status</h4>
            <select
              name="status"
              onChange={handleDropdownChange}
              value={filters.status}
              style={{ padding: '10px', width: '100%', borderRadius: '5px' }}
            >
              <option value="">Select Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Gender - Dropdown seçimiyle cinsiyet filtrele */}
          <div style={{ marginTop: '15px' }}>
            <h4>Gender</h4>
            <select
              name="gender"
              onChange={handleDropdownChange}
              value={filters.gender}
              style={{ padding: '10px', width: '100%', borderRadius: '5px' }}
            >
              <option value="">Select Gender</option>
              {genderOptions.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Species - Dropdown seçimiyle tür filtrele */}
          <div style={{ marginTop: '15px' }}>
            <h4>Species</h4>
            <select
              name="species"
              onChange={handleDropdownChange}
              value={filters.species}
              style={{ padding: '10px', width: '100%', borderRadius: '5px' }}
            >
              <option value="">Select Species</option>
              {speciesOptions.map((species) => (
                <option key={species} value={species}>
                  {species}
                </option>
              ))}
            </select>
          </div>

        </div>
      )}
    </div>
  );
};

export default FilterPanel;
