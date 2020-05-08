const React = require('react');
const {useState, useRef} = React;

const GugudanHooks = ()=>{
    const [first, setFirst] = useState(Math.ceil(Math.random()*9));
    const [second, setSecond] = useState(Math.ceil(Math.random()*9));
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);


    const onchange = (e) => {
        setInputValue(e.target.value);
    }

    const onsubmit = (e)=>{
        e.preventDefault();

        if(parseInt(inputValue) === first*second){
            setFirst(Math.ceil(Math.random()*9));
            setSecond(Math.ceil(Math.random()*9));
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
            <div>{first} * {second} ? </div>
            <form onSubmit={onsubmit}>
                <input type="number" ref={inputRef} value={inputValue} onChange={onchange} />
                <button>전송</button>
            </form>
            <div>{result}</div>
        </>
    );
}

module.exports = GugudanHooks;