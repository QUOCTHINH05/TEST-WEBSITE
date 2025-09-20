document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.querySelector(".logout-btn");
    logoutBtn.addEventListener("click", function () {
        const confirmLogout = confirm("Bạn chắn chắc muốn đăng xuất không?");
        if (confirmLogout) {
            window.location.href = "../login/login.html";
        }
    });

    // Gắn submit event an toàn khi DOM đã sẵn sàng
    const vocabForm = document.getElementById("vocabForm");
    vocabForm.addEventListener("submit", function (e) {
        e.preventDefault(); // ngăn submit form mặc định
        const topic = document.getElementById("topic").value;
        const numWords = parseInt(document.getElementById("numWords").value);

        if (!topic) {
            alert('Vui lòng chọn chủ đề học!');
            return;
        }
        if (numWords < 5 || numWords > 20) {
            alert('Số lượng từ phải từ 5 đến 20!');
            return;
        }

        // Chuyển hướng đến trang học
        window.location.href = `topic/learn.html?topic=${topic}&numWords=${numWords}`;
    });
});