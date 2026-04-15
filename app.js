// ============================================
// INTRO VIDEO OVERLAY (MOBILE ONLY)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const introOverlay = document.getElementById('intro-overlay');
  const introVideo = document.getElementById('intro-video');
  const skipBtn = document.getElementById('skip-intro');

  const isMobile = window.innerWidth < 769;

  if (!isMobile) {
    if (introOverlay) introOverlay.remove();
  } else {
    document.body.classList.add('no-scroll');

    const dismissIntro = () => {
      if (!introOverlay) return;
      introOverlay.classList.add('hidden');
      document.body.classList.remove('no-scroll');
      setTimeout(() => introOverlay.remove(), 600);
    };

    if (introVideo) {
      introVideo.addEventListener('ended', dismissIntro);
      introVideo.addEventListener('error', dismissIntro);
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', dismissIntro);
    }

    setTimeout(dismissIntro, 8000);
  }

  // ============================================
  // CAROUSEL: AUTO-SCROLL INFINITE LOOP
  // ============================================
  const track = document.getElementById('carousel-track');
  if (track) {
    const slides = track.innerHTML;
    track.innerHTML = slides + slides;
  }

  // ============================================
  // INTERACTIVE CHAT SIMULATION - SECTION 4
  // ============================================
  const chatMessages = document.getElementById('chat-messages');
  const chatName = document.getElementById('section4-chat-name');
  const chatStatus = document.getElementById('section4-chat-status');
  const chatAvatar = document.getElementById('section4-chat-avatar');

  if (!chatMessages) return;

  const chatScript = [
    { type: 'sticker', speaker: 'Agustín', avatar: 'A', avatarBg: '#076fcc', status: 'en línea', src: 'assets/12.png', delay: 1500 },
    { type: 'bot', speaker: 'Agustín', avatar: 'A', avatarBg: '#076fcc', status: 'escribiendo...', text: '¡Buen día! Recibimos su consulta operativa.', delay: 1200 },
    { type: 'system', text: 'Transfiriendo a Prevención y Control...', src: '', delay: 1000 },
    { type: 'sticker', speaker: 'Tacarigua', avatar: 'T', avatarBg: '#1e1e1e', status: 'conectado', src: 'assets/13.png', delay: 1500 },
    { type: 'bot', speaker: 'Tacarigua', avatar: 'T', avatarBg: '#1e1e1e', status: 'verificando...', text: 'He recibido su caso. Detectamos una infracción pendiente en el sistema.', delay: 1800 },
    { type: 'bot', speaker: 'Tacarigua', avatar: 'T', avatarBg: '#1e1e1e', status: 'generando', text: 'Se ha emitido la boleta 55421. Puedes pagarlo inmediatamente con Agustín.', delay: 2000 }
  ];

  let chatIndex = 0;

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typing;
  }

  function syncHeader(item) {
    if (!item.speaker || !chatName || !chatStatus || !chatAvatar) return;

    chatName.textContent = item.speaker;
    chatStatus.textContent = item.status || 'activo';
    chatAvatar.textContent = item.avatar || item.speaker.charAt(0);
    chatAvatar.style.background = item.avatarBg || '#076fcc';
  }

  function addMessage(item) {
    syncHeader(item);

    if (item.type === 'bot') {
      const el = document.createElement('div');
      el.className = 'chat-bubble bot';
      el.textContent = item.text;
      chatMessages.appendChild(el);
    } else if (item.type === 'user') {
      const el = document.createElement('div');
      el.className = 'chat-bubble user';
      el.textContent = item.text;
      chatMessages.appendChild(el);
    } else if (item.type === 'sticker') {
      const el = document.createElement('div');
      el.className = 'chat-sticker' + (item.align === 'right' ? ' chat-sticker-right' : '');
      el.innerHTML = '<img src="' + item.src + '" alt="sticker">';
      chatMessages.appendChild(el);
    } else if (item.type === 'system') {
      const el = document.createElement('div');
      el.className = 'chat-bubble system';
      el.textContent = item.text;
      chatMessages.appendChild(el);
    }

    chatMessages.scrollTo({
      top: chatMessages.scrollHeight,
      behavior: 'smooth'
    });
  }

  function playChat() {
    if (chatIndex >= chatScript.length) {
      setTimeout(() => {
        chatMessages.innerHTML = '';
        chatIndex = 0;
        playChat();
      }, 3200);
      return;
    }

    const item = chatScript[chatIndex];
    const typing = (item.type === 'bot' || item.type === 'sticker') ? showTyping() : null;
    const typingDelay = typing ? 700 : 0;

    setTimeout(() => {
      if (typing) typing.remove();
      addMessage(item);
      chatIndex += 1;
      setTimeout(playChat, item.delay);
    }, typingDelay);
  }

  setTimeout(playChat, 1200);
});
