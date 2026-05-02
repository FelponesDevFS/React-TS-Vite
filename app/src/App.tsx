import { useState } from 'react'
import './App.css'

function App() {
  const [valor, setValor] = useState('')
  const [lista, setLista] = useState([
    {id: 1, nome: "João"},
    {id: 2, nome: "Maria"},
    {id: 3, nome: "José"}
  ])

  return (
    <div>

      <input value={valor}
       onChange={(e) => setValor(e.target.value) }
      />
  
      <button onClick={() => {setLista([...lista, {id: (lista.length + 1) , nome: valor},])
        setValor('');
        }}
        >
        Adicionar
      </button>
     
     <ol>
       { lista.map((listaItem)=> (<li key={listaItem.id}> {listaItem.nome}</li>)) } 
     </ol>

    </div>
  )
}

export default App

