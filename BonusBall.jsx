import React, {PureComponent} from 'react';


class BonusBall extends PureComponent{
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

export default BonusBall;