---
title: Alles over GSAP
description: Wat is GSAP, en Hoe kan je het gebruiken
date: '2025-03-07'
categories:
  - we love web
published: true
image: "gsap.jpg"
---

# De Krachtige animation-tool voor het Web





[GSAP (GreenSock Animation Platform)](https://gsap.com/) is een krachtige animatiebibliotheek waarmee je zowel 2D- als 3D-animaties kunt maken. Of je nu werkt met vanilla JavaScript, React, Svelte of een andere stack — GSAP is universeel inzetbaar.

---

## Waarom GSAP?

GSAP biedt developers een robuuste en performante manier om animaties te maken die soepel en controleerbaar zijn. Waar CSS-animaties soms tekortschieten in flexibiliteit of sequencing, blinkt GSAP juist uit.

---

## Tweens en Timelines

GSAP werkt met twee basisprincipes: **tweens** en **timelines**.

- **Tweens** zijn individuele animaties waarbij je een element (`target`) een bepaalde stijlverandering (`doel`) laat ondergaan met een `method`. Denk aan het verplaatsen, schalen of roteren van elementen.

  Voorbeeld:
  ```ts
  gsap.to(".box", { x: 100, duration: 1 });
  ```

- **Timelines** zijn handig om meerdere animaties te groeperen en beter te controleren. Hiermee kun je animaties na elkaar laten afspelen, overlappen of synchroniseren.

  Voorbeeld:
  ```ts
  const tl = gsap.timeline();
  tl.to(".box", { x: 100, duration: 1 });
  tl.to(".box", { rotation: 360, duration: 1 });
  ```

---

## ScrollTrigger

Een van de populairste uitbreidingen van GSAP is **ScrollTrigger**. Hiermee kun je scrollgestuurde animaties maken die reageren op de scrollpositie van de gebruiker. Denk aan sticky animaties, parallax-effecten of het laten binnenvliegen van secties.

ScrollTrigger ondersteunt ook smooth scrolling en pinning, wat zorgt voor een premium gebruikerservaring.

Voorbeeld:
```ts
gsap.to(".section", {
  scrollTrigger: ".section",
  x: 500,
  duration: 2
});
```

---

## GSAP Utils

**GSAP Utils** is een verzameling van handige utility-methodes om complexe animaties eenvoudiger te maken. Een veelgebruikte functie is:

- `gsap.utils.random(min, max, snap)` – genereert een willekeurige waarde binnen een bepaald bereik, optioneel met afronding naar dichtstbijzijnde waarde.

Voorbeeld:
```ts
const randX = gsap.utils.random(0, 100);
gsap.to(".box", { x: randX, duration: 1 });
```

---

## Eases

**Easing** bepaalt hoe de snelheid van een animatie verloopt. In plaats van een lineaire beweging, kun je de animatie laten versnellen of vertragen met bijvoorbeeld `ease: "power2.inOut"`.

GSAP bevat een ingebouwde **easing visualizer** waarmee je precies ziet hoe je easing zich gedraagt. Dit helpt bij het kiezen van de juiste feel voor je animatie.

---

## Control Methods

GSAP geeft je volledige controle over je animaties met methodes zoals:

- `.pause()`
- `.resume()`
- `.reverse()`
- `.restart()`

Deze methodes geven je de mogelijkheid om animaties te pauzeren of opnieuw te starten op basis van user interactions, zoals klikken of hoveren.

---

### Meer Leren?

Bekijk de officiële GSAP demo’s voor inspiratie en voorbeelden:  
👉 [GSAP Demos](https://gsap.com/demos/?page=1)

---

Met GSAP kun je animaties bouwen die niet alleen visueel aantrekkelijk zijn, maar ook technisch beheersbaar en performant. Of je nu net begint met animaties of al een ervaren motion developer bent: GSAP heeft iets te bieden.
