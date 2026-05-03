import { useState } from 'react'

type Tarefa = {
  id: number;
  atividade: string;
};

function App () {
  const [valorInput, setValorInput] = useState<string>("")
  const [lista, setLista] = useState<Tarefa[]>([
    {id: 1, atividade: "Tomar café"},
    {id: 2, atividade: "Organizar quarto"},
    {id: 3, atividade: "Estudar"}
  ])

  const heandleRemove = (id: number) => {
    setLista(lista.filter(tarefa => tarefa.id !== id))
  }

  const heandleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValorInput(event.target.value)
  }

  const heandleAdd = () => {
    if (valorInput.trim() === "") return

    const novaTarefa: Tarefa = {
      id: Date.now(),
      atividade: valorInput
    }

    setLista([...lista, novaTarefa])
    setValorInput("")
  }

  return (
    <div>
      <h1>Minha Lista de Tarefas</h1>
      
      <input 
        value={valorInput}  
        onChange={heandleOnChange} 
        placeholder="Digite uma tarefa"
      />
      <button onClick={heandleAdd}>
        Adicionar
      </button>

      <ul>
        {lista.map(tarefa => (
          <li key={tarefa.id}>
            {tarefa.atividade}
            <button onClick={() => heandleRemove(tarefa.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App