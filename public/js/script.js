const videos = [
  'media/videos/homepage_bg_01.mp4',
  'media/videos/homepage_bg_02.mp4',
  'media/videos/homepage_bg_05.mp4',
  'media/videos/homepage_bg_04.mp4',
  'media/videos/homepage_bg_05.mp4',
];

const textos = [
  { titulo: "Luzes da Cidade", autor: "Carlos Pinto", ano: "2019" },
  { titulo: "Inverno Breve", autor: "lara salgado", ano: "2023" },
  { titulo: "Noite Serena", autor: "Ana Costa", ano: "2023" },
  { titulo: "Ruído Azul", autor: "Pedro Correia", ano: "2021" },
  { titulo: "Memória Falsa", autor: "André Lobo", ano: "2021" }
];

let currentIndex = 0;

const videoElement = document.getElementById('bg-video');
const textOverlay = document.getElementById('text-overlay');

function changeVideo() {
  currentIndex = (currentIndex + 1) % videos.length;
  videoElement.src = videos[currentIndex];
  videoElement.load();
  videoElement.play();

  const { titulo, autor, ano } = textos[currentIndex];

  textOverlay.style.opacity = 0;

  setTimeout(() => {
    textOverlay.innerHTML = `
      <div class="videoinfo">
        <h1 class="videotitle">${titulo}</h1>
        <div class="videodetails">
          <p class="videoauthor">${autor}</p>
          <p class="videoyear">${ano}</p>
        </div>
      </div>
    `;
    textOverlay.style.opacity = 1;
  }, 300);

  setTimeout(changeVideo, 3000); // Troca de vídeo a cada 3 segundos
}

changeVideo(); // Inicia a rotação dos vídeos