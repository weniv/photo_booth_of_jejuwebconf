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
        --gray-color: #D9D9D9
    }

    * {
        box-sizing: border-box;
    }

    html {
        font-size: 16px;
        font-family: 'GongGothicMedium';
        /* overflow: hidden; */
    }

/* @media (min-width: 1601px) and (max-width: 1920px) {
	html {
		font-size: 12px;
	}
}

@media (min-width: 1201px) and (max-width: 1600px) {
	html {
		font-size: 8px;
	}
}

@media screen and (max-width: 1200px) {
	html {
		font-size: 6px;
	}
} */
`;

export default GlobalStyles;