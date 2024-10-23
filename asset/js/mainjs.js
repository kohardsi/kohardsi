document.getElementById("my-contact").innerHTML = `
<a data-bs-toggle="tooltip" class="p-2 nav-link" target="_blank" href="https://www.instagram.com/teja7x" title="instagram"><i class="bi bi-instagram"></i></a>
<a data-bs-toggle="tooltip" class="p-2 nav-link" target="_blank" href="https://fb.com/tejasukmana99" title="facebook"><i class="bi bi-facebook"></i></a>
<a data-bs-toggle="tooltip" class="p-2 nav-link" target="_blank" href="https://wa.me/6283826361773" title="whatsapp"><i class="bi bi-whatsapp"></i></a>
`;

document.getElementById("menu-list").innerHTML = `
<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
  <li class="nav-item"><a data-bs-toggle="tooltip" class="nav-link disabled" href="#!" title="Professional">Professional</a></li>
  <li class="nav-item"><a data-bs-toggle="tooltip" class="nav-link disabled" href="#!" title="Experience">Experience</a></li><li class="nav-item"><a data-bs-toggle="tooltip" class="nav-link disabled" href="#!" title="Portfolio">Portfolio</a></li>
  <li class="nav-item"><a data-bs-toggle="tooltip" class="nav-link" href="./form-diskusi.html" title="Form Diskusi">Form Diskusi</a></li>
  <li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Tools</a>
    <ul class="dropdown-menu">
    <li><a data-bs-toggle="tooltip" class="dropdown-item" href="./kalkulator-zodiak.html" title="Melihat Zodiak" target="_blank">Zodiak Check</a></li>
    <li><a data-bs-toggle="tooltip" class="dropdown-item" href="./qr-code-generator.html" title="QR Generator" target="_blank">QR Generator</a></li>
    <li><a data-bs-toggle="tooltip" class="dropdown-item" href="./Base64-Encode.html" title="Base64 Encode" target="_blank">Base64 Encode</a></li>
    <li><a data-bs-toggle="tooltip" class="dropdown-item" href="./Advanced-Code-Beautifier.html" title="Code Beautifier" target="_blank">Code Beautifier</a></li><li>
    <li><a data-bs-toggle="tooltip" class="dropdown-item" href="./Encrypt-and-Hash-AES-SHA-256.html" title="Code Beautifier" target="_blank">DnE AES & SHA-256</a></li><li>
    <hr class="dropdown-divider"></li><li><a data-bs-toggle="tooltip" class="dropdown-item disabled" href="#" title="Something else here">Something else here</a></li>
    </ul></li>
</ul>
`;
var tooltipTriggerList=[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')),tooltipList=tooltipTriggerList.map((function(t){return new bootstrap.Tooltip(t)}));