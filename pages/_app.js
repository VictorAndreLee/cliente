import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import AdmisionState from "../context/admision/AdmisionState";
import "../styles/globals.css";

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
