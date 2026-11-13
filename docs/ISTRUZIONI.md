# Istruzioni

Fonte unica del progetto G4C. La leggono le chat e gli agenti (Claude Code, Cursor, bot) prima di proporre o fare una modifica.

## Da incollare nelle istruzioni del progetto Grok

> Il progetto vive e si aggiorna solo su GitHub (politialex/g4c, docs/ISTRUZIONI.md). Vale il repo, non le chat né altri posti.

## Guardrail

**Il progetto vive e si aggiorna solo su GitHub, in questo repo (politialex/g4c).**

Istruzioni, memoria, decisioni e documenti stanno qui. Se un'informazione arriva da fuori (una chat, un messaggio, un altro documento), si riporta qui con una pull request. Vale ciò che è nel repo.

## Cos'è G4C

G4C è un gioco di carte nel browser, ispirato a Triple Triad.

Il prototipo è un solo file, `index.html`. È pubblicato su GitHub Pages dal branch `main`:

https://politialex.github.io/g4c/

La versione HTML serve al playtest. La produzione finale è prevista in Unity, per iOS e Android, quando le regole saranno congelate.

Il pilastro: **si impara in trenta secondi, ma ogni mossa può ribaltare il tabellone.**

Regole, carte, campagna e draft sono descritti nel [README](../README.md). Il flusso di branch, anteprima e checklist è in [CONTRIBUTING.md](../CONTRIBUTING.md). Da qui si rimanda a quei due file.

## Flusso di lavoro

Ogni modifica nasce su un branch e arriva con una pull request. `main` è la versione stabile, quella pubblicata su Pages.

Il branch ha un prefisso: `feat/`, `fix/`, `docs/`, `chore/`. [CONTRIBUTING.md](../CONTRIBUTING.md) elenca anche `balance/`, `ux/` e `art/`.

Anteprima di un branch, senza cambiare Pages:

`https://raw.githack.com/politialex/g4c/<branch>/index.html`

Il controllo di Actions **Sintassi script** (`node --check` sugli script di `index.html`) deve essere verde.

Nel repo non vanno dati personali. Nel browser i salvataggi usano `localStorage` con il prefisso `ia2_`.

Ogni decisione di design si scrive in [decisioni.md](decisioni.md), in tre parti: cosa, perché, alternative scartate. I passi ancora aperti stanno in [stato.md](stato.md): sono memoria di lavoro, e diventano decisioni solo quando sono chiusi e registrati.

## Design

1. **Fonte unica.** Il progetto vive e si aggiorna solo su GitHub (politialex/g4c). Regole, decisioni e numeri stanno qui, non nelle chat e non in documenti esterni.
2. **Pull request.** Ogni modifica passa da una PR. Una chat nuova legge prima questo file e [decisioni.md](decisioni.md).
3. **Pilastro.** Si impara in trenta secondi, ma ogni mossa può ribaltare il tabellone.
4. **Decisioni prese.** Griglia 3x3 per i principianti e 4x4 per gli avanzati. Le caselle della board non si toccano. Il bilanciamento passa dalle carte e dalle regole. Same sta nel capitolo avanzato.
5. **Playtest.** La prova si fa su smartphone, in verticale. Ogni numero va etichettato come simulazione, stima o dato reale.
6. **Privacy.** Niente dati personali o di lavoro nel repo. Per gli esempi si usano dati finti.

## Idee

1. **Solo come issue.** Le idee entrano solo come issue GitHub con etichetta `idea`, in tre righe: problema, proposta, pilastro toccato. Un'idea conta quando è scritta nell'issue.
2. **Filtro del pilastro.** Un'idea va avanti solo se rispetta «si impara in trenta secondi». Se lo rompe, va in etichetta `capitolo-avanzato` oppure si chiude con il motivo.
3. **Idee scartate.** Si chiudono con la spiegazione. Si ripropongono solo con un fatto nuovo.
