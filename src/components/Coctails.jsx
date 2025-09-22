import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Coctails = () => {
  const [coctails, setCoctails] = useState([])
  const [letter, setLetter] = useState('a')
  const [inp, setInp] = useState('')
  const [selectedCoctail, setSelectedCoctail] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  console.log('message: Лучше не бухать!!!')

  const getData = () => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php', {
      params: {
        f: letter
      }
    })
    .then((response) => {
      if (response.data.drinks) {
        setCoctails(response.data.drinks)
      } else {
        setCoctails([])
      }
    })
    .catch((error) => {
      console.log(error)
      setCoctails([])
    })
  }

  useEffect(() => {
    getData()
  }, [letter])

  const filteredCoctails = coctails.filter(coctail =>
    coctail.strDrink.toLowerCase().includes(inp.toLowerCase())
  )

  const handleCardClick = (coctail) => {
    const index = filteredCoctails.findIndex(item => item.idDrink === coctail.idDrink)
    setCurrentIndex(index)
    setSelectedCoctail(coctail)
  }

  const handleCloseModal = () => {
    setSelectedCoctail(null)
  }

  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  const handleNextCoctail = () => {
    const nextIndex = (currentIndex + 1) % filteredCoctails.length
    setCurrentIndex(nextIndex)
    setSelectedCoctail(filteredCoctails[nextIndex])
  }

  const handlePrevCoctail = () => {
    const prevIndex = (currentIndex - 1 + filteredCoctails.length) % filteredCoctails.length
    setCurrentIndex(prevIndex)
    setSelectedCoctail(filteredCoctails[prevIndex])
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#333333', 
        marginBottom: '30px',
        fontSize: 'clamp(28px, 5vw, 32px)',
        fontWeight: '700'
      }}>
        Cocktails
      </h1>
      
      {/* Буквы-фильтры */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '8px', 
        marginBottom: '30px',
        flexWrap: 'wrap',
        padding: '0 10px'
      }}>
        {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
          'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map((char) => (
          <button
            key={char}
            onClick={() => setLetter(char)}
            style={{
              width: 'clamp(35px, 8vw, 40px)',
              height: 'clamp(35px, 8vw, 40px)',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: letter === char ? '#4f46e5' : '#ffffff',
              color: letter === char ? '#ffffff' : '#333333',
              fontWeight: '600',
              fontSize: 'clamp(14px, 3vw, 16px)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (letter !== char) {
                e.currentTarget.style.backgroundColor = '#e0e7ff'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'
              }
            }}
            onMouseLeave={(e) => {
              if (letter !== char) {
                e.currentTarget.style.backgroundColor = '#ffffff'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            {char.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Адаптивное поле поиска */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '30px',
        padding: '0 15px'
      }}>
        <div style={{ 
          position: 'relative',
          width: '100%',
          maxWidth: '500px'
        }}>
          <input 
            value={inp} 
            type="text" 
            name="filter" 
            id="flt" 
            onChange={(e) => setInp(e.target.value)}
            placeholder="Search cocktails..."
            style={{
              width: '100%',
              padding: 'clamp(10px, 3vw, 12px) clamp(12px, 3vw, 16px)',
              paddingLeft: 'clamp(40px, 10vw, 45px)',
              fontSize: 'clamp(14px, 3vw, 16px)',
              border: '2px solid #e0e0e0',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#4f46e5'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.15)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e0e0e0'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          />
          <span style={{
            position: 'absolute',
            left: 'clamp(12px, 3vw, 16px)',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#666666',
            fontSize: 'clamp(16px, 3vw, 18px)',
            pointerEvents: 'none'
          }}>
            🔍
          </span>
        </div>
      </div>
      
      {/* Адаптивные карточки коктейлей */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 15px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {filteredCoctails.length > 0 ? (
          filteredCoctails.map((coctail) => (
            <div 
              key={coctail.idDrink} 
              onClick={() => handleCardClick(coctail)}
              style={{
                padding: 'clamp(12px, 3vw, 16px)',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e0e0e0',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '250px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h4 style={{
                margin: '0 0 12px 0',
                fontSize: 'clamp(14px, 3vw, 16px)',
                fontWeight: '600',
                color: '#333333',
                textAlign: 'center',
                lineHeight: '1.3',
                minHeight: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {coctail.strDrink}
              </h4>
              <img 
                src={coctail.strDrinkThumb} 
                alt={coctail.strDrink} 
                style={{
                  width: 'clamp(120px, 25vw, 150px)',
                  height: 'clamp(120px, 25vw, 150px)',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  border: '2px solid #f0f0f0'
                }}
              />
              <div style={{
                marginTop: '12px',
                padding: '6px 12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                fontSize: 'clamp(11px, 2vw, 12px)',
                color: '#666666',
                fontWeight: '500'
              }}>
                {coctail.strCategory || 'Cocktail'}
              </div>
            </div>
          ))
        ) : (
          <p style={{
            fontSize: 'clamp(16px, 4vw, 18px)',
            color: '#666666',
            textAlign: 'center',
            margin: '40px 0',
            width: '100%',
            gridColumn: '1 / -1'
          }}>
            No cocktails found
          </p>
        )}
      </div>

      {/* Модальное окно */}
      {selectedCoctail && (
        <div 
          onClick={handleCloseModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div 
            onClick={handleModalClick}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '30px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}
          >
            {/* Кнопка закрытия */}
            <button 
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              ×
            </button>

            <h2 style={{
              textAlign: 'center',
              marginBottom: '20px',
              color: '#333',
              fontSize: '24px',
              padding: '0 40px'
            }}>
              {selectedCoctail.strDrink}
            </h2>

            <img 
              src={selectedCoctail.strDrinkThumb} 
              alt={selectedCoctail.strDrink}
              style={{
                display: 'block',
                margin: '0 auto 20px auto',
                width: '80%',
                objectFit: 'cover',
                borderRadius: '12px',
              }}
            />

             {/* Кнопки навигации */}
            {filteredCoctails.length > 1 && (
              <div style={{display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px'}}>
                <button 
                  onClick={handlePrevCoctail}
                  style={{
                    
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.2s ease',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ffffff'
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                    e.currentTarget.style.transform = 'translateY(-50%)'
                  }}
                >
                  ‹
                </button>
                <button 
                  onClick={handleNextCoctail}
                  style={{
                    
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.2s ease',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ffffff'
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                    e.currentTarget.style.transform = 'translateY(-50%)'
                  }}
                >
                  ›
                </button>
              </div>
            )}

            <div style={{ marginBottom: '15px' }}>
              <strong>Category:</strong> {selectedCoctail.strCategory || 'Unknown'}
            </div>

            {selectedCoctail.strAlcoholic && (
              <div style={{ marginBottom: '15px' }}>
                <strong>Type:</strong> {selectedCoctail.strAlcoholic}
              </div>
            )}

            {selectedCoctail.strGlass && (
              <div style={{ marginBottom: '20px' }}>
                <strong>Glass:</strong> {selectedCoctail.strGlass}
              </div>
            )}

            {selectedCoctail.strInstructions && (
              <div style={{ marginBottom: '20px' }}>
                <strong>Instructions:</strong>
                <p style={{ marginTop: '8px', lineHeight: '1.5' }}>
                  {selectedCoctail.strInstructions}
                </p>
              </div>
            )}

            {/* Ингредиенты */}
            {(selectedCoctail.strIngredient1 || selectedCoctail.strMeasure1) && (
              <div>
                <strong>Ingredients:</strong>
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  {[...Array(15)].map((_, i) => {
                    const ingredient = selectedCoctail[`strIngredient${i + 1}`]
                    const measure = selectedCoctail[`strMeasure${i + 1}`]
                    return ingredient ? (
                      <li key={i} style={{ marginBottom: '4px' }}>
                        {measure && `${measure} `}{ingredient}
                      </li>
                    ) : null
                  }).filter(Boolean)}
                </ul>
              </div>
            )}

            {/* Индикатор текущего положения */}
            {filteredCoctails.length > 1 && (
              <div style={{
                textAlign: 'center',
                marginTop: '20px',
                color: '#666',
                fontSize: '14px'
              }}>
                {currentIndex + 1} / {filteredCoctails.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}