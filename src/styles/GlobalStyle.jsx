import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyles = createGlobalStyle`
    ${reset}

    :root {
        --main-color: #f6b25a;
        --white-color: #fff;
    }

    * {
        box-sizing: border-box;
        overflow: hidden;

    }
`

export default GlobalStyles;