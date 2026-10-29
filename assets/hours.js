/* Salon opening hours (Europe/Paris). Mon-Tue 9-18, Wed closed, Thu-Fri 9-19, Sat 9:30-19, Sun closed. */
(function(){
  var S={0:null,1:[9,0,18,0],2:[9,0,18,0],3:null,4:[9,0,19,0],5:[9,0,19,0],6:[9,30,19,0]};
  var WD={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
  function parisNow(){
    var o={};
    try{
      new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Paris',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date()).forEach(function(x){o[x.type]=x.value});
      return {d:WD[o.weekday],m:(+o.hour%24)*60+(+o.minute)};
    }catch(e){ var n=new Date(); return {d:n.getDay(),m:n.getHours()*60+n.getMinutes()}; }
  }
  function fmt(h,m){return (h<10?'0':'')+h+':'+(m<10?'0':'')+m}
  function status(){
    var n=parisNow(), s=S[n.d];
    if(s){
      var a=s[0]*60+s[1], b=s[2]*60+s[3];
      if(n.m>=a&&n.m<b) return {open:true,t:fmt(s[2],s[3]),d:n.d};
      if(n.m<a) return {open:false,today:true,t:fmt(s[0],s[1]),d:n.d};
    }
    for(var i=1;i<=7;i++){ var dd=(n.d+i)%7; if(S[dd]) return {open:false,next:dd,t:fmt(S[dd][0],S[dd][1]),d:n.d}; }
  }
  function text(tpl,days){
    var st=status();
    if(st.open) return tpl.o.replace('{t}',st.t);
    if(st.today) return tpl.ct.replace('{t}',st.t);
    return tpl.cd.replace('{d}',days[(st.next+6)%7]).replace('{t}',st.t);
  }
  window.DHBHours={status:status,text:text};
})();
