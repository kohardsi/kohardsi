    function beautifyCode() {
      const language = document.getElementById('languageSelect').value;
      const input = document.getElementById('codeInput').value;
      const indentSize = parseInt(document.getElementById('indentSize').value);
      let beautified;
      let detectedLanguage = language;

      if (language === 'auto') {
        if (input.trim().startsWith('<')) {
          detectedLanguage = 'html';
        } else if (input.trim().startsWith('{') || input.includes('function')) {
          detectedLanguage = 'js';
        } else {
          detectedLanguage = 'css';
        }
      }

      if (detectedLanguage === 'js') {
        beautified = js_beautify(input, { indent_size: indentSize, space_in_empty_paren: true });
        document.getElementById('codeOutput').className = 'language-javascript';
      } else if (detectedLanguage === 'html') {
        beautified = html_beautify(input, { indent_size: indentSize });
        document.getElementById('codeOutput').className = 'language-markup';
      } else if (detectedLanguage === 'css') {
        beautified = css_beautify(input, { indent_size: indentSize });
        document.getElementById('codeOutput').className = 'language-css';
      }

      document.getElementById('codeOutput').textContent = beautified;
      Prism.highlightElement(document.getElementById('codeOutput'));
    }

    function copyToClipboard(elementId) {
      const codeOutput = document.getElementById(elementId);
      const textArea = document.createElement('textarea');
      textArea.value = codeOutput.textContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }