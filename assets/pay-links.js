/*
  LIENS DE PAIEMENT (Stripe, SumUp, PayPal...)
  Comment faire : dans Stripe, creer un "Payment Link" pour chaque produit,
  copier l'adresse (https://buy.stripe.com/...) et la coller entre les guillemets
  ci-dessous, en face du nom du produit. Laisser "" = aucun bouton de paiement
  (le bouton WhatsApp reste). Le bouton "Payer en ligne" apparait tout seul
  sur la carte du produit des qu'un lien est renseigne.
  Les noms doivent etre identiques au titre de la carte, dans chaque langue.
*/
window.PAY_LINKS = {
  /* Francais */
  "Kérastase": "",
  "L’Oréal Professionnel": "",
  "Uau": "",
  "Progressive & entretien": "",
  "Color Wow": "",
  "Soins organiques": "",
  "Cheveux pour extensions": "",
  /* Portugues */
  "Progressiva & manutenção": "",
  "Cuidados orgânicos": "",
  "Cabelo para extensões": "",
  /* English */
  "Smoothing & maintenance": "",
  "Organic care": "",
  "Hair for extensions": ""
};
(function () {
  var lang = (document.documentElement.lang || "fr").slice(0, 2);
  var label = { fr: "Payer en ligne", pt: "Pagar online", en: "Pay online" }[lang] || "Pay online";
  function addButtons() {
    document.querySelectorAll(".sb").forEach(function (card) {
      var h = card.querySelector("h3");
      if (!h || card.querySelector(".paybtn")) return;
      var url = window.PAY_LINKS[h.textContent.trim()];
      if (!url) return;
      var a = document.createElement("a");
      a.className = "btn cta-shine paybtn";
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = label;
      card.appendChild(a);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addButtons);
  else addButtons();
})();
