// ^ Write your JavaScript code here
//==========================================================
//======================Nav bar=============================
//==========================================================

var sections = document.querySelectorAll("section[id]");
var navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    var sectionTop = section.offsetTop - 120; // offset للـ navbar
    var sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

var menuBtn = document.querySelector(".mobile-menu-btn");
var menu = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});
//==========================================================
//==================Toggle Mode=============================
//==========================================================
var mode = document.querySelector("html");
var btnmode = document.querySelector("#theme-toggle-button");
btnmode.addEventListener("click", function () {
  mode.classList.toggle("dark");
});
//==========================================================
//==================Setting List============================
//==========================================================
//Open and close
var settingsBtn = document.querySelector("#settings-toggle");
var settingsSidebar = document.querySelector("#settings-sidebar");
var closeBtn = document.querySelector("#close-settings");

function toggleSidebar(isOpen) {
  if (isOpen) {
    settingsSidebar.classList.remove("translate-x-full");
    settingsBtn.style.right = "20rem";
  } else {
    settingsSidebar.classList.add("translate-x-full");
    settingsBtn.style.right = "0";
  }
}

// فتح / قفل من زر الترس
settingsBtn.addEventListener("click", () => {
  var isClosed = settingsSidebar.classList.contains("translate-x-full");
  toggleSidebar(isClosed);
});

// قفل من زر X
closeBtn.addEventListener("click", () => {
  toggleSidebar(false);
});
//==========================================================
//==================Colors=================================
//==========================================================
var themeColors = [
  {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#a855f7",
  },
  {
    primary: "#ec4899",
    secondary: "#f97316",
    accent: "#fb923c",
  },
  {
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
  },
  {
    primary: "#3b82f6",
    secondary: "#06b6d4",
    accent: "#22d3ee",
  },
  {
    primary: "#ef4444",
    secondary: "#f43f5e",
    accent: "#fb7185",
  },
  {
    primary: "#f59e0b",
    secondary: "#ea580c",
    accent: "#fbbf24",
  },
];

var colorsGrid = document.querySelector("#theme-colors-grid");
var html = document.documentElement;

function displayThemeColors() {
  var cartona = "";

  themeColors.forEach((color, index) => {
    cartona += `
      <button
        class="theme-color w-12 h-12 rounded-xl border-2 border-slate-200 overflow-hidden"
        data-index="${index}"
        title="Theme ${index + 1}"
      >
        <div class="flex h-full">
          <span style="background:${color.primary}" class="flex-1"></span>
          <span style="background:${color.secondary}" class="flex-1"></span>
          <span style="background:${color.accent}" class="flex-1"></span>
        </div>
      </button>
    `;
  });

  colorsGrid.innerHTML = cartona;
}

displayThemeColors();

colorsGrid.addEventListener("click", (e) => {
  var btn = e.target.closest(".theme-color");

  if (!btn) return;

  var color = themeColors[btn.dataset.index];

  html.style.setProperty("--color-primary", color.primary);
  html.style.setProperty("--color-secondary", color.secondary);
  html.style.setProperty("--color-accent", color.accent);

  localStorage.setItem("themeColors", JSON.stringify(color));
});

var savedTheme = JSON.parse(localStorage.getItem("themeColors"));

if (savedTheme) {
  html.style.setProperty("--color-primary", savedTheme.primary);
  html.style.setProperty("--color-secondary", savedTheme.secondary);
  html.style.setProperty("--color-accent", savedTheme.accent);
}

//==========================================================
//====================Fonts=================================
//==========================================================

// font-alexandria - font-tajawal - font-cairo

var btns = document.querySelectorAll(".font-option");
var btnsarray = Array.from(btns);
var body = document.querySelector("body");

// تحميل الخط المحفوظ عند فتح الصفحة
var savedFont = localStorage.getItem("font");

if (savedFont) {
  toggleFonts(savedFont);

  // إضافة active للزرار المحفوظ
  for (let i = 0; i < btnsarray.length; i++) {
    if (btnsarray[i].dataset.font === savedFont) {
      btnsarray[i].classList.add("active");
    }
  }
}

for (let i = 0; i < btnsarray.length; i++) {
  btnsarray[i].addEventListener("click", function () {
    // إزالة active من كل الأزرار
    for (let j = 0; j < btnsarray.length; j++) {
      btnsarray[j].classList.remove("active");
    }

    // إضافة active للزرار الحالي
    btnsarray[i].classList.add("active");

    // جلب اسم الخط
    var fontName = btnsarray[i].dataset.font;

    // حفظ الخط
    localStorage.setItem("font", fontName);

    toggleFonts(fontName);
  });
}

function toggleFonts(fontName) {
  body.classList.remove("font-alexandria", "font-tajawal", "font-cairo");

  body.classList.add(`font-${fontName}`);
}

//==========================================================
//====================Reset=================================
//==========================================================

var resetbtn = document.querySelector("#reset-settings");

resetbtn.addEventListener("click", function () {
  reset();
});

function reset() {
  // رجوع الخط الافتراضي
  toggleFonts("tajawal");

  localStorage.removeItem("font");

  // إزالة active من الخطوط
  for (let i = 0; i < btnsarray.length; i++) {
    btnsarray[i].classList.remove("active");

    if (btnsarray[i].dataset.font === "tajawal") {
      btnsarray[i].classList.add("active");
    }
  }

  // رجوع أول لون
  var defaultColor = themeColors[0];

  html.style.setProperty("--color-primary", defaultColor.primary);
  html.style.setProperty("--color-secondary", defaultColor.secondary);
  html.style.setProperty("--color-accent", defaultColor.accent);

  // تحديث localStorage
  localStorage.setItem("themeColors", JSON.stringify(defaultColor));
}

//==========================================================
//===================To Up=================================
//==========================================================
var scrollBtn = document.querySelector("#scroll-to-top");

// إظهار وإخفاء الزرار أثناء الاسكرول
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollBtn.classList.remove("opacity-0", "invisible");

    scrollBtn.classList.add("opacity-100", "visible");
  } else {
    scrollBtn.classList.add("opacity-0", "invisible");

    scrollBtn.classList.remove("opacity-100", "visible");
  }
});

// الرجوع للأعلى عند الضغط
scrollBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//==========================================================
//====================Prtfolio=================================
//==========================================================
var filterBtns = document.querySelectorAll(".portfolio-filter");
var items = document.querySelectorAll(".portfolio-item");

for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener("click", function () {
    // إزالة active من كل الأزرار
    for (let j = 0; j < filterBtns.length; j++) {
      filterBtns[j].classList.remove("active");
      filterBtns[j].setAttribute("aria-pressed", "false");
    }

    // إضافة active للزرار الحالي
    this.classList.add("active");
    this.setAttribute("aria-pressed", "true");

    var filter = this.dataset.filter;

    // فلترة العناصر
    for (let k = 0; k < items.length; k++) {
      var itemCategory = items[k].dataset.category;

      if (filter === "all" || filter === itemCategory) {
        items[k].style.display = "block";
      } else {
        items[k].style.display = "none";
      }
    }
  });
}

//==========================================================
//==================Customer opinions=======================
//==========================================================
var testimonials = document.querySelector("#testimonials-carousel");
var next = document.querySelector("#next-testimonial");
var prev = document.querySelector("#prev-testimonial");

var cards = document.querySelectorAll(".carousel-indicator");
var cardarray = Array.from(cards);

var total = cardarray.length;

var i = 0;

next.addEventListener("click", nextcard);

function nextcard() {
  i++;

  if (i >= total) {
    i = 0;
  }

  moveSlider();
}

prev.addEventListener("click", prevcard);

function prevcard() {
  i--;

  if (i < 0) {
    i = total - 1;
  }

  moveSlider();
}

function moveSlider() {
  var l = i * (100 / (total - 1));
  testimonials.style.transform = `translateX(${l}%)`;
  updateDots(i);
}

function updateDots(dot) {
  for (var i = 0; i < cardarray.length; i++) {
    if (dot == i) {
      cardarray[i].classList.add("bg-accent", "scale-125", "active");
      cardarray[i].classList.remove("bg-slate-400", "dark:bg-slate-600");
    } else {
      cardarray[i].classList.add("bg-slate-400", "dark:bg-slate-600");
      cardarray[i].classList.remove("bg-accent", "scale-125", "active");
    }
  }
}

// الضغط على الدوائر
cardarray.forEach(function (dot, index) {
  dot.addEventListener("click", function () {
    i = index;
    moveSlider();
  });
});

// تشغيل الحالة الأولى
updateDots(i);

//==========================================================
//========================Form==============================
//==========================================================

var form = document.querySelector("form");
var btnS = document.querySelector("#btns");
var fullName = document.querySelector("#full-name");
var email = document.querySelector("#email");
var phone = document.querySelector("#phone");
var details = document.querySelector("#project-details");

// =========================
// Regex
// =========================

var nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{3,}$/;

var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

var phoneRegex = /^(\+20)?01[0-9]{9}$/;

// =========================
// Error Functions
// =========================

function showError(input) {
  input.classList.add("border-red-500");

  var error = input.parentElement.querySelector(".error-message");

  if (error) {
    error.classList.remove("hidden");
  }
}

function removeError(input) {
  input.classList.remove("border-red-500");

  var error = input.parentElement.querySelector(".error-message");

  if (error) {
    error.classList.add("hidden");
  }
}

// =========================
// Validation
// =========================

btnS.addEventListener("click", function (e) {
  e.preventDefault(); // وقف فورًا عشان نختبر

  let valid = true;

  if (!nameRegex.test(fullName.value.trim())) {
    console.log("Name invalid:", fullName.value);
    showError(fullName);
    valid = false;
  } else {
    removeError(fullName);
  }

  if (!emailRegex.test(email.value.trim())) {
    console.log("Email invalid:", email.value);
    showError(email);
    valid = false;
  } else {
    removeError(email);
  }

  if (phone.value.trim() !== "" && !phoneRegex.test(phone.value.trim())) {
    console.log("Phone invalid:", phone.value);
    showError(phone);
    valid = false;
  } else {
    removeError(phone);
  }

  if (details.value.trim().length < 10) {
    console.log("Details invalid:", details.value);
    showError(details);
    valid = false;
  } else {
    removeError(details);
  }

  if (valid) {
    resetForm(form);
    form.reset(); // optional (مهم لو فيه native inputs)
  }
});

// =========================
// Custom Dropdown
// =========================

var selects = document.querySelectorAll(".custom-select");

selects.forEach((select) => {
  var optionsBox = select.nextElementSibling;
  var arrow = select.querySelector("i");
  var text = select.querySelector(".selected-text");

  // فتح وغلق القائمة

  select.addEventListener("click", function (e) {
    e.stopPropagation();

    // قفل باقي القوائم
    document.querySelectorAll(".custom-options").forEach((option) => {
      if (option !== optionsBox) {
        option.classList.add("hidden");
      }
    });

    optionsBox.classList.toggle("hidden");

    if (arrow) {
      arrow.classList.toggle("rotate-180");
    }
  });

  // اختيار عنصر

  optionsBox.querySelectorAll(".custom-option").forEach((option) => {
    option.addEventListener("click", function () {
      text.textContent = this.dataset.value;

      optionsBox.classList.add("hidden");

      if (arrow) {
        arrow.classList.remove("rotate-180");
      }

      // تغيير اللون من placeholder
      text.classList.remove("text-slate-500", "dark:text-slate-400");
    });
  });
});

// قفل القائمة عند الضغط خارجها

document.addEventListener("click", function () {
  document.querySelectorAll(".custom-options").forEach((option) => {
    option.classList.add("hidden");
  });
});

function resetForm(form) {
  // 1. تفريغ كل inputs
  form.querySelectorAll("input, textarea").forEach((input) => {
    input.value = "";
    input.classList.remove("border-red-500");
  });

  // 2. إخفاء رسائل الخطأ
  form.querySelectorAll(".error-message").forEach((error) => {
    error.classList.add("hidden");
  });

  // 3. Reset custom selects
  form.querySelectorAll(".custom-select").forEach((select) => {
    var text = select.querySelector(".selected-text");

    if (text) {
      text.textContent = "اختر";
      text.classList.add("text-slate-500", "dark:text-slate-400");
    }
  });

  // 4. إغلاق كل القوائم المفتوحة
  document.querySelectorAll(".custom-options").forEach((box) => {
    box.classList.add("hidden");
  });
}


