# ShatruKalan — Product Record

## Original problem statement
Create a historical-themed dark website about Ancient Indian Warfare covering its timeline, armies, weapons, vyuha formations, strategies, Arthashastra, leaders, fortifications, naval warfare, intelligence, battles, organization, technology, and contemporary relevance. The experience should have a glowing cursor and smooth interactive UI.

## Architecture decisions
- React single-page experience with section-based dashboard navigation.
- Static curated historical content keeps the first experience fast and readable; cards open focused detail modals.
- Framer Motion powers entrance, hover, selection, and modal transitions; Lenis provides smooth scrolling.
- External historical imagery is used deliberately in hero, timeline, and archive cards.

## Implemented
- ShatruKalan brand system with obsidian, gold, rust, serif editorial typography, grain, grid, and clipped image treatments.
- Kinetic hero with staggered reveal, CTA, responsive imagery, glowing cursor, and editorial marquee.
- Interactive six-era timeline with bilingual labels and animated active-era content.
- Six archive modules covering armies, weapons, vyuha, Arthashastra, fortresses, and naval warfare.
- Detail modal flow for timeline notes, archive cards, and contemporary strategy principle.
- Responsive mobile navigation and mobile-safe layouts.
- All key interactive and user-facing elements include unique data-testid attributes.

## Prioritized backlog
- P0: Add the remaining nine archive modules as full cards (battles, leaders, espionage, organization, technology, and more).
- P1: Add a visual Vyuha formation explorer with selectable animated diagrams.
- P1: Add searchable archive filtering across eras, leaders, weapons, and strategies.
- P2: Add audio narration or a museum-style reference bibliography.