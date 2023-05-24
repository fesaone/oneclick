const fesaone = 11;
let FESAone = 0;
let fesaONE = fesa();
let one = localStorage.getItem("one");

function oneFESA(event) {
  if (FESAone >= fesaone) {
    event.preventDefault();
    alert("Batas klik maksimum tercapai. Tunggu sebentar.");
    return;
  }
  FESAone++;
  localStorage.setItem("FESAone", FESAone);
}

function fesa() {
  const url = window.location.href;
  const slugIndex = url.lastIndexOf("/") + 1;
  return url.substring(slugIndex);
}

function ONEfesa() {
  FESAone = 0;
  localStorage.setItem("FESAone", FESAone);
  localStorage.setItem("one", Date.now());
}

document.addEventListener("DOMContentLoaded", function() {
  const storedClicks = localStorage.getItem("FESAone");
  if (storedClicks) {
    FESAone = parseInt(storedClicks);
  }

  const storedSlug = localStorage.getItem("fesaONE");
  if (storedSlug && storedSlug !== fesaONE) {
    ONEfesa();
    localStorage.removeItem("fesaONE");
  } else {
    fesaONE = fesa();
  }

  window.addEventListener("beforeunload", function () {
    localStorage.setItem("fesaONE", fesaONE);
  });

  if (one) {
    const resetTime = parseInt(one);
    const currentTime = Date.now();
    const timeDiff = currentTime - resetTime;
    const minutesPassed = Math.floor(timeDiff / (1000 * 60));

    if (minutesPassed >= 30) {
      ONEfesa();
    }
  }

  document.querySelectorAll("*").forEach(element => {
    element.addEventListener("click", oneFESA);
  });
});
