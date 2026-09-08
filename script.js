document.addEventListener('DOMContentLoaded',()=>{
const menu=document.querySelector('#menu'),nav=document.querySelector('#nav'),gnb=document.querySelector('#gnb');
menu.addEventListener('click',()=>{const on=nav.classList.toggle('open');menu.setAttribute('aria-expanded',on)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
addEventListener('scroll',()=>gnb.classList.toggle('scrolled',scrollY>40),{passive:true});
const links=[...nav.querySelectorAll('a')];document.querySelectorAll('main section[id]').forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const activeId=e.target.id==='ai-media'?'ai-workflow':e.target.id;links.forEach(a=>a.classList.toggle('active',a.hash===`#${activeId}`))}}),{rootMargin:'-45% 0px -45%'}).observe(s));
document.querySelectorAll('.acc').forEach(item=>item.querySelector('button').addEventListener('click',()=>{const open=!item.classList.contains('open');document.querySelectorAll('.acc').forEach(x=>{x.classList.remove('open');x.querySelector('button').setAttribute('aria-expanded','false')});item.classList.toggle('open',open);item.querySelector('button').setAttribute('aria-expanded',open)}));
const toast=document.querySelector('#toast');document.querySelector('#copy').addEventListener('click',()=>{toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)});
if(window.gsap&&!matchMedia('(prefers-reduced-motion: reduce)').matches){gsap.registerPlugin(ScrollTrigger);gsap.from('.hero-copy>*',{y:24,opacity:0,duration:.7,stagger:.08,ease:'power3.out'});gsap.from('.hero-art',{scale:.96,opacity:0,duration:.9});gsap.utils.toArray('.section').forEach(s=>{const t=[...s.querySelectorAll('header,.intro,.skills>*,.project,.board>*,.ai-workflow-intro,.ai-workflow-grid>*,.ai-principle,.mio-top,.pack>*,.pipeline,.episodes>*,.acc')];if(t.length)gsap.from(t,{y:28,opacity:0,duration:.7,stagger:.06,ease:'power2.out',scrollTrigger:{trigger:s,start:'top 82%',once:true}})})}

// Desktop custom cursor and subtle card tilt interaction.
const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
if(finePointer.matches&&!reducedMotion.matches){
  const cursor=document.createElement('div');
  cursor.className='custom-cursor';
  cursor.setAttribute('aria-hidden','true');
  cursor.innerHTML='<span></span>';
  document.body.append(cursor);
  document.body.classList.add('cursor-enabled');

  let mouseX=innerWidth/2,mouseY=innerHeight/2,cursorX=mouseX,cursorY=mouseY;
  const follow=()=>{
    cursorX+=(mouseX-cursorX)*.2;
    cursorY+=(mouseY-cursorY)*.2;
    cursor.style.transform=`translate3d(${cursorX}px,${cursorY}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(follow);
  };
  follow();

  addEventListener('pointermove',event=>{
    mouseX=event.clientX;mouseY=event.clientY;
    cursor.classList.add('is-visible');
  },{passive:true});
  addEventListener('pointerleave',()=>cursor.classList.remove('is-visible'));
  addEventListener('pointerdown',event=>{
    cursor.classList.add('is-clicking');
    const ripple=document.createElement('i');
    ripple.className='cursor-ripple';
    ripple.style.left=`${event.clientX}px`;
    ripple.style.top=`${event.clientY}px`;
    document.body.append(ripple);
    ripple.addEventListener('animationend',()=>ripple.remove(),{once:true});
  });
  addEventListener('pointerup',()=>cursor.classList.remove('is-clicking'));

  const cursorTargets=[
    ['.project-mockup,.project-links a','VIEW'],
    ['.contact-email-button,.footer-contact a','MAIL'],
    ['.social-connect','SCAN']
  ];
  cursorTargets.forEach(([selector,label])=>document.querySelectorAll(selector).forEach(element=>{
    element.addEventListener('pointerenter',()=>{cursor.classList.add('is-active');cursor.querySelector('span').textContent=label});
    element.addEventListener('pointerleave',()=>{cursor.classList.remove('is-active');cursor.querySelector('span').textContent=''});
  }));
  document.querySelectorAll('a,button,input').forEach(element=>{
    element.addEventListener('pointerenter',()=>cursor.classList.add('is-link'));
    element.addEventListener('pointerleave',()=>cursor.classList.remove('is-link'));
  });

  document.querySelectorAll('.project-mockup,.skills article,.board article,.social-connect').forEach(card=>{
    card.classList.add('tilt-card');
    card.addEventListener('pointermove',event=>{
      const rect=card.getBoundingClientRect();
      const rotateY=((event.clientX-rect.left)/rect.width-.5)*4;
      const rotateX=-((event.clientY-rect.top)/rect.height-.5)*4;
      card.style.setProperty('--tilt-x',`${rotateX}deg`);
      card.style.setProperty('--tilt-y',`${rotateY}deg`);
    });
    card.addEventListener('pointerleave',()=>{
      card.style.setProperty('--tilt-x','0deg');
      card.style.setProperty('--tilt-y','0deg');
    });
  });
}
});
