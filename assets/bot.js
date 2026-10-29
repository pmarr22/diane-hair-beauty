/* Salon assistant: instant answers from the salon's own information (no server). Unknown questions go to WhatsApp. */
(function(){
  var D=window.DHB; if(!D||!D.kb) return;
  var $=function(s,c){return (c||document).querySelector(s)};

  function norm(s){ return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[’']/g,"'"); }

  /* UI */
  var box=document.createElement('div'); box.className='chat'; box.setAttribute('role','dialog'); box.setAttribute('aria-label',D.ui.title);
  box.innerHTML='<div class="chead"><span class="cav">&#10022;</span><div><b>'+D.ui.title+'</b><small>'+D.ui.sub+'</small></div><button class="cx" type="button" aria-label="Close">&times;</button></div>'+
    '<div class="cmsgs" aria-live="polite"></div><div class="cchips"></div>'+
    '<form class="cform"><input type="text" autocomplete="off" placeholder="'+D.ui.ph+'" aria-label="'+D.ui.ph+'"><button type="submit" aria-label="Send">&rarr;</button></form>';
  document.body.appendChild(box);
  var msgs=$('.cmsgs',box), chips=$('.cchips',box), input=$('input',box), launcher=$('.fab .ai');

  function add(who,html){
    var d=document.createElement('div'); d.className='cm '+who; d.innerHTML=html; msgs.appendChild(d);
    msgs.scrollTop=msgs.scrollHeight; return d;
  }
  function showChips(){
    chips.innerHTML='';
    D.chips.forEach(function(c){
      var b=document.createElement('button'); b.type='button'; b.textContent=c.l;
      b.addEventListener('click',function(){ ask(c.l,c.id); });
      chips.appendChild(b);
    });
  }

  /* matching */
  function pick(q){
    var n=norm(q), tokens=n.split(/[^a-z0-9%]+/), best=null, bs=0;
    D.kb.forEach(function(e){
      var s=0;
      e.k.forEach(function(kw){
        var parts=kw.split('|'), k=norm(parts[0]); if(!k) return;
        var w=parts.length>1?+parts[1]:k.length;
        var hit=k.length<=3 ? tokens.indexOf(k)>-1 : n.indexOf(k)>-1;
        if(hit) s+=w;
      });
      if(s>bs){bs=s;best=e;}
    });
    return bs>0?best:null;
  }
  function answerFor(e){
    if(e.id==='open'&&window.DHBHours){
      var st=DHBHours.status();
      return '<b>'+DHBHours.text(D.tpl,D.days)+'</b><br>'+e.a;
    }
    return e.a;
  }
  function ask(label,id){
    add('me',label.replace(/</g,'&lt;'));
    var e=id?D.kb.filter(function(x){return x.id===id})[0]:pick(label);
    var typing=add('bot','<span class="dots"><i></i><i></i><i></i></span>');
    setTimeout(function(){
      typing.remove();
      if(e){ add('bot',answerFor(e)); }
      else { add('bot',D.ui.fb+'<br><a class="cbtn" href="'+D.wa+'" target="_blank" rel="noopener">'+D.ui.fbbtn+' &rarr;</a>'); }
      showChips();
    },550);
  }

  $('.cform',box).addEventListener('submit',function(ev){
    ev.preventDefault(); var v=input.value.trim(); if(!v) return; input.value=''; ask(v,null);
  });

  var started=false;
  function open(){
    box.classList.add('open'); if(launcher) launcher.classList.add('hide');
    if(!started){ started=true; add('bot',D.ui.hello); showChips(); }
    setTimeout(function(){ input.focus(); },250);
  }
  function close(){ box.classList.remove('open'); if(launcher) launcher.classList.remove('hide'); }
  if(launcher) launcher.addEventListener('click',open);
  $('.cx',box).addEventListener('click',close);
  [].slice.call(document.querySelectorAll('[data-open-chat]')).forEach(function(b){ b.addEventListener('click',open); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&box.classList.contains('open')) close(); });
  box.addEventListener('click',function(e){ var a=e.target.closest&&e.target.closest('a[href^="#"]'); if(a&&window.innerWidth<700) close(); });
})();
