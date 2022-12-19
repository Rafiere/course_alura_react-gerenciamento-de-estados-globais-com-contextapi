import { Container } from "./styles";
import { memo, useContext } from "react";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { CarrinhoContext, useCarrinhoContext } from "common/context/Carrinho";

/* A responsabilidade do componente é apenas renderizar. Ele não precisa saber, por exemplo, como adicionar um produto. Essa responsabilidade foi passada diretamente pelo "useCarrinhoContext". */

function Produto({ nome, foto, id, valor, unidade }) {
  const { carrinho, setCarrinho, adicionarProdutos } = useCarrinhoContext();

  const produtoNoCarrinho = carrinho.find(
    (itemDoCarrinho) => itemDoCarrinho.id === id
  );

  return (
    <Container>
      <div>
        <img src={`/assets/${foto}.png`} alt={`foto de ${nome}`} />
        <p>
          {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
        </p>
      </div>
      <div>
        <IconButton color="secondary">
          <RemoveIcon />
        </IconButton>
        {/* Se existir algum produto no carrinho, será exibida a quantidade desse produto. Se não existir, será exibido o valor "0". */}
        {produtoNoCarrinho?.quantidade || 0}
        <IconButton
          onClick={() => adicionarProdutos({ nome, foto, id, valor })}
        >
          <AddIcon />
        </IconButton>
      </div>
    </Container>
  );
}

export default memo(Produto);
