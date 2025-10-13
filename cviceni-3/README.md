# Flappy Bird

Toto je jednoduchá hra Flappy Bird implementovaná pomocí HTML, CSS a JavaScriptu.

## Struktura projektu

- `index.html`: Hlavní HTML dokument, který nastavuje strukturu hry Flappy Bird.
- `styles.css`: Obsahuje styly pro hru Flappy Bird, včetně rozvržení, barev a animací.
- `game.js`: Implementuje herní logiku pro Flappy Bird, zpracovává uživatelský vstup, herní mechaniky a vykreslování.
- `game.test.js`: Obsahuje testy pro herní logiku Flappy Bird.

## Jak spustit hru

Pro zobrazení aplikace v prohlížeči spusťte lokální server z příkazové řádky pomocí příkazu

```shell
npx serve cviceni-3
```

Pokud máte terminál otevřen ve složce `cviceni-3`, spouštěcí příkaz je jen `npx serve`.

Po spuštění příkazu `npx serve` otevřete v prohlížeči adres http://localhost:3000 (`npx serve` ji vypisuje po spuštění v terminálu).

Příkaz `npx serve` ukončíte klávesovou zkratkou <kbd>Ctrl+C</kbd>.

## Jak spustit testy (npx jest)

1. Otevřete terminál v hlavní složce projektu.
2. Ujistěte se, že jste alespoň jednou spustili příkaz

```shell
npm install
```

3. Spusťte následující příkaz:

```shell
npx jest
```
