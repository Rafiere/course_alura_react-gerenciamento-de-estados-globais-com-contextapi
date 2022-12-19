import { BrowserRouter, Switch, Route } from "react-router-dom";

import React, { useState } from "react";
import Login from "pages/Login";
import Feira from "pages/Feira";
import Carrinho from "pages/Carrinho";

import { UsuarioContext } from "common/context/Usuario";

const Router = () => {
  const [nome, setNome] = useState("");
  const [saldo, setSaldo] = useState(0);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {/* Dentro do "UsuarioContext.Provider", precisamos do componente que utilizará esse contexto. */}

          {/* Estamos passando essas props através do contexto. */}

          <UsuarioContext.Provider value={{ nome, setNome, saldo, setSaldo }}>
            <Login />
          </UsuarioContext.Provider>
        </Route>

        <Route path="/feira">
          <Feira />
        </Route>

        <Route path="/carrinho">
          <Carrinho />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
