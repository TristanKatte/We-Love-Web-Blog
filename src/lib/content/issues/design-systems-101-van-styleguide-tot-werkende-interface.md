---
title: Design Systems 101: Van Styleguide tot Werkende Interface
description: Ontdek hoe design systems, styleguides en herbruikbare componenten helpen bij het creëren van consistente, schaalbare en efficiënte digitale producten.
date: '2025-11-21'
categories:
  - We love web
  - Styleguides
  - Components
  - Design System
published: true
image: 
---

- Afgestudeerd aan CMD in 2014
- Trystian Offerman, frontend developer bij Decathlon
- Hoe de organisatie producten maakt

---
## Design system @ Decathlon

Trystian is staff engineer, wat inhoudt dat hij overzicht heeft over andere engineers en behorende werkzaamheden. Hij heeft gewerkt bij Mediocom en Bol.com en op heden bij Decathlon.
Het is een Frans Bedrijf, actief in 79 landen, locaties in Lille, Parijs, Nantes en Amsterdam. Ze maken E-commerce websites voor de 16 grootste landen. In Amsterdam gericht op E-commerce kant en data kant. Upper Funnel: alles totdat je betaalt. Low funnel: mandje, checkout, login, After sales en Account + Buying. 

Teams Upper Funnel: Navigatie team, product page, Inspire price and promo, CMS team, Recommendations, product API, Catalog, Search and Ranking, SEO etc. Product page team bestaat uit Engineering manager, Productmanager, 2 designers, Content design, UX design en 6 frontend engineers

De frontend stack bestaat uit Next.js, Typescript, React, Java en Node.js

alles zit in 1 repository, de gedeployed wordt naar alle landen
---

### Design system

Een plaats waar je alle design standaarden en code conventies bewaart, om consistente producten te bouwen. Decathlon heeft een nieuw design system online, maar nog niet toegankelijk voor het publiek. In het design system van Decathlon zitten alle guidelines, componenten, modules en templates en internationalisering. Alles is accessible, heeft theming en verschillende modussen.

Foundations heeft alle dingen over de gehele organisatie, van kleur tot sizing. Er is een responsive grid, over hoe pagina's zich moeten verhouden tot device. Die worden allemaal omgezet naar design tokens. Design tokens zijn gedefinieerd in code, maar komen ook terug in Figma, waar ze tot custom css properties worden gemaakt.
---

### Design and engineering speak the same language

Als een designer een token heeft gemaakt, wordt dat omgezet naar code door de developer/engineers. Design tokens zijn de kern van de foundations, die worden getoond over de website en apps. Decathlon is overgestapt naar een design system, omdat het een grote, maar verstandige keuze was geweest. Je kan sneller een website kan bouwen met herbruikbare componenten. Niet dat je alles 100 keer moet uitvinden. Ook is het schaalbaar. Ook is er improved collaboration tussen designers en developers, wordt de kwaliteit enhanced, accessibility, wat niet als afterthought wordt behandeld, maar een must is. Je hoeft het wiel niet opnieuw uit te vinden.

Ze ondersteunen React, Sveltekit en Vue, maar raden het af om hier design systems in te maken, omdat het anders veel trager gaat werken en niet gaat voldoen aan bepaalde standaarden. In hun frontend library hebben ze: colors, assets (logo's), Icons, Typography en een component library, waarbij componenten worden benoemd tot waar ze voor dienen. De code is zo toegankelijk mogelijk gemaakt, met behulp van guidelines en A11y.
---

### What components should be in a design system

- UI primitives
- Form components
etc.

Gebruik wat handig is voor jezelf/organisatie. Zorg ervoor dat componenten composable zijn. Dat je kan zeggen, "ik wil geen titel, geen footer" etc. 

- Composable
- Flexible
- Accessible
- Themed
- Well Documented
- Consistent
- Stable and Predictable

---

### What should not be in a design system

- Page-specific or flow specific UIs
- Complete pages
- Highly coupled Backend/domain logic
- One offs
- Experiments
- Things which are specific to one product

er is ook een developer portal, om te zien hoe een component werkt en welke code ervoor is gemaakt. het is een soort van sandbox. Een heel blok over hoe je een component accessible maakt en een vision simulator over hoe andere mensen het beeld zien. 
---

### How is it organized?

De architectuur bestaat uit Figma, daar wordt alles geexporteerd naar github als design system naar verschillende interne packages, die vervolgens naar foundations gaan, dan naar android/IOS, de fysieke winkel, checkout en de webshop.


