const React = require('react');
const {useState, useRef} = React;

const WordRelayHooks = () => {
    const [word, setWord]               = useState('끝말잇기');
    const [inputValue, setInputValue]    = useState('');
    const [result, setResult]           = useState('');  

    const inputRef = useRef(null);
    


    const onchange = (e) =>{
        setInputValue(e.target.value);
    }

    onsubmit = (e) => {
        e.preventDefault();
        if(word[(word).length-1] === inputValue[0]){
            setWord(inputValue);
            setInputValue('');
            setResult('성공');

            inputRef.current.focus();
        }else{
            setInputValue('');
            setResult('실패');

            inputRef.current.focus();
        }
    }

    return (
        <>
            <h1>{word}</h1>
            <form onSubmit={onsubmit}>
                <input type='text' ref={inputRef} value={inputValue} onChange={onchange} />
                <button>전송</button>
            </form>
            <div>{result}</div>
        </>
    );
}

module.exports = WordRelayHooks;