import { useState, useEffect } from 'react'

import './App.css'
import Button from './components/button'

function App() {
    const [count, setCount] = useState('0')
    const numbers = ['7', '8', '9', '4', '5', '6', '/', '*', '1', '2', '3', '-', '0', '.']
    const classes = ['seven', 'eight', 'nine', 'four', 'five', 'six', 'divide', 'multiply', 'one', 'two', 'three', 'minus', 'zero', 'dot']
    useEffect(() => {

        // console.log('count',count)
        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
        function isOperator(n) {
            return n === '+' || n === '-' || n === '*' || n === '/' || n === '%';
        }
        function isEnter(n) {
            return n === 'Enter';
        }
        function getClass(n) {
            if (n === '+') {
                return 'plus'
            }
            else if (n === 'Enter') {
                return 'equal'
            }
            else if (n === 'C') {
                return 'clear'
            }
            else if (n === 'Backspace') {
                return 'backspace'
            }
            else {
                return classes[numbers.indexOf(n)]
            }

        }
        function removeActive(n) {
           
            if (n === '+') {

                document.getElementsByClassName('equal').item(0).classList.remove('active')
                document.getElementsByClassName('clear').item(0).classList.remove('active')
                document.getElementsByClassName('backspace').item(0).classList.remove('active')
                numbers.map((number, index) => {
                    document.getElementsByClassName(classes[index]).item(0).classList.remove('active')
                })


            }
            else if (n === 'Enter') {
                document.getElementsByClassName('plus').item(0).classList.remove('active')
                document.getElementsByClassName('clear').item(0).classList.remove('active')
                document.getElementsByClassName('backspace').item(0).classList.remove('active')
                numbers.map((number, index) => {
                    document.getElementsByClassName(classes[index]).item(0).classList.remove('active')
                })


            }
            else if (n === 'C') {
                document.getElementsByClassName('equal').item(0).classList.remove('active')
                document.getElementsByClassName('plus').item(0).classList.remove('active')
                document.getElementsByClassName('backspace').item(0).classList.remove('active')
                numbers.map((number, index) => {
                    document.getElementsByClassName(classes[index]).item(0).classList.remove('active')
                })

            }
            else if (n === 'Backspace') {
                document.getElementsByClassName('equal').item(0).classList.remove('active')
                document.getElementsByClassName('clear').item(0).classList.remove('active')
                document.getElementsByClassName('plus').item(0).classList.remove('active')
                numbers.map((number, index) => {
                    document.getElementsByClassName(classes[index]).item(0).classList.remove('active')
                })

            }
            else {

                document.getElementsByClassName('equal').item(0).classList.remove('active')
                document.getElementsByClassName('clear').item(0).classList.remove('active')
                document.getElementsByClassName('plus').item(0).classList.remove('active')
                document.getElementsByClassName('backspace').item(0).classList.remove('active')
                for (let i = 0; i < numbers.length; i++) {
                    if (numbers[i] !== n) {
                        document.getElementsByClassName(classes[i]).item(0).classList.remove('active')
                    }
                }
            }


        }
        function addActive(n) {
            if (n === '+') {
                document.getElementsByClassName('plus').item(0).classList.add('active')
            }
            else if (n === 'Enter') {
                document.getElementsByClassName('equal').item(0).classList.add('active')
            }
            else if (n === 'C') {
                document.getElementsByClassName('clear').item(0).classList.add('active')
            }
            else if (n === 'Backspace') {
               
                document.getElementsByClassName('backspace').item(0).classList.add('active')
            }
            else {
                document.getElementsByClassName(classes[numbers.indexOf(n)]).item(0).classList.add('active')
            }

            removeActive(n)
        }
        const handleKeyPress = (e) => {
           

            if (e.key === 'Backspace') {
                addActive(e.key)
               
                if (count.length === 1 || count.length === undefined) {
                    setCount('0')
                }
                else {
                    setCount(count.slice(0, -1))
                }

            }
            if (isEnter(e.key) && count.length > 0) {
                addActive(e.key)
                try {

                    setCount('' + eval(count))
                    console.log('Enter',eval(count))

                } catch (error) {
                    alert('Invalid Expression')

                }
                return () => {
                    document.removeEventListener('keydown', handleKeyPress)
                }

            }
            if (isNumeric(e.key) || isOperator(e.key)) {

                addActive(e.key)

                if (count === '0' && count.length === 1) {
                    
                    setCount(e.key)
                } else {
                   
                    setCount(count + e.key)
                }
            }

        }
        document.addEventListener('keydown', handleKeyPress)

        return () => {
            document.removeEventListener('keydown', handleKeyPress)

        }


    }, [count])
    useEffect(() => {
        document.addEventListener('mouseover', () => {
            if (document.getElementsByClassName('active').item(0)) {
                document.getElementsByClassName('active').item(0).classList.remove('active')
            }

        })
    })
    const handleCalculate = () => {
        try {

            setCount('' + eval(count))

        } catch (error) {
            alert('Invalid Expression')

        }
    }
    const handleAdd = (e) => {

        if (count === '0' && count.length === 1) {

            setCount(e.target.innerText)
        } else {
            setCount(count + e.target.innerText)
        }

    }
    const handleBack = () => {
        if (count.length === 1) {
            setCount('0')
        } else {
            setCount(count.slice(0, -1))
        }

    }
    const handleClear = () => {
        setCount('0')
    }
    return (
        <div className='container'>
            <div className="app">
                <div className='output'>
                  <input type="text" value={count}/>
                </div>
                <div className='buttons'>
                    {
                        numbers.map((number, index) => {
                            return <Button key={index} className={classes[index]} handleAdd={handleAdd} text={number} />
                        })
                    }
                    <button onClick={() => setCount(count + '+')} className='plus'>+</button>
                    <button onClick={handleClear} className='clear'>C</button>
                    <button onClick={handleBack} className='backspace'>⌫</button>
                    <button onClick={handleCalculate} className='equal'>=</button>
                </div>

            </div>
        </div>
    )
}

export default App
