import React, { useState, useEffect } from "react";
import axios from "axios";

const FilterPanel = ({ setFilters, filters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);

  // API'deki karakterleri kontrol edip benzersiz filtre değerlerini çek
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        let speciesSet = new Set();
        let statusSet = new Set();
        let genderSet = new Set();

        let url = "https://rickandmortyapi.com/api/character";
        let nextUrl = url;

        while (nextUrl) {
          const response = await axios.get(nextUrl);
          const characters = response.data.results;

          characters.forEach((character) => {
            if (character.species) speciesSet.add(character.species);
            if (character.status) statusSet.add(character.status);
            if (character.gender) genderSet.add(character.gender);
          });

          nextUrl = response.data.info.next;  // Pagination kontrolü için
        }

        setSpeciesOptions(Array.from(speciesSet));
        setStatusOptions(Array.from(statusSet));
        setGenderOptions(Array.from(genderSet));

      } catch (error) {
        console.error('Failed to fetch characters', error);
      }
    };

    fetchCharacters();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: prevFilters[name] === value ? '' : value
    }));
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div>
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

          {/* Filter by Character Name */}
          <input
            placeholder="Character Name"
            name="name"
            onChange={handleInputChange}
            style={{
              padding: '10px',
              width: '100%',
              borderRadius: '5px',
              fontSize: '16px',
              boxSizing: 'border-box',
              marginBottom: '10px',
            }}
          />

          {/* Filter by Status */}
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

          {/* Filter by Gender */}
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

          {/* Filter by Species */}
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
