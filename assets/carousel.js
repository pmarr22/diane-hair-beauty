/* Reviews: stacked cards that rotate by themselves; FAQ: one open at a time */
(function(){
  var st=document.querySelector('.rvstage');
  if(st){
    var cards=[].slice.call(st.querySelectorAll('.rvc')), dots=[].slice.call(document.querySelectorAll('.rvdots button')), i=0, timer;
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function show(n){
      i=(n+cards.length)%cards.length;
      cards.forEach(function(c,k){ var d=(k-i+cards.length)%cards.length; c.setAttribute('data-p',d>2?2:d); c.setAttribute('aria-hidden',d?'true':'false'); });
      dots.forEach(function(b,k){ b.classList.toggle('on',k===i); });
    }
    function play(){ clearInterval(timer); if(!reduce) timer=setInterval(function(){ show(i+1); },5200); }
    dots.forEach(function(b,k){ b.addEventListener('click',function(){ show(k); play(); }); });
    st.addEventListener('mouseenter',function(){ clearInterval(timer); });
    st.addEventListener('mouseleave',play);
    st.addEventListener('click',function(){ show(i+1); play(); });
    show(0); play();
  }
  var ds=[].slice.call(document.querySelectorAll('.faqlist details'));
  ds.forEach(function(d){ d.addEventListener('toggle',function(){ if(d.open) ds.forEach(function(o){ if(o!==d) o.open=false; }); }); });
})();

/* Services: tabs advance by themselves (pause on hover/touch, only while visible) */
(function(){
  var tabs=[].slice.call(document.querySelectorAll('.svtabs button')), sec=document.getElementById('services');
  if(!tabs.length||!sec) return;
  var box=document.querySelector('.svtabs'); box.classList.add('auto');
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tm, vis=false, hov=false;
  function cur(){ for(var i=0;i<tabs.length;i++) if(tabs[i].classList.contains('on')) return i; return 0; }
  function arm(){ clearTimeout(tm); if(reduce||!vis||hov) return; tm=setTimeout(function(){ tabs[(cur()+1)%tabs.length].click(); },6500); }
  tabs.forEach(function(b){ b.addEventListener('click',function(){ setTimeout(arm,0); }); });
  sec.addEventListener('mouseenter',function(){ hov=true; box.classList.add('paused'); clearTimeout(tm); });
  sec.addEventListener('mouseleave',function(){ hov=false; box.classList.remove('paused'); arm(); });
  sec.addEventListener('touchstart',function(){ hov=true; box.classList.add('paused'); clearTimeout(tm); setTimeout(function(){ hov=false; box.classList.remove('paused'); arm(); },14000); },{passive:true});
  if('IntersectionObserver' in window) new IntersectionObserver(function(es){ vis=es[0].isIntersecting; arm(); },{threshold:.25}).observe(sec); else { vis=true; arm(); }
})();

/* Tarifs page: scroll-spy on the category pills */
(function(){
  var links=[].slice.call(document.querySelectorAll('.tp-nav a')); if(!links.length||!('IntersectionObserver' in window)) return;
  var map={}; links.forEach(function(a){ map[a.getAttribute('href').slice(1)]=a; });
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ links.forEach(function(a){a.classList.remove('on')}); var a=map[e.target.id]; if(a) a.classList.add('on'); } }); },{rootMargin:'-35% 0px -55% 0px'});
  [].slice.call(document.querySelectorAll('.tp-cat')).forEach(function(s){ io.observe(s); });
})();
