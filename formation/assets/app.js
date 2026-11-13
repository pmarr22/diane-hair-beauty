(function () {
  "use strict";
  var CFR = window.COURSE_DATA || {}, CPT = window.COURSE_DATA_PT || CFR, C = CFR, LANG = "fr";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };

  /* ---------- icônes ---------- */
  var ICON = {
    cap: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    gem: '<path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>',
    cal: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    play: '<polygon points="7 4 20 12 7 20 7 4"/>',
    head: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    slides: '<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    dl: '<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    right: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    left: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    clip: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    cut: '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    print: '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    net: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'
  };
  var ic = function (n, c) { return '<svg class="ic ' + (c || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[n] + '</svg>'; };

  /* ---------- état (progression conservée sur l'appareil) ---------- */
  var KEY = "dhb_formation_demo_v1";
  var S = { logged: false, name: "", lang: "", done: {}, checks: {}, scores: {} };
  try { var raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch (e) {}
  var SEC = window.__SECURE || null;
  if (SEC) { S.logged = true; if (!S.name && SEC.name) S.name = SEC.name; }
  /* mode sécurisé : les fichiers du cours sont servis par des liens signés (valables après connexion) */
  var U = function (h) { var m = window.__URLS; return m ? String(h).replace(/assets\/(?:img|photos|slides|media|pdf)\/[A-Za-z0-9_.\-]+/g, function (p) { return m[p] || p; }) : h; };
  LANG = S.lang === "pt" ? "pt" : "fr"; C = LANG === "pt" ? CPT : CFR; document.documentElement.lang = LANG;
  var save = function () { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

  /* ---------- contenu du module ---------- */
  var ITEMS = [
    { id: "l1", type: "lesson", tag: "Leçon 1", title: "Comprendre le lissage brésilien sans formol et bien diagnostiquer", keys: "Comprendre • Diagnostiquer • Sécuriser", dur: "≈ 10 min", img: "assets/photos/l1.webp", icon: "cap", pdf: "assets/pdf/lecon-1.pdf", pdfInfo: "PDF · 6 pages · 170 Ko" },
    { id: "l2", type: "lesson", tag: "Leçon 2", title: "Le protocole pas à pas et le suivi de la cliente", keys: "Préparer • Appliquer • Accompagner", dur: "≈ 11 min", img: "assets/photos/l2.webp", icon: "cap", pdf: "assets/pdf/lecon-2.pdf", pdfInfo: "PDF · 6 pages · 196 Ko" },
    { id: "masterclass", type: "slides", tag: "Diaporama", title: "Masterclass : l’excellence du lissage sans formol", dur: "9 diapositives", img: "assets/slides/s1.webp", banner: "assets/photos/l1.webp", icon: "slides" },
    { id: "podcast", type: "audio", tag: "Audio", title: "Les pièges du lissage sans formol", dur: "5 min 26", img: "assets/photos/podcast.webp", icon: "head" },
    { id: "infographie", type: "image", tag: "Infographie", title: "Le protocole en un coup d’œil", dur: "À garder sous la main", img: "assets/img/infographie.webp", banner: "assets/photos/hero.webp", icon: "image", pos: "86% 0" },
    { id: "mindmap", type: "mindmap", tag: "Carte mentale", title: "La carte mentale du lissage", dur: "5 thèmes", img: "assets/photos/hero.webp", banner: "assets/photos/hero.webp", icon: "net" },
    { id: "flashcards", type: "cards", tag: "Flashcards", title: "Les flashcards du lissage", dur: (window.FLASH ? window.FLASH.fr.length : 0) + " cartes", img: "assets/photos/l2.webp", banner: "assets/photos/l2.webp", icon: "copy" },
    { id: "quizguide", type: "quiz2", tag: "Quiz", title: "Le guide du lissage professionnel", dur: (C.guide ? C.guide.quiz.length : 0) + " questions", img: "assets/slides/s3.webp", banner: "assets/photos/l1.webp", icon: "clip", pos: "30% 50%" },
    { id: "evaluation", type: "quiz", tag: "Évaluation", title: "Évaluation du module", dur: "10 questions", img: "assets/photos/eval.webp", icon: "clip" },
    { id: "atelier", type: "atelier", tag: "Présentiel", title: "Atelier pratique en salon", dur: "Avec Diane, au Cannet", img: "assets/photos/atelier.webp", icon: "cut" }
  ];
  var META = { l1: ["Apprendre", "Comprendre, diagnostiquer, sécuriser"], l2: ["Apprendre", "Préparer, appliquer, accompagner"], masterclass: ["Réviser", "9 diapositives pour retenir l’essentiel"], podcast: ["Réviser", "À écouter en salon ou en déplacement"], infographie: ["Réviser", "Le protocole sur une seule page"], mindmap: ["Réviser", "Tout le module sur une page, à explorer"], flashcards: ["Réviser", "Retournez les cartes pour vous entraîner"], quizguide: ["Se tester", "Chaque réponse est expliquée"], evaluation: ["Se tester", "10 questions, réussite à partir de 7"], atelier: ["En salon", "Pratique avec Diane, au Cannet"] };
  var GROUPS = [["Apprendre", "Les bases, à votre rythme"], ["Réviser", "Pour bien retenir"], ["Se tester", "Vérifiez vos acquis"], ["En salon", "La partie pratique"]];
  ITEMS.forEach(function (it) { it.grp = META[it.id][0]; it.why = META[it.id][1]; });
  var byId = function (id) { for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return ITEMS[i]; };
  var doneCount = function () { return ITEMS.filter(function (i) { return S.done[i.id]; }).length; };
  var pct = function () { return Math.round(100 * doneCount() / ITEMS.length); };
  var nextItem = function () { for (var i = 0; i < ITEMS.length; i++) if (!S.done[ITEMS[i].id]) return ITEMS[i]; return null; };
  var WA = "https://wa.me/33753936912?text=" + encodeURIComponent("Bonjour Diane, je souhaite des informations sur l’atelier pratique du lissage brésilien.");
  var MAIL = "mailto:contact@dianehairbeauty.fr?subject=" + encodeURIComponent("Atelier pratique · Lissage brésilien sans formol");

  /* ---------- gabarits ---------- */
  var RIBBON = "Aperçu de démonstration · contenu à valider par Diane avant publication";

  function langSwitch() {
    return '<div class="lang" role="group" aria-label="Langue / Idioma"><button type="button" data-action="lang" data-l="fr" class="' + (LANG === "fr" ? "on" : "") + '">FR</button><button type="button" data-action="lang" data-l="pt" class="' + (LANG === "pt" ? "on" : "") + '">PT</button></div>';
  }
  function header(route) {
    var l = function (h, t, on) { return '<a href="' + h + '" class="' + (on ? "on" : "") + '">' + t + '</a>'; };
    var r = route.name;
    return '<div class="wrap hbar"><a class="brand" href="#/" aria-label="Diane Hair Beauty"><img src="assets/img/logo-gold.png" alt="Diane Hair Beauty" width="900" height="521"></a>' +
      '<nav class="nav" id="nav">' + l("#/", "Mon parcours", r === "home" || (r === "lesson" && route.id !== "atelier")) + l("#/lesson/atelier", "Atelier présentiel", r === "lesson" && route.id === "atelier") + l("#/faq", "FAQ", r === "faq") + l("#/espace", "Mon espace", r === "espace") + l("#/certificat", "Attestation", r === "certificat") + '</nav>' +
      '<div class="hright">' + langSwitch() + (SEC ? '<button class="lgout" data-action="logout">Déconnexion</button>' : '<span class="demo-chip">Démo</span>') + '<a class="avatar" href="#/espace" aria-label="Mon espace">' + initial() + '</a><button class="burger" data-action="menu" aria-label="Menu">' + ic("menu") + '</button></div></div>';
  }
  function bnav(r) {
    var b = function (h, ic2, t, on) { return '<a href="' + h + '" class="' + (on ? "on" : "") + '">' + ic(ic2) + '<span>' + t + '</span></a>'; };
    return '<nav class="bnav" aria-label="Navigation">' + b("#/", "cap", "Parcours", r.name === "home" || (r.name === "lesson" && r.id !== "atelier")) + b("#/lesson/atelier", "cut", "Atelier", r.name === "lesson" && r.id === "atelier") + b("#/certificat", "gem", "Attestation", r.name === "certificat") + b("#/espace", "shield", "Mon espace", r.name === "espace") + b("#/faq", "chat", "Aide", r.name === "faq") + '</nav>';
  }
  function footer() {
    return '<div class="wrap fin"><img src="assets/img/logo-gold.png" alt="Diane Hair Beauty" width="900" height="521"><p>© 2026 Diane Hair Beauty · 93 boulevard Sadi Carnot, 06110 Le Cannet<br>' + (SEC ? "Plateforme de formation" : "Plateforme de démonstration") + ' · créée par <a href="https://muvoria.fr" target="_blank" rel="noopener">Muvoria Lab</a></p><p><a href="' + WA + '" target="_blank" rel="noopener">WhatsApp 07 53 93 69 12</a> · <a href="mailto:contact@dianehairbeauty.fr">contact@dianehairbeauty.fr</a></p></div>';
  }

  /* ---------- login (aperçu) ---------- */
  function loginPage() {
    return '<div class="login"><div class="lg-l"><div class="bg" style="background-image:url(assets/photos/hero.webp)"></div><div><img src="assets/img/logo-gold.png" alt="Diane Hair Beauty" width="900" height="521"><p>Avec Diane, révélez la beauté de vos clientes.</p></div></div>' +
      '<div class="lg-r"><form class="lcard" onsubmit="return false">' + langSwitch() + '<div class="kick">Espace formation</div><h1>Connexion élève</h1>' +
      '<label class="fld"><span>Prénom et nom</span><input type="text" id="loginName" value="" placeholder="Camille Martin" maxlength="40" autocomplete="off"></label><label class="fld"><span>E-mail</span><input type="email" value="eleve@exemple.fr" readonly aria-readonly="true"></label>' +
      '<label class="fld"><span>Mot de passe</span><input type="password" value="••••••••••" readonly aria-readonly="true"></label>' +
      '<div class="forgot">Mot de passe oublié ?</div>' +
      '<button type="button" class="btn gold" data-action="login">Se connecter (démo) ' + ic("right") + '</button>' +
      '<small>Écran d’aperçu : aucune donnée n’est saisie ni enregistrée. Dans la version finale, chaque élève reçoit ses accès par e-mail après son inscription.</small></form></div></div>';
  }

  /* ---------- vitrine ---------- */
  function poster(it, locked) {
    var d = S.done[it.id];
    return '<a class="poster' + (locked ? " locked" : "") + (it.type === "slides" || it.type === "image" || it.type === "quiz2" ? " wide" : "") + '" ' + (locked ? 'href="#" data-action="soon"' : 'href="#/lesson/' + it.id + '"') + '>' +
      '<img src="' + it.img + '" alt="" loading="lazy" style="' + (it.pos ? "object-position:" + it.pos : "") + '">' +
      '<span class="ptag">' + esc(it.tag) + '</span>' + (d ? '<span class="pdone">' + ic("check") + '</span>' : "") +
      '<span class="pplay">' + ic(locked ? "lock" : it.icon === "play" ? "play" : it.icon) + '</span>' +
      '<span class="ptxt"><b>' + esc(it.title) + '</b><span>' + esc(it.dur) + '</span></span></a>';
  }
  function mcard(it) {
    var d = S.done[it.id];
    return '<a class="mcard" href="#/lesson/' + it.id + '"><div class="mtxt"><span class="pill">' + esc(it.tag) + '</span><h3>' + esc(it.title) + '</h3><div class="keys">' + esc(it.keys) + '</div>' +
      '<span class="btn sm">' + (d ? "Revoir la leçon" : "Commencer la leçon") + ' ' + ic("right") + '</span></div><div class="mimg" style="background-image:url(' + it.img + ')"></div>' +
      '<div class="bar"><i style="width:' + (d ? 100 : 0) + '%"></i></div></a>';
  }
  var HT = "cours";
  function stepRow(it) {
    var k = ITEMS.indexOf(it) + 1, d = S.done[it.id], nx = nextItem(), isn = nx && nx.id === it.id;
    return '<li><a class="step' + (d ? " done" : "") + (isn ? " next" : "") + '" href="#/lesson/' + it.id + '"><span class="sn">' + (d ? ic("check") : k) + '</span><span class="sic">' + ic(it.icon) + '</span><span class="stx"><small>' + esc(it.tag) + '</small><b>' + esc(it.title) + '</b><em>' + esc(it.why) + '</em></span><span class="sme">' + esc(it.dur) + '</span><span class="sgo">' + (isn ? (doneCount() ? "Continuer" : "Commencer") : d ? "Revoir" : "Ouvrir") + ic("right") + '</span></a></li>';
  }
  function calendar() {
    var now = new Date(), y = now.getFullYear(), m = now.getMonth(), first = new Date(y, m, 1), off = (first.getDay() + 6) % 7, dim = new Date(y, m + 1, 0).getDate(), days = S.days || {};
    var head = LANG === "pt" ? ["S", "T", "Q", "Q", "S", "S", "D"] : ["L", "M", "M", "J", "V", "S", "D"], out = head.map(function (h) { return '<i class="ch">' + h + '</i>'; }).join("");
    for (var b = 0; b < off; b++) out += '<i></i>';
    for (var d = 1; d <= dim; d++) { var key = y + "-" + (m + 1) + "-" + d; out += '<i class="cd' + (d === now.getDate() ? " today" : "") + (days[key] ? " on" : "") + '">' + d + '</i>'; }
    var lab = now.toLocaleDateString(LANG === "pt" ? "pt-BR" : "fr-FR", { month: "long", year: "numeric" });
    return '<div class="cal"><h3>' + lab.charAt(0).toUpperCase() + lab.slice(1) + '</h3><div class="cg">' + out + '</div><p class="cl"><i></i>Jour d’étude</p></div>';
  }
  function homePage() {
    var n = nextItem(), p = pct(), all = p === 100, name = (S.name || (SEC && SEC.name) || "").trim(), first = name ? name.split(" ")[0] : "";
    var days = Object.keys(S.days || {}).length, best = S.scores.evaluation;
    var locked = [
      { tag: "Bientôt", title: "Balayage & colorimétrie", dur: "Placement, lumière & précision", img: "assets/photos/balayage.webp", icon: "lock" },
      { tag: "Bientôt", title: "Extensions", dur: "Pose et finition", img: "assets/photos/extensions.webp", icon: "lock" },
      { tag: "Présentiel", title: "Formations complètes", dur: "Devenez expert(e)", img: "assets/photos/formation.webp", icon: "lock" }
    ];
    var tab = function (k, l) { return '<button class="' + (HT === k ? "on" : "") + '" data-action="ht" data-t="' + k + '">' + l + '</button>'; };
    var main = "";
    if (HT === "cours") {
      var resume = n ? '<div class="rs-card"><div><small>' + esc(n.tag) + '</small><b>' + esc(n.title) + '</b><em>' + ic(n.icon) + esc(n.dur) + '</em></div><a class="btn gold sm" href="#/lesson/' + n.id + '">' + (doneCount() ? "Continuer" : "Commencer") + '</a></div>' : '<div class="rs-card"><div><small>Fin de formation</small><b>Mon attestation de suivi</b><em>' + ic("gem") + 'Votre attestation est prête à télécharger</em></div><a class="btn gold sm" href="#/certificat">Obtenir</a></div>';
      main = '<div class="mod"><div class="mod-h"><span class="mod-i">' + ic("cap") + '</span><b>Lissage brésilien sans formol</b></div>' +
        '<div class="mod-c"><div class="mod-l"><b>Module pilote · ' + ITEMS.length + ' étapes</b><span>' + doneCount() + ' sur ' + ITEMS.length + ' terminées · ' + p + ' % complété</span><div class="bar"><i style="width:' + p + '%"></i></div></div>' + resume + '</div></div>' +
        GROUPS.map(function (g, gi) { var its = ITEMS.filter(function (it) { return it.grp === g[0]; }); return '<section class="grp"><h2><span class="gn">' + (gi + 1) + '</span>' + g[0] + ' <small>' + g[1] + '</small></h2><ol class="trail">' + its.map(stepRow).join("") + '</ol></section>'; }).join("") +
        '<section class="row"><h2 class="rt">Prochainement <small>Autres formations</small></h2><div class="rail three">' + locked.map(function (l) { return poster(l, true); }).join("") + '</div></section>';
    } else if (HT === "fini") {
      var dn = ITEMS.filter(function (it) { return S.done[it.id]; });
      main = dn.length ? '<ol class="trail" style="margin-top:6px">' + dn.map(stepRow).join("") + '</ol>' : '<div class="empty">' + ic("clip") + '<b>Aucune étape terminée pour le moment</b><p>Commencez la formation : vos étapes terminées apparaîtront ici.</p><a class="btn gold sm" href="' + (n ? "#/lesson/" + n.id : "#/") + '">Commencer</a></div>';
    } else {
      main = '<div class="mod"><div class="mod-c cert-c"><div class="mod-l"><b>Attestation de suivi</b><span>' + (all ? "Disponible : téléchargez votre attestation avec votre nom." : "Elle se débloque après les " + ITEMS.length + " étapes. Aperçu avec votre nom disponible.") + '</span></div><a class="btn gold sm" href="#/certificat">' + (all ? "Voir mon attestation" : "Voir l’aperçu") + '</a></div></div>';
    }
    var side = '<aside class="hm-side"><div class="card">' + calendar() + '</div><div class="card sts"><h3>Mon activité</h3><div class="sg3"><div><b>' + days + '</b><span>Jours d’étude</span></div><div><b>' + doneCount() + '</b><span>Étapes terminées</span></div><div><b>' + (best !== undefined ? best + "/10" : "—") + '</b><span>Évaluation</span></div></div></div>' +
      '<div class="card"><h3>Mes attestations</h3><a class="cert-mini' + (all ? "" : " lockd") + '" href="#/certificat"><span class="seal">' + ic(all ? "gem" : "lock") + '</span><span><b>Lissage brésilien sans formol</b><small>' + (all ? "Voir mon attestation" : "Se débloque à la fin du module") + '</small></span></a></div></aside>';
    return '<div class="wrap hm"><div class="hm-hello"><span class="hm-av">' + (first ? esc(first.charAt(0).toUpperCase()) : "É") + '</span><div><h1>' + (first ? "Bienvenue, " + esc(first) : "Bienvenue") + '</h1><p>Votre formation : Lissage brésilien sans formol, en ligne et en salon avec Diane.</p></div></div>' +
      '<div class="hm-tabs" role="tablist">' + tab("cours", "En cours") + tab("fini", "Terminées") + tab("cert", "Attestations") + '</div>' +
      '<div class="hm-grid"><div class="hm-main">' + main + '</div>' + side + '</div></div>';
  }

  /* ---------- quiz ---------- */
  var Q = {};
  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  function newQuiz(qs, n) {
    var pick = shuffle(qs); if (n) pick = pick.slice(0, n);
    return { i: 0, score: 0, sel: null, done: false, qs: pick.map(function (q) {
      var idx = shuffle(q.o.map(function (_, k) { return k; }));
      return { q: q.q, o: idx.map(function (k) { return q.o[k]; }), a: idx.indexOf(q.a), e: q.e, x: q.x ? idx.map(function (k) { return q.x[k]; }) : null };
    }) };
  }
  function freshQuiz(key) { return newQuiz(quizQs(key), key === "evaluation" ? 10 : 0); }
  function quizHTML(key) {
    var st = Q[key], L = "ABCD";
    if (st.done) {
      var n = st.qs.length, ok = key === "evaluation" ? st.score >= 7 : st.score >= Math.ceil(n * 0.6);
      var msg = ok ? "Bravo ! Vous maîtrisez les points essentiels." : "Relisez la leçon puis retentez votre chance : la sécurité ne s’improvise pas.";
      return '<div class="qres"><div class="score">' + st.score + ' / ' + n + '</div><p>' + msg + '</p><div class="qacts"><button class="btn" data-action="quiz-retry" data-key="' + key + '">Recommencer</button>' +
        (key === "evaluation" ? '<a class="btn gold" href="#/certificat">Voir mon attestation ' + ic("right") + '</a>' : "") + '</div></div>';
    }
    var q = st.qs[st.i], dots = st.qs.map(function (_, k) { return '<i class="' + (k < st.i ? "on" : k === st.i ? "cur" : "") + '"></i>'; }).join("");
    var opts = q.o.map(function (t, k) {
      var cls = "", dis = "";
      if (st.sel !== null) { dis = " disabled"; if (k === q.a) cls = " good"; else if (k === st.sel) cls = " bad"; }
      return '<button class="qo' + cls + '"' + dis + ' data-action="quiz-pick" data-key="' + key + '" data-o="' + k + '"><i>' + L[k] + '</i><span>' + esc(t) + (st.sel !== null && q.x ? '<small class="qx"><b>' + (k === q.a ? "Bonne réponse" : k === st.sel ? "Pas tout à fait" : "") + '</b> ' + esc(q.x[k]) + '</small>' : "") + '</span></button>';
    }).join("");
    var exp = st.sel !== null ? (q.x ? "" : '<div class="qexp"><b>' + (st.sel === q.a ? "Bonne réponse" : "Pas tout à fait") + '</b>' + esc(q.e) + '</div>') + '<div class="qacts" style="margin-top:14px;justify-content:flex-end"><button class="btn gold" data-action="quiz-next" data-key="' + key + '">' + (st.i + 1 < st.qs.length ? "Question suivante" : "Voir mon score") + ' ' + ic("right") + '</button></div>' : "";
    return '<div class="dots">' + dots + '</div><div class="qz-h"><span>Question ' + (st.i + 1) + ' sur ' + st.qs.length + '</span><span>Score : ' + st.score + '</span></div><h3>' + esc(q.q) + '</h3>' + opts + exp;
  }
  function quizBox(key, qs) {
    if (!Q[key]) Q[key] = freshQuiz(key);
    return '<div class="qz" data-quiz="' + key + '">' + quizHTML(key) + '</div>';
  }
  var evalQs = function () { return (C.l1 ? C.l1.quiz : []).concat(C.l2 ? C.l2.quiz : [], C.guide ? C.guide.quiz : []); };
  var quizQs = function (key) { return key === "evaluation" ? evalQs() : C[key].quiz; };

  /* ---------- pages leçon ---------- */
  var TAB = {};
  function stepHead(s) {
    var m = s.title.match(/^(Étape \d+|Accroche)\s*:\s*(.*)$/);
    return '<div class="step-h"><span class="tc" title="Repère dans le script">' + s.t + '</span>' + (m ? '<span class="stp">' + m[1] + '</span><h3>' + esc(m[2]) + '</h3>' : '<h3>' + esc(s.title) + '</h3>') + '</div>';
  }
  function lessonPanel(id, tab) {
    var L = C[id], it = byId(id);
    if (tab === "quiz") return quizBox(id, L.quiz);
    if (tab === "check") {
      var groups = L.checklist.map(function (g, gi) {
        return '<div class="cl-group"><h3>' + esc(g.group) + '</h3>' + g.items.map(function (x, ii) {
          var k = id + ":" + gi + ":" + ii;
          return '<label class="cl-item"><input type="checkbox" data-action="check" data-k="' + k + '"' + (S.checks[k] ? " checked" : "") + '><span>' + (x.label ? '<b>' + esc(x.label) + '</b>' : "") + x.text + '</span></label>';
        }).join("") + '</div>';
      }).join("");
      return '<div class="card print-area"><div class="cl-bar"><h2 style="margin:0">Check-list à imprimer</h2><button class="btn sm" data-action="print">' + ic("print") + ' Imprimer</button></div>' + groups + '</div>';
    }
    if (tab === "res") {
      return (LANG === "pt" ? '<div class="note" style="margin:0 0 12px">Ce contenu est en français.</div>' : "") + '<div class="card"><div class="res">' + ic("file") + '<div><b>' + esc(it.tag) + ' · support complet (PDF)</b><small>' + it.pdfInfo + ' · script, diaporama, quiz et check-list</small></div><a class="btn sm" href="' + it.pdf + '" target="_blank" rel="noopener">Ouvrir</a><a class="btn gold sm" href="' + it.pdf + '" download>' + ic("dl") + ' Télécharger</a></div></div>';
    }
    var h = '<section class="card obj"><h2>À la fin de cette leçon, vous saurez :</h2><ol>' + L.objectives.map(function (o) { return '<li>' + o + '</li>'; }).join("") + '</ol></section>';
    L.sections.forEach(function (s, i) {
      if (s.error || s.advice) {
        var inner = (s.html ? '<div class="prose">' + s.html + '</div>' : "") + (s.error ? '<div class="callout err"><b>L’erreur fréquente</b>' + s.error + '</div>' : "") + (s.advice ? '<div class="callout"><b>Le conseil de Diane</b>' + s.advice + '</div>' : "");
        h += '<article class="card">' + (/^L'erreur/.test(s.title) ? '<div class="step-h"><span class="tc">' + s.t + '</span><h3>' + esc(s.title) + '</h3></div>' : stepHead(s)) + inner + '</article>';
      } else {
        h += '<article class="card' + (i === 0 ? " hook" : "") + '">' + stepHead(s) + '<div class="prose">' + s.html + '</div></article>';
      }
    });
    h += '<section class="card recap"><h2>À retenir</h2><ol>' + L.recap.map(function (r) { return '<li>' + r + '</li>'; }).join("") + '</ol></section>';
    h += '<section class="card bridge"><p>' + L.bridge + '</p><a class="btn gold" href="#/lesson/atelier">Découvrir l’atelier en salon ' + ic("right") + '</a></section>';
    h += tbcBox(L.tbc);
    return h;
  }
  function tbcBox(list) {
    return '<details class="card tbcbox"><summary>' + ic("alert") + ' Points à confirmer par Diane avant publication (' + list.length + ')<span style="margin-left:auto">' + ic("down") + '</span></summary><p>Ces données techniques varient selon les sources. Elles sont signalées dans le texte et doivent être validées par Diane avant la mise en ligne du cours.</p><ul>' + list.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul></details>';
  }
  function tabsHTML(id) {
    var t = TAB[id] || "lecon";
    var b = function (k, l) { return '<button role="tab" class="' + (t === k ? "on" : "") + '" data-action="tab" data-id="' + id + '" data-tab="' + k + '">' + l + '</button>'; };
    return '<div class="tabs" role="tablist">' + b("lecon", "Leçon") + b("quiz", "Quiz (" + C[id].quiz.length + ")") + b("check", "Check-list") + b("res", "Ressources") + '</div><div data-panel="' + id + '">' + lessonPanel(id, t) + '</div>';
  }

  var SL = { i: 0 };
  function slidesHTML() {
    var thumbs = ""; for (var k = 1; k <= 9; k++) thumbs += '<button data-action="slide" data-i="' + (k - 1) + '" class="' + (k - 1 === SL.i ? "on" : "") + '" aria-label="Diapositive ' + k + '"><img src="assets/slides/s' + k + '.webp" alt="" loading="lazy"></button>';
    return '<div class="slides"><div class="stage"><img id="slImg" src="assets/slides/s' + (SL.i + 1) + '.webp" alt="Diapositive ' + (SL.i + 1) + '"></div><div class="slbar"><button class="icobtn" data-action="slide-prev" aria-label="Précédente">' + ic("left") + '</button><span id="slNum">' + (SL.i + 1) + ' / 9</span><button class="icobtn" data-action="slide-next" aria-label="Suivante">' + ic("right") + '</button></div><div class="thumbs">' + thumbs + '</div>' +
      '<div class="note"><a href="assets/pdf/masterclass.pdf" download style="color:var(--gold-l);text-decoration:underline">Télécharger le PDF</a></div></div>';
  }
  function setSlide(i) {
    SL.i = (i + 9) % 9;
    var img = $("#slImg"); if (!img) return;
    img.src = U("assets/slides/s" + (SL.i + 1) + ".webp"); img.alt = "Diapositive " + (SL.i + 1);
    $("#slNum").textContent = (SL.i + 1) + " / 9";
    document.querySelectorAll(".thumbs button").forEach(function (b, k) { b.classList.toggle("on", k === SL.i); });
  }

  function atelierHTML() {
    return '<div class="atelier-grid"><div class="card"><h2>Ce qui se travaille en salon</h2><ul class="ticks">' +
      ["L’analyse visuelle et le toucher de la fibre capillaire", "L’ajustement du geste : tension de la mèche et vitesse de glissement du fer", "Le diagnostic en situation réelle, avec le test de mèche", "Les réglages propres au produit utilisé au salon"].map(function (t) { return '<li>' + ic("check") + '<span>' + t + '</span></li>'; }).join("") + '</ul>' +
      '<p class="note" style="margin-top:14px">La pratique en présentiel reste essentielle pour garantir un bon résultat. Les leçons en ligne préparent l’atelier.</p></div>' +
      '<div class="card"><h2>Informations pratiques</h2><ul class="facts"><li>' + ic("pin") + '<span><b>Diane Hair Beauty</b><small>93 boulevard Sadi Carnot, 06110 Le Cannet</small></span></li><li>' + ic("cal") + '<span><b>Dates</b><small>À définir avec Diane</small></span></li><li>' + ic("clock") + '<span><b>Durée et tarif</b><small>À définir avec Diane</small></span></li></ul>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px"><a class="btn gold" href="' + WA + '" target="_blank" rel="noopener">' + ic("chat") + ' Réserver sur WhatsApp</a><a class="btn" href="' + MAIL + '">' + ic("mail") + ' Écrire à Diane</a></div></div></div>';
  }

  function transcriptHTML() {
    var P = window.PODCAST; if (!P) return "";
    var arr = LANG === "pt" && P.pt ? P.pt : P.fr;
    return '<section class="card transcript"><h2>Transcription</h2><p class="trhint">' + (LANG === "pt" ? "L’audio est en français : lisez la transcription en portugais ci-dessous. Touchez un horaire pour écouter ce passage." : "Lisez ou écoutez : touchez un horaire pour aller à ce passage de l’audio.") + '</p>' +
      arr.map(function (x, i) { return '<div class="trp"><button class="trt" data-action="seek" data-s="' + P.fr[i].s + '" aria-label="Écouter à ' + P.fr[i].t + '">' + ic("play") + P.fr[i].t + '</button><p>' + esc(x.p) + '</p></div>'; }).join("") + '</section>';
  }
  function audioHTML() {
    return '<section class="card"><div class="audio"><img src="assets/photos/podcast.webp" alt=""><div><h2 style="margin-bottom:4px">Les pièges du lissage sans formol</h2><small style="color:var(--mut)">Conversation de 5 min 26 · à écouter en salon ou en déplacement</small><audio id="aud" controls preload="metadata" src="assets/media/podcast.mp3"></audio><div class="speed" role="group" aria-label="Vitesse de lecture">' + [["1", "1×"], ["1.25", "1,25×"], ["1.5", "1,5×"]].map(function (s, k) { return '<button class="' + (k === 0 ? "on" : "") + '" data-action="speed" data-s="' + s[0] + '">' + s[1] + '</button>'; }).join("") + '</div></div></div></section>' +
      '<div class="note">Dans la formation finale, l’épisode peut être enregistré avec la voix de Diane.</div>' + transcriptHTML();
  }
  function imageHTML() {
    return '<button class="infog" data-action="zoom" data-src="assets/img/infographie.webp" aria-label="Agrandir l’infographie"><img src="assets/img/infographie.webp" alt="Infographie : le protocole du lissage brésilien, diagnostic et application" width="2000" height="1086"><span class="zoomhint">Toucher pour agrandir</span></button>' +
      '<details class="card tbcbox" style="margin-top:14px"><summary>' + ic("alert") + ' À vérifier avant publication<span style="margin-left:auto">' + ic("down") + '</span></summary><p>Relire l’orthographe dans l’image (par exemple « brésllien », « ventllée ») et faire valider par Diane les températures (150 à 230 °C), la distance à la racine et les temps indiqués.</p></details>' +
      '<div style="margin-top:12px"><a class="btn sm" href="assets/img/infographie.webp" download>' + ic("dl") + ' Télécharger l’image</a></div>';
  }
  function evalHTML() {
    return '<section class="card"><h2>Validez vos acquis</h2><p style="color:var(--mut)">10 questions tirées au hasard dans une banque de ' + evalQs().length + ' questions (leçons et guide). Réussite à partir de 7 bonnes réponses (exemple de seuil). Vous pouvez recommencer : les questions changent.</p></section>' + quizBox("evaluation", evalQs());
  }
  function guideHTML() {
    return '<section class="card"><h2>Testez-vous sur le guide</h2><p style="color:var(--mut)">Chaque réponse est expliquée, y compris les mauvaises. Les valeurs techniques restent à valider par Diane.</p></section>' + quizBox("guide", C.guide.quiz);
  }

  function outline(cur) {
    var isDesk = window.innerWidth > 1000;
    return '<details class="outline"' + (isDesk ? " open" : "") + '><summary>Contenu du module <small>' + doneCount() + ' / ' + ITEMS.length + '</small></summary><div class="bar"><i style="width:' + pct() + '%"></i></div><ol>' +
      ITEMS.map(function (it, k) {
        return (k === 0 || ITEMS[k - 1].grp !== it.grp ? '<li class="og">' + it.grp + '</li>' : "") + '<li><a href="#/lesson/' + it.id + '" class="' + (it.id === cur ? "on" : "") + '"><span class="dot' + (S.done[it.id] ? " ok" : "") + '">' + (S.done[it.id] ? ic("check") : (k + 1)) + '</span><span>' + esc(trT(it.title).length > 46 ? trT(it.title).slice(0, 44) + "…" : trT(it.title)) + '</span></a></li>';
      }).join("") + '</ol></details>';
  }
  function lessonPage(id) {
    var it = byId(id); if (!it) return notFound();
    var td = new Date(); S.days = S.days || {}; S.days[td.getFullYear() + "-" + (td.getMonth() + 1) + "-" + td.getDate()] = 1; save();
    var k = ITEMS.indexOf(it), prev = ITEMS[k - 1], next = ITEMS[k + 1], d = S.done[id];
    var body = it.type === "lesson" ? tabsHTML(id) : it.type === "slides" ? slidesHTML() : it.type === "audio" ? audioHTML() : it.type === "image" ? imageHTML() : it.type === "mindmap" ? mindmapHTML() : it.type === "cards" ? cardsHTML() : it.type === "quiz" ? evalHTML() : it.type === "quiz2" ? guideHTML() : atelierHTML();
    var meta = '<span>' + ic(it.icon) + esc(it.tag) + '</span><span>' + ic("clock") + esc(it.dur) + '</span>';
    return '<div class="wrap lesson"><div class="lmain"><a class="back" href="#/">' + ic("left") + ' Mon parcours</a>' +
      '<div class="lbanner"><img src="' + (it.banner || it.img) + '" alt="" style="' + (it.pos && !it.banner ? "object-position:" + it.pos : "") + '"><div class="lbin"><div class="kick">Étape ' + (k + 1) + ' sur ' + ITEMS.length + ' · ' + it.grp + '</div><h1>' + esc(it.title) + '</h1><div class="meta">' + meta + '</div></div></div>' +
      '<div class="lbody">' + (LANG === "pt" && (it.type === "slides" || it.type === "image") ? '<div class="note" style="margin:0 0 12px">Ce contenu est en français.</div>' : "") + body + '</div>' +
      '<div class="lfoot"><button class="btn ' + (d ? "ok" : "gold") + '" data-action="done" data-id="' + id + '">' + (d ? ic("check") + " Terminée" : "Marquer comme terminée") + '</button><div class="pn">' +
      (prev ? '<a class="btn sm" href="#/lesson/' + prev.id + '">' + ic("left") + ' Précédent</a>' : "") + (next ? '<a class="btn sm" href="#/lesson/' + next.id + '">Étape suivante ' + ic("right") + '</a>' : "") + '</div></div></div><aside class="lside">' + outline(id) + '</aside></div>';
  }

  /* ---------- Mon espace / FAQ ---------- */
  function espacePage() {
    var p = pct(), ev = S.scores.evaluation, c = 2 * Math.PI * 44;
    return '<div class="wrap"><div class="pagehead"><div class="kick">Espace élève</div><h1>Mon espace</h1></div>' +
      '<div class="card" style="display:flex;gap:22px;align-items:center;flex-wrap:wrap"><svg width="110" height="110" viewBox="0 0 110 110" aria-hidden="true"><circle cx="55" cy="55" r="44" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="8"/><circle cx="55" cy="55" r="44" fill="none" stroke="#c9a227" stroke-width="8" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + (c * (1 - p / 100)) + '" transform="rotate(-90 55 55)"/><text x="55" y="62" text-anchor="middle" fill="#141414" font-family="Poppins" font-weight="600" font-size="22">' + p + '%</text></svg>' +
      '<div style="flex:1 1 240px"><h2 style="margin-bottom:4px">Module pilote : lissage brésilien sans formol</h2><p style="color:var(--mut)">' + doneCount() + ' étape(s) sur ' + ITEMS.length + ' terminée(s)</p><div style="margin-top:12px">' + (nextItem() ? '<a class="btn gold sm" href="#/lesson/' + nextItem().id + '">Continuer ' + ic("right") + '</a>' : '<span class="btn ok sm">' + ic("check") + ' Module terminé</span>') + '</div></div></div>' +
      '<div class="sgrid"><div class="stat"><b>' + (S.scores.l1 !== undefined ? S.scores.l1 + " / 5" : "—") + '</b><span>Quiz de la leçon 1</span></div><div class="stat"><b>' + (S.scores.l2 !== undefined ? S.scores.l2 + " / 5" : "—") + '</b><span>Quiz de la leçon 2</span></div><div class="stat"><b>' + (S.scores.guide !== undefined ? S.scores.guide + " / " + C.guide.quiz.length : "—") + '</b><span>Quiz du guide</span></div><div class="stat"><b>' + (ev !== undefined ? ev + " / 10" : "—") + '</b><span>Évaluation du module</span></div></div>' +
      '<div class="card cert-prev"><div><h2 style="margin-bottom:4px">Attestation de suivi</h2><p style="color:var(--mut);max-width:52ch">Remise à l’élève à la fin du module, avec son nom. Voici un aperçu du modèle aux couleurs de Diane Hair Beauty.</p></div><a class="btn gold" href="#/certificat">Voir mon attestation ' + ic("right") + '</a></div></div>';
  }
  function faqPage() {
    var Qs = [
      ["Comment accéder à mes cours ?", "Avec votre e-mail et votre mot de passe, depuis un téléphone, une tablette ou un ordinateur. Votre progression est enregistrée à chaque étape. (Exemple de fonctionnement.)"],
      ["Pourquoi une partie en présentiel ?", "La pratique en présentiel reste essentielle pour garantir un bon résultat : l’analyse visuelle, le toucher de la fibre, la tension de la mèche et la vitesse de glissement du fer s’apprennent en cabine."],
      ["Puis-je télécharger les supports ?", "Oui. Chaque leçon propose son support PDF avec le script, le quiz et la check-list à imprimer."],
      ["Comment est validé le module ?", "Par une évaluation de 10 questions, avec une attestation de suivi à la fin. Le seuil de réussite est donné à titre d’exemple et reste à définir avec Diane."],
      ["Combien de temps ai-je accès au contenu ?", "À définir avec Diane (accès illimité ou limité dans le temps)."],
      ["Comment contacter Diane ?", "Par WhatsApp au 07 53 93 69 12 ou par e-mail à contact@dianehairbeauty.fr."]
    ];
    return '<div class="wrap faq"><div class="pagehead"><div class="kick">Aide</div><h1>Questions fréquentes</h1></div>' + Qs.map(function (q) { return '<details><summary>' + esc(q[0]) + ic("down") + '</summary><p>' + esc(q[1]) + '</p></details>'; }).join("") + '<div class="note">FAQ d’exemple, à adapter avec Diane.</div></div>';
  }
  function notFound() { return '<div class="wrap"><div class="pagehead"><h1>Page introuvable</h1><p><a class="btn sm" href="#/">Retour à mon parcours</a></p></div></div>'; }


  /* ---------- attestation (nom de l'élève) ---------- */
  function initial() { var n = (S.name || "").trim(); return esc(n ? n.charAt(0).toUpperCase() : "É"); }
  function certName() { return (S.name || "").trim() || "Camille Martin"; }
  function certPage() {
    var left = ITEMS.length - doneCount(), ok = left === 0;
    return '<div class="wrap"><div class="pagehead"><div class="kick">Fin de formation</div><h1>Mon attestation</h1></div><div class="certwrap"><div class="certside">' +
      '<div class="card">' + (ok ? '<h2>Félicitations !</h2><p style="color:var(--mut)">Vous avez terminé le module. Votre attestation de suivi est prête.</p>' : '<h2>Aperçu de l’attestation</h2><p style="color:var(--mut)">Elle est remise à la fin du module. Il vous reste <b>' + left + ' étape' + (left > 1 ? "s" : "") + '</b> sur ' + ITEMS.length + '. Ici, vous pouvez déjà voir le modèle avec votre nom.</p>') +
      '<label class="fld" style="margin-top:14px"><span>Nom sur l’attestation</span><input type="text" id="certName" value="' + esc(certName()) + '" maxlength="40" autocomplete="off"></label>' +
      '<button class="btn gold" data-action="cert-dl" style="width:100%">' + ic("dl") + ' Télécharger l’attestation (image)</button></div>' +
      '<div class="note">Modèle d’aperçu, sans valeur de certification. Texte et mise en page à valider avec Diane.</div></div>' +
      '<div class="certbox"><canvas id="certCv" width="1240" height="1754" role="img" aria-label="Attestation de suivi de formation"></canvas></div></div></div>';
  }
  var LOGO = null;
  function loadLogo() {
    return new Promise(function (res) { if (LOGO) return res(LOGO); var im = new Image(); im.onload = function () { LOGO = im; res(im); }; im.onerror = function () { res(null); }; im.src = "assets/img/logo-black.png"; });
  }
  function tracked(c, t, x, y, sp) {
    var w = 0, k; for (k = 0; k < t.length; k++) w += c.measureText(t[k]).width + sp; w -= sp;
    var cx = x - w / 2; c.textAlign = "left";
    for (k = 0; k < t.length; k++) { c.fillText(t[k], cx, y); cx += c.measureText(t[k]).width + sp; }
  }
  function fit(c, t, font, max, start, min) {
    var sz = start; do { c.font = font.replace("{s}", sz); sz -= 2; } while (c.measureText(t).width > max && sz > min);
  }
  function drawCert(cv, name) {
    if (!cv) return Promise.resolve();
    var fonts = ["200px Allura", "italic 600 40px Lora", "italic 40px Lora", "500 20px Poppins", "400 20px Poppins"];
    var fl = document.fonts && document.fonts.load ? Promise.all(fonts.map(function (f) { return document.fonts.load(f, "Aàé"); })).catch(function () {}) : Promise.resolve();
    return Promise.all([fl, loadLogo()]).then(function (r) {
      var CT = LANG === "pt" ? { h: "CERTIFICADO DE PARTICIPAÇÃO EM FORMAÇÃO", a: "Este certificado é concedido a", b: "por ter concluído com dedicação o módulo de formação", m: "« Alisamento brasileiro sem formol »", d1: "Diagnóstico, segurança, protocolo de aplicação", d2: "e acompanhamento da cliente", f: "FEITO EM LE CANNET", r: "DIANE · FORMADORA", n: " · MODELO DE DEMONSTRAÇÃO, SEM VALOR DE CERTIFICAÇÃO", nn: "Nº DHB-" } : { h: "ATTESTATION DE SUIVI DE FORMATION", a: "Cette attestation est décernée à", b: "pour avoir suivi avec assiduité le module de formation", m: "« Lissage brésilien sans formol »", d1: "Diagnostic, sécurité, protocole d’application", d2: "et suivi de la cliente", f: "FAIT AU CANNET", r: "DIANE · FORMATRICE", n: " · MODÈLE D’APERÇU, SANS VALEUR DE CERTIFICATION", nn: "N° DHB-" };
      var c = cv.getContext("2d"), W = 1240, H = 1754, logo = r[1];
      var INK = "#141414", MUT = "#6a6a6a", GOLD = "#c9a227", GOLDL = "#e6d28c", GOLDD = "#8a6d10";
      var g = c.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1100); g.addColorStop(0, "#ffffff"); g.addColorStop(1, "#f4f4f2");
      c.fillStyle = g; c.fillRect(0, 0, W, H);
      c.strokeStyle = GOLD; c.lineWidth = 2.5; c.strokeRect(48, 48, W - 96, H - 96);
      c.strokeStyle = GOLDL; c.lineWidth = 1.2; c.strokeRect(68, 68, W - 136, H - 136);
      [[68, 68], [W - 68, 68], [68, H - 68], [W - 68, H - 68]].forEach(function (p) { c.save(); c.translate(p[0], p[1]); c.rotate(Math.PI / 4); c.fillStyle = "#ffffff"; c.fillRect(-13, -13, 26, 26); c.strokeStyle = GOLD; c.lineWidth = 2; c.strokeRect(-13, -13, 26, 26); c.fillStyle = GOLD; c.fillRect(-4, -4, 8, 8); c.restore(); });
      if (logo) { var lw = 320, lh = lw * logo.height / logo.width; c.drawImage(logo, (W - lw) / 2, 150, lw, lh); }
      c.fillStyle = GOLDD; c.font = '500 27px Poppins, Arial, sans-serif'; c.textBaseline = "alphabetic";
      tracked(c, CT.h, W / 2, 450, 7);
      c.strokeStyle = GOLD; c.lineWidth = 1.5; c.beginPath(); c.moveTo(400, 500); c.lineTo(580, 500); c.moveTo(660, 500); c.lineTo(840, 500); c.stroke();
      c.save(); c.translate(620, 500); c.rotate(Math.PI / 4); c.fillStyle = GOLD; c.fillRect(-7, -7, 14, 14); c.restore();
      c.textAlign = "center"; c.fillStyle = MUT; c.font = 'italic 38px Lora, Georgia, serif'; c.fillText(CT.a, W / 2, 640);
      c.fillStyle = INK; fit(c, name, '{s}px Allura, "Lora", cursive', 900, 210, 70); c.textAlign = "center"; c.fillText(name, W / 2, 850);
      c.strokeStyle = GOLDL; c.lineWidth = 1.5; c.beginPath(); c.moveTo(280, 905); c.lineTo(960, 905); c.stroke();
      c.fillStyle = "#333"; c.font = '36px Lora, Georgia, serif'; c.fillText(CT.b, W / 2, 1010);
      c.fillStyle = GOLDD; fit(c, CT.m, 'italic 600 {s}px Lora, Georgia, serif', 940, 64, 36); c.textAlign = "center"; c.fillText(CT.m, W / 2, 1105);
      c.fillStyle = MUT; c.font = '400 28px Poppins, Arial, sans-serif'; c.fillText(CT.d1, W / 2, 1190); c.fillText(CT.d2, W / 2, 1235);
      // sceau
      var sg = c.createRadialGradient(600, 1370, 10, 620, 1390, 96); sg.addColorStop(0, "#f3df9a"); sg.addColorStop(1, "#c9a227");
      c.beginPath(); c.arc(620, 1390, 88, 0, 7); c.fillStyle = sg; c.fill();
      c.strokeStyle = "rgba(255,255,255,.75)"; c.lineWidth = 2; c.beginPath(); c.arc(620, 1390, 74, 0, 7); c.stroke();
      c.fillStyle = "#141414"; c.textAlign = "center"; c.font = 'italic 600 44px Lora, Georgia, serif'; c.fillText("DHB", 620, 1396);
      c.font = '500 13px Poppins, Arial, sans-serif'; tracked(c, "FORMATION", 620, 1428, 3);
      // date et signature
      var d = new Date().toLocaleDateString(LANG === "pt" ? "pt-BR" : "fr-FR", { day: "numeric", month: "long", year: "numeric" });
      c.fillStyle = INK; c.textAlign = "center"; c.font = '32px Lora, Georgia, serif'; c.fillText(d, 300, 1480);
      c.font = '120px Allura, "Lora", cursive'; c.fillText("Diane", 940, 1486);
      c.strokeStyle = GOLDL; c.lineWidth = 1.5; c.beginPath(); c.moveTo(150, 1505); c.lineTo(450, 1505); c.moveTo(790, 1505); c.lineTo(1090, 1505); c.stroke();
      c.fillStyle = MUT; c.font = '500 17px Poppins, Arial, sans-serif'; tracked(c, CT.f, 300, 1540, 4); tracked(c, CT.r, 940, 1540, 4);
      c.fillStyle = "#8a8a8a"; c.font = '400 18px Poppins, Arial, sans-serif'; tracked(c, "DIANE HAIR BEAUTY · 93 BOULEVARD SADI CARNOT · 06110 LE CANNET", W / 2, 1610, 2);
      var h = 0; for (var k = 0; k < name.length; k++) h = (h * 31 + name.charCodeAt(k)) % 9000;
      c.font = '400 16px Poppins, Arial, sans-serif'; tracked(c, CT.nn + new Date().getFullYear() + "-" + (1000 + h) + CT.n, W / 2, 1642, 1);
    });
  }
  function saveBlobFile(name, blob) {
    var cap = window.claude && window.claude.use ? window.claude.use("downloads") : Promise.resolve(null);
    return cap.then(function (dl) {
      if (dl) return dl.save({ filename: name, data: blob }).then(function () { toast("Fichier enregistré"); });
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000); toast("Attestation téléchargée");
    }).catch(function (err) { if (err && err.code === "declined") return; toast("Téléchargement impossible pour le moment"); });
  }
  function downloadCert() {
    var cv = document.createElement("canvas"); cv.width = 1240; cv.height = 1754; var nm = certName();
    drawCert(cv, nm).then(function () { cv.toBlob(function (b) { if (b) saveBlobFile((LANG === "pt" ? "Certificado" : "Attestation") + "-Diane-Hair-Beauty-" + nm.replace(/[^\wÀ-ÿ]+/g, "-") + ".png", b); else toast("Téléchargement impossible pour le moment"); }, "image/png"); });
  }
  document.addEventListener("input", function (e) {
    if (e.target && e.target.id === "certName") { S.name = e.target.value; save(); drawCert($("#certCv"), certName()); var av = document.querySelector(".avatar"); if (av) av.textContent = (S.name.trim().charAt(0) || "É").toUpperCase(); }
  });



  /* ---------- carte mentale ---------- */
  var MMOPEN = {};
  function mindmapHTML() {
    var M = window.MINDMAP && (LANG === "pt" ? window.MINDMAP.pt : window.MINDMAP.fr); if (!M) return "";
    var g = M.branches.map(function (b, i) {
      var open = MMOPEN[i] !== false;
      return '<div class="mm-g' + (open ? " open" : "") + '" style="--i:' + i + '"><button class="mmn br" data-action="mm-toggle" data-g="' + i + '" aria-expanded="' + open + '"><span>' + esc(b.t) + '</span><i aria-hidden="true"></i></button><ul class="mm-l">' +
        b.l.map(function (x, k) { var m = x.match(/^(.*?)\s?:\s(.*)$/); return '<li style="--k:' + k + '"><span class="mmn lf">' + (m ? '<b>' + esc(m[1]) + (LANG === "pt" ? ":" : " :") + '</b> ' + esc(m[2]) : esc(x)) + '</span></li>'; }).join("") + '</ul></div>';
    }).join("");
    return '<div class="card" style="margin-bottom:12px"><p style="color:var(--mut)">Touchez une branche pour l’ouvrir ou la fermer.</p><div class="mm-bar"><button class="btn sm" data-action="mm-all" data-o="1">Tout ouvrir</button><button class="btn sm" data-action="mm-all" data-o="0">Tout fermer</button></div></div>' +
      '<div class="mm" id="mm"><svg class="mm-svg" aria-hidden="true"></svg><div class="mm-r"><span class="mmn root">' + esc(M.root) + '</span></div><div class="mm-cols">' + g + '</div></div>' +
      '<div class="note">Certaines valeurs (temps de pause, pH, températures) varient selon les sources : à valider par Diane avant la mise en ligne.</div>';
  }
  var mmDrawn = false;
  function drawMM() {
    var box = $("#mm"); if (!box) return; var svg = box.querySelector(".mm-svg");
    if (getComputedStyle(svg).display === "none") return;
    var R = box.getBoundingClientRect(), root = box.querySelector(".mmn.root"), out = "";
    svg.setAttribute("width", R.width); svg.setAttribute("height", R.height); svg.setAttribute("viewBox", "0 0 " + R.width + " " + R.height);
    var pt = function (el, side) { var r = el.getBoundingClientRect(); return [(side === "r" ? r.right : r.left) - R.left, r.top + r.height / 2 - R.top]; };
    var curve = function (a, b, cls, d) { var dx = Math.max(24, (b[0] - a[0]) * 0.5); return '<path class="' + cls + '" pathLength="1" style="animation-delay:' + d + 's" d="M' + a[0] + " " + a[1] + " C" + (a[0] + dx) + " " + a[1] + " " + (b[0] - dx) + " " + b[1] + " " + b[0] + " " + b[1] + '"/>'; };
    var rp = pt(root, "r");
    [].forEach.call(box.querySelectorAll(".mm-g"), function (g, gi) {
      var br = g.querySelector(".mmn.br"); out += curve(rp, pt(br, "l"), "mm-c1", gi * 0.12);
      if (g.classList.contains("open")) [].forEach.call(g.querySelectorAll(".mmn.lf"), function (lf, li) { out += curve(pt(br, "r"), pt(lf, "l"), "mm-c2", 0.45 + gi * 0.1 + li * 0.05); });
    });
    svg.classList.toggle("still", mmDrawn); svg.innerHTML = out; mmDrawn = true;
  }
  function mmInit() { mmDrawn = false; requestAnimationFrame(drawMM); if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawMM); }
  window.addEventListener("resize", function () { if ($("#mm")) drawMM(); });

  /* ---------- flashcards ---------- */
  var FC = null;
  function fcFresh() { var n = window.FLASH ? window.FLASH.fr.length : 0, o = []; for (var k = 0; k < n; k++) o.push(k); FC = { order: o, i: 0, flip: false, know: {}, again: {}, done: false }; }
  function cardsHTML() {
    if (!window.FLASH) return ""; if (!FC) fcFresh();
    return '<div class="fc" data-fc>' + fcInner() + '</div>';
  }
  function fcInner() {
    var F = LANG === "pt" ? window.FLASH.pt : window.FLASH.fr, n = FC.order.length, kn = Object.keys(FC.know).length, ag = Object.keys(FC.again).length;
    if (FC.done) {
      return '<div class="card fc-res"><div class="score">' + kn + ' / ' + n + '</div><p>' + (ag ? "Vous maîtrisez déjà une partie des cartes. Revoyez les autres pour bien les retenir." : "Bravo, vous connaissez toutes les cartes !") + '</p><div class="qacts">' +
        (ag ? '<button class="btn gold" data-action="fc-review">Revoir les cartes à revoir (' + ag + ')</button>' : "") + '<button class="btn" data-action="fc-reset">Tout recommencer</button></div></div>';
    }
    var c = F[FC.order[FC.i]], pc = Math.round(100 * FC.i / n);
    return '<div class="fc-top"><span class="fc-n">Carte ' + (FC.i + 1) + ' / ' + n + '</span><div class="fc-tools"><button class="btn sm" data-action="fc-shuffle">Mélanger</button><button class="btn sm" data-action="fc-reset">Recommencer</button></div></div><div class="bar"><i style="width:' + pc + '%"></i></div>' +
      '<div class="fc-stage"><button class="fc-card' + (FC.flip ? " flip" : "") + '" data-action="fc-flip" aria-label="Retourner la carte"><span class="fc-face front"><small>Question</small><b>' + esc(c.q) + '</b><em>Voir la réponse</em></span><span class="fc-face back"><small>Réponse</small><b>' + esc(c.a) + '</b></span></button></div>' +
      '<div class="fc-ctl"><button class="icobtn" data-action="fc-prev" aria-label="Précédente">' + ic("left") + '</button><button class="fc-mark again" data-action="fc-again">✗ À revoir (' + ag + ')</button><button class="fc-mark know" data-action="fc-know">Je sais (' + kn + ') ✓</button><button class="icobtn" data-action="fc-next" aria-label="Suivante">' + ic("right") + '</button></div>';
  }
  function fcRender() { var b = $("[data-fc]"); if (b) b.innerHTML = fcInner(); }
  function fcStep(d) { if (FC.i + d >= FC.order.length) { FC.done = true; } else if (FC.i + d >= 0) { FC.i += d; } FC.flip = false; fcRender(); }
  function fcMark(map, other) { var idx = FC.order[FC.i]; map[idx] = 1; delete other[idx]; fcStep(1); }

  /* ---------- langue : FR (origine) / PT (traduction de l'interface) ---------- */
  var I18 = window.I18N_PT || { dict: {}, rules: [] };
  function trOne(t) {
    if (Object.prototype.hasOwnProperty.call(I18.dict, t)) return I18.dict[t];
    for (var i = 0; i < I18.rules.length; i++) { var r = I18.rules[i]; if (r[0].test(t)) return t.replace(r[0], r[1]); }
    return null;
  }
  function trText(str) {
    var m = str.match(/^(\s*)([\s\S]*?)(\s*)$/), core = m[2]; if (!core) return str;
    var o = trOne(core);
    if (o === null) {
      var parts = core.split(/( · | : | • )/), ch = false;
      if (parts.length > 1) {
        parts = parts.map(function (p, k) { if (k % 2) return p === " : " ? ": " : p; var t = trOne(p.trim()); if (t === null) return p; ch = true; return t; });
        if (ch) o = parts.join("");
      }
    }
    return o === null ? str : m[1] + o + m[3];
  }
  function trT(str) { return LANG === "pt" ? trText(str) : str; }
  var ATTR = ["alt", "aria-label", "title", "placeholder"];
  function fixNode(n) {
    if (n.__pt !== undefined && n.data === n.__pt) { if (LANG !== "pt") { n.data = n.__fr; n.__pt = undefined; } return; }
    n.__pt = undefined;
    if (LANG !== "pt") return;
    var out = trText(n.data); if (out !== n.data) { n.__fr = n.data; n.__pt = out; n.data = out; }
  }
  function fixAttrs(el) {
    ATTR.forEach(function (a) {
      var k = "__fa_" + a, v = el.getAttribute(a);
      if (v === null) return;
      if (el[k] !== undefined && v === el[k][1]) { if (LANG !== "pt") { el.setAttribute(a, el[k][0]); el[k] = undefined; } return; }
      el[k] = undefined;
      if (LANG !== "pt") return;
      var out = trText(v); if (out !== v) { el[k] = [v, out]; el.setAttribute(a, out); }
    });
  }
  function walkNode(root) {
    if (!root) return;
    if (root.nodeType === 3) { fixNode(root); return; }
    if (root.nodeType !== 1 || /^(SCRIPT|STYLE|CANVAS)$/.test(root.tagName)) return;
    fixAttrs(root);
    var w = document.createTreeWalker(root, 5, null), n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) { if (!/^(SCRIPT|STYLE)$/.test(n.parentNode.tagName)) fixNode(n); } else if (!/^(SCRIPT|STYLE|CANVAS)$/.test(n.tagName)) fixAttrs(n);
    }
  }
  var busy = false;
  new MutationObserver(function (list) {
    if (busy) return; busy = true;
    list.forEach(function (m) { if (m.type === "characterData") fixNode(m.target); else [].forEach.call(m.addedNodes, walkNode); });
    busy = false;
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
  function setLang(l) {
    LANG = l === "pt" ? "pt" : "fr"; C = LANG === "pt" ? CPT : CFR; S.lang = LANG; save();
    document.documentElement.lang = LANG; Q = {}; busy = true; walkNode(document.body); busy = false; render();
  }

  /* ---------- routeur ---------- */
  function parse() {
    var h = (location.hash || "#/").replace(/^#/, ""), p = h.split("/").filter(Boolean);
    if (!p.length) return { name: "home" };
    if (p[0] === "login") return { name: "login" };
    if (p[0] === "lesson") return { name: "lesson", id: p[1] };
    if (p[0] === "espace") return { name: "espace" };
    if (p[0] === "faq") return { name: "faq" };
    if (p[0] === "certificat") return { name: "certificat" };
    return { name: "notfound" };
  }
  function render() {
    var r = parse();
    if (!S.logged && r.name !== "login") { location.hash = "#/login"; return; }
    if (S.logged && r.name === "login") { location.hash = "#/"; return; }
    var app = $("#app"), top = $("#top"), foot = $("#foot");
    var login = r.name === "login";
    top.hidden = login; foot.hidden = login;
    if (!login) { top.innerHTML = header(r); foot.innerHTML = footer() + bnav(r); }
    app.innerHTML = U(login ? loginPage() : r.name === "home" ? homePage() : r.name === "lesson" ? lessonPage(r.id) : r.name === "espace" ? espacePage() : r.name === "faq" ? faqPage() : r.name === "certificat" ? certPage() : notFound());
    if (r.name === "certificat") drawCert($("#certCv"), certName());
    window.scrollTo(0, 0);
    if (r.name === "lesson" && r.id === "mindmap") mmInit();
    document.title = trT((login ? "Connexion" : r.name === "lesson" && byId(r.id) ? byId(r.id).title : "Espace formation") + (SEC ? " · Diane Hair Beauty" : " · Diane Hair Beauty (démo)"));
  }

  /* ---------- interactions ---------- */
  function toast(t) { var e = $("#toast"); e.textContent = t; e.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(function () { e.classList.remove("on"); }, 2400); }
  function overlay(html) { var o = $("#overlay"); o.innerHTML = U('<button class="x" data-action="close" aria-label="Fermer">' + ic("x") + '</button>' + html); o.hidden = false; }
  function closeOverlay() { var o = $("#overlay"); o.hidden = true; o.innerHTML = ""; }
  function refreshQuiz(key) { var box = document.querySelector('[data-quiz="' + key + '"]'); if (box) box.innerHTML = quizHTML(key); }

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-action]"); if (!el) return;
    var a = el.getAttribute("data-action");
    if (a === "ht") { HT = el.getAttribute("data-t"); var yy = window.scrollY; render(); window.scrollTo(0, yy); }
    else if (a === "logout") { if (SEC) SEC.signOut(); }
    else if (a === "lang") { setLang(el.getAttribute("data-l")); }
    else if (a === "login") { var ln = $("#loginName"); if (ln && ln.value.trim()) S.name = ln.value.trim(); S.logged = true; save(); location.hash = "#/"; render(); }
    else if (a === "menu") { $("#nav").classList.toggle("open"); }
    else if (a === "soon") { e.preventDefault(); toast("Bientôt disponible"); }
    else if (a === "done") { var id = el.getAttribute("data-id"); S.done[id] = !S.done[id]; save(); var y = window.scrollY; render(); window.scrollTo(0, y); }
    else if (a === "tab") { var i2 = el.getAttribute("data-id"), t = el.getAttribute("data-tab"); TAB[i2] = t; var box = $('[data-panel="' + i2 + '"]'); box.innerHTML = U(lessonPanel(i2, t)); document.querySelectorAll(".tabs button").forEach(function (b) { b.classList.toggle("on", b === el); }); }
    else if (a === "quiz-pick") { var k = el.getAttribute("data-key"), st = Q[k]; if (st.sel !== null) return; st.sel = +el.getAttribute("data-o"); if (st.sel === st.qs[st.i].a) st.score++; refreshQuiz(k); }
    else if (a === "quiz-next") { var k2 = el.getAttribute("data-key"), s2 = Q[k2]; s2.sel = null; s2.i++; if (s2.i >= s2.qs.length) { s2.done = true; S.scores[k2] = s2.score; var pass = k2 === "evaluation" ? s2.score >= 7 : s2.score >= Math.ceil(s2.qs.length * 0.6); if (pass && k2 === "evaluation") S.done.evaluation = true; if (pass && k2 === "guide") S.done.quizguide = true; save(); } refreshQuiz(k2); }
    else if (a === "quiz-retry") { var k3 = el.getAttribute("data-key"); Q[k3] = freshQuiz(k3); refreshQuiz(k3); }
    else if (a === "check") { /* géré par change */ }
    else if (a === "print") { window.print(); }
    else if (a === "slide") { setSlide(+el.getAttribute("data-i")); }
    else if (a === "slide-prev") { setSlide(SL.i - 1); }
    else if (a === "slide-next") { setSlide(SL.i + 1); }
    else if (a === "seek") { var au2 = $("#aud"), at = +el.getAttribute("data-s"); if (au2) { var go = function () { au2.currentTime = at; var pr = au2.play(); if (pr && pr.catch) pr.catch(function () {}); }; if (au2.readyState >= 1) go(); else { au2.addEventListener("loadedmetadata", go, { once: true }); au2.load(); } au2.scrollIntoView({ block: "center", behavior: "smooth" }); } }
    else if (a === "mm-toggle") { var gi = el.getAttribute("data-g"), gEl = el.parentNode, op = !gEl.classList.contains("open"); gEl.classList.toggle("open", op); el.setAttribute("aria-expanded", op); MMOPEN[gi] = op; drawMM(); }
    else if (a === "mm-all") { var o = el.getAttribute("data-o") === "1"; [].forEach.call(document.querySelectorAll(".mm-g"), function (g) { g.classList.toggle("open", o); g.querySelector(".mmn.br").setAttribute("aria-expanded", o); MMOPEN[g.getAttribute("style").match(/--i:(\d+)/)[1]] = o; }); drawMM(); }
    else if (a === "fc-flip") { FC.flip = !FC.flip; el.classList.toggle("flip", FC.flip); }
    else if (a === "fc-next") { fcStep(1); }
    else if (a === "fc-prev") { fcStep(-1); }
    else if (a === "fc-know") { fcMark(FC.know, FC.again); }
    else if (a === "fc-again") { fcMark(FC.again, FC.know); }
    else if (a === "fc-shuffle") { FC.order = shuffle(FC.order); FC.i = 0; FC.flip = false; FC.done = false; fcRender(); }
    else if (a === "fc-reset") { fcFresh(); fcRender(); }
    else if (a === "fc-review") { FC = { order: Object.keys(FC.again).map(Number), i: 0, flip: false, know: {}, again: {}, done: false }; fcRender(); }
    else if (a === "speed") { var au = $("#aud"); if (au) au.playbackRate = +el.getAttribute("data-s"); document.querySelectorAll(".speed button").forEach(function (b) { b.classList.toggle("on", b === el); }); }
    else if (a === "zoom") { overlay('<img class="big" src="' + el.getAttribute("data-src") + '" alt="Infographie agrandie">'); }
    else if (a === "cert-dl") { downloadCert(); }
    else if (a === "close") { closeOverlay(); }
  });
  document.addEventListener("change", function (e) {
    var el = e.target.closest('[data-action="check"]'); if (!el) return;
    var k = el.getAttribute("data-k"); if (el.checked) S.checks[k] = true; else delete S.checks[k]; save();
  });
  $("#overlay").addEventListener("click", function (e) { if (e.target.id === "overlay") closeOverlay(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeOverlay();
    if (parse().id === "flashcards" && $("[data-fc]") && FC && !FC.done) { if (e.key === "ArrowRight") fcStep(1); if (e.key === "ArrowLeft") fcStep(-1); }
    if (parse().id === "masterclass" && $("#slImg")) { if (e.key === "ArrowRight") setSlide(SL.i + 1); if (e.key === "ArrowLeft") setSlide(SL.i - 1); }
  });
  window.addEventListener("hashchange", function () { var n = $("#nav"); if (n) n.classList.remove("open"); render(); });
  render();
  window.DHB_DEMO = { reset: function () { S = { logged: false, done: {}, checks: {}, scores: {} }; save(); location.hash = "#/login"; location.reload(); } };
})();
