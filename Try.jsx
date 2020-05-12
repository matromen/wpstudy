// import React, {Component} from 'react';
import React, {PureComponent} from 'react';

class Try extends PureComponent{
    // Component extends에서 사용 가능
    // shouldComponentUpdate(nextProps, nextState, nextContext){
    //     console.log('1: ',this.props.tryInfo.try);
    //     console.log('2: ',nextProps.tryInfo.try);
    //     if(this.props.tryInfo.try !== nextProps.tryInfo.try){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }
    constructor(props){
        super(props);

        this.state = {
            try2 : this.props.tryInfo.try,
            result2: this.props.tryInfo.result
        }
    }

    componentDidMount(){
        console.log('1: ', this.props.tryInfo.try);
        console.log('1: ', this.props.tryInfo.result);

        this.setState({
            try2 : 3,
            result2: 33
        });
        console.log('2: ', this.state.try2);
        console.log('2: ', this.state.result2);
    }

    render(){
        const {tryInfo} = this.props;

        return (
            <>
                <li><b>{tryInfo.try}</b> - {tryInfo.result}.</li>
                <li><b>{this.state.try2}</b> - {this.state.result2}.</li>
            </>
        );
    }
}


export default Try; 