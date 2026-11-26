
const DIAS = {
  "2026-09-20": { nota: "o dia em que tudo começou", fotos: ["fotos/IMG_4523.jpg", "fotos/PHOTO-2026-11-16-23-51-48(1).jpg", "fotos/PHOTO-2026-11-16-23-51-48(2).jpg" ] },
  "2026-09-27": { nota: "nosso primeiro rodizio de docinhos e passeio de guarda chuva",  fotos: ["fotos/PHOTO-2026-11-16-23-51-49.jpg", "fotos/PHOTO-2026-11-16-23-51-48.jpg", "fotos/PHOTO-2026-09-27-00-48-56 (1).jpg","fotos/PHOTO-2026-09-27-00-48-56.jpg" ] },
  "2026-10-03": { nota: "primeiro rancho(ou quase isso), primeira vez dormindo juntos na minha casa e primeira vez jogando o jogo favorito dela.", fotos: ["fotos/PHOTO-2026-10-04-18-34-09(2).jpg", "fotos/PHOTO-2026-11-16-23-51-50(1).jpg", "fotos/PHOTO-2026-11-16-23-51-51.jpg"] },
  "2026-10-04": { nota: "primeira florzinha", fotos: ["fotos/PHOTO-2026-10-12-23-42-40.jpg"]},
  "2026-10-17": { nota: "karaoke", fotos: ["fotos/IMG_4638.jpg", "fotos/IMG_2853.jpg", "fotos/IMG_4639.jpg"]},
  "2026-10-31": { nota: "conheci o Freud", fotos: ["fotos/IMG_4712.jpg"]},
  "2026-11-01": { nota: "mercado comprando docinhos", fotos: ["fotos/PHOTO-2026-11-16-23-51-52(2).jpg", "fotos/PHOTO-2026-11-16-23-51-52.jpg"]},  
  "2026-11-07": { nota: "primeiro dia na casa da tia dela", fotos: ["fotos/1.jpg", "fotos/2.jpg", "fotos/5.jpg"]},
  "2026-11-08": { nota: "dia de soneca com o Freud e o show do  Afonso Padilha", fotos: ["fotos/IMG_4730.jpg", "fotos/IMG_4735.jpg", "fotos/PHOTO-2026-11-10-00-14-55.jpg"]},
  "2026-11-14": { nota: "dia de parque com sogrão e os tios dela", fotos: ["fotos/PHOTO-2026-11-14-19-27-56(1).jpg", "fotos/PHOTO-2026-11-14-19-27-56.jpg" , "fotos/PHOTO-2026-11-16-23-51-54.jpg", "fotos/IMG_4774.jpg"]},
  "2026-11-20": { nota: "chegando na casa dela", fotos: ["fotos/IMG_4803.jpg"]},
  "2026-11-21": { nota: "dia de Cucko", fotos: ["fotos/IMG_4807.jpg"]},
  "2026-11-27": { nota: "o dia em que oficialmente(e finalmente) eu pedi ela em namoro", fotos: ["fotos/IMG_4819.jpg"]},


};

const CORACAO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#fff1c2"/><path fill="#f0a63a" opacity=".6" transform="translate(70 70) scale(2.5)" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
);

const grade = document.getElementById('grade');
const tituloMes = document.getElementById('titulo-mes');
const painel = document.getElementById('painel');
const fotosEl = document.getElementById('fotos');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

const hoje = new Date();
let ano = 2026;
let mes = 8;
let selecionado = null;

const pad = n => String(n).padStart(2, '0');
const maiuscula = s => s.charAt(0).toUpperCase() + s.slice(1);
const chave = (a, m, d) => `${a}-${pad(m + 1)}-${pad(d)}`;

const inicio = new Date(2026, 8, 15);
const dias = Math.floor((new Date() - inicio) / 86400000);
document.getElementById('total').textContent = dias;

function desenhar() {
  grade.innerHTML = '';
  tituloMes.textContent = maiuscula(new Date(ano, mes, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }));

  ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].forEach(l => {
    const el = document.createElement('div');
    el.className = 'dia-semana';
    el.textContent = l;
    grade.appendChild(el);
  });

  const primeiro = new Date(ano, mes, 1).getDay();
  const total = new Date(ano, mes + 1, 0).getDate();

  for (let i = 0; i < primeiro; i++) {
    const v = document.createElement('div');
    v.className = 'dia vazio';
    grade.appendChild(v);
  }

  for (let d = 1; d <= total; d++) {
    const k = chave(ano, mes, d);
    const btn = document.createElement('button');
    btn.className = 'dia';
    btn.type = 'button';
    btn.innerHTML = `<span class="num">${d}</span>`;

    if (d === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) btn.classList.add('hoje');
    if (DIAS[k]) {
      btn.classList.add('com-coracao');
      btn.innerHTML += CORACAO;
      btn.setAttribute('aria-label', `Dia ${d}, ver fotos`);
      btn.addEventListener('click', () => abrir(k, btn));
    } else {
      btn.tabIndex = -1;
    }
    if (k === selecionado) btn.classList.add('selecionado');
    grade.appendChild(btn);
  }
}

function abrir(k, btn) {
  selecionado = k;
  document.querySelectorAll('.dia.selecionado').forEach(e => e.classList.remove('selecionado'));
  btn.classList.add('selecionado');

  const [a, m, d] = k.split('-').map(Number);
  document.getElementById('painel-titulo').textContent =
    maiuscula(new Date(a, m - 1, d).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
  const nota = document.getElementById('painel-nota');
  nota.textContent = DIAS[k].nota || '';
  nota.style.display = DIAS[k].nota ? 'block' : 'none';

  fotosEl.innerHTML = '';
  DIAS[k].fotos.forEach((src, i) => {
    const img = document.createElement('img');
    img.alt = `Foto de ${k}`;
    img.loading = 'lazy';
    img.style.animationDelay = `${0.25 + i * 0.2}s`;
    img.onerror = () => { img.onerror = null; img.src = PLACEHOLDER; };
    img.src = src;
    img.addEventListener('click', () => { lightboxImg.src = img.src; lightbox.classList.add('aberto'); });
    fotosEl.appendChild(img);
  });

  painel.classList.add('aberto');
  painel.classList.remove('visivel');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    painel.classList.add('visivel');
    painel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
}

function fechar() {
  painel.classList.remove('visivel');
  selecionado = null;
  document.querySelectorAll('.dia.selecionado').forEach(e => e.classList.remove('selecionado'));
  setTimeout(() => { if (!painel.classList.contains('visivel')) painel.classList.remove('aberto'); }, 600);
}

document.getElementById('fechar').addEventListener('click', fechar);
document.getElementById('anterior').addEventListener('click', () => { mes--; if (mes < 0) { mes = 11; ano--; } desenhar(); });
document.getElementById('proximo').addEventListener('click', () => { mes++; if (mes > 11) { mes = 0; ano++; } desenhar(); });
lightbox.addEventListener('click', () => lightbox.classList.remove('aberto'));
document.addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.classList.remove('aberto'); });

desenhar();