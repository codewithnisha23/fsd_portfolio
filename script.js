function generateQR() {
    let qrText = document.getElementById("qrText").value;
    let qrImage = document.getElementById("qrImage");
    let qrBox = document.getElementById("qrBox");
    let downloadBtn = document.getElementById("downloadBtn");
  
    if (qrText.trim().length === 0) {
      alert("Please enter text or URL");
      return;
    }
  
    // Using free QR code API
    let qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(qrText);
    
    qrImage.src = qrUrl;
    qrBox.style.display = "block";
    
    // Set download link
    downloadBtn.href = qrUrl;
    downloadBtn.style.display = "inline-block";
  }