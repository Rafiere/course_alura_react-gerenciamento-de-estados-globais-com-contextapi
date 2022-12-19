import { BrowserRouter, Switch, Route } from "react-router-dom";

import React from "react";
import Login from "pages/Login";
import Feira from "pages/Feira";
import Carrinho from "pages/Carrinho";

import { UsuarioProvider } from "common/context/Usuario";
import { CarrinhoProvider } from "common/context/Carrinho";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Estamos compartilhando o contexto de "Usuário" para as rotas "/" e "/feira". */}
        <UsuarioProvider>
          <Route exact path="/">
            {/* A rota de "login" terá acesso ao "UsuarioProvider", que será responsável por gerenciar os atributos que essa rota precisa para funcionar. */}
            <Login />
          </Route>

          <CarrinhoProvider>
            <Route path="/feira">
              <Feira />
            </Route>
          </CarrinhoProvider>
        </UsuarioProvider>

        <Route path="/carrinho">
          <Carrinho />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
