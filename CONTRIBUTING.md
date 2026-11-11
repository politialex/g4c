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

## Anteprima di un branch

GitHub Pages pubblica solo `main`. Per provare un qualsiasi branch senza toccare Pages:

`https://raw.githack.com/politialex/g4c/<branch>/index.html`

Sostituisci `<branch>` con il nome del branch (per esempio `feat/primo-avvio`). Inserisci il link nella descrizione della pull request.

## Checklist prima del merge

- [ ] Provata su mobile e desktop
- [ ] Nessun errore in console
- [ ] Salvataggi `localStorage` compatibili (prefisso `ia2_`; se cambia il formato, serve una migrazione)
- [ ] Pilastro rispettato: si impara in trenta secondi, ma ogni mossa può ribaltare il tabellone

## Registro delle decisioni

Nella descrizione della pull request indica:

- **Cosa cambia**
- **Perché**
- **Alternative scartate** (e il motivo)
