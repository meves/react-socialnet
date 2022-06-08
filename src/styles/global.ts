import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        box-sizing: border-box;
        font-size: calc(0.5em + 1vw);
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

    html {
        /** color palette #4438 colorpalettes.net */
        /** backgroud colors */
        --bluegray-dark: #202136;
        --bluegray-lightdark: #545365;
        --bluegray-medium: #878A99;
        --bluegray-light: #DCDFEE;
        --bluegray-superlight: #F7F8FC;

        /** text colors */
        --light-text-color: var(--bluegray-light);
        --medium-text-color: var(--bluegray-medium);
        --dark-text-color: var(--bluegray-dark);

        /** color palette blue */

        /* background colors */
        --bg-header: var(--bluegray-dark);
        --bg-footer: var(--bluegray-dark);
        --bg-navbar: var(--bluegray-medium);
        --bg-menuitem: var(--bluegray-light);
        --bg-page: var(--bluegray-light);
        --bg-block: var(--bluegray-lightdark);
        --bg-blockitem: var(--bluegray-lightdark);
        --bg-imageblock: var(--bluegray-medium);


        --bg-color-medium: hsl(231, 44%, 56%);
        --bg-color-light: hsl(233, 81%, 75%);
        --bg-item-color: hsl(180, 81%, 26%);
        /* text colors */
        --white-text-color: hsl(0, 0%, 100%);
        --dark-text-color: hsl(10, 4%, 10%);
        --selected-text-solor: hsl(310, 80%, 31%);
        --gray-text-color: hsl(240, 21%, 85%);
        --error-color: hsl(0, 80%, 50%);
        --link-color: rgb(17, 151, 175);
        /* other colors */
        --wthite-color: hsl(0, 0%, 100%);
        --gray-color: hsl(0, 0%, 50%);
        --black-color: hsl(0, 0%, 0%);
        /* buttons */
        --bg-button: navy;
        --color-button: aliceblue;
        --bg-hover-button: rgba(0, 0, 128, 0.384);
        --color-hover-button: rgb(233, 57, 13);
    }

    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
    }
`;
