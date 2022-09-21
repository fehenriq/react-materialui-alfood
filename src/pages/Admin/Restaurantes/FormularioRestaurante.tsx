import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"
import SaveIcon from '@mui/icons-material/Save';

const FormularioRestaurante = () => {
  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametros])

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Restaurante atualizado com sucesso')
        })
    } else {
      http.post('restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => {
          setNomeRestaurante('')
          alert('Restaurante cadastrado com sucesso')
        })
    }
  }

  return (
    <Box>
      <Container maxWidth='lg' sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
              <TextField
                sx={{ marginTop: 1 }}
                value={nomeRestaurante}
                onChange={evento => setNomeRestaurante(evento.target.value)}
                id="outlined-basic"
                label="Nome do Restaurante"
                variant="outlined"
                fullWidth
                required
              />
              <Button
                sx={{ marginTop: 1 }}
                type="submit"
                variant="contained"
                endIcon={<SaveIcon />}
                fullWidth>
                Salvar
              </Button>
            </Box>
          </Box>

        </Paper>
      </Container>
    </Box>
  )
}

export default FormularioRestaurante