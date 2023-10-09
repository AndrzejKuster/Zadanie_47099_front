import './SelectAction.css'

const SelectAction = ({values, onValueChange, selectedValue, ...rest}) => {

    return (
        <select
            value={selectedValue}
            onChange={onValueChange}
            {...rest} >
            
            {values.map(([value, text]) => 
                <option key={value} value={value}>
                {text}
                </option>
            )}
        </select>
    )
}

export default SelectAction