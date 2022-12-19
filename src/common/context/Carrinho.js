/* Dentro dessa pasta, teremos o contexto do Carrinho. */

import { createContext, useContext, useState } from "react";

export const CarrinhoContext = createContext();

CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

/*  */
export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  /* A função de "adicionarProdutos" está dentro desse hook customizado, assim como a função de carrinho, dessa forma, todas as ações do carrinho serão inseridas dentro desse contexto de carrinho. */

  const adicionarProdutos = (novoProduto) => {
    const temOProduto = carrinho.some(
      (itemDoCarrinho) => itemDoCarrinho.id === novoProduto.id
    );

    /* Se o carrinho não tiver o produto, adicionaremos o produto no carrinho. */
    if (!temOProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }

    /* Se o carrinho já tiver o produto, somaremos "1" a quantidade atual do carrinho e retornaremos esse mesmo carrinho com esse valor já somado. */
    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((itemDoCarrinho) => {
        if (itemDoCarrinho.id === novoProduto.id) {
          itemDoCarrinho.quantidade += 1;
        }
        return itemDoCarrinho;
      })
    );
  };

  return {
    carrinho,
    setCarrinho,
    adicionarProdutos,
  };
};
