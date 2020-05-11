import React, {Component} from 'react';

class ResponseResult extends Component{


    render() {
        const {resultTime} = this.props;
        return (
            <>
                {resultTime.length !== 0 ? 
                <div>평균시간: {resultTime.reduce((acc, time)=> acc + time)/resultTime.length}ms<button onClick={this.props.resetOnclick}>리셋</button></div> : null}   
            </>
        );
    }
}

export default ResponseResult;