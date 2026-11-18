# Istruzioni

Fonte unica del progetto G4C. La leggono le chat e gli agenti (Claude Code, Cursor, bot) prima di proporre o fare una modifica.

## Da incollare nelle istruzioni del progetto Grok

> Il progetto vive su GitHub (politialex/g4c) per codice, documentazione e decisioni definitive. Linear è la fonte unica del backlog operativo e dell'avanzamento. Non duplicare le issue.

## Guardrail

**GitHub e Linear hanno responsabilità distinte e complementari.**

- GitHub custodisce codice, documentazione del gioco, regole e decisioni definitive.
- Linear custodisce idee da valutare, problemi, attività, priorità, milestone, responsabili, dipendenze e stato del lavoro.
- Le chat e gli agenti AI non sono fonti di verità: le informazioni utili vanno riportate nello strumento competente.
- Non creare issue GitHub per duplicare il backlog Linear. Le issue GitHub si usano solo quando servono a una funzione tecnica nativa di GitHub; in tal caso vanno collegate alla corrispondente issue Linear.

## Cos'è G4C

G4C è un gioco di carte nel browser, ispirato a Triple Triad.

Il prototipo è un solo file, `index.html`. È pubblicato su GitHub Pages dal branch `main`:

https://politialex.github.io/g4c/

La versione HTML serve al playtest. La produzione finale è prevista in Unity, per iOS e Android, quando le regole saranno congelate.

Il pilastro: **si impara in trenta secondi, ma ogni mossa può ribaltare il tabellone.**

Regole, carte, campagna e draft sono descritti nel [README](../README.md). Il flusso di branch, anteprima e checklist è in [CONTRIBUTING.md](../CONTRIBUTING.md). Le attività operative sono nel [progetto Linear G4C](https://linear.app/erpolipo/project/g4c-610d82a5cf08/overview).

## Flusso di lavoro

1. Ogni idea, bug o lavoro da pianificare nasce come issue nel progetto Linear G4C. Deve descrivere problema/obiettivo, risultato atteso e pilastro coinvolto.
2. Ogni modifica al codice nasce su un branch con prefisso e arriva tramite pull request collegata alla issue Linear. `main` è la versione stabile pubblicata su Pages.
3. Il controllo di GitHub Actions **Sintassi script** (`node --check` sugli script di `index.html`) deve essere verde. L'anteprima del branch deve essere provata prima del merge.
4. Ogni decisione definitiva di design si scrive in [decisioni.md](decisioni.md), in tre parti: cosa, perché, alternative scartate. La decisione viene integrata tramite PR.
5. [stato.md](stato.md) è una sintesi dei prossimi passi e dei vincoli emersi; non è un secondo backlog. Deve rimandare alle issue Linear pertinenti e restare coerente con esse.
6. Nel repo non vanno dati personali. Nel browser i salvataggi usano `localStorage` con il prefisso `ia2_`.

Il branch ha un prefisso: `feat/`, `fix/`, `docs/`, `chore/`. [CONTRIBUTING.md](../CONTRIBUTING.md) elenca anche `balance/`, `ux/` e `art/`.

Anteprima di un branch, senza cambiare Pages:

`https://raw.githack.com/politialex/g4c/<branch>/index.html`

## Design

1. **Fonte unica per ambito.** GitHub è la fonte di verità per codice, regole e decisioni definitive; Linear per backlog, priorità e avanzamento.
2. **Pull request.** Ogni modifica passa da una PR collegata alla issue Linear. Una chat nuova legge prima questo file e [decisioni.md](decisioni.md).
3. **Pilastro.** Si impara in trenta secondi, ma ogni mossa può ribaltare il tabellone.
4. **Decisioni prese.** Griglia 3x3 per i principianti e 4x4 per gli avanzati. Le caselle della board non si toccano. Il bilanciamento passa dalle carte e dalle regole. Same sta nel capitolo avanzato.
5. **Playtest.** La prova si fa su smartphone, in verticale. Ogni numero va etichettato come simulazione, stima o dato reale.
6. **Privacy.** Niente dati personali o di lavoro nel repo. Per gli esempi si usano dati finti.

## Idee

1. **Solo in Linear.** Le idee entrano come issue nel progetto Linear G4C, con problema, proposta, pilastro toccato e criteri per valutarle.
2. **Filtro del pilastro.** Un'idea va avanti solo se rispetta «si impara in trenta secondi». Se lo rompe, va classificata come contenuto/regola avanzata oppure si chiude con il motivo.
3. **Idee scartate.** Si chiudono in Linear con la spiegazione. Si ripropongono solo con un fatto nuovo.
