document.addEventListener("DOMContentLoaded", () => {
    const charactersContainer = document.getElementById("charactersContainer")
    const characterModal = document.getElementById("characterModal")
  
    loadCharacters(window.comicCharacters)
  
    document.addEventListener("character-search", (e) => {
      const query = e.detail.query.toLowerCase()
  
      if (query.trim() === "") { 
        loadCharacters(window.comicCharacters)
      } else {
        const filteredCharacters = window.comicCharacters.filter((character) =>
          character.nombreClave.toLowerCase().includes(query),
        )
        loadCharacters(filteredCharacters)
      }
    })
  
    document.addEventListener("open-character-modal", (e) => {
      const characterId = e.detail.characterId
      const character = window.comicCharacters.find((char) => char.id === characterId)
  
      if (character) {
        characterModal.openModal(character)
      }
    })
  
    function loadCharacters(characters) {
      charactersContainer.innerHTML = ""
      characters.forEach((character) => {
        const characterCard = document.createElement("character-card")
        characterCard.setAttribute("character-data", JSON.stringify(character))
        charactersContainer.appendChild(characterCard)
      })
    }
  })
  