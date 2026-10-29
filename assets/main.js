(function(){
  var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
  var lang=$('.lang'); if(lang){ $('button',lang).addEventListener('click',function(e){e.stopPropagation();lang.classList.toggle('open')}); document.addEventListener('click',function(){lang.classList.remove('open')}); }
  var bg=$('.burger'), nav=$('nav.main'); if(bg){ bg.addEventListener('click',function(){nav.classList.toggle('open')}); $$('a',nav).forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open')})}); }
  $$('.tabs button').forEach(function(b){ b.addEventListener('click',function(){
    $$('.tabs button').forEach(function(x){x.classList.remove('on')}); $$('.plist').forEach(function(x){x.classList.remove('on')});
    b.classList.add('on'); $('#'+b.dataset.t).classList.add('on'); }); });
  $$('.ptabs button').forEach(function(b){ b.addEventListener('click',function(){
    $$('.ptabs button').forEach(function(x){x.classList.remove('on')}); b.classList.add('on');
    $$('.pcard').forEach(function(c){ c.classList.toggle('off', b.dataset.f!=='all' && c.dataset.c.split(' ').indexOf(b.dataset.f)<0); }); }); });
  function openSv(k){ var b=$('.svtabs button[data-sv="'+k+'"]'); if(!b) return false;
    $$('.svtabs button').forEach(function(x){x.classList.remove('on')}); $$('.svpanel').forEach(function(x){x.classList.remove('on')});
    b.classList.add('on'); $('#sv-'+k).classList.add('on'); document.dispatchEvent(new CustomEvent('svchange',{detail:k})); return true; }
  $$('.svtabs button').forEach(function(b){ b.addEventListener('click',function(){ openSv(b.dataset.sv); }); });
  $$('a[href^="#"]').forEach(function(a){ var k=a.getAttribute('href').slice(1);
    if(['lissage','couleur','extensions','homme'].indexOf(k)>-1){ a.addEventListener('click',function(e){ e.preventDefault(); openSv(k); $('#services').scrollIntoView({behavior:'smooth'}); }); } });
  $$('.ba-r').forEach(function(r){ r.addEventListener('input',function(){ r.parentNode.style.setProperty('--p',r.value+'%'); }); });
  $$('.bnav').forEach(function(bt){ bt.addEventListener('click',function(){ var tr=$('.batrack'); tr.scrollBy({left:(bt.classList.contains('next')?1:-1)*tr.clientWidth*.7,behavior:'smooth'}); }); });
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}})},{threshold:.12});
  $$('.rv-in').forEach(function(el){io.observe(el)});
  var ck=$('.cookie'); try{ if(localStorage.getItem('dhb-ck')) ck.classList.add('hide'); }catch(e){}
  $$('button',ck).forEach(function(b){ b.addEventListener('click',function(){ ck.classList.add('hide'); try{localStorage.setItem('dhb-ck',b.className||'ok')}catch(e){} }); });
  var f=$('.form'); if(f){ f.addEventListener('submit',function(e){ e.preventDefault(); var m=$('input[type=email]',f).value;
    location.href='mailto:contact@dianehairbeauty.fr?subject='+encodeURIComponent(f.dataset.subj)+'&body='+encodeURIComponent(m); }); }
})();
