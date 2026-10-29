/* Contact: interactive map (Leaflet + CARTO light tiles), open-now badge, copy address */
(function(){
  var D=window.DHB||{};
  function $$(s){return [].slice.call(document.querySelectorAll(s))}

  /* open / closed badge + today's row */
  var b=document.querySelector('.openbadge');
  if(b&&window.DHBHours&&D.tpl){
    var st=DHBHours.status();
    b.textContent=DHBHours.text(D.tpl,D.days);
    b.classList.add(st.open?'is-open':'is-closed');
    $$('.hrs li').forEach(function(li){ if(+li.getAttribute('data-d')===st.d) li.classList.add('today'); });
  }

  /* copy address */
  $$('[data-copy]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var done=function(){ var old=btn.textContent; btn.textContent=btn.getAttribute('data-done'); setTimeout(function(){btn.textContent=old},1800); };
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(done,done); } else { done(); }
    });
  });

  /* map */
  var el=document.getElementById('map');
  if(!el||!window.L){ if(el) el.classList.add('nomap'); return; }
  var lat=+el.dataset.lat, lon=+el.dataset.lon;
  var map=L.map(el,{center:[lat,lon],zoom:16,scrollWheelZoom:false,zoomControl:false,attributionControl:true});
  L.control.zoom({position:'topright'}).addTo(map);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  var icon=L.divIcon({className:'dpin',iconSize:[52,52],iconAnchor:[26,26],
    html:'<span class="ring"></span><span class="core"><svg viewBox="0 0 48 48" fill="none" stroke="#d4af37" stroke-width="3.2" stroke-linecap="round"><circle cx="15" cy="36" r="5"/><circle cx="33" cy="36" r="5"/><path d="M18.5 32.5 32 8M29.5 32.5 16 8"/></svg></span>'});
  var m=L.marker([lat,lon],{icon:icon,title:el.dataset.name}).addTo(map);
  m.bindPopup('<b>'+el.dataset.name+'</b><br>'+el.dataset.addr+'<br><a href="'+el.dataset.route+'" target="_blank" rel="noopener">'+el.dataset.routelabel+' &rarr;</a>',{closeButton:false,offset:[0,-14]}).openPopup();
  /* wheel zoom only after the visitor clicks the map (keeps page scrolling smooth) */
  map.on('click',function(){ map.scrollWheelZoom.enable(); });
  map.on('mouseout',function(){ map.scrollWheelZoom.disable(); });
  window.addEventListener('load',function(){ map.invalidateSize(); });
})();
