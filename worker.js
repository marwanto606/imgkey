export default {
  async fetch(request, env, ctx) {
    if (request.method === "GET") {
      return new Response(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Image Analysis Tool - Image Keyword Analyzer - by Marwanto606</title>
    <meta name="description" content="Analyze and enhance your images with our advanced AI-powered image analysis tool. Extract text, detect objects, improve image quality, and more with our state-of-the-art AI technology.">
    <link rel="icon" href="https://www.marwanto606.com/favicon.ico" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
            body {
              background-color: #212529;
              color: #f8f9fa;
              min-height: 100vh;
              padding: 20px;
            }
            .navbar-dark {
              background-color: rgba(33, 37, 41, 0.95);
              border-bottom: 1px solid #495057;
            }
            .dark-mode {
              background-color: #212529 !important;
              color: #f8f9fa !important;
            }
            .light-mode {
              background-color: #f8f9fa;
              color: #212529;
            }
            .upload-box {
              border: 2px dashed #6c757d;
              padding: 2rem;
              border-radius: 10px;
              cursor: pointer;
              transition: border-color 0.3s ease;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              margin-bottom: 1rem;
            }
            .upload-box.dragover {
              border-color: #0d6efd;
              background-color: rgba(13, 110, 253, 0.1);
            }
            .upload-box:hover {
              border-color: #0d6efd;
            }
            .upload-box input[type="file"] {
              display: none;
            }
            .preview-image {
              max-width: 100%;
              max-height: 300px;
              margin-top: 1rem;
              border-radius: 5px;
            }
            .result {
              margin-top: 2rem;
            }
            .copy-button {
              position: absolute;
              top: 0.5rem;
              right: 0.5rem;
            }
            .card {
              background-color: #343a40;
              border: 1px solid #495057;
            }
            .card-body {
              position: relative;
            }
            .card-text {
              color: white;
            }
            @media (max-width: 767.98px) {
              .upload-box {
                margin-bottom: 1.5rem;
              }
              .result {
                margin-top: 1rem;
              }
            }
            .toast {
              position: fixed;
              bottom: 20px;
              right: 20px;
              background-color: #343a40;
              color: white;
              padding: 10px 20px;
              border-radius: 4px;
              display: none;
              animation: slideIn 0.3s ease-out;
              z-index: 1000;
            }
            
            @keyframes slideIn {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
            
            .toast.show {
              display: block;
              animation: slideOut 0.3s ease-out 2.5s forwards;
            }
            
            @keyframes slideOut {
              from { transform: translateX(0); }
              to { transform: translateX(100%); }
            }
          </style>
        </head>
        <body>
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container">
          <a class="navbar-brand" href="/">Image Analyzer AI</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="/">Beranda</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.marwanto606.com">Blog</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://gallery.marwanto606.com">Gallery</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://stock.adobe.com/uk/contributor/211929995/Marwanto">Buy Image</a>
              </li>
            </ul>
            <button class="btn btn-outline-light" id="darkModeToggle">
              <span id="darkModeText">🌙 Dark</span>
            </button>
          </div>
        </div>
      </nav>

          <div class="container mt-5">
            <h1 class="text-center mb-4">Image Analyzer AI</h1>
            <div class="row">
              <!-- Kolom Kiri: Upload Gambar -->
              <div class="col-md-6">
                <div class="upload-box" id="dropZone" ondrop="dropHandler(event)" ondragover="dragHandler(event)" ondragleave="dragLeaveHandler(event)">
                  <input type="file" id="fileInput" name="image" accept="image/*" required />
                  <label for="fileInput">Click to upload an image or drag and drop</label>
                  <img id="previewImage" src="#" alt="Preview" class="preview-image d-none" />
                </div>
                <button type="button" class="btn btn-primary mt-3 w-100" id="analyzeButton" onclick="analyzeImage()">
                  <span id="buttonText">Analyze Image</span>
                  <span id="loadingSpinner" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                </button>
              </div>

              <!-- Kolom Kanan: Hasil Analisis -->
              <div class="col-md-6">
                <div class="result" id="resultSection" style="display: none;">
                    <div class="mb-3 position-relative">
                    <h3>Title:</h3>
                    <div class="card">
                      <div class="card-body">
                        <p id="titleText" class="card-text"></p>
                        <button class="btn btn-sm btn-secondary copy-button" onclick="copyToClipboard('titleText')">Copy</button>
                      </div>
                    </div>
                  </div>
                  <div class="position-relative">
                    <h3>Keywords:</h3>
                    <div class="card">
                      <div class="card-body">
                        <p id="keywordText" class="card-text"></p>
                        <button class="btn btn-sm btn-secondary copy-button" onclick="copyToClipboard('keywordText')">Copy</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
          <script>
          // Dark mode toggle function
          function toggleDarkMode() {
            const body = document.body;
            const isDark = localStorage.getItem('darkMode') === 'true';
            
            if (isDark) {
              body.classList.remove('dark-mode');
              body.classList.add('light-mode');
              localStorage.setItem('darkMode', 'false');
              document.getElementById('darkModeText').textContent = '🌙 Dark';
            } else {
              body.classList.remove('light-mode');
              body.classList.add('dark-mode');
              localStorage.setItem('darkMode', 'true');
              document.getElementById('darkModeText').textContent = '🌞 Light';
            }
          }
          
          // Check for dark mode on page load
          window.onload = function() {
            const isDark = localStorage.getItem('darkMode') === 'true';
            if (isDark) {
              document.body.classList.add('dark-mode');
              document.getElementById('darkModeText').textContent = '🌞 Light';
            } else {
              document.body.classList.add('light-mode');
            }
          };

            // Event listener for dark mode toggle
            document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

            // Handle drag and drop
            const dropZone = document.getElementById('dropZone');
            const fileInput = document.getElementById('fileInput');

            function dragHandler(e) {
              e.preventDefault();
              e.stopPropagation();
              dropZone.classList.add('dragover');
            }

            function dragLeaveHandler(e) {
              e.preventDefault();
              e.stopPropagation();
              dropZone.classList.remove('dragover');
            }

            function dropHandler(e) {
              e.preventDefault();
              e.stopPropagation();
              dropZone.classList.remove('dragover');
              
              const dt = e.dataTransfer;
              const files = dt.files;
              handleFiles(files);
            }

            function handleFiles(files) {
              const file = files[0];
              if (file && file.type.startsWith('image/')) {
                fileInput.files = files;
                const reader = new FileReader();
                reader.onload = function(e) {
                  const previewImage = document.getElementById('previewImage');
                  previewImage.src = e.target.result;
                  previewImage.classList.remove('d-none');
                };
                reader.readAsDataURL(file);
              } else {
                alert('Please drop an image file');
              }
            }

            // Show image preview when a file is selected
            fileInput.addEventListener('change', function(event) {
              const files = event.target.files;
              handleFiles(files);
            });

            // Handle image analysis
            async function analyzeImage() {
              const files = fileInput.files;
              if (!files || files.length === 0) {
                alert('Please upload an image first.');
                return;
              }

              // Show loading state
              const buttonText = document.getElementById('buttonText');
              const loadingSpinner = document.getElementById('loadingSpinner');
              const analyzeButton = document.getElementById('analyzeButton');
              buttonText.textContent = 'Analyzing...';
              loadingSpinner.classList.remove('d-none');
              analyzeButton.disabled = true;

              const formData = new FormData();
              formData.append('image', files[0]);

              try {
                const response = await fetch('/', {
                  method: 'POST',
                  body: formData,
                });
                const result = await response.json();
                if (result.title && result.keywords) {
                  document.getElementById('titleText').textContent = result.title;
                  document.getElementById('keywordText').textContent = result.keywords;
                  document.getElementById('resultSection').style.display = 'block';
                }
              } catch (error) {
                alert('An error occurred while analyzing the image.');
              } finally {
                // Reset button state
                buttonText.textContent = 'Analyze Image';
                loadingSpinner.classList.add('d-none');
                analyzeButton.disabled = false;
              }
            }

            function copyToClipboard(elementId) {
              const text = document.getElementById(elementId).textContent;
              navigator.clipboard.writeText(text).then(() => {
                showToast('Copied to clipboard!');
              }).catch(() => {
                showToast('Failed to copy text.');
              });
            }
            
            function showToast(message) {
              const toast = document.createElement('div');
              toast.className = 'toast show';
              toast.textContent = message;
              
              document.body.appendChild(toast);
              
              setTimeout(() => {
                toast.remove();
              }, 3000);
            }
          </script>
        </body>
        </html>`,
        {
          headers: { "Content-Type": "text/html" },
        }
      );
    }

    if (request.method === "POST") {
      try {
        const contentType = request.headers.get("Content-Type") || "";
        if (!contentType.includes("multipart/form-data")) {
          return new Response(JSON.stringify({ error: "Invalid content type" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const formData = await request.formData();
        const file = formData.get("image");

        if (!file || !file.name || !file.type.startsWith("image/")) {
          return new Response(JSON.stringify({ error: "Invalid image file" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const fileBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(fileBuffer);
        const imageArray = Array.from(uint8Array);

        const payload = {
          prompt: `
            Analyze the provided image and generate:
            1. A descriptive, specific, SEO-friendly title (about 10-15 words), title should include a descriptive phrase, it should be engaging, keyword-rich, and accurate.
            2. A list of exactly 30 relevant English keywords or short phrases. Each keyword must be concise (max 2 words) and specific. separated by commas. Focus on visual elements, mood, style, and subject matter.
            
            Format your response exactly as:
            title: [descriptive title here]
            keywords: [keyword1, keyword2, keyword3, ..., keyword30]
            
            Do not include any additional explanations or text. Only provide the title and keywords in the specified format.
          `,
          image: imageArray,
        };

        async function callAI(imageArray) {
          const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.2-11b-vision-instruct`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${env.CLOUDFLARE_AUTH_TOKEN}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                prompt: payload.prompt,
                image: imageArray,
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`AI API returned status ${response.status}`);
          }

          const result = await response.json();
          return result;
        }

        async function checkAIOkay(imageArray) {
          let retries = 0;
          const maxRetries = 3;

          while (retries < maxRetries) {
            try {
              const aiResult = await callAI(imageArray);
              const aiResponse = aiResult.result.response;

              const titleMatch = aiResponse.match(/title:\s*(.*?)\s*keywords:/i);
              const keywordMatch = aiResponse.match(/keywords:\s*(.*)/i);

              const title = titleMatch ? titleMatch[1].trim() : "No title generated";
              const keywords = keywordMatch ? 
                keywordMatch[1].trim().split(',').map(k => k.trim().toLowerCase()).join(', ') : 
                "No keywords generated";

              if (title !== "No title generated" && keywords !== "No keywords generated") {
                return { title, keywords };
              } else {
                retries++;
                if (retries >= maxRetries) {
                  throw new Error("AI failed to generate valid title and keywords after maximum retries");
                }
                console.log(`Retrying AI call (attempt ${retries + 1}/${maxRetries})...`);
              }
            } catch (error) {
              retries++;
              if (retries >= maxRetries) {
                throw new Error(`AI call failed after ${maxRetries} attempts: ${error.message}`);
              }
              console.error(`AI call failed, retrying... (${retries + 1}/${maxRetries})`);
            }
          }
        }

        const { title, keywords } = await checkAIOkay(imageArray);

        const finalResult = {
          title: title,
          keywords: keywords,
        };

        return new Response(JSON.stringify(finalResult), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  },
};
