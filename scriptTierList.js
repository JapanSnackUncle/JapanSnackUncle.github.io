let tierData = [];
let selectedItem = null;

// Get CSV filename from query parameter or data attribute
function getCSVFile() {
   const script = document.currentScript;
   if (script && script.dataset.csv) {
      return script.dataset.csv;
   }
   return 'tierDataSalty.csv';
}

function loadCSV() {
   const csvFile = getCSVFile();
   fetch(csvFile)
      .then(response => response.text())
      .then(csvText => {
         Papa.parse(csvText, {
            header: true,
            complete: (results) => {
               tierData = results.data.filter(row => row.tier); // Remove empty rows
               initializeTierList();
            },
            error: (error) => {
               console.error('CSV parsing error:', error);
            }
         });
      })
      .catch(error => console.error('CSV fetch error:', error));
}

function createItem(itemData, tier) {
   const item = document.createElement('div');
   item.className = 'item';
   
   const img = document.createElement('img');
   img.className = 'item-image';
   img.src = itemData.image;
   img.alt = itemData.name;
   
   const name = document.createElement('div');
   name.className = 'item-name';
   name.textContent = itemData.name;
   
   item.appendChild(img);
   item.appendChild(name);
   item.onclick = () => selectItem(item, itemData, tier);
   return item;
}

function selectItem(element, itemData, tier) {
   if (selectedItem) {
      selectedItem.classList.remove('selected');
   }

   document.querySelectorAll('.description-panel').forEach(panel => {
      panel.style.display = 'none';
   });

   element.classList.add('selected');
   selectedItem = element;

   const descPanelId = `description-${tier}`;
   const descPanel = document.getElementById(descPanelId);
   if (descPanel) {
      descPanel.style.display = 'flex';
      
      let socialLinks = '';
      if (itemData.youtube || itemData.instagram || itemData.tiktok) {
         socialLinks = '<div class="social-links">';
         if (itemData.youtube) {
            socialLinks += `<a href="${itemData.youtube}" target="_blank" rel="noopener noreferrer" class="social-icon">▶️</a>`;
         }
         if (itemData.instagram) {
            socialLinks += `<a href="${itemData.instagram}" target="_blank" rel="noopener noreferrer" class="social-icon">📷</a>`;
         }
         if (itemData.tiktok) {
            socialLinks += `<a href="${itemData.tiktok}" target="_blank" rel="noopener noreferrer" class="social-icon">🎶</a>`;
         }
         socialLinks += '</div>';
      }
      
      descPanel.innerHTML = `
         <h2>${itemData.name}</h2>
         <p>${itemData.description}</p>
         ${socialLinks}
      `;
   } else {
      console.error(`Description panel not found: ${descPanelId}`);
   }
}


function initializeTierList() {
   for (const item of tierData) {
      const tier = item.tier;
      const tierContainer = document.getElementById(`tier-${tier.toLowerCase()}`);
      if (tierContainer) {
         tierContainer.appendChild(createItem(item, tier));
      }
   }
}

// Load CSV on page load
loadCSV();

// initializeTierList();