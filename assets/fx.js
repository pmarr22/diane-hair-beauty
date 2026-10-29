(function(){
  var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};

  /* lightbox: photos open whole */
  var lb=document.createElement('div'); lb.className='lightbox'; lb.innerHTML='<img alt=""><button aria-label="Close">&times;</button>'; document.body.appendChild(lb);
  var lbi=$('img',lb); function closeLb(){lb.classList.remove('open')}
  lb.addEventListener('click',closeLb); document.addEventListener('keydown',function(e){if(e.key==='Escape')closeLb()});
  $$('.gmq .pic,.duo .pic,.batrack .pic').forEach(function(im){ im.addEventListener('click',function(){ lbi.src=im.currentSrc||im.src; lbi.alt=im.alt; lb.classList.add('open'); }); });

  if(!window.gsap||!window.ScrollTrigger) return;   /* site stays fully usable without GSAP */
  gsap.registerPlugin(ScrollTrigger);
  var mm=gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)',function(){
    /* hero intro: words rise, photo unveils */
    var h1=$('.hero h1'), words=[];
    (function walk(n){ [].slice.call(n.childNodes).forEach(function(c){
      if(c.nodeType===3){ var f=document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(function(p){ if(!p) return;
          if(/^\s+$/.test(p)){ f.appendChild(document.createTextNode(' ')); }
          else { var w=document.createElement('span'); w.className='w'; var i=document.createElement('span'); i.className='i'; i.textContent=p; w.appendChild(i); f.appendChild(w); words.push(i); } });
        n.replaceChild(f,c); }
      else if(c.nodeType===1){ walk(c); } }); })(h1);
    var tl=gsap.timeline({defaults:{ease:'power3.out'}});
    tl.fromTo('.hero .pic',{clipPath:'inset(0 0 100% 0 round 12px)',scale:1.1},{clipPath:'inset(0 0 0% 0 round 12px)',scale:1,duration:1.4,ease:'power4.out',clearProps:'clipPath,transform'},0)
      .from('.hero .pill',{autoAlpha:0,y:16,duration:.6},0.1)
      .from('.hero .kicker',{autoAlpha:0,y:16,duration:.6},0.2)
      .from(words,{yPercent:115,duration:.95,stagger:.07},0.3)
      .from('.hero p, .hero .btns, .hero .badges',{autoAlpha:0,y:26,duration:.8,stagger:.12},'-=.55');

    /* hero photo parallax */
    gsap.to('.hero .pic',{y:-34,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});

    /* photo unveil on scroll (clip-path cleared after so shadows come back) */
    $$('.pic').forEach(function(p){
      if(p.closest('.hero')||p.closest('.lightbox')||p.closest('.gmq')) return;
      gsap.fromTo(p,{clipPath:'inset(9% 9% 9% 9% round 12px)',scale:1.07},
        {clipPath:'inset(0% 0% 0% 0% round 12px)',scale:1,duration:1.2,ease:'power3.out',clearProps:'clipPath,transform',
         scrollTrigger:{trigger:p,start:'top 90%',once:true}});
    });

    /* headings + text rise */
    var heads=$$('section h2, .eyebrow, section .kicker, section .lead').filter(function(e){return !e.closest('.hero')});
    gsap.set(heads,{autoAlpha:0,y:30});
    ScrollTrigger.batch(heads,{start:'top 90%',once:true,
      onEnter:function(els){ gsap.to(els,{autoAlpha:1,y:0,duration:.9,stagger:.1,ease:'power3.out',overwrite:true}); }});

    /* product / review / training cards stagger in */
    var cards=$$('.pcard, .rvw, .flist a');
    gsap.set(cards,{autoAlpha:0,y:40});
    ScrollTrigger.batch(cards,{start:'top 92%',once:true,
      onEnter:function(els){ gsap.to(els,{autoAlpha:1,y:0,duration:.8,stagger:.12,ease:'power3.out',overwrite:true}); }});

    /* counters */
    $$('.stats b').forEach(function(b){
      var m=b.textContent.match(/^(\D*)(\d+)(.*)$/); if(!m) return;
      var o={v:0}, end=+m[2];
      gsap.to(o,{v:end,duration:1.6,ease:'power2.out',onUpdate:function(){b.textContent=m[1]+Math.round(o.v)+m[3]},
        scrollTrigger:{trigger:b,start:'top 92%',once:true}});
    });

    /* price tabs: cards pop in */
    $$('.tabs button').forEach(function(btn){ btn.addEventListener('click',function(){
      requestAnimationFrame(function(){ gsap.fromTo('.plist.on .pr-card',{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.5,stagger:.06,ease:'power2.out',overwrite:true}); }); }); });
    gsap.from('.plist.on .pr-card',{autoAlpha:0,y:30,duration:.7,stagger:.08,ease:'power3.out',scrollTrigger:{trigger:'#prestations .tabs',start:'top 85%',once:true}});

    /* service tabs: panel slides in */
    document.addEventListener('svchange',function(e){
      var p=document.getElementById('sv-'+e.detail); if(!p) return;
      gsap.fromTo(p.querySelectorAll('.svmedia, .svtxt > *'),{autoAlpha:0,y:26},{autoAlpha:1,y:0,duration:.7,stagger:.08,ease:'power3.out',overwrite:true});
      ScrollTrigger.refresh();
    });
  });

  /* magnetic buttons (mouse only) */
  mm.add('(hover:hover) and (pointer:fine) and (prefers-reduced-motion: no-preference)',function(){
    $$('.hero .btn, .offer .btn, .diag .btn, .partner .btn, #formations .btn').forEach(function(btn){
      var xt=gsap.quickTo(btn,'x',{duration:.4,ease:'power3'}), yt=gsap.quickTo(btn,'y',{duration:.4,ease:'power3'});
      btn.addEventListener('pointermove',function(e){ var r=btn.getBoundingClientRect(); xt((e.clientX-r.left-r.width/2)*.25); yt((e.clientY-r.top-r.height/2)*.35); });
      btn.addEventListener('pointerleave',function(){ xt(0); yt(0); });
    });
  });

  window.addEventListener('load',function(){ ScrollTrigger.refresh(); });
})();
