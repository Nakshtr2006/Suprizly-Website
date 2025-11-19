// Class representing a Mystery Box
class MysteryBox {
  constructor(name, price, discount, desc, features) {
    this.name = name;
    this.price = price;
    this.discount = discount;
    this.desc = desc;
    this.features = features;
  }

  renderCard() {
    const div = document.createElement("div");
    div.className = "box1";
    div.innerHTML = `
      <h5>${this.discount}</h5>
      <h3>${this.name}</h3>
      <p>${this.desc}</p>
      <h3>${this.price}</h3>
      <button class="details-btn">View Details</button>
    `;
    div.querySelector(".details-btn").addEventListener("click", () => this.showDetails());
    return div;
  }

  showDetails() {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h2>${this.name}</h2>
        <p><strong>Price:</strong> ${this.price}</p>
        <p><strong>Discount:</strong> ${this.discount}</p>
        <p>${this.desc}</p>
        <ul>${this.features.map(f => `<li>${f}</li>`).join("")}</ul>
      </div>
    `;
    document.body.appendChild(modal);

    // Close functionality
    modal.querySelector(".close-btn").onclick = () => modal.remove();
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
  }
}

// Fetch and display all boxes
fetch("\\jason\\boxesData.json")
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector(".boxes");
    container.innerHTML = ""; // clear default
    data.forEach(b => {
      const box = new MysteryBox(b.name, b.price, b.discount, b.desc, b.features);
      container.appendChild(box.renderCard());
    });
  })
  .catch(err => console.error("Error loading boxes:", err));


// Subscribe Button Functionality
document.getElementById("subscribeBtn").addEventListener("click", function () {
  const email = document.getElementById("emailInput").value.trim();
  const msg = document.getElementById("messageArea");

  if (email === "") {
    msg.textContent = "Please enter an email address.";
    msg.style.color = "red";
  } else if (!email.includes("@")) {
    msg.textContent = "Invalid email. Please enter a valid one.";
    msg.style.color = "red";
  } else {
    msg.textContent = `🎉 You're now part of the Surprise Club, ${email}!`;
    msg.style.color = "green";
  }
});

// View Details Button Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add click event to all View Details buttons
  const viewDetailsButtons = document.querySelectorAll('.box1 button');
  
  viewDetailsButtons.forEach(button => {
    button.addEventListener('click', function() {
      const box = this.closest('.box1');
      const name = box.querySelector('h3:first-of-type')?.textContent || 'Mystery Box';
      const desc = box.querySelector('p')?.textContent || 'A special surprise box';
      const price = box.querySelector('h3:last-of-type')?.textContent || 'Price not available';
      const discount = box.querySelector('h5')?.textContent || '';
      const features = Array.from(box.querySelectorAll('h6')).map(h6 => h6.textContent);
      
      showDetailsModal(name, desc, price, discount, features);
    });
  });
  
  // Function to show modal with box details
  function showDetailsModal(name, desc, price, discount, features) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h2>${name}</h2>
        ${discount ? `<div class="discount-badge">${discount}</div>` : ''}
        <p class="modal-price"><strong>Price:</strong> ${price}</p>
        <p class="modal-desc">${desc}</p>
        ${features.length ? `
          <h3>Features:</h3>
          <ul class="modal-features">
            ${features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        ` : ''}
        <button class="modal-order-btn">Add to Cart</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close functionality
    modal.querySelector('.close-btn').onclick = () => modal.remove();
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
    
    // Order button functionality
    modal.querySelector('.modal-order-btn').onclick = () => {
      alert(`${name} added to cart!`);
      modal.remove();
    };
  }
  
  const photoInput = document.getElementById('photo');
  const photoPreview = document.getElementById('photoPreview');
  
  if (photoInput && photoPreview) {
    // Click on preview area to trigger file input
    photoPreview.addEventListener('click', function() {
      photoInput.click();
    });
    
    // Handle file selection
    photoInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          photoPreview.innerHTML = `<img src="${e.target.result}" alt="Box Preview">`;
        };
        reader.readAsDataURL(file);
      }
    });
  }
  
  // Filter Functionality
  const filterOptions = document.querySelectorAll('.filter-option');
  const activeFiltersContainer = document.getElementById('activeFilters');
  const boxes = document.querySelectorAll('.box1');
  
  let activeFilters = {
    category: 'all',
    price: 'all'
  };
  
  // Handle filter option clicks
  filterOptions.forEach(option => {
    option.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      const price = this.getAttribute('data-price');
      
      // Remove active class from siblings
      if (category) {
        document.querySelectorAll('[data-category]').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        activeFilters.category = category;
      } else if (price) {
        document.querySelectorAll('[data-price]').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        activeFilters.price = price;
      }
      
      updateActiveFilters();
      applyFilters();
    });
  });
  
  // Update active filter cards
  function updateActiveFilters() {
    activeFiltersContainer.innerHTML = '';
    
    // Add category filter card
    if (activeFilters.category !== 'all') {
      const categoryCard = createFilterCard('Category', activeFilters.category, 'category');
      activeFiltersContainer.appendChild(categoryCard);
    }
    
    // Add price filter card
    if (activeFilters.price !== 'all') {
      const priceCard = createFilterCard('Price', `$${activeFilters.price}`, 'price');
      activeFiltersContainer.appendChild(priceCard);
    }
  }
  
  // Create filter card element
  function createFilterCard(type, value, filterType) {
    const card = document.createElement('div');
    card.className = 'filter-card';
    card.innerHTML = `
      <span class="filter-label">
        <span class="filter-icon">${filterType === 'category' ? '📦' : '💰'}</span>
        <span>${type}: <strong>${value}</strong></span>
      </span>
      <button class="remove-filter" data-filter-type="${filterType}">&times;</button>
    `;
    
    // Add remove functionality
    card.querySelector('.remove-filter').addEventListener('click', function() {
      const type = this.getAttribute('data-filter-type');
      activeFilters[type] = 'all';
      
      // Reset the filter option to 'all'
      if (type === 'category') {
        document.querySelector('[data-category="all"]').click();
      } else if (type === 'price') {
        document.querySelector('[data-price="all"]').click();
      }
    });
    
    return card;
  }
  
  // Apply filters to boxes (simple show/hide logic)
  function applyFilters() {
    boxes.forEach(box => {
      let shouldShow = true;
      
      // Category filter logic (based on box name/content)
      if (activeFilters.category !== 'all') {
        const boxText = box.textContent.toLowerCase();
        shouldShow = boxText.includes(activeFilters.category.toLowerCase());
      }
      
      // Price filter logic
      if (activeFilters.price !== 'all' && shouldShow) {
        const priceText = box.querySelector('h3:last-of-type')?.textContent;
        if (priceText) {
          const price = parseInt(priceText.replace(/[^0-9]/g, ''));
          const [min, max] = activeFilters.price.split('-').map(Number);
          shouldShow = price >= min && price <= max;
        }
      }
      
      // Show or hide box with animation
      if (shouldShow) {
        box.style.display = 'block';
        box.style.animation = 'fadeIn 0.4s ease';
      } else {
        box.style.display = 'none';
      }
    });
  }
});
