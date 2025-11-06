// ---------- DOM 元素 ----------
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");
const msgBox = document.getElementById("msgBox");

// ---------- 切換登入 / 註冊 ----------
if (showRegister) {
  showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("d-none");
    registerForm.classList.remove("d-none");
    msgBox.textContent = "";
  });
}

if (showLogin) {
  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
    msgBox.textContent = "";
  });
}

// ---------- 註冊 ----------
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regConfirm").value;

    if (password !== confirm) {
      msgBox.textContent = "❌ 密碼與確認密碼不一致！";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
      msgBox.textContent = "⚠️ 此帳號已存在，請重新輸入。";
      return;
    }

    // 建立新帳號
    users[username] = {
      password: password,
      records: [] // 預留未來電費紀錄
    };

    localStorage.setItem("users", JSON.stringify(users));
    msgBox.textContent = "✅ 註冊成功，請登入！";

    registerForm.reset();
    registerForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
  });
}

// ---------- 登入 ----------
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[username]) {
      msgBox.textContent = "❌ 查無此帳號。";
      return;
    }

    if (users[username].password !== password) {
      msgBox.textContent = "❌ 密碼錯誤。";
      return;
    }

    // 登入成功
    localStorage.setItem("currentUser", username);
    window.location.href = "dashboard.html"; // 導向主頁
  });
}
