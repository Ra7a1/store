async function loadOrders(){
  const res = await fetch("/api/getOrders");
  const orders = await res.json();
  const tbody = document.querySelector("#ordersTable tbody");
  tbody.innerHTML = "";
  orders.forEach(order=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${new Date(order.timestamp).toLocaleString()}</td>
      <td>${order.type}</td>
      <td>${order.name}</td>
      <td>${order.discord}</td>
      <td>${order.phone}</td>
      <td>${order.description||"لا يوجد"}</td>
    `;
    tbody.appendChild(tr);
  });
}

loadOrders();
