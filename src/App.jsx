import { useState, useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(true);

  // Load userData from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
      setCurrentPage('cronograma');
    }
  }, []);

  const calculatePeriod = () => {
    const hour = new Date().getHours();
    if (hour >= 8 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    return 'night';
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      alert("Por favor, preencha seu nome.");
      return;
    }

    const newUser = {
      fullName,
      isFirstTime,
      registeredAt: new Date().toISOString(),
      period: calculatePeriod()
    };

    localStorage.setItem('userData', JSON.stringify(newUser));
    setUserData(newUser);
    setIsModalOpen(false);
    setCurrentPage('cronograma');
  };

  // Protect Cronograma route
  if (currentPage === 'cronograma' && !userData) {
    setCurrentPage('home');
    return null;
  }

  return (
    <div className="app-container">
      {currentPage === 'home' && (
        <div className="home-container">
          <div className="home-logo-area">
            {/* Minimal logo placeholder using Senac style text */}
            <h1 className="home-title">Casa <span>Aberta</span></h1>
          </div>
          <p className="home-subtitle">Um dia inteiro de aprendizado prático no Senac</p>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            Ver oficinas
          </button>
        </div>
      )}

      {currentPage === 'cronograma' && (
        <div className="cronograma-container">
          <div className="cronograma-header">
            <h1>Cronograma</h1>
            <p>Olá, <span className="user-name">{userData?.fullName}</span>!</p>
          </div>
          {/* Cronograma list will go here in the future */}
        </div>
      )}

      {/* Modal Overlay for Registration */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Cadastro Rápido</h2>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                Precisamos de alguns dados antes de ver as oficinas.
              </p>
            </div>
            
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Nome Completo</label>
                <input 
                  type="text" 
                  id="fullName" 
                  className="form-input" 
                  placeholder="Ex: João da Silva"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">É sua primeira vez no Senac?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="firstTime" 
                      checked={isFirstTime === true}
                      onChange={() => setIsFirstTime(true)}
                    />
                    Sim
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="firstTime" 
                      checked={isFirstTime === false}
                      onChange={() => setIsFirstTime(false)}
                    />
                    Não
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
