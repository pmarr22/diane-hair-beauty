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

/* Before/after: spotlight one by one (zoom in / zoom out), centred, auto-advancing */
(function(){
  var stage=document.querySelector('.bamq'), track=document.querySelector('.bm-track'); if(!stage||!track) return;
  var figs=[].slice.call(track.querySelectorAll('figure')); if(!figs.length) return;
  var dots=document.createElement('div'); dots.className='bmdots';
  figs.forEach(function(f,k){ var b=document.createElement('button'); b.type='button'; b.setAttribute('aria-label',String(k+1)); b.addEventListener('click',function(){ go(k); arm(); }); dots.appendChild(b); });
  stage.parentNode.insertBefore(dots,stage.nextSibling);
  var i=0,tm,hov=false,vis=false,reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function go(n){ i=(n+figs.length)%figs.length;
    figs.forEach(function(f,k){ f.classList.toggle('on',k===i); });
    [].slice.call(dots.children).forEach(function(b,k){ b.classList.toggle('on',k===i); });
    var f=figs[i]; var off=f.offsetLeft+f.offsetWidth/2-stage.clientWidth/2; track.style.transform='translateX('+(-off)+'px)'; }
  function arm(){ clearTimeout(tm); if(reduce||hov||!vis) return; tm=setTimeout(function(){ go(i+1); arm(); },3400); }
  figs.forEach(function(f,k){ f.addEventListener('click',function(){ if(k!==i){ go(k); arm(); } }); });
  stage.addEventListener('mouseenter',function(){ hov=true; clearTimeout(tm); });
  stage.addEventListener('mouseleave',function(){ hov=false; arm(); });
  window.addEventListener('resize',function(){ go(i); });
  window.addEventListener('load',function(){ go(i); });
  go(0);
  if('IntersectionObserver' in window) new IntersectionObserver(function(es){ vis=es[0].isIntersecting; arm(); },{threshold:.3}).observe(stage); else { vis=true; arm(); }
})();

/* Reel video: play only while visible */
(function(){
  var v=document.querySelector('.reelv video'); if(!v||!('IntersectionObserver' in window)) return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches; if(reduce){ v.controls=true; return; }
  new IntersectionObserver(function(es){ if(es[0].isIntersecting){ var p=v.play(); if(p&&p.catch) p.catch(function(){ v.controls=true; }); } else v.pause(); },{threshold:.4}).observe(v);
})();
