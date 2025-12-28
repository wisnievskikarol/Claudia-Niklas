Umieść tutaj pliki fontu Inter (np. Inter-Regular.woff2, Inter-Bold.woff2 itd.) pobrane z https://github.com/rsms/inter/releases/latest lub https://rsms.me/inter/.

Zalecane formaty: .woff2 (najlepsza kompresja i wsparcie), ewentualnie .woff.

Po pobraniu plików, nie zapomnij dodać odpowiednich @font-face do globals.css:

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter/Inter-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter/Inter-Italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

Itd. dla pozostałych wag i stylów.
