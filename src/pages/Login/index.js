import { Button } from "@material-ui/core";
import { Container, Titulo, InputContainer } from "./styles";
import { Input, InputLabel, InputAdornment } from "@material-ui/core";

import { useHistory } from "react-router-dom";

import { UsuarioContext } from "common/context/Usuario";

function Login({ nome, setNome, saldo, setSaldo }) {
  const history = useHistory();

  return (
    <Container>
      {/* Enquanto o "UsuarioContext.Provider" proverá o estado, o "UsuarioContext.Consumer" consumirá esse estado que foi provido pelo provider. */}
      <UsuarioContext.Consumer>
        {/* Estamos obtendo os dados do ContextAPI. */}
        {({ nome, setNome, saldo, setSaldo }) => (
          <>
            <Titulo>Insira o seu nome</Titulo>
            <InputContainer>
              <InputLabel>Nome</InputLabel>
              <Input
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                type="text"
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Saldo</InputLabel>
              <Input
                value={saldo}
                onChange={(event) => setSaldo(event.target.value)}
                type="number"
                startAdornment={
                  <InputAdornment position="start">R$</InputAdornment>
                }
              />
            </InputContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/feira")}
            >
              Avançar
            </Button>
          </>
        )}
      </UsuarioContext.Consumer>
    </Container>
  );
}

export default Login;
