# Decisioni

Registro delle decisioni di design. Ogni voce ha tre parti: cosa, perché, alternative scartate.

Un numero si usa come fatto solo con l'etichetta simulazione, stima o dato reale.

## 2026-11-11 — `main` resta la versione stabile

**Cosa.** `main` resta la versione pubblicata su GitHub Pages. Ogni modifica passa da un branch con prefisso e da una pull request. L'anteprima si apre su raw.githack.com. Il controllo Actions «Sintassi script» (`node --check`) deve essere verde.

**Perché.** Pages pubblica solo `main`. La versione giocabile resta ferma finché la modifica non è provata e unita.

**Alternative scartate.** Un branch `develop` permanente. Anteprime pubblicate da GitHub Actions: avrebbero richiesto di cambiare la sorgente di Pages.

## 2026-11-12 — Primo avvio e onboarding (PR #2, unita)

**Cosa.** Al primo avvio parte una partita guidata con la sola regola base. Same, Plus, Combo e gli effetti delle carte si sbloccano dalla campagna; Same al capitolo 6. In partita compare il banner RIBALTONE. A fine partita si mostra la mossa decisiva. I valori dei lati sono decimali. Scippo e `passesLeft` sono stati rimossi.

**Perché.** L'onboarding deve stare in trenta secondi: una regola sola, poi il resto.

**Alternative scartate.** Cella vuota e cella bloccata: vedi la voce seguente, dello stesso giorno.

## 2026-11-12 — Le caselle della board non si toccano

**Cosa.** Per l'equilibrio dei turni non si tolgono e non si aggiungono celle. Lo squilibrio (chi muove per secondo vince ~60% contro ~29%; etichetta del numero ancora assente) si corregge con i dati delle carte, oppure con regole dei turni che non toccano la board, in una PR separata.

**Perché.** La board resta intera. L'equilibrio dei turni si cerca nei dati delle carte o in regole che non cambiano le caselle.

**Alternative scartate.** Cella vuota. Cella bloccata.

## 2026-11-12 — 3x3 per chi inizia, 4x4 per chi è avanti

**Cosa.** L'obiettivo è una griglia 3x3 per i principianti e una 4x4 per gli avanzati. Il playtest si fa su telefono, in verticale.

**Perché.** Due formati: uno corto per chi inizia, la griglia piena per gli avanzati. La prova si fa sul telefono tenuto in verticale.

**Alternative scartate.** Nessuna registrata in questa voce.
