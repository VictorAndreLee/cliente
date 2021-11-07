import { ApolloClient, InMemoryCache }  from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
// const httpLink = createHttpLink({
//     uri: 'http://localhost:4000/graphql',
// })
const middlewareUpdate =  createUploadLink({ uri : process.env.SERVER });
const authLink = setContext((_, {headers}) => {
    
    // Leer el storage almacenado
    const token = localStorage.getItem('token');
    // console.log(token);
    return {
        headers:{
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
    }}
});




const client = new ApolloClient({   
    connectToDevTools: true,
    link : authLink.concat( middlewareUpdate ), 
    cache: new InMemoryCache(
    //     {
    //     typePolicies:
    //     {   
    //         obtenerCategorias: {
    //             keyFields: ["__ref"]
    //         },
    //         obtenerUsuarios: {
    //             keyFields: ["__ref"]
    //         },
    //         obtenerPacientes: {
    //             keyFields: [["__ref"]]
    //         },
    //         obtenerTratamientos: {
    //             keyFields: [["__ref"]]
    //         },
    //     }
    // }
    ),
    fetchOptions: {
        mode: 'no-cors',
    },
})

export default client;