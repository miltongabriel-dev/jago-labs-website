const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');
if(menuButton&&nav){menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menuButton.setAttribute('aria-expanded','false');nav.classList.remove('open')}))}
document.getElementById('year').textContent=new Date().getFullYear();

document.querySelectorAll('.popup-link').forEach(link=>{
  link.addEventListener('click',e=>{
    if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    e.preventDefault();
    const w=430,h=860;
    const left=Math.round((window.screen.availWidth-w)/2);
    const top=Math.round((window.screen.availHeight-h)/2);
    const popup=window.open(link.href,link.dataset.popupName||'_blank',`width=${w},height=${h},left=${left},top=${top}`);
    if(popup){
      const enforceSize=()=>{try{popup.resizeTo(w,h);popup.moveTo(left,top);}catch(err){}};
      enforceSize();
      setTimeout(enforceSize,400);
      setTimeout(enforceSize,1200);
    }
  });
});
const contactModal=document.getElementById('contactModal');
const contactForm=document.getElementById('contactForm');
let lastFocused=null;
function openContactModal(e){
  if(e)e.preventDefault();
  lastFocused=document.activeElement;
  contactModal.classList.add('open');
  contactModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  document.getElementById('contactName').focus();
}
function closeContactModal(){
  contactModal.classList.remove('open');
  contactModal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  if(lastFocused)lastFocused.focus();
}
document.querySelectorAll('[data-open-contact]').forEach(el=>el.addEventListener('click',openContactModal));
document.getElementById('contactModalClose').addEventListener('click',closeContactModal);
contactModal.addEventListener('click',e=>{if(e.target===contactModal)closeContactModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&contactModal.classList.contains('open'))closeContactModal()});
contactForm.addEventListener('submit',e=>{
  e.preventDefault();
  const name=contactForm.name.value.trim();
  const contact=contactForm.contact.value.trim();
  const message=contactForm.message.value.trim();
  const subject=encodeURIComponent(`New contact from ${name||'the JAGO Labs site'}`);
  const body=encodeURIComponent(`Name: ${name}\nContact: ${contact}\n\n${message}`);
  window.location.href=`mailto:info@jagolabs.tech?subject=${subject}&body=${body}`;
});

const sections=[...document.querySelectorAll('main section[id]')];const navLinks=[...document.querySelectorAll('.nav a')];
const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;const activeHref=visible.target.id==='about'?'#top':`#${visible.target.id}`;navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===activeHref))},{threshold:[.25,.5,.75]});sections.forEach(section=>observer.observe(section));
