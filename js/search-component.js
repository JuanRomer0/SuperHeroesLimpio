class SearchComponent extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
      this.render()
      this.setupEventListeners()
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .search-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            width: 100%;
          }
          
          .search-box {
            display: flex;
            width: 100%;
            border: 2px solid #ddd;
            border-radius: 5px;
            overflow: hidden;
          }
          
          .search-input {
            flex-grow: 1;
            padding: 10px 15px;
            border: none;
            font-size: 16px;
            outline: none;
          }
          
          .search-button {
            background-color: #f0f0f0; 
            border: none;
            padding: 0 15px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .search-button:hover {
            background-color: #e0e0e0;
          }
          
          .search-icon {
            width: 20px;
            height: 20px;
          }
        </style>
        
        <div class="search-container">
          <div class="search-box">
            <input type="text" class="search-input" placeholder="Buscar por nombre clave...">
            <button class="search-button">
              <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
      `
    }
  
    setupEventListeners() {
      const searchInput = this.shadowRoot.querySelector(".search-input")
      const searchButton = this.shadowRoot.querySelector(".search-button")
  
      searchButton.addEventListener("click", () => {
        this.performSearch(searchInput.value)
      })
  
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.performSearch(searchInput.value)
        }
      })
    }
  
    performSearch(query) {
      const searchEvent = new CustomEvent("character-search", {
        bubbles: true,
        composed: true,
        detail: { query },
      })
  
      this.dispatchEvent(searchEvent)
    }
  }
  
  customElements.define("search-component", SearchComponent)