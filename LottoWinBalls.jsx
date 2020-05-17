import React, {PureComponent} from 'react';


class LottoWinBalls extends PureComponent{
    // constructor(props){
    //     super(props);
    // }

    render(){
        console.log(this.props);
        return (
            <>
                <div className='ball'>
                    {this.props.ball}
                </div>
            </>
        );
    }
}

export default LottoWinBalls;