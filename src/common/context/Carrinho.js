/* Dentro dessa pasta, teremos o contexto do Carrinho. */

import { createContext, useContext, useEffect, useState } from "react";
import { usePagamentoContext } from "./Pagamento";
import { UsuarioContext } from "./Usuario";

export const CarrinhoContext = createContext();

CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidadeTotalProdutos, setQuantidadeTotalProdutos] = useState(0);
  const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        quantidadeTotalProdutos,
        setQuantidadeTotalProdutos,
        valorTotalCarrinho,
        setValorTotalCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

/*  */
export const useCarrinhoContext = () => {
  const {
    carrinho,
    setCarrinho,
    quantidadeTotalProdutos,
    setQuantidadeTotalProdutos,
    valorTotalCarrinho,
    setValorTotalCarrinho,
  } = useContext(CarrinhoContext);

  const { formaPagamento } = usePagamentoContext();

  const { setSaldo } = useContext(UsuarioContext);

  const mudarQuantidades = (idProdutoASerRemovido, quantidade) => {
    return carrinho.map((itemDoCarrinho) => {
      if (
        itemDoCarrinho.id === idProdutoASerRemovido &&
        itemDoCarrinho.quantidade + quantidade >= 0
      ) {
        itemDoCarrinho.quantidade += quantidade;
      }
      return itemDoCarrinho;
    });
  };

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
    setCarrinho(mudarQuantidades(novoProduto.id, 1));
  };

  const removerProdutos = (idProdutoASerRemovido) => {
    const produto = carrinho.filter((itemDoCarrinho) => {
      return itemDoCarrinho.id === Number(idProdutoASerRemovido);
    });

    const isUltimoItem = produto.quantidade === 1;

    if (isUltimoItem) {
      /* Se o item do carrinho for diferente do ID que for passado, manteremos esse item no carrinho. Senão, removeremos esse item. */
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter(
          (itemDoCarrinho) => itemDoCarrinho.id !== idProdutoASerRemovido
        )
      );
    }

    setCarrinho(mudarQuantidades(idProdutoASerRemovido, -1));
  };

  const efetuarCompra = () => {
    setCarrinho([]);
    setSaldo((saldoAtual) => saldoAtual - valorTotalCarrinho);
  };

  /* Sempre que uma alteração for realizada no carrinho, a função que está dentro desse hook será ativada. */
  useEffect(() => {
    const { novoTotal, novaQuantidade } = carrinho.reduce(
      (contador, produto) => ({
        novaQuantidade: contador.novaQuantidade + produto.quantidade,
        novoTotal: contador.novoTotal + produto.valor * produto.quantidade,
      }),
      {
        novaQuantidade: 0,
        novoTotal: 0,
      }
    );
    setQuantidadeTotalProdutos(novaQuantidade);
    setValorTotalCarrinho(novoTotal * formaPagamento.juros);
  }, [
    carrinho,
    setQuantidadeTotalProdutos,
    setValorTotalCarrinho,
    formaPagamento,
  ]);

  return {
    carrinho,
    setCarrinho,
    adicionarProdutos,
    removerProdutos,
    quantidadeTotalProdutos,
    valorTotalCarrinho,
    efetuarCompra,
  };
};
