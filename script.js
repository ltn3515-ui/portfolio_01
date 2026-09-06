document.addEventListener('DOMContentLoaded',()=>{
const menu=document.querySelector('#menu'),nav=document.querySelector('#nav'),gnb=document.querySelector('#gnb');
menu.addEventListener('click',()=>{const on=nav.classList.toggle('open');menu.setAttribute('aria-expanded',on)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
addEventListener('scroll',()=>gnb.classList.toggle('scrolled',scrollY>40),{passive:true});
const links=[...nav.querySelectorAll('a')];document.querySelectorAll('main section[id]').forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.hash===`#${e.target.id}`))}),{rootMargin:'-45% 0px -45%'}).observe(s));
document.querySelectorAll('.acc').forEach(item=>item.querySelector('button').addEventListener('click',()=>{const open=!item.classList.contains('open');document.querySelectorAll('.acc').forEach(x=>{x.classList.remove('open');x.querySelector('button').setAttribute('aria-expanded','false')});item.classList.toggle('open',open);item.querySelector('button').setAttribute('aria-expanded',open)}));
const toast=document.querySelector('#toast');
if(window.gsap&&!matchMedia('(prefers-reduced-motion: reduce)').matches){gsap.registerPlugin(ScrollTrigger);gsap.from('.hero-copy>*',{y:24,opacity:0,duration:.7,stagger:.08,ease:'power3.out'});gsap.from('.hero-art',{scale:.96,opacity:0,duration:.9});gsap.utils.toArray('.section').forEach(s=>{const t=[...s.querySelectorAll('header,.intro,.skills>*,.project,.board>*,.mio-top,.pack>*,.pipeline,.episodes>*,.acc')];if(t.length)gsap.from(t,{y:28,opacity:0,duration:.7,stagger:.06,ease:'power2.out',scrollTrigger:{trigger:s,start:'top 82%',once:true}})})}
});
