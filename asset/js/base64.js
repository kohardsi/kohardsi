        function convertTextToBase64() {
            const text = document.getElementById('inputText').value;
            const inputType = document.getElementById('inputType').value;
            const mimeType = detectMimeType(text, inputType);
            const base64String = btoa(text);
            displayResult(base64String, mimeType);
        }

        function detectMimeType(text, inputType) {
            const trimmedText = text.trim();
            if (inputType === 'css' || trimmedText.startsWith('body') || trimmedText.startsWith('.') || trimmedText.startsWith('#')) {
                return 'text/css';
            } else if (inputType === 'javascript' || /^\s*\/\//.test(trimmedText) || /^\s*(function|var|let|const|if|for|while|switch|return|async|await|class)\s/.test(trimmedText)) {
                return 'text/javascript';
            } else {
                return 'text/plain';
            }
        }

        function convertFileToBase64(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64String = e.target.result.split(';base64,').pop();
                    displayResult(base64String, file.type);
                };
                reader.readAsDataURL(file);
            }
        }

        function displayResult(base64String, mimeType) {
            const resultDiv = document.getElementById('result');
            const copyButton = document.getElementById('copyButton');
            resultDiv.style.display = 'block';
            copyButton.style.display = 'block';
            const base64Link = `data:${mimeType};base64,${base64String}`;
            resultDiv.innerHTML = `${base64Link}`;
            resultDiv.dataset.base64 = base64Link;
            copyButton.style.top = `${resultDiv.offsetTop + 5}px`;
            copyButton.style.right = '5px';
        }

        function copyToClipboard() {
            const resultDiv = document.getElementById('result');
            const base64String = resultDiv.dataset.base64;
            navigator.clipboard.writeText(base64String).then(() => {
                alert('Base64 telah disalin ke clipboard');
            }).catch(err => {
                console.error('Gagal menyalin teks ke clipboard: ', err);
            });
        }