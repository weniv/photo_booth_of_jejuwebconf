import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyles = createGlobalStyle`
    ${reset}

    :root {
        --main-color: #f6b25a;
        --bg-color: #f3ce7d;
        --white-color: #fff;
    }

    * {
        box-sizing: border-box;
    }
`

export default GlobalStyles;