// Your tier list data - customize this!
const tierData = [
		{ tier: "A", name: "Black Thunder \n(Original)", image: "bto.jpg", 
         description: "Crunchy chocolate cookie covered in milk chocolate." },
		{ tier: "A", name: "Kajū Gumi \n (Grape)", image: "kajuu_grape.png", 
         description: "Grape flavored gummy. Very fruity. Soft, but chewy." },
		{ tier: "A", name: "Kajū Gumi \n (Muscat)", image: "kajuu_muscat.png", 
         description: "Muscat flavored gummy. Very fruity. Soft, but chewy." },
		{ tier: "A", name: "Kajū Gumi \n (Mandarin Orange)", image: "kajuu_mikan.png", 
         description: "Mandarin Orange flavored gummy. Very fruity; slight hints of bitter zest. Soft, but chewy." },
      //Price: 3 for 100 yen (Daiso), ~40 yen (convenience stores) \nBlack Thunder with small rice crackers inside. Crunchier and saltier than the original.
      //Price: 3 for 100 yen (Daiso), ~40 yen (convenience stores) \nBlack Thunder with roasted soybean powder, which imparts a toasty, nutty flavor.
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

let selectedItem = null;

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

   // // Show description in the correct tier panel
   // const descPanelId = `description-${tier}`;
   // const descPanel = document.getElementById(descPanelId);
   
   // if (descPanel) {
   //       descPanel.style.display = 'flex';
   //       descPanel.innerHTML = `
   //          <h2>${itemData.name}</h2>
   //          <p>${itemData.description}</p>
   //       `;
   // } else {
   //       console.error(`Description panel not found: ${descPanelId}`);
   // }
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


initializeTierList();