class CharacterCard extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
    }
    static get observedAttributes() {
      return ["character-data"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "character-data" && newValue) {
        const characterData = JSON.parse(newValue)
        this.render(characterData)
      }
    }
  
    render(character) {
      this.shadowRoot.innerHTML = `
        <style>
          .character-card {
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .character-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
          }
          
          .card-content {
            padding: 20px;
          }
          
          .character-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 15px;
            background-color: lightgray;
            color: #222;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .character-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 15px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          .character-info {
            margin-bottom: 15px;
          }
          
          .info-label {
            font-weight: bold;
            color: #555;
            font-size: 16px;
          }
          
          .character-house {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 12px;
          }
          
          .house-dc {
            background-color: #0476F2;
            color: white;
          }
          
          .house-marvel {
            background-color: #ED1D24;
            color: white;
          }
          
          .character-appearance {
            font-size: 16px;
            color: #444;
            margin-bottom: 12px;
          }
          
          .character-description {
            font-size: 16px;
            color: #333;
            margin-bottom: 20px;
            line-height: 1.5;
          }
          
          .see-more-btn {
            background-color: #333;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
            width: 100%;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .see-more-btn:hover {
            background-color: #555;
          }
        </style>
        
        <div class="character-card">
          <div class="card-content">
            <h2 class="character-name">${character.nombre}</h2>
            
            <img src="${character.imagen}" alt="${character.nombre}" class="character-image">
            
            <div class="character-info">
              <p><span class="info-label">Nombre Clave:</span> ${character.nombreClave}</p>
            </div>
            
            <div class="character-info">
              <p><span class="info-label">Casa:</span> 
                <span class="character-house house-${character.casa.toLowerCase()}">${character.casa}</span>
              </p>
            </div>
            
            <div class="character-info">
              <p><span class="info-label">Primera Aparición:</span> ${character.primeraAparicion}</p>
            </div>
            
            <div class="character-info">
              <p><span class="info-label">Descripción:</span></p>
              <div class="character-description">${character.descripcionBreve}</div>
            </div>
            
            <button class="see-more-btn" data-id="${character.id}">Ver más</button>
          </div>
        </div>
      `
      const seeMoreBtn = this.shadowRoot.querySelector(".see-more-btn")
      seeMoreBtn.addEventListener("click", () => {
        const modalEvent = new CustomEvent("open-character-modal", {
          bubbles: true, 
          composed: true, 
          detail: { characterId: character.id },
        })
  
        this.dispatchEvent(modalEvent) 
      })
    }
  }
  
  customElements.define("character-card", CharacterCard)
  