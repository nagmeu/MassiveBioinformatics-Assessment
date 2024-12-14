import React, { useEffect, useState } from "react";
import axios from "axios";

const CharacterList = ({ filters, setFilters }) => {
  // State tanımlamaları
  const [characters, setCharacters] = useState([]);  // Tüm karakterleri saklayan state
  const [currentPage, setCurrentPage] = useState(0);  // Mevcut sayfa numarası state
  const [info, setInfo] = useState({ pages: 0 });  // Toplam sayfa sayısını tutuyor
  const [sortOrder, setSortOrder] = useState('');  // Sıralama tercihini tutuyor (asc/desc)
  const [charactersPerPage, setCharactersPerPage] = useState(24);  // Sayfa başına karakter sayısı
  const [selectedCharacter, setSelectedCharacter] = useState(null);  // Modal için seçilen karakter
  const [modalVisible, setModalVisible] = useState(false);  // Modal görünüm kontrolü
  const [noCharactersAlert, setNoCharactersAlert] = useState(false);  // Filtreyle ilgili uyarı state

  // Karakterleri API üzerinden çekiyoruz
  const getCharacters = async () => {
    try {
      let allCharacters = [];
      let page = 1;

      while (true) {
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);

        if (!data.results) break;  // Eğer sayfa sonuçları yoksa döngüden çıkıyor

        allCharacters = allCharacters.concat(data.results);
        if (page >= data.info.pages) break;  // Eğer tüm sayfalar gezilmiş ise -> döngü duruyor

        page++;
      }

      setCharacters(allCharacters);
      setCurrentPage(0);
    } catch (err) {
      console.error('API çağrısı hatası:', err); 
    }
  };

  // Karakterleri filtreleyip sıralayan fonksiyon
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

    // Sıralama tercihini kontrol edip sıralıyorum, bu kısıma A'dan Z'ye ya da Z'den A'ya sıralama yapıyoruz. Karakterlerin
    // yaş vb. detayları API'da olsa onlara dair sıralama da gerçekleştirebilirdik ancak API'da böyle bir bilgi yoktu.
    if (sortOrder === 'asc') {
      filteredList.sort((a, b) => a.name.localeCompare(b.name));  // A-Z sıralama
    } else if (sortOrder === 'desc') {
      filteredList.sort((a, b) => b.name.localeCompare(a.name));  // Z-A sıralama
    }

    return filteredList;
  };

  const totalPages = Math.ceil(sortedCharacters().length / charactersPerPage);  // Toplam sayfa sayısı güncel durumlara göre hesaplanıyor

  // Sayfa seçim işlemlerini kontrol eden fonksiyon
  const handlePageSelect = (e) => {
    setCurrentPage(Number(e.target.value) - 1);  // Seçilen sayfa numarasını state'e setliyorum
  };

  // Sıralama tercihini kontrol eden fonksiyon
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);  // Sıralama tercihini state'e ekliyorum
  };

  // Sayfa başına karakter sayısını değiştiren fonksiyon
  const handleCharactersPerPageChange = (e) => {
    setCharactersPerPage(Number(e.target.value));
    setCurrentPage(0); 
  };

  const indexOfFirstCharacter = currentPage * charactersPerPage;
  const indexOfLastCharacter = indexOfFirstCharacter + charactersPerPage;
  const currentCharacters = sortedCharacters().slice(indexOfFirstCharacter, indexOfLastCharacter);

  // Modal window açma işlemi, karaktere tıklanınca çalışıyor
  const openModal = async (character) => {
    try {
      const firstEpisodeResponse = character.episode?.length > 0 ? await axios.get(character.episode[0]) : null;
      const lastEpisodeResponse = character.episode?.length > 1 ? await axios.get(character.episode[character.episode.length - 1]) : null;

      setSelectedCharacter({
        ...character,
        firstSeenEpisode: firstEpisodeResponse?.data.name || '-',
        lastSeenEpisode: lastEpisodeResponse?.data.name || '-'
      });
      setModalVisible(true);  // Modal görünümünü aktif hale getiriyorum
    } catch (error) {
      console.error("Episode verisi çekilirken hata:", error);
    }
  };

  // Modal kapatma işlemi
  const closeModal = () => {
    setModalVisible(false);
    setSelectedCharacter(null);
  };

  // Aktif filtreleri kontrol eden fonksiyon
  const hasFiltersActive = () => {
    return Object.values(filters).some(value => value);
  };

  // Filtre uygulandıktan sonra sayfayı yenileyen hook
  useEffect(() => {
    setCurrentPage(0);

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

      getCharacters();  // Filtre sıfırlanırken verileri tekrar çekiyorum
    } else if (sortedCharacters().length > 0) {
      setNoCharactersAlert(false);
    }
  }, [filters, charactersPerPage, sortOrder]);

  return (
    <div className="container mt-4">
      {/* UI Kontrolleri: Sayfa kontrolleri ve sıralama */}
      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label">Characters per Page:</label>
          <select className="form-select" value={charactersPerPage} onChange={handleCharactersPerPageChange}>
            {[6, 12, 18, 24, 30].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Sort By:</label>
          <select className="form-select" value={sortOrder} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="asc">Name A-Z</option>
            <option value="desc">Name Z-A</option>
          </select>
        </div>
      </div>

      {/* Karakter Grid */}
      <div className="row g-4">
        {currentCharacters.map(char => (
          <div key={char.id} className="col-6 col-md-4 col-lg-3" onClick={() => openModal(char)}>
            <div className="card text-center">
              <img src={char.image} className="card-img-top" alt={char.name} />
              <div className="card-body">
                <h5 className="card-title">{char.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal için kontroller */}
      {modalVisible && selectedCharacter && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCharacter.name}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">
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
