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
