# Come contribuire a G4C

## `main` è la versione stabile

Il branch `main` è la versione pubblicata su GitHub Pages: [https://politialex.github.io/g4c/](https://politialex.github.io/g4c/). Non si committano modifiche direttamente su `main`. Una pull request arriva su `main` solo dopo che il controllo di Actions è passato e l'anteprima è stata provata; la unisce Alessandro oppure il game lead Squall (che ha l'autorizzazione permanente di Alessandro), e Alessandro riceve un riepilogo di ogni merge.

## Branch e pull request

Ogni modifica nasce su un branch con un prefisso:

- `feat/` — nuova funzionalità
- `fix/` — correzione
- `balance/` — bilanciamento
- `ux/` — interfaccia e feedback
- `art/` — illustrazioni, identità visiva, testi di ambientazione
- `chore/` — documentazione, flusso di lavoro, manutenzione

Una pull request per modifica, e piccola: così `main` resta stabile e la revisione è semplice.

Ogni PR deve indicare la issue del [progetto Linear G4C](https://linear.app/erpolipo/project/g4c-610d82a5cf08/overview) che giustifica il lavoro. La descrizione della PR riporta il link alla issue e spiega cosa cambia, perché e come provarlo. Linear tiene il backlog e lo stato; GitHub tiene codice, revisione e decisioni definitive.

## Anteprima di un branch

GitHub Pages pubblica solo `main`. Per provare un qualsiasi branch senza toccare Pages:

`https://raw.githack.com/politialex/g4c/<branch>/index.html`

Sostituisci `<branch>` con il nome del branch (per esempio `feat/primo-avvio`). Inserisci il link nella descrizione della pull request.

## Checklist prima del merge

- [ ] Issue Linear collegata
- [ ] Provata su mobile e desktop
- [ ] Nessun errore in console
- [ ] Salvataggi `localStorage` compatibili (prefisso `ia2_`; se cambia il formato, serve una migrazione)
- [ ] Pilastro rispettato: si impara in trenta secondi, ma ogni mossa può ribaltare il tabellone

## Registro delle decisioni

Nella descrizione della pull request indica:

- **Cosa cambia**
- **Perché**
- **Alternative scartate** (e il motivo)

Le decisioni definitive vengono riportate in `docs/decisioni.md` tramite PR. Non usare Linear come sostituto del registro delle decisioni.
