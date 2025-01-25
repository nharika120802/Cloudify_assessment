import React, {useState} from 'react'
import Multiselect from 'multiselect-react-dropdown'
import './App.css'

const App = () => {
  const [optionsCol1, setOptionsCol1] = useState([
    'Hyderabad',
    'Bangalore',
    'Chennai',
    'Pune',
  ])
  const [optionsCol2, setOptionsCol2] = useState([
    'Hyderabad',
    'Bangalore',
    'Chennai',
    'Pune',
  ])
  const [rows, setRows] = useState([
    {id: 0, col1: optionsCol1, col2: optionsCol2, flag: false},
  ])
  const [label1TextValue, setLabel1TextValue] = useState('Hyderabad')

  let c = 0

  const handleCol1Change = e => {
    setLabel1TextValue(e.target.value)
  }
  const handleFlag = index => {
    setRows(prevValue =>
      [...prevValue].map(el => (el.id === index ? {...el, flag: true} : el)),
    )
  }
  const handleFlagClose = index => {
    setRows(prevValue =>
      [...prevValue].map(el => (el.id === index ? {...el, flag: false} : el)),
    )
  }
  const handleAddRow = () => {
    const samCol = []
    for (let i = 0; i < 4; i++) {
      samCol.push(label1TextValue)
    }
    setOptionsCol1(samCol)
    c = c + 1
    setRows([...rows, {id: c, col1: samCol, col2: optionsCol2, flag: false}])
  }

  const handleAddOptionCol2 = newOption => {
    if (newOption && !optionsCol2.includes(newOption)) {
      setOptionsCol2([...optionsCol2, newOption])
    }
  }

  return (
    <div className="app-container">
      <table>
        <thead>
          <tr>
            <th>Label 1</th>
            <th>Label 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <select value={label1TextValue} onChange={handleCol1Change}>
                  {optionsCol1.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <div
                  onMouseLeave={() => {
                    handleFlagClose(index)
                  }}
                  className="dropdown-multiselect"
                >
                  <div
                    onMouseEnter={() => {
                      handleFlag(index)
                    }}
                  >
                    <Multiselect
                      options={optionsCol2}
                      isObject={false}
                    ></Multiselect>
                  </div>
                  {row.flag && (
                    <div className="add-option">
                      <input
                        type="text"
                        placeholder="Add new item"
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            handleAddOptionCol2(e.target.value)
                            e.target.value = ''
                          }
                        }}
                      />
                      <button
                        className="add-row"
                        onClick={e => {
                          const input = e.target.previousSibling
                          handleAddOptionCol2(input.value)
                          input.value = ''
                        }}
                      >
                        + Add
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-row" onClick={handleAddRow}>
        + Add New Row
      </button>
    </div>
  )
}

export default App
