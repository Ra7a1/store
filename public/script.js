const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
);
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    const headerOffset = 120;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  });
});

/* Modal */
const orderBtn = document.getElementById("openOrderModal");
const orderBtn2 = document.getElementById("openOrderModal2");
const modal = document.getElementById("orderModal");
const closeModal = document.getElementById("closeModal");

[orderBtn, orderBtn2].forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    modal.classList.add("show");
  });
});

closeModal.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("show");
});
