import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import AdmisionState from "../context/admision/AdmisionState";
import "../styles/globals.css";


import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <AdmisionState>
        <Component {...pageProps} />
      </AdmisionState>
    </ApolloProvider>
  );
};

export default MyApp;
