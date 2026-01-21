const API_URL = "/api/order";

const modalForm = document.getElementById("orderFormModal");
const serviceTypeModal = document.getElementById("serviceTypeModal");
const descriptionFieldModal = document.getElementById("descriptionFieldModal");
const successMessageModal = document.getElementById("successMessageModal");

serviceTypeModal.addEventListener("change", () => {
  if (serviceTypeModal.value === "بوتات مخصصة" || serviceTypeModal.value === "برمجة مواقع ويب") {
    descriptionFieldModal.classList.remove("hidden");
  } else descriptionFieldModal.classList.add("hidden");
});

modalForm.addEventListener("submit", async e => {
  e.preventDefault();
  const data = {
    service: serviceTypeModal.value,
    name: document.getElementById("nameModal").value,
    discord: document.getElementById("discordModal").value,
    phone: document.getElementById("phoneModal").value,
    description: document.getElementById("descriptionModal").value
  };
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    modalForm.reset();
    descriptionFieldModal.classList.add("hidden");
    successMessageModal.classList.remove("hidden");
  } catch (err) { console.error("Error sending order:", err); }
});
