const modalForm = document.getElementById("orderFormModal");
const serviceTypeModal = document.getElementById("serviceTypeModal");
const descriptionFieldModal = document.getElementById("descriptionFieldModal");
const successMessageModal = document.getElementById("successMessageModal");
const nameModal = document.getElementById("nameModal");
const discordModal = document.getElementById("discordModal");
const phoneModal = document.getElementById("phoneModal");
const descriptionModal = document.getElementById("descriptionModal");

serviceTypeModal.addEventListener("change", () => {
  if (serviceTypeModal.value === "بوتات مخصصة" || serviceTypeModal.value === "برمجة مواقع ويب") {
    descriptionFieldModal.classList.remove("hidden");
  } else {
    descriptionFieldModal.classList.add("hidden");
  }
});

modalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await sendWebhook(
    serviceTypeModal.value,
    nameModal.value,
    discordModal.value,
    phoneModal.value,
    descriptionModal.value
  );

  modalForm.reset();
  descriptionFieldModal.classList.add("hidden");
  successMessageModal.classList.remove("hidden");
});

async function sendWebhook(service, name, discord, phone, description) {
  try {
    await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, name, discord, phone, description })
    });
  } catch (err) {
    console.error(err);
  }
}
