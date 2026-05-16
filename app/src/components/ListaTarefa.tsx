import { useState } from "react";
import { InputAdd } from "./InputAdd"

type List = {
    id: number;
    atividade: string;
    concluida: boolean;
};

export const ListaTarefa = () => {
    const [list, setList] = useState<List[]>([
        { id: 1, atividade: "Estudar programação", concluida: false },
        { id: 2, atividade: "Estudar Ingles", concluida: false }
    ]);


    const handleComplete = (id: number) => {
        setList(list.map((tarefa) =>
            tarefa.id === id
                ? { ...tarefa, concluida: !tarefa.concluida }
                : tarefa
        ));
    };


    const handleDelete = (id: number) => {
        setList(list.filter((tarefa) => tarefa.id !== id));
    }; 

    return (
        <div>
               <InputAdd
                onAdd={(value) => setList([...list, {id: Date.now(), atividade: value, concluida: false}])}
               />

            <ol>
                
                {list.map((tarefa) => (
                    <li 
                        key={tarefa.id} 
                        style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}
                    > 
                        {tarefa.atividade}

                        <button onClick={() => handleComplete(tarefa.id)}>
                            {tarefa.concluida ? 'Desfazer' : 'Concluido'}
                        </button>

                        <button onClick={() => handleDelete(tarefa.id)}>
                            Remover
                        </button>    
                    </li>
                ))}
            </ol>
        </div>
    );
};