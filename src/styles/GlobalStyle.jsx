import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"


const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'GongGothicMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
    ${reset}

    :root {
        --main-color: #ED7A3A;
        --bg-color: #F3EBE0;
        --white-color: #FFFFFF;
    }

    * {
        box-sizing: border-box;
    }

    html {
        font-family: 'GongGothicMedium';
    }
`;

export default GlobalStyles;