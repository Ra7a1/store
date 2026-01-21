const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if(user==="24214!@$^!#" && pass==="%@%@#!@W"){
    window.location.href = "index.html";
  } else {
    errorMsg.style.display = "block";
  }
});
