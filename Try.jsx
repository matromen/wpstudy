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
    render(){
        const {tryInfo} = this.props;

        return (
            <>
                <li><b>{tryInfo.try}</b> - {tryInfo.result}.</li>
            </>
        );
    }
}


export default Try; 