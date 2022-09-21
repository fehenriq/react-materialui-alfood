import { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';


const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get('pratos/')
      .then(resposta => setPratos(resposta.data))
  }, [])

  const excluir = (pratoAhSerExcluido: IPrato) => {
    http.delete(`pratos/${pratoAhSerExcluido.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id)
        setPratos([...listaPratos])
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Tag
            </TableCell>
            <TableCell>
              Imagem
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos?.map(prato => <TableRow key={prato.id}>
            <TableCell>
              {prato.nome}
            </TableCell>
            <TableCell>
              {prato.tag}
            </TableCell>
            <TableCell>
              [<a href={prato.imagem} target="_blank" rel="noreferrer">ver imagem</a>]
            </TableCell>
            <TableCell>
              [<Link to={`/admin/pratos/${prato.id}`}>editar</Link>]
            </TableCell>
            <TableCell>
              <Button 
                variant='outlined'
                startIcon={<DeleteIcon />}
                color='error' 
                onClick={() => excluir(prato)}>
                Excluir
              </Button>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoPratos