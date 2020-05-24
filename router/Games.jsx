import React from 'react';
import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';
// import NumberBaseball  from '../Numberbaseball';
// import RSP  from '../RSP';
// import Lotto from  '../Lotto';
import GameMatcher from './GameMatcher';


const Games = () => {
    return (
        <BrowserRouter>
            <div>
                {/* <Link to='/number-baseball'>숫자야구</Link> &nbsp;
                <Link to='/rock-scissors-paper'>가위바위보</Link> &nbsp;
                <Link to='/lotto-generator'>로또</Link> &nbsp; */}

                <Link to='/game/number-baseball?seq=106&name=bgkim&step=reactbase'>숫자야구</Link> &nbsp;
                <Link to='/game/rock-scissors-paper'>가위바위보</Link> &nbsp;
                <Link to='/game/lotto-generator'>로또</Link> &nbsp;
                <Link to='/game/index'>게임 메치</Link>
            </div>
            <div>
                <Switch>
                    {/* <Route path='/number-baseball' component={NumberBaseball} />
                    <Route path='/rock-scissors-paper' component={RSP} />
                    <Route path='/lotto-generator' component={Lotto} /> */}
                    <Route exact path='/' render={(props)=> <GameMatcher {...props}/>} />
                    <Route path='/game/:name' component={GameMatcher} />
                    <Route path='/game/number-baseball' render={(props) => <GameMatcher {...props} />} />
                </Switch>
            </div>

        </BrowserRouter>
    );
}


export default Games;