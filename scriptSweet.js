let tierData = [];
let selectedItem = null;

function loadCSV() {
   fetch('tierDataSweet.csv')
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
      descPanel.innerHTML = `
         <h2>${itemData.name}</h2>
         <p>${itemData.description}</p>
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