import React, { Component } from  'react';
import NumberBaseball  from '../Numberbaseball';
import RSP  from '../RSP';
import Lotto from  '../Lotto';



class GameMatcher extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
        console.log(new URLSearchParams(urlSearchParams));
        console.log(urlSearchParams.get('name'));
        if(this.props.match.params.name === 'number-baseball'){
            return <NumberBaseball />
        }else if(this.props.match.params.name === 'rock-scissors-paper'){
            return <RSP />
        }else if(this.props.match.params.name === 'lotto-generator'){
            return <Lotto />
        }else{
            return (
                <div>게임 메처</div>
            )
        }


    }
}


export default GameMatcher;