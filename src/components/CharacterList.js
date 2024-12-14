  import React, { useEffect, useState } from "react";
  import axios from "axios";

  const CharacterList = ({ filters, setFilters }) => {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [info, setInfo] = useState({ pages: 0 });
    const [sortOrder, setSortOrder] = useState('');
    const [charactersPerPage, setCharactersPerPage] = useState(24);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [noCharactersAlert, setNoCharactersAlert] = useState(false);

    const getCharacters = async () => {
      try {
        let allCharacters = [];
        let page = 1;

        while (true) {
          const { data } = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
          if (!data.results) break;

          allCharacters = allCharacters.concat(data.results);
          if (page >= data.info.pages) break;
          page++;
        }

        setCharacters(allCharacters);
        setCurrentPage(0);
      } catch (err) {
        console.error('API call error:', err);
      }
    };

    const sortedCharacters = () => {
      let filteredList = characters.filter((char) => {
        return (
          (!filters.status || char.status === filters.status) &&
          (!filters.gender || char.gender === filters.gender) &&
          (!filters.species || char.species.toLowerCase().includes(filters.species.toLowerCase())) &&
          (!filters.type || char.type.toLowerCase().includes(filters.type.toLowerCase())) &&
          (!filters.name || char.name.toLowerCase().includes(filters.name.toLowerCase()))
        );
      });

      if (sortOrder === 'asc') {
        filteredList.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOrder === 'desc') {
        filteredList.sort((a, b) => b.name.localeCompare(a.name));
      }

      return filteredList;
    };

    const totalPages = Math.ceil(sortedCharacters().length / charactersPerPage);

    const handlePageSelect = (e) => {
      setCurrentPage(Number(e.target.value) - 1);
    };

    const handleSortChange = (e) => {
      setSortOrder(e.target.value);
    };

    const handleCharactersPerPageChange = (e) => {
      setCharactersPerPage(Number(e.target.value));
      setCurrentPage(0);
    };

    const indexOfFirstCharacter = currentPage * charactersPerPage;
    const indexOfLastCharacter = indexOfFirstCharacter + charactersPerPage;
    const currentCharacters = sortedCharacters().slice(indexOfFirstCharacter, indexOfLastCharacter);

    const openModal = async (character) => {
      try {
        const firstEpisodeResponse = character.episode?.length > 0 ? await axios.get(character.episode[0]) : null;
        const lastEpisodeResponse = character.episode?.length > 1 ? await axios.get(character.episode[character.episode.length - 1]) : null;
        setSelectedCharacter({
          ...character,
          firstSeenEpisode: firstEpisodeResponse?.data.name || '-',
          lastSeenEpisode: lastEpisodeResponse?.data.name || '-'
        });
        setModalVisible(true);
      } catch (error) {
        console.error("Error fetching episode data:", error);
      }
    };

    const closeModal = () => {
      setModalVisible(false);
      setSelectedCharacter(null);
    };

    const hasFiltersActive = () => {
      return Object.values(filters).some(value => value);
    };

    useEffect(() => {
      getCharacters();
    }, []);

    useEffect(() => {
      setCurrentPage(0); // Reset to the first page when filters are applied

      if (sortedCharacters().length === 0 && hasFiltersActive() && !noCharactersAlert) {
        window.alert("No characters found matching the filters!");

        setNoCharactersAlert(true);

        setFilters({
          status: '',
          gender: '',
          species: '',
          type: '',
          name: ''
        });

        getCharacters();
      } else if (sortedCharacters().length > 0) {
        setNoCharactersAlert(false);
      }
    }, [filters, charactersPerPage, sortOrder]);

    return (
      <div className="container mt-4">
        {/* Controls */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">Characters per Page:</label>
            <select 
              className="form-select" 
              value={charactersPerPage} 
              onChange={handleCharactersPerPageChange}
            >
              {[6, 12, 18, 24, 30, 36, 42, 48, 54, 60].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Sort By:</label>
            <select 
              className="form-select" 
              value={sortOrder} 
              onChange={handleSortChange}
            >
              <option value="">None</option>
              <option value="asc">Name A-Z</option>
              <option value="desc">Name Z-A</option>
            </select>
          </div>
        </div>

        {/* Character Grid */}
        <div className="row g-4">
          {currentCharacters.map(char => (
            <div key={char.id} className="col-6 col-md-4 col-lg-3" onClick={() => openModal(char)}> 
              {/* Adjust column size here to fit 4 per row on larger screens */}
              <div className="card text-center">
                <img src={char.image} className="card-img-top" alt={char.name} />
                <div className="card-body">
                  <h5 className="card-title">{char.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4" style={{ marginBottom: '1rem' }}>
        <button 
            className="btn btn-primary me-2" 
            onClick={() => setCurrentPage(0)} 
            disabled={currentPage === 0}
          >
            First
          </button>
          <button 
            className="btn btn-secondary me-2" 
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))} 
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <select 
            className="form-select w-auto" 
            value={currentPage + 1} 
            onChange={handlePageSelect}
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <option key={index} value={index + 1}>{index + 1}</option>
            ))}
          </select>
          <button 
            className="btn btn-secondary ms-2" 
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))} 
            disabled={currentPage >= totalPages - 1}
          >
            Next
          </button>
          <button 
            className="btn btn-primary ms-2" 
            onClick={() => setCurrentPage(totalPages - 1)} 
            disabled={currentPage >= totalPages - 1}
          >
            Last
          </button>
        </div>

        {/* Modal */}
        {modalVisible && selectedCharacter && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered"> {/* Center the modal */}
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedCharacter.name}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body text-center"> {/* Center the content inside modal */}
                  <img src={selectedCharacter.image} className="img-fluid mb-3" alt={selectedCharacter.name} />
                  <p><strong>Status:</strong> {selectedCharacter.status}</p>
                  <p><strong>Species:</strong> {selectedCharacter.species}</p>
                  <p><strong>Gender:</strong> {selectedCharacter.gender}</p>
                  <p><strong>Location:</strong> {selectedCharacter.location?.name}</p>
                  <p><strong>First Seen In:</strong> {selectedCharacter.firstSeenEpisode}</p>
                  <p><strong>Last Seen In:</strong> {selectedCharacter.lastSeenEpisode}</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default CharacterList;
