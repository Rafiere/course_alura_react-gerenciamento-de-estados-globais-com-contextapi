import { createContext, useState } from "react";

/* A responsabilidade desse arquivo é manter o gerenciamento de estado para o Usuário. */

export const UsuarioContext = createContext();

/* O "displayName" serve para que o React DevTools. No React DevTools, podemos verificar os valores que estão armazenados nos contextos.  */
UsuarioContext.displayName = "Usuário";

/* Esse componente terá os estados e servirá para disponibilizar o Provider para os outros lugares da aplicação. */

/* Apenas os objetos que conhecerem */
export const UsuarioProvider = ({ children }) => {
  const [nome, setNome] = useState("");
  const [saldo, setSaldo] = useState(0);

  return (
    <UsuarioContext.Provider value={{ nome, setNome, saldo, setSaldo }}>
      {children}
    </UsuarioContext.Provider>
  );
};
