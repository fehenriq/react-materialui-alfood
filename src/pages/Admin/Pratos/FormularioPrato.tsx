import { Box, Button, Container, FormControl, InputLabel, Paper, TextField, Typography, Select, MenuItem, Input, Alert } from "@mui/material"
import React, { useEffect, useState } from "react"
import SaveIcon from '@mui/icons-material/Save';
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";

const FormularioPrato = () => {
  const parametros = useParams()

  const [nomePrato, setNomePrato] = useState('')
  const [descricao, setDescricao] = useState('')

  const [tag, setTag] = useState('')
  const [tags, setTags] = useState<ITag[]>([])

  const [restaurante, setRestaurante] = useState('')
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  const [imagem, setImagem] = useState<File | null>(null)

  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(resposta => setTags(resposta.data.tags))
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
  }, [])

  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => {
          setNomePrato(resposta.data.nome)
          setDescricao(resposta.data.descricao)
          setTag(resposta.data.tag)
          setRestaurante(resposta.data.restaurante)
        })
    }
  }, [parametros])

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0])
    } else {
      setImagem(null)
    }
  }

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const formData = new FormData()

    formData.append('nome', nomePrato)
    formData.append('descricao', descricao)
    formData.append('tag', tag)
    formData.append('restaurante', restaurante)

    if (!parametros.id && imagem) {
      formData.append('imagem', imagem)
    }

    const url = parametros.id ? `pratos/${parametros.id}/` : 'pratos/'
    const method = parametros.id ? 'PUT' : 'POST'

    http.request({
      url,
      method,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(() => {
        if (parametros.id) {
          alert('Prato atualizado com sucesso!')
        } else {
          setNomePrato('')
          setDescricao('')
          setTag('')
          setRestaurante('')
          alert('Prato cadastrado com sucesso!')
        }
      })
      .catch(erro => console.log(erro))
  }

  return (
    <Box>
      <Container maxWidth='lg' sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
              <TextField
                margin="dense"
                value={nomePrato}
                onChange={evento => setNomePrato(evento.target.value)}
                id="outlined-basic"
                label="Nome do Prato"
                variant="outlined"
                fullWidth
                required
              />

              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                margin="dense"
                value={descricao}
                onChange={evento => setDescricao(evento.target.value)}
                label="Descrição do Prato"
                variant="outlined"
                fullWidth
                required
              />

              <FormControl margin="dense" fullWidth required>
                <InputLabel id="demo-simple-select-helper-label">Tag</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={tag}
                  label="Tag"
                  onChange={evento => setTag(evento.target.value)}>
                  {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                    {tag.value}
                  </MenuItem>)}
                </Select>
              </FormControl>

              <FormControl margin="dense" fullWidth required>
                <InputLabel id="demo-simple-select-helper-label">Restaurante</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={restaurante}
                  label="Restaurante"
                  onChange={evento => setRestaurante(evento.target.value)}>
                  {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                    {restaurante.nome}
                  </MenuItem>)}
                </Select>
              </FormControl>

              <Input type="file" onChange={selecionarArquivo} />

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

export default FormularioPrato