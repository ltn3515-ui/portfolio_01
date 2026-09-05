const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

const quotes = [
  '“별거 아니네.”',
  '“오늘부터 진짜 인생 바꾼다.”',
  '“10분만 누웠다가…”',
  '“일단 계획은 완벽함.”',
  '“이번에는 진짜다.”',
  '“내일부터…”'
];
const quoteBtn = document.getElementById('randomQuote');
const quoteBox = document.getElementById('quoteBox');
quoteBtn?.addEventListener('click', () => {
  const next = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.animate([{transform:'scale(.96)',opacity:.4},{transform:'scale(1.04)',opacity:1},{transform:'scale(1)',opacity:1}],{duration:350});
  quoteBox.textContent = next;
});

const emotionText = {
  '기본':'평소의 뭉치. 아무 일도 없는데 왠지 자신감이 있습니다.',
  '신남':'계획을 세운 직후의 뭉치. 아직 아무것도 시작하지 않았습니다.',
  '당당':'결과는 모르겠고 일단 태도는 프로입니다.',
  '당황':'예상과 현실이 처음 만난 순간입니다.',
  '슬픔':'5분 정도 좌절하고 다시 간식을 찾습니다.',
  '집중':'놀랍게도 진짜 집중하는 순간도 있습니다.',
  '지침':'의욕이 체력보다 빨리 달렸습니다.',
  '화남':'주로 어제의 자신에게 화가 납니다.',
  '행복':'작은 성공에도 최대 출력으로 행복해합니다.'
};
const emotionButtons = document.querySelectorAll('.emotion-tabs button');
const emotionCopy = document.getElementById('emotionCopy');
emotionButtons.forEach(btn => btn.addEventListener('click', () => {
  emotionButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  emotionCopy.textContent = emotionText[btn.textContent] || '';
}));

const dot = document.querySelector('.cursor-dot');
window.addEventListener('mousemove', e => {
  if (!dot) return;
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
});
document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter',()=>{ if(dot){dot.style.width='28px';dot.style.height='28px';} });
  el.addEventListener('mouseleave',()=>{ if(dot){dot.style.width='12px';dot.style.height='12px';} });
});

const topbar = document.querySelector('.topbar');
window.addEventListener('scroll',()=>{
  topbar.style.boxShadow = window.scrollY > 40 ? '0 10px 35px rgba(17,17,17,.10)' : '0 10px 35px rgba(17,17,17,.06)';
});
