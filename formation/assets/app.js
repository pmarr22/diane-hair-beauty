(function () {
  "use strict";
  var C = window.COURSE_DATA || {};
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
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'
  };
  var ic = function (n, c) { return '<svg class="ic ' + (c || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[n] + '</svg>'; };

  /* ---------- état (progression conservée sur l'appareil) ---------- */
  var KEY = "dhb_formation_demo_v1";
  var S = { logged: false, done: {}, checks: {}, scores: {} };
  try { var raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch (e) {}
  var save = function () { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

  /* ---------- contenu du module ---------- */
  var ITEMS = [
    { id: "bienvenue", type: "video", tag: "Vidéo", title: "Bienvenue dans la formation", dur: "Présentation du module", img: "assets/photos/welcome.webp", icon: "play" },
    { id: "l1", type: "lesson", tag: "Leçon 1", title: "Comprendre le lissage brésilien sans formol et bien diagnostiquer", keys: "Comprendre • Diagnostiquer • Sécuriser", dur: "≈ 10 min", img: "assets/photos/l1.webp", icon: "cap", pdf: "assets/pdf/lecon-1.pdf", pdfInfo: "PDF · 6 pages · 170 Ko" },
    { id: "l2", type: "lesson", tag: "Leçon 2", title: "Le protocole pas à pas et le suivi de la cliente", keys: "Préparer • Appliquer • Accompagner", dur: "≈ 11 min", img: "assets/photos/l2.webp", icon: "cap", pdf: "assets/pdf/lecon-2.pdf", pdfInfo: "PDF · 6 pages · 196 Ko" },
    { id: "masterclass", type: "slides", tag: "Diaporama", title: "Masterclass : l’excellence du lissage sans formol", dur: "9 diapositives", img: "assets/slides/s1.webp", banner: "assets/photos/l1.webp", icon: "slides" },
    { id: "podcast", type: "audio", tag: "Audio", title: "Les pièges du lissage sans formol", dur: "5 min 26", img: "assets/photos/podcast.webp", icon: "head" },
    { id: "infographie", type: "image", tag: "Infographie", title: "Le protocole en un coup d’œil", dur: "À garder sous la main", img: "assets/img/infographie.webp", banner: "assets/photos/hero.webp", icon: "image", pos: "86% 0" },
    { id: "quizguide", type: "quiz2", tag: "Quiz", title: "Le guide du lissage professionnel", dur: (C.guide ? C.guide.quiz.length : 0) + " questions", img: "assets/slides/s3.webp", banner: "assets/photos/l1.webp", icon: "clip", pos: "30% 50%" },
    { id: "evaluation", type: "quiz", tag: "Évaluation", title: "Évaluation du module", dur: "10 questions", img: "assets/photos/eval.webp", icon: "clip" },
    { id: "atelier", type: "atelier", tag: "Présentiel", title: "Atelier pratique en salon", dur: "Avec Diane, au Cannet", img: "assets/photos/atelier.webp", icon: "cut" }
  ];
  var byId = function (id) { for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return ITEMS[i]; };
  var doneCount = function () { return ITEMS.filter(function (i) { return S.done[i.id]; }).length; };
  var pct = function () { return Math.round(100 * doneCount() / ITEMS.length); };
  var nextItem = function () { for (var i = 0; i < ITEMS.length; i++) if (!S.done[ITEMS[i].id]) return ITEMS[i]; return null; };
  var WA = "https://wa.me/33753936912?text=" + encodeURIComponent("Bonjour Diane, je souhaite des informations sur l’atelier pratique du lissage brésilien.");
  var MAIL = "mailto:contact@dianehairbeauty.fr?subject=" + encodeURIComponent("Atelier pratique · Lissage brésilien sans formol");

  /* ---------- gabarits ---------- */
  var RIBBON = "Aperçu de démonstration · contenu généré avec l’aide de l’IA à partir de sources publiques, à valider par Diane avant publication";

  function header(route) {
    var l = function (h, t, on) { return '<a href="' + h + '" class="' + (on ? "on" : "") + '">' + t + '</a>'; };
    var r = route.name;
    return '<div class="wrap hbar"><a class="brand" href="#/" aria-label="Diane Hair Beauty"><img src="assets/img/logo-gold.png" alt="Diane Hair Beauty" width="900" height="521"></a>' +
      '<nav class="nav" id="nav">' + l("#/", "Mes formations", r === "home" || (r === "lesson" && route.id !== "atelier")) + l("#/lesson/atelier", "Atelier présentiel", r === "lesson" && route.id === "atelier") + l("#/faq", "FAQ", r === "faq") + l("#/espace", "Mon espace", r === "espace") + '</nav>' +
      '<div class="hright"><span class="demo-chip">Démo</span><a class="avatar" href="#/espace" aria-label="Mon espace">É</a><button class="burger" data-action="menu" aria-label="Menu">' + ic("menu") + '</button></div></div>';
  }
  function footer() {
    return '<div class="wrap fin"><img src="assets/img/logo-gold.png" alt="Diane Hair Beauty" width="900" height="521"><p>© 2026 Diane Hair Beauty · 93 boulevard Sadi Carnot, 06110 Le Cannet<br>Plateforme de démonstration · créée par <a href="https://muvoria.fr" target="_blank" rel="noopener">Muvoria Lab</a></p><p><a href="' + WA + '" target="_blank" rel="noopener">WhatsApp 07 53 93 69 12</a> · <a href="mailto:contact@dianehairbeauty.fr">contact@dianehairbeauty.fr</a></p></div>';
  }

  /* ---------- login (aperçu) ---------- */
  function loginPage() {
    return '<div class="login"><div class="lg-l"><div class="bg" style="background-image:url(assets/photos/hero.webp)"></div><div><img src="assets/img/logo-gold.png" alt="Diane Hair Beauty" width="900" height="521"><p>Avec Diane, révélez la beauté de vos clientes.</p></div></div>' +
      '<div class="lg-r"><form class="lcard" onsubmit="return false"><div class="kick">Espace formation</div><h1>Connexion élève</h1>' +
      '<label class="fld"><span>E-mail</span><input type="email" value="eleve@exemple.fr" readonly aria-readonly="true"></label>' +
      '<label class="fld"><span>Mot de passe</span><input type="password" value="••••••••••" readonly aria-readonly="true"></label>' +
      '<div class="forgot">Mot de passe oublié ?</div>' +
      '<button type="button" class="btn gold" data-action="login">Se connecter (démo) ' + ic("right") + '</button>' +
      '<small>Écran d’aperçu : aucune donnée n’est saisie ni enregistrée. Dans la version finale, chaque élève reçoit ses accès par e-mail après son inscription.</small></form></div></div>';
  }

  /* ---------- vitrine ---------- */
  function poster(it, locked) {
    var d = S.done[it.id];
    return '<a class="poster' + (locked ? " locked" : "") + '" ' + (locked ? 'href="#" data-action="soon"' : 'href="#/lesson/' + it.id + '"') + '>' +
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
  function homePage() {
    var n = nextItem(), p = pct();
    var cta = n ? '<a class="btn gold" href="#/lesson/' + n.id + '">' + (doneCount() ? "Continuer la formation" : "Commencer la formation") + ' ' + ic("right") + '</a>' : '<a class="btn gold" href="#/espace">Voir mon attestation ' + ic("right") + '</a>';
    var locked = [
      { tag: "Bientôt", title: "Balayage & colorimétrie", dur: "Placement, lumière & précision", img: "assets/photos/balayage.webp", icon: "lock" },
      { tag: "Bientôt", title: "Extensions", dur: "Pose et finition", img: "assets/photos/extensions.webp", icon: "lock" },
      { tag: "Présentiel", title: "Formations complètes", dur: "Devenez expert(e)", img: "assets/photos/formation.webp", icon: "lock" }
    ];
    return '<section class="hero"><div class="himg" style="background-image:url(assets/photos/hero.webp)"></div><div class="hin"><div class="hc">' +
      '<img class="logo" src="assets/img/logo-gold.png" alt="Diane Hair Beauty" width="900" height="521"><h1 class="htitle"><span>Formation</span><b>Lissage brésilien<br>sans formol</b></h1>' +
      '<p class="hsub">Maîtrisez la technique, en toute sécurité, pour un résultat <b>lisse et naturel.</b></p>' +
      '<div class="chips"><div class="chip">' + ic("cap") + '2 leçons<br>complètes</div><div class="chip">' + ic("shield") + 'Sécurité<br>avant tout</div><div class="chip">' + ic("gem") + 'Conseils<br>de pro</div><div class="chip">' + ic("cal") + 'En ligne &<br>en présentiel</div></div>' +
      '<div class="hcta">' + cta + '</div><div class="gprog">Votre progression : ' + doneCount() + ' / ' + ITEMS.length + ' étapes<div class="bar"><i style="width:' + p + '%"></i></div></div></div>' +
      '<div class="hr">Avec Diane, révélez la beauté de vos clientes.</div></div></section>' +
      '<div class="wrap"><section class="row"><h2>Votre module <small>Lissage brésilien sans formol</small></h2><div class="mgrid">' + mcard(byId("l1")) + mcard(byId("l2")) + '</div></section>' +
      '<section class="row"><h2>Dans ce module <small>Écouter, regarder, s’entraîner</small></h2><div class="rail">' + ["bienvenue", "masterclass", "podcast", "infographie", "quizguide", "evaluation", "atelier"].map(function (id) { return poster(byId(id)); }).join("") + '</div></section>' +
      '<section class="row"><h2>Découvrir aussi <small>Prochaines formations</small></h2><div class="rail three">' + locked.map(function (l) { return poster(l, true); }).join("") + '</div></section></div>';
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
        (key === "evaluation" ? '<a class="btn gold" href="#/espace">Voir mon attestation ' + ic("right") + '</a>' : "") + '</div></div>';
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
      return '<div class="card"><div class="res">' + ic("file") + '<div><b>' + esc(it.tag) + ' · support complet (PDF)</b><small>' + it.pdfInfo + ' · script, diaporama, quiz et check-list</small></div><a class="btn sm" href="' + it.pdf + '" target="_blank" rel="noopener">Ouvrir</a><a class="btn gold sm" href="' + it.pdf + '" download>' + ic("dl") + ' Télécharger</a></div></div>';
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
      '<div class="note"><b>Diaporama généré avec l’IA</b> à partir des sources du module. Les valeurs techniques (temps de pose, températures, dosages) sont à valider par Diane. <a href="assets/pdf/masterclass.pdf" download style="color:var(--gold-l);text-decoration:underline">Télécharger le PDF</a></div></div>';
  }
  function setSlide(i) {
    SL.i = (i + 9) % 9;
    var img = $("#slImg"); if (!img) return;
    img.src = "assets/slides/s" + (SL.i + 1) + ".webp"; img.alt = "Diapositive " + (SL.i + 1);
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

  function videoHTML() {
    return '<div class="player"><video controls playsinline preload="metadata" poster="assets/media/bienvenue.jpg" src="assets/media/bienvenue.mp4"></video></div>' +
      '<div class="note"><b>Vidéo de démonstration.</b> Dans la formation, ce sera la vidéo d’accueil de Diane, tournée au salon.</div>' +
      '<section class="card" style="margin-top:14px"><h2>Comment ça marche</h2><ul class="ticks">' + ["Deux leçons à lire, écouter ou regarder, à votre rythme", "Un quiz et une check-list à la fin de chaque leçon", "Une masterclass, un podcast et une infographie pour réviser", "Une évaluation, puis l’atelier pratique en salon avec Diane", "Votre progression est enregistrée à chaque étape"].map(function (t) { return '<li>' + ic("check") + '<span>' + t + '</span></li>'; }).join("") + '</ul></section>';
  }
  function audioHTML() {
    return '<section class="card"><div class="audio"><img src="assets/photos/podcast.webp" alt=""><div><h2 style="margin-bottom:4px">Les pièges du lissage sans formol</h2><small style="color:var(--mut)">Conversation de 5 min 26 · à écouter en salon ou en déplacement</small><audio id="aud" controls preload="metadata" src="assets/media/podcast.m4a"></audio><div class="speed" role="group" aria-label="Vitesse de lecture">' + [["1", "1×"], ["1.25", "1,25×"], ["1.5", "1,5×"]].map(function (s, k) { return '<button class="' + (k === 0 ? "on" : "") + '" data-action="speed" data-s="' + s[0] + '">' + s[1] + '</button>'; }).join("") + '</div></div></div></section>' +
      '<div class="note"><b>Voix générées par IA.</b> Démonstration : dans la formation, l’épisode peut être enregistré avec la voix de Diane. Le contenu est à valider par Diane.</div>';
  }
  function imageHTML() {
    return '<button class="infog" data-action="zoom" data-src="assets/img/infographie.webp" aria-label="Agrandir l’infographie"><img src="assets/img/infographie.webp" alt="Infographie : le protocole du lissage brésilien, diagnostic et application" width="2000" height="1086"><span class="zoomhint">Toucher pour agrandir</span></button>' +
      '<details class="card tbcbox" style="margin-top:14px"><summary>' + ic("alert") + ' À vérifier avant publication<span style="margin-left:auto">' + ic("down") + '</span></summary><p>Image générée par IA : relire l’orthographe dans l’image (par exemple « brésllien », « ventllée ») et faire valider par Diane les températures (150 à 230 °C), la distance à la racine et les temps indiqués.</p></details>' +
      '<div style="margin-top:12px"><a class="btn sm" href="assets/img/infographie.webp" download>' + ic("dl") + ' Télécharger l’image</a></div>';
  }
  function evalHTML() {
    return '<section class="card"><h2>Validez vos acquis</h2><p style="color:#ddd">10 questions tirées au hasard dans une banque de ' + evalQs().length + ' questions (leçons et guide). Réussite à partir de 7 bonnes réponses (exemple de seuil). Vous pouvez recommencer : les questions changent.</p></section>' + quizBox("evaluation", evalQs());
  }
  function guideHTML() {
    return '<section class="card"><h2>Testez-vous sur le guide</h2><p style="color:#ddd">Quiz généré avec NotebookLM à partir des sources du module. Chaque réponse est expliquée, y compris les mauvaises. Les valeurs techniques restent à valider par Diane.</p></section>' + quizBox("guide", C.guide.quiz);
  }

  function outline(cur) {
    var isDesk = window.innerWidth > 1000;
    return '<details class="outline"' + (isDesk ? " open" : "") + '><summary>Contenu du module <small>' + doneCount() + ' / ' + ITEMS.length + '</small></summary><div class="bar"><i style="width:' + pct() + '%"></i></div><ol>' +
      ITEMS.map(function (it, k) {
        return '<li><a href="#/lesson/' + it.id + '" class="' + (it.id === cur ? "on" : "") + '"><span class="dot' + (S.done[it.id] ? " ok" : "") + '">' + (S.done[it.id] ? ic("check") : (k + 1)) + '</span><span>' + esc(it.tag) + ' · ' + esc(it.title.length > 44 ? it.title.slice(0, 42) + "…" : it.title) + '</span></a></li>';
      }).join("") + '</ol></details>';
  }
  function lessonPage(id) {
    var it = byId(id); if (!it) return notFound();
    var k = ITEMS.indexOf(it), prev = ITEMS[k - 1], next = ITEMS[k + 1], d = S.done[id];
    var body = it.type === "lesson" ? tabsHTML(id) : it.type === "video" ? videoHTML() : it.type === "slides" ? slidesHTML() : it.type === "audio" ? audioHTML() : it.type === "image" ? imageHTML() : it.type === "quiz" ? evalHTML() : it.type === "quiz2" ? guideHTML() : atelierHTML();
    var meta = '<span>' + ic(it.icon) + esc(it.tag) + '</span><span>' + ic("clock") + esc(it.dur) + '</span>';
    return '<div class="wrap lesson"><div class="lmain"><a class="back" href="#/">' + ic("left") + ' Mes formations</a>' +
      '<div class="lbanner"><img src="' + (it.banner || it.img) + '" alt="" style="' + (it.pos && !it.banner ? "object-position:" + it.pos : "") + '"><div class="lbin"><div class="kick">Module pilote · Lissage brésilien sans formol</div><h1>' + esc(it.title) + '</h1><div class="meta">' + meta + '</div></div></div>' +
      '<div class="lbody">' + body + '</div>' +
      '<div class="lfoot"><button class="btn ' + (d ? "ok" : "gold") + '" data-action="done" data-id="' + id + '">' + (d ? ic("check") + " Terminée" : "Marquer comme terminée") + '</button><div class="pn">' +
      (prev ? '<a class="btn sm" href="#/lesson/' + prev.id + '">' + ic("left") + ' Précédent</a>' : "") + (next ? '<a class="btn sm" href="#/lesson/' + next.id + '">Suivant ' + ic("right") + '</a>' : "") + '</div></div></div><aside class="lside">' + outline(id) + '</aside></div>';
  }

  /* ---------- Mon espace / FAQ ---------- */
  function espacePage() {
    var p = pct(), ev = S.scores.evaluation, c = 2 * Math.PI * 44;
    return '<div class="wrap"><div class="pagehead"><div class="kick">Espace élève</div><h1>Mon espace</h1></div>' +
      '<div class="card" style="display:flex;gap:22px;align-items:center;flex-wrap:wrap"><svg width="110" height="110" viewBox="0 0 110 110" aria-hidden="true"><circle cx="55" cy="55" r="44" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="9"/><circle cx="55" cy="55" r="44" fill="none" stroke="#d4af37" stroke-width="9" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + (c * (1 - p / 100)) + '" transform="rotate(-90 55 55)"/><text x="55" y="62" text-anchor="middle" fill="#fff" font-family="Poppins" font-weight="700" font-size="22">' + p + '%</text></svg>' +
      '<div style="flex:1 1 240px"><h2 style="margin-bottom:4px">Module pilote : lissage brésilien sans formol</h2><p style="color:var(--mut)">' + doneCount() + ' étape(s) sur ' + ITEMS.length + ' terminée(s)</p><div style="margin-top:12px">' + (nextItem() ? '<a class="btn gold sm" href="#/lesson/' + nextItem().id + '">Continuer ' + ic("right") + '</a>' : '<span class="btn ok sm">' + ic("check") + ' Module terminé</span>') + '</div></div></div>' +
      '<div class="sgrid"><div class="stat"><b>' + (S.scores.l1 !== undefined ? S.scores.l1 + " / 5" : "—") + '</b><span>Quiz de la leçon 1</span></div><div class="stat"><b>' + (S.scores.l2 !== undefined ? S.scores.l2 + " / 5" : "—") + '</b><span>Quiz de la leçon 2</span></div><div class="stat"><b>' + (S.scores.guide !== undefined ? S.scores.guide + " / " + C.guide.quiz.length : "—") + '</b><span>Quiz du guide</span></div><div class="stat"><b>' + (ev !== undefined ? ev + " / 10" : "—") + '</b><span>Évaluation du module</span></div></div>' +
      '<div class="card cert-prev"><div><h2 style="margin-bottom:4px">Attestation de suivi</h2><p style="color:var(--mut);max-width:52ch">Remise à l’élève à la fin du module. Voici un aperçu du modèle aux couleurs de Diane Hair Beauty.</p></div><button class="btn gold" data-action="cert">Voir l’aperçu ' + ic("right") + '</button></div></div>';
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
  function notFound() { return '<div class="wrap"><div class="pagehead"><h1>Page introuvable</h1><p><a class="btn sm" href="#/">Retour à mes formations</a></p></div></div>'; }

  /* ---------- routeur ---------- */
  function parse() {
    var h = (location.hash || "#/").replace(/^#/, ""), p = h.split("/").filter(Boolean);
    if (!p.length) return { name: "home" };
    if (p[0] === "login") return { name: "login" };
    if (p[0] === "lesson") return { name: "lesson", id: p[1] };
    if (p[0] === "espace") return { name: "espace" };
    if (p[0] === "faq") return { name: "faq" };
    return { name: "notfound" };
  }
  function render() {
    var r = parse();
    if (!S.logged && r.name !== "login") { location.hash = "#/login"; return; }
    if (S.logged && r.name === "login") { location.hash = "#/"; return; }
    var app = $("#app"), top = $("#top"), foot = $("#foot");
    var login = r.name === "login";
    top.hidden = login; foot.hidden = login;
    if (!login) { top.innerHTML = header(r); foot.innerHTML = footer(); }
    app.innerHTML = login ? loginPage() : r.name === "home" ? homePage() : r.name === "lesson" ? lessonPage(r.id) : r.name === "espace" ? espacePage() : r.name === "faq" ? faqPage() : notFound();
    window.scrollTo(0, 0);
    document.title = (login ? "Connexion" : r.name === "lesson" && byId(r.id) ? byId(r.id).title : "Espace formation") + " · Diane Hair Beauty (démo)";
  }

  /* ---------- interactions ---------- */
  function toast(t) { var e = $("#toast"); e.textContent = t; e.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(function () { e.classList.remove("on"); }, 2400); }
  function overlay(html) { var o = $("#overlay"); o.innerHTML = '<button class="x" data-action="close" aria-label="Fermer">' + ic("x") + '</button>' + html; o.hidden = false; }
  function closeOverlay() { var o = $("#overlay"); o.hidden = true; o.innerHTML = ""; }
  function refreshQuiz(key) { var box = document.querySelector('[data-quiz="' + key + '"]'); if (box) box.innerHTML = quizHTML(key); }

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-action]"); if (!el) return;
    var a = el.getAttribute("data-action");
    if (a === "login") { S.logged = true; save(); location.hash = "#/"; render(); }
    else if (a === "menu") { $("#nav").classList.toggle("open"); }
    else if (a === "soon") { e.preventDefault(); toast("Bientôt disponible"); }
    else if (a === "done") { var id = el.getAttribute("data-id"); S.done[id] = !S.done[id]; save(); var y = window.scrollY; render(); window.scrollTo(0, y); }
    else if (a === "tab") { var i2 = el.getAttribute("data-id"), t = el.getAttribute("data-tab"); TAB[i2] = t; var box = $('[data-panel="' + i2 + '"]'); box.innerHTML = lessonPanel(i2, t); document.querySelectorAll(".tabs button").forEach(function (b) { b.classList.toggle("on", b === el); }); }
    else if (a === "quiz-pick") { var k = el.getAttribute("data-key"), st = Q[k]; if (st.sel !== null) return; st.sel = +el.getAttribute("data-o"); if (st.sel === st.qs[st.i].a) st.score++; refreshQuiz(k); }
    else if (a === "quiz-next") { var k2 = el.getAttribute("data-key"), s2 = Q[k2]; s2.sel = null; s2.i++; if (s2.i >= s2.qs.length) { s2.done = true; S.scores[k2] = s2.score; var pass = k2 === "evaluation" ? s2.score >= 7 : s2.score >= Math.ceil(s2.qs.length * 0.6); if (pass && k2 === "evaluation") S.done.evaluation = true; if (pass && k2 === "guide") S.done.quizguide = true; save(); } refreshQuiz(k2); }
    else if (a === "quiz-retry") { var k3 = el.getAttribute("data-key"); Q[k3] = freshQuiz(k3); refreshQuiz(k3); }
    else if (a === "check") { /* géré par change */ }
    else if (a === "print") { window.print(); }
    else if (a === "slide") { setSlide(+el.getAttribute("data-i")); }
    else if (a === "slide-prev") { setSlide(SL.i - 1); }
    else if (a === "slide-next") { setSlide(SL.i + 1); }
    else if (a === "speed") { var au = $("#aud"); if (au) au.playbackRate = +el.getAttribute("data-s"); document.querySelectorAll(".speed button").forEach(function (b) { b.classList.toggle("on", b === el); }); }
    else if (a === "zoom") { overlay('<img class="big" src="' + el.getAttribute("data-src") + '" alt="Infographie agrandie">'); }
    else if (a === "cert") {
      var d = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
      overlay('<div class="cert print-area"><img src="assets/img/logo-black.png" alt="Diane Hair Beauty"><h2>Attestation de suivi de formation</h2><p>Diane Hair Beauty · Le Cannet</p><div class="nm">Prénom Nom</div><p>a suivi le module pilote <b>« Lissage brésilien sans formol »</b> : diagnostic, sécurité, protocole d’application et suivi de la cliente.</p><p>Fait au Cannet, le ' + d + '</p><div class="sig">Diane</div><small>Modèle d’aperçu, sans valeur de certification</small><div class="act"><button class="btn sm" style="color:#7a5f10;border-color:#7a5f10" data-action="print">' + ic("print") + ' Imprimer</button></div></div>');
    }
    else if (a === "close") { closeOverlay(); }
  });
  document.addEventListener("change", function (e) {
    var el = e.target.closest('[data-action="check"]'); if (!el) return;
    var k = el.getAttribute("data-k"); if (el.checked) S.checks[k] = true; else delete S.checks[k]; save();
  });
  $("#overlay").addEventListener("click", function (e) { if (e.target.id === "overlay") closeOverlay(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeOverlay();
    if (parse().id === "masterclass" && $("#slImg")) { if (e.key === "ArrowRight") setSlide(SL.i + 1); if (e.key === "ArrowLeft") setSlide(SL.i - 1); }
  });
  window.addEventListener("hashchange", function () { var n = $("#nav"); if (n) n.classList.remove("open"); render(); });
  render();
  window.DHB_DEMO = { reset: function () { S = { logged: false, done: {}, checks: {}, scores: {} }; save(); location.hash = "#/login"; location.reload(); } };
})();
