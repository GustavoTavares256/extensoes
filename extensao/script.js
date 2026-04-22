const form = document.querySelector('form');
const input = document.querySelector('.input'); // Certifique-se que a classe existe no HTML

const replaceImages = (url) => { 
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    img.src = url;
  });
};

form.addEventListener('submit', async (event) => { 
  event.preventDefault();

  const url = input.value.trim();
  if (!url) return; // Evita executar se o input estiver vazio

  // Busca a aba ativa
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab?.id) {
    chrome.scripting.executeScript({ 
      target: { tabId: tab.id }, 
      func: replaceImages, // 'func' é o padrão atual, embora 'function' ainda funcione
      args: [url]
    });
  }
})