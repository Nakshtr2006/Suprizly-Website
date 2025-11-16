// diy.js

let currentStep = 1;
let selectedItems = [];
let personalNote = "";

// Sample JSON data for available items
const boxItems = [
  { id: 1, name: "Adventure Box", desc: "Outdoor gear and exploration kit", price: 45 },
  { id: 2, name: "Geek Box", desc: "Tech gadgets and collectibles", price: 50 },
  { id: 3, name: "Chill Box", desc: "Relaxation and self-care set", price: 40 },
  { id: 4, name: "Custom Box", desc: "Mix and match from all categories", price: 55 }
];

const stepContent = document.getElementById("stepContent");
const nextBtn = document.getElementById("nextBtn");

function renderStep() {
  stepContent.innerHTML = "";

  // Step 1: Select Items
  if (currentStep === 1) {
    const list = document.createElement("div");
    list.className = "item-list";

    boxItems.forEach(item => {
      const card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <h4>Starting at $${item.price}</h4>
        <button class="selectBtn" data-id="${item.id}">Select</button>
      `;
      list.appendChild(card);
    });

    stepContent.appendChild(list);

    document.querySelectorAll(".selectBtn").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = parseInt(e.target.dataset.id);
        const selected = boxItems.find(b => b.id === id);

        if (selectedItems.find(i => i.id === id)) {
          selectedItems = selectedItems.filter(i => i.id !== id);
          e.target.textContent = "Select";
        } else {
          selectedItems.push(selected);
          e.target.textContent = "Selected";
        }
      });
    });
  }

  // Step 2: Personalize
  else if (currentStep === 2) {
    stepContent.innerHTML = `
      <h2>Personal Touch</h2>
      <p>Add a short message or note for the receiver.</p>
      <textarea id="noteInput" placeholder="Write your message here..."></textarea>
    `;

    document.getElementById("noteInput").addEventListener("input", e => {
      personalNote = e.target.value;
    });
  }

  // Step 3: Preview
  else if (currentStep === 3) {
    const total = selectedItems.reduce((sum, i) => sum + i.price, 0);
    const itemNames = selectedItems.length
      ? selectedItems.map(i => i.name).join(", ")
      : "None selected";

    stepContent.innerHTML = `
      <h2>Box Preview</h2>
      <p><strong>Selected Items:</strong> ${itemNames}</p>
      <p><strong>Personal Note:</strong> ${personalNote || "No message added."}</p>
      <h3>Total Price: $${total || 0}</h3>
      <button id="confirmBtn">Confirm Order</button>
    `;

    document.getElementById("confirmBtn").addEventListener("click", () => {
      alert("Order confirmed! 🎁 Thank you for designing your box.");
      location.reload();
    });
  }

  // Update button text
  nextBtn.textContent = currentStep === 3 ? "Start Over" : "Next ➜";
}

nextBtn.addEventListener("click", () => {
  if (currentStep < 3) {
    currentStep++;
  } else {
    currentStep = 1;
    selectedItems = [];
    personalNote = "";
  }
  renderStep();
});

// Start with Step 1
renderStep();
