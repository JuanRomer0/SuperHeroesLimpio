class CharacterModal extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
      this.render()
      this.setupEventListeners()
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease;
          }
          
          .modal-overlay.active {
            opacity: 1;
            visibility: visible;
          }
          
          .modal-content {
            background-color: white;
            border-radius: 12px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            padding: 30px;
            position: relative;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            color: black;
            }
          
          .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 30px;
            cursor: pointer;
            color: #666;
            transition: color 0.3s ease;
          }
          
          .modal-close:hover {
            color: #333;
          }
          
          .modal-header {
            margin-bottom: 25px;
            text-align: center;
          }
          
          .modal-title {
            font-size: 32px;
            margin-bottom: 10px;
            color: black;
            background-color: lightgray;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .modal-subtitle {
            font-size: 20px;
            color: red;
          }
          
          .modal-image {
            width: 100%;
            max-height: 500px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 25px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          .modal-body {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          
          .modal-info {
            display: flex;
            gap: 30px;
            flex-wrap: wrap;
          }
          
          .modal-info-item {
            flex: 1;
            min-width: 200px;
          }
          
          .modal-info-label {
            font-weight: bold;
            margin-bottom: 8px;
            color: black;
            font-size: 18px;
          }
          
          .modal-description {
            line-height: 1.8;
            font-size: 21px;
            color: black;
          }
          
          @media (max-width: 768px) {
            .modal-content {
              width: 95%;
              padding: 20px;
            }
            
            .modal-title {
              font-size: 28px;
            }
            
            .modal-subtitle {
              font-size: 18px;
            }
            
            .modal-description {
              font-size: 16px;
            }
          }
        </style>
        
        <div class="modal-overlay">
          <div class="modal-content">
            <button class="modal-close">&times;</button>
            
            <div class="modal-header">
              <h2 class="modal-title"></h2>
              <div class="modal-subtitle"></div>
            </div>
            
            <img class="modal-image" src="/placeholder.svg" alt="">
            
            <div class="modal-body">
              <div class="modal-info">
                <div class="modal-info-item">
                  <div class="modal-info-label">Casa:</div>
                  <div class="modal-house"></div>
                </div>
                
                <div class="modal-info-item">
                  <div class="modal-info-label">Primera Aparición:</div>
                  <div class="modal-appearance"></div>
                </div>
              </div>
              
              <div class="modal-info-label">Descripción Completa:</div>
              <div class="modal-description"></div>
            </div>
            
            <div class="modal-timestamp"></div>
          </div>
        </div>
      `
    }
  
    setupEventListeners() {
      const modalOverlay = this.shadowRoot.querySelector(".modal-overlay")
      const closeButton = this.shadowRoot.querySelector(".modal-close")
  
      closeButton.addEventListener("click", () => {
        this.closeModal()
      })
  
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
          this.closeModal()
        }
      })
  
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
          this.closeModal()
        }
      })
    }
  
    openModal(character) {
      const modalOverlay = this.shadowRoot.querySelector(".modal-overlay")
      const modalTitle = this.shadowRoot.querySelector(".modal-title")
      const modalSubtitle = this.shadowRoot.querySelector(".modal-subtitle")
      const modalImage = this.shadowRoot.querySelector(".modal-image")
      const modalHouse = this.shadowRoot.querySelector(".modal-house")
      const modalAppearance = this.shadowRoot.querySelector(".modal-appearance")
      const modalDescription = this.shadowRoot.querySelector(".modal-description")
  

      modalTitle.textContent = character.nombre
      modalSubtitle.textContent = character.nombreClave
      modalImage.src = character.imagen
      modalImage.alt = character.nombre
      modalHouse.textContent = character.casa
      modalAppearance.textContent = character.primeraAparicion
      modalDescription.textContent = character.descripcionCompleta

      modalOverlay.classList.add("active")
    }
  
    closeModal() {
      const modalOverlay = this.shadowRoot.querySelector(".modal-overlay")
      modalOverlay.classList.remove("active")
    }
  }
  
  customElements.define("character-modal", CharacterModal)