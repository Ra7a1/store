const orderBtn = document.getElementById("openOrderModal");
const orderBtn2 = document.getElementById("openOrderModal2");
const modal = document.getElementById("orderModal");
const closeModal = document.getElementById("closeModal");

const modalForm = document.getElementById("orderFormModal");
const serviceTypeModal = document.getElementById("serviceTypeModal");
const descriptionFieldModal = document.getElementById("descriptionFieldModal");
const successMessageModal = document.getElementById("successMessageModal");
const nameModal = document.getElementById("nameModal");
const discordModal = document.getElementById("discordModal");
const phoneModal = document.getElementById("phoneModal");
const descriptionModal = document.getElementById("descriptionModal");

// فتح وغلق المودال
orderBtn.addEventListener("click", (e) => { e.preventDefault(); modal.classList.add("show"); });
orderBtn2.addEventListener("click", (e) => { e.preventDefault(); modal.classList.add("show"); });
closeModal.addEventListener("click", () => { modal.classList.remove("show"); });
modal.addEventListener("click", (e) => { if(e.target === modal) modal.classList.remove("show"); });

// اظهار حقل الوصف حسب نوع الطلب
serviceTypeModal.addEventListener("change", () => {
  if (serviceTypeModal.value === "بوتات مخصصة" || serviceTypeModal.value === "برمجة مواقع ويب") {
    descriptionFieldModal.classList.remove("hidden");
  } else {
    descriptionFieldModal.classList.add("hidden");
  }
});

// إرسال الطلب للسيرفر
modalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: serviceTypeModal.value,
        name: nameModal.value,
        discord: discordModal.value,
        phone: phoneModal.value,
        description: descriptionModal.value
      })
    });
    if(res.ok){
      modalForm.reset();
      descriptionFieldModal.classList.add("hidden");
      successMessageModal.classList.remove("hidden");
    } else {
      alert("حدث خطأ، حاول لاحقًا");
    }
  } catch (err) {
    console.error(err);
    alert("حدث خطأ، حاول لاحقًا");
  }
});
