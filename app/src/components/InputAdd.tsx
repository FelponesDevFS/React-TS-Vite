import { useState } from "react"

interface InputAddProps {
    onAdd(valueInput: string): void
}

export const InputAdd = (props: InputAddProps) => {
    const [valueInput, setValueInput] = useState("")

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueInput(event.target.value)
    }

    return(
        <div>
            <input 

            value={valueInput}
            onChange={handleOnChange}
            type="text"
            placeholder="Digite a tarefa de hoje..."
            />

            <button onClick={() => {props.onAdd(valueInput); setValueInput('')}}>
                Adicionar
            </button>
        </div>
    )
}