
const tierData = [
		{ tier: "B", name: "Kaki no Tane \n(Original)", image: "kakinotane.png", 
         description: "Savory, slightly spicy crescent-shaped rice crackers and peanuts. A Japanese snack classic." },
		{ tier: "A", name: "Jagarico \n (Salad)", image: "jagaricoSalad.jpg", 
         description: "Crunchy potato stick coated with carrot and parsley flakes. It's a salad!" },
		{ tier: "A", name: "Jagarico \n (Cheese)", image: "jagaricoCheese.jpg", 
         description: "Crunchy potato stick coated with cheesy clusters." },
		{ tier: "C", name: "Jagarico \n(Butter Potato)", image: "jagaricoButter.jpg", 
         description: "Crunchy potato stick with a buttery flavor." },
		// { tier: "A", name: "Burgers", image: "burgers.jpg", 
      //    description: "Classic comfort food done right. When made well, few things are more satisfying." },
		// { tier: "C", name: "Pasta", image: "pasta.jpg", 
      //    description: "Reliable and comforting. Endless varieties keep it interesting, though it can be hit or miss." },
		// { tier: "C", name: "Sandwiches", image: "sandwiches.jpg", 
      //    description: "Convenient and practical. Great for lunch but lacks the excitement of higher tiers." },
		// { tier: "C", name: "Salads", image: "salads.jpg", 
      //    description: "Healthy and refreshing, but often needs other elements to truly shine." },
		// { tier: "D", name: "Hot Dogs", image: "hotdogs.jpg", 
      //    description: "Fun at events but not something you crave regularly. Does the job but rarely impresses." },
		// { tier: "D", name: "Cereal", image: "cereal.jpg", 
      //    description: "Quick and easy breakfast option, but gets old fast and not very nutritious." }
   ];
// let tierData = [];
let selectedItem = null;

// function parseCSV(text) {
//   const rows = [];
//   let i = 0;
//   const len = text.length;

//   function readField() {
//     if (text[i] === '"') {
//       // quoted field
//       i++; // skip opening quote
//       let value = '';
//       while (i < len) {
//         if (text[i] === '"') {
//           if (text[i + 1] === '"') {
//             // escaped quote
//             value += '"';
//             i += 2;
//             continue;
//           } else {
//             // closing quote
//             i++;
//             break;
//           }
//         } else {
//           value += text[i++];
//         }
//       }
//       return value;
//     } else {
//       // unquoted
//       let start = i;
//       while (i < len && text[i] !== ',' && text[i] !== '\n' && text[i] !== '\r') i++;
//       return text.slice(start, i).trim();
//     }
//   }

//   function skipNewline() {
//     if (text[i] === '\r') i++;
//     if (text[i] === '\n') i++;
//   }

//   // Read first line as headers
//   const headers = [];
//   while (i < len) {
//     const field = readField();
//     headers.push(field);
//     if (text[i] === ',') {
//       i++;
//       continue;
//     }
//     if (text[i] === '\n' || text[i] === '\r' || i >= len) {
//       skipNewline();
//       break;
//     }
//     if (i >= len) break;
//   }

//   // Read remaining rows
//   while (i < len) {
//     const row = {};
//     for (let h = 0; h < headers.length; h++) {
//       // if at EOF but expecting a field, treat it as empty
//       if (i >= len) {
//         row[headers[h]] = '';
//         continue;
//       }
//       const field = readField();
//       row[headers[h]] = field;
//       if (text[i] === ',') {
//         i++;
//         continue;
//       }
//       // end of line
//       if (text[i] === '\n' || text[i] === '\r' || i >= len) {
//         skipNewline();
//         // remaining headers (if any) are empty strings
//         for (let hh = h + 1; hh < headers.length; hh++) {
//           row[headers[hh]] = '';
//         }
//         break;
//       }
//     }
//     // if the row is entirely empty (all headers empty), skip
//     const allEmpty = headers.every(h => (row[h] === undefined || row[h] === ''));
//     if (!allEmpty) rows.push(row);
//   }

//   return rows;
// }


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
   // Remove previous selection
   if (selectedItem) {
         selectedItem.classList.remove('selected');
   }

   // Hide all description panels
   document.querySelectorAll('.description-panel').forEach(panel => {
         panel.style.display = 'none';
   });

   // Select new item
   element.classList.add('selected');
   selectedItem = element;

   // Show description in the correct tier panel
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

// Initialize the tier list
function initializeTierList() {
   for (const item of tierData) {
      tier = item.tier;
      // console.log(item);
		const tierContainer = document.getElementById(`tier-${tier.toLowerCase()}`);
		tierContainer.appendChild(createItem(item, tier));

	}
}


// // Fetch CSV, parse, and initialize
// function loadTierDataFromCSV(csvPath = 'tierDataSalty.csv') {
//   fetch(csvPath)
//     .then(response => {
//       if (!response.ok) throw new Error(`Failed to load ${csvPath}: ${response.statusText}`);
//       return response.text();
//     })
//     .then(text => {
//       const rows = parseCSV(text);
//       // Normalize header keys to lowercase names we expect (tier,name,image,description)
//       tierData = rows.map(r => ({
//         tier: (r.tier || r.Tier || r.TIER || '').trim(),
//         name: r.name || r.Name || '',
//         image: r.image || r.Image || '',
//         description: r.description || r.Description || ''
//       }));
//       initializeTierList();
//     })
//     .catch(err => {
//       console.error('Error loading tier data:', err);
//     });
// }

// // Start
// document.addEventListener('DOMContentLoaded', () => {
//   loadTierDataFromCSV('tierData.csv');
// });

initializeTierList();