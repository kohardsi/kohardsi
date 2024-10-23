// Fungsi Hashing dengan SHA-256
function hashKey(key) {
  return CryptoJS.SHA256(key).toString();
}

// Fungsi Encrypt dengan AES
function encryptText() {
  const inputText = document.getElementById('inputText').value;
  const secretKey = document.getElementById('secretKey').value;

  // Hash kunci rahasia dengan SHA-256
  const hashedKey = hashKey(secretKey);

  // Enkripsi teks dengan AES menggunakan kunci yang sudah di-hash
  const encryptedText = CryptoJS.AES.encrypt(inputText, hashedKey).toString();
  document.getElementById('outputText').value = encryptedText;
}

// Fungsi Decrypt dengan AES
function decryptText() {
  const inputText = document.getElementById('inputText').value;
  const secretKey = document.getElementById('secretKey').value;

  // Hash kunci rahasia dengan SHA-256
  const hashedKey = hashKey(secretKey);

  try {
    // Dekripsi teks dengan AES menggunakan kunci yang sudah di-hash
    const bytes = CryptoJS.AES.decrypt(inputText, hashedKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    if (decryptedText) {
      document.getElementById('outputText').value = decryptedText;
    } else {
      alert("Kunci tidak valid atau teks terenkripsi salah.");
    }
  } catch (e) {
    alert("Kesalahan saat dekripsi. Pastikan teks dan kunci benar.");
  }
}