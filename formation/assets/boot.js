/* Connexion sécurisée (Supabase) : la page ne contient aucun contenu de cours.
   Les leçons, quiz, PDF, audio et images ne sont lus qu'après une connexion valide. */
(function () {
  "use strict";
  var CFG = window.DHB_CONFIG || {}, KEY = "dhb_formation_demo_v1", app = document.getElementById("app");
  var LANG = "fr"; try { var st = JSON.parse(localStorage.getItem(KEY) || "{}"); if (st.lang === "pt") LANG = "pt"; } catch (e) {}
  var T = {
    fr: { title: "Connexion élève", kick: "Espace formation", mail: "E-mail", pass: "Mot de passe", go: "Se connecter", wait: "Connexion…", bad: "E-mail ou mot de passe incorrect.", load: "Chargement de votre formation…", fail: "Impossible de charger la formation. Réessayez dans un instant.", help: "Accès réservé aux élèves inscrits. Un problème de connexion ? Écrivez à contact@dianehairbeauty.fr.", slogan: "Avec Diane, révélez la beauté de vos clientes.", t1: "Plateforme de", t2: "Formation", sub: "Coiffure · Techniques · Tendances", off: "Cette plateforme n’est pas encore configurée." },
    pt: { title: "Acesso do aluno", kick: "Espaço de formação", mail: "E-mail", pass: "Senha", go: "Entrar", wait: "Entrando…", bad: "E-mail ou senha incorretos.", load: "Carregando sua formação…", fail: "Não foi possível carregar a formação. Tente de novo em instantes.", help: "Acesso reservado aos alunos inscritos. Problema para entrar? Escreva para contact@dianehairbeauty.fr.", slogan: "Com a Diane, revele a beleza das suas clientes.", t1: "Plataforma de", t2: "Formação", sub: "Cabelo · Técnicas · Tendências", off: "Esta plataforma ainda não está configurada." }
  };
  var ICONS = '<div class="lg-ic"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="9" y="9" width="30" height="21" rx="2"/><path d="M5 36h38l-2 3H7z"/><path d="M21 15.5v8l7-4z"/></svg><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M24 12c-4-3-10-3-16-2v26c6-1 12-1 16 2 4-3 10-3 16-2V10c-6-1-12-1-16 2z"/><path d="M24 12v26"/></svg><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="7" y="9" width="34" height="22" rx="3"/><path d="M13 16h22M13 22h14"/><circle cx="33" cy="33" r="5"/><path d="M30 37l-2 7 5-3 5 3-2-7"/></svg></div>';
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); };
  function setLang(l) { LANG = l; try { var s = JSON.parse(localStorage.getItem(KEY) || "{}"); s.lang = l; localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} document.documentElement.lang = l; }
  function loginHTML(msg, busy) {
    var t = T[LANG];
    return '<div class="login"><div class="lg-l"><div class="bg" style="background-image:url(assets/img/login-diane.webp)"></div><div class="lg-c"><img src="assets/img/logo-gold.png" alt="Diane Hair Beauty" width="900" height="521"><h2 class="lg-t"><span>' + t.t1 + '</span><b>' + t.t2 + '</b></h2><p class="lg-s">' + t.sub + '</p>' + ICONS + '</div></div>' +
      '<div class="lg-r"><form class="lcard" id="lf" novalidate><div class="lang" role="group" aria-label="Langue"><button type="button" data-l="fr" class="' + (LANG === "fr" ? "on" : "") + '">FR</button><button type="button" data-l="pt" class="' + (LANG === "pt" ? "on" : "") + '">PT</button></div>' +
      '<div class="kick">' + t.kick + '</div><h1>' + t.title + '</h1>' +
      '<label class="fld"><span>' + t.mail + '</span><input type="email" id="em" autocomplete="username" inputmode="email" required></label>' +
      '<label class="fld"><span>' + t.pass + '</span><input type="password" id="pw" autocomplete="current-password" required></label>' +
      '<div class="lerr" role="alert">' + (msg ? esc(msg) : "") + '</div>' +
      '<button type="submit" class="btn gold"' + (busy ? " disabled" : "") + '>' + (busy ? t.wait : t.go) + '</button><small>' + t.help + '</small></form></div></div>';
  }
  function status(msg) { app.innerHTML = '<div class="login"><div class="lg-r" style="grid-column:1/-1"><div class="lcard" style="text-align:center"><div class="kick">Diane Hair Beauty</div><p style="color:var(--mut)">' + esc(msg) + '</p></div></div></div>'; }
  if (!CFG.url || !CFG.anonKey) { status(T[LANG].off); return; }

  var client = null;
  function loadLib(cb) {
    var s = document.createElement("script"); s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js";
    s.onload = cb; s.onerror = function () { status(T[LANG].fail); }; document.head.appendChild(s);
  }
  function showLogin(msg) {
    app.innerHTML = loginHTML(msg, false);
    var f = document.getElementById("lf");
    [].forEach.call(f.querySelectorAll(".lang button"), function (b) { b.addEventListener("click", function () { var e = document.getElementById("em").value; setLang(b.getAttribute("data-l")); showLogin(); document.getElementById("em").value = e; }); });
    f.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var em = document.getElementById("em").value.trim(), pw = document.getElementById("pw").value;
      if (!em || !pw) { showLogin(T[LANG].bad); return; }
      app.innerHTML = loginHTML("", true);
      client.auth.signInWithPassword({ email: em, password: pw }).then(function (r) {
        if (r.error || !r.data || !r.data.session) { showLogin(T[LANG].bad); return; }
        start(r.data.session);
      }).catch(function () { showLogin(T[LANG].fail); });
    });
    var e1 = document.getElementById("em"); if (e1) e1.focus();
  }
  function start(session) {
    status(T[LANG].load);
    var bucket = client.storage.from(CFG.bucket || "course");
    bucket.download("content.json").then(function (r) {
      if (r.error || !r.data) throw new Error("content");
      return r.data.text();
    }).then(function (txt) {
      var C = JSON.parse(txt);
      window.COURSE_DATA = C.data.fr; window.COURSE_DATA_PT = C.data.pt; window.PODCAST = C.podcast; window.MINDMAP = C.mindmap; window.FLASH = C.flash;
      return bucket.createSignedUrls(C.assets, 8 * 3600);
    }).then(function (r) {
      if (r.error) throw new Error("sign");
      var map = {}; (r.data || []).forEach(function (x) { if (x.signedUrl && x.path) map[x.path] = x.signedUrl; });
      window.__URLS = map;
      var u = session.user || {}, md = u.user_metadata || {};
      window.__SECURE = { email: u.email || "", name: md.name || md.full_name || "", signOut: function () { client.auth.signOut().then(function () { location.reload(); }, function () { location.reload(); }); } };
      var s = document.createElement("script"); s.src = "assets/app.js?v=" + (CFG.v || "1"); document.body.appendChild(s);
    }).catch(function () { status(T[LANG].fail); });
  }
  loadLib(function () {
    client = window.supabase.createClient(CFG.url, CFG.anonKey, { auth: { persistSession: true, autoRefreshToken: true } });
    client.auth.onAuthStateChange(function (ev) { if (ev === "SIGNED_OUT" && window.__SECURE) location.reload(); });
    client.auth.getSession().then(function (r) { if (r.data && r.data.session) start(r.data.session); else showLogin(); }, function () { showLogin(); });
  });
})();
