const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");

const guestNameInput = document.getElementById("guestName");
const downloadBtn = document.getElementById("downloadBtn");

const cardImage = new Image();
const defaultImageSrc =
  typeof window.CARD_IMAGE_DATA_URL === "string" && window.CARD_IMAGE_DATA_URL.startsWith("data:image/")
    ? window.CARD_IMAGE_DATA_URL
    : "Frame 4.png";

cardImage.src = defaultImageSrc;

const FIXED_FONT_SIZE = 50;
const FIXED_COLOR = "#A30000";
const NAME_Y_RATIO = 0.320;

const textState = {
    
  value: "",
  x: 0,
  y: 0,
  size: FIXED_FONT_SIZE,
  color: FIXED_COLOR,
  fontFamily: '"Noto Serif Devanagari", Mangal, serif',
};

function getDisplayName() {
  const raw = textState.value.trim();
  if (!raw) {
    return "";
  }

  return raw.startsWith("श्री") ? raw : `श्री ${raw}`;
}

function centerBetweenLines() {
  textState.x = canvas.width / 2;
  textState.y = canvas.height * NAME_Y_RATIO;
}

function drawCard() {
  if (!cardImage.complete) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(cardImage, 0, 0, canvas.width, canvas.height);

  const text = getDisplayName();
  if (!text) {
    return;
  }

  ctx.font = `700 ${textState.size}px ${textState.fontFamily}`;
  ctx.fillStyle = textState.color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, textState.x, textState.y);
}

function resizeCanvasToImage() {
  canvas.width = cardImage.naturalWidth;
  canvas.height = cardImage.naturalHeight;
  downloadBtn.disabled = false;
  centerBetweenLines();
  drawCard();
}

function getDownloadFileName() {
  const rawName = textState.value.trim();
  if (!rawName) {
    return "greeting-card-with-name.png";
  }

  // Remove characters that are invalid in filenames on common systems.
  const safeName = rawName.replace(/[\\/:*?"<>|]/g, "").trim();
  return `${safeName || "greeting-card-with-name"}.png`;
}

guestNameInput.addEventListener("input", () => {
  textState.value = guestNameInput.value;
  centerBetweenLines();
  drawCard();
});

downloadBtn.addEventListener("click", () => {
  if (!cardImage.complete || !canvas.width || !canvas.height) {
    alert("Image is still loading. Please wait a moment and try again.");
    return;
  }

  try {
    drawCard();

    const startDownload = (url) => {
      const link = document.createElement("a");
      link.download = getDownloadFileName();
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
    };

    if (canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (!blob) {
          alert("Could not generate image. Please try again.");
          return;
        }
        const url = URL.createObjectURL(blob);
        startDownload(url);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, "image/png");
      return;
    }

    startDownload(canvas.toDataURL("image/png"));
  } catch (error) {
    if (error && error.name === "SecurityError") {
      alert("Browser blocked export. Reload page once and try again. If it still fails, open with VS Code Live Server.");
      return;
    }
    throw error;
  }
});

downloadBtn.disabled = true;

guestNameInput.value = "";
guestNameInput.placeholder = "Type guest name";

window.addEventListener("load", () => {
  centerBetweenLines();
});

cardImage.addEventListener("load", resizeCanvasToImage);
cardImage.addEventListener("error", () => {
  alert("Could not load 'Frame 4.png'. Keep image and files in the same folder.");
});
