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

        --white-color: #fff;
        --red-color: #D80907;
        --blue-color: #00f;
        --blueviolet-color: #8a2be2;

        /** text colors */
        --light-text-color: var(--bluegray-light);
        --medium-text-color: var(--bluegray-medium);
        --dark-text-color: var(--bluegray-dark);  
        --checkbox-text-color: var(--bluegray-lightdark);      

        /* background colors */
        --bg-header: var(--bluegray-dark);
        --bg-navbar: var(--bluegray-medium);
        --bg-footer: var(--bluegray-dark);
        --bg-page: var(--bluegray-superlight);

        --bg-login-form: var(--bluegray-medium);
        --bg-login-form-shadow: var(--bluegray-lightdark);

        --bg-block: var(--bluegray-lightdark);
        --bg-block-hover: var(--bluegray-dark);
        --bg-imageblock: var(--bluegray-medium);

        --bg-blockitem: var(--bluegray-lightdark);
        --bg-menuitem: var(--bluegray-light);
        --bg-menuitem-hover: var(--bluegray-superlight);
        
        --bg-post-item: var(--bluegray-light);
        --bg-post-item-shadow: var(--bluegray-medium);

        --bg-skill-item: var(--bluegray-dark);
        --bg-skill-item-hover: var(--blueviolet-color);
        
        --bg-error-color: var(--red-color);   
        
        --bg-button-border: var(--bluegray-medium);
        --border-color: var(--bluegray-medium);
        
        --checkbox-bg-color: var(--bluegray-lightdark);
        --checkbox-hover-color: var(--bluegray-lightdark);
        --checkbox-checked-color: var(--bluegray-light);
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
