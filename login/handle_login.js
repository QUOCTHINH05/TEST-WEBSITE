function handleLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    //Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Vui lòng nhập đúng định dạng email!");
        return; // Dừng lại nếu email không hợp lệ
    }

    //Giải lập TK test, sau này sẽ có backend sau
    const testEmail = "test@gmail.com";
    const pass = "123456";

    if (email === testEmail && password === pass) {
       handleLoginSuccessful();
    } else {
        alert("Email hoặc mật khẩu không đúng. Hãy thử lại.");
    }
}

function handleForgotPassword(event) {
  event.preventDefault(); // Ngăn form load lại trang

  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Vui lòng nhập địa chỉ email hợp lệ.");
    return;
  }

  // Giả lập gửi email (có thể sau này thay bằng API thật)
  const button = document.querySelector("button");
  const toast = document.getElementById("toast");

    button.disabled = true;
    button.classList.add("loading");
    button.textContent = "Đang gửi...";

    setTimeout(() => {
    //Hiện toast
    toast.textContent = `Mã OTP đặt lại mật khẩu đã được gửi đến ${email}`;
    toast.classList.remove("hidden");
    toast.classList.add("show");

    button.disabled = false;
    button.classList.remove("loading")
    button.textContent = "Gửi mã OTP đặt lại mật khẩu";
    
   setTimeout(() => {
      window.location.href = "reset_password.html";
    }, 2000);
  }, 2000);
}

function handleLoginSuccessful() {
  const toast = document.querySelector('.toast');
  const button = document.querySelector('button'); // hoặc gắn id cụ thể nếu có nhiều button

  // Vô hiệu hóa nút, hiển thị loading
  button.disabled = true;
  button.classList.add("loading");
  button.textContent = "Đang đăng nhập...";

  setTimeout(() => {
    // Hiện thông báo "Đăng nhập thành công"
    toast.textContent = "Đăng nhập thành công!";
    toast.classList.remove("hidden");
    toast.classList.add("show");

    // Sau 1 giây chuyển sang trang home.html
    setTimeout(() => {
      window.location.href = "../home/home.html";
    }, 1000);
  }, 1000);
}


function handleResetPassword(event) {
  event.preventDefault();

  const otp = document.getElementById("otp").value.trim();
  const newPassword = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Kiểm tra mã OTP
  if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
    alert("Mã xác nhận phải gồm đúng 6 chữ số.");
    return;
  }

  // Kiểm tra mật khẩu có đủ mạnh
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    alert("Mật khẩu không đủ mạnh. Vui lòng nhập lại.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Mật khẩu nhập lại không khớp.");
    return;
  }

  // Giả lập xử lý thành công
  alert("Mật khẩu của bạn đã được đặt lại thành công!");
  window.location.href = "login.html";
}

function togglePassword(inputId, toggleElement) {
  const input = document.getElementById(inputId);
  const icon = toggleElement.querySelector('i');

  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";

  icon.classList.toggle('fa-eye');
  icon.classList.toggle('fa-eye-slash');
}


