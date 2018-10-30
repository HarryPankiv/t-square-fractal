import React from 'react';
import Canvas from './Canvas';
import './App.css';

class App extends Canvas {
    constructor(props) {
        super(props);

        this.state = {
            centerX: 400,
            centerY: 400,
			level: 3,
			centerErr: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleIteration = this.handleIteration.bind(this);
    }

    componentDidMount() {
        var canvas = this.refs.canvas;
        var ctx = canvas.getContext('2d');
        this.ctx = ctx;
        this.height = canvas.height;
        this.width = canvas.width;
        this.level = levels[this.state.level];
        this.centerX = this.height / 2;
        this.centerY = this.height / 2;
        this.draw();
    }

    handleChange(e) {
        this.clear();
		this.setState({ [e.target.name]: e.target.value });
		if (Number(e.target.value) > 300 && Number(e.target.value) < 500) {
			this.centerX = e.target.name === 'centerX' ? e.target.value : this.centerX;
			this.centerY = e.target.name === 'centerY' ? e.target.value : this.centerY;
		} else {
			this.setState({centerErr: true})
		}
        this.draw();
    }

    handleIteration(e) {
        let nextState;
        if (e.target.title === 'nextIteration') {
            nextState = this.state.level + 1;
        } else {
            nextState = this.state.level - 1;
        }

        if (e.target.title === 'nextIteration' && nextState > -1 && nextState < 11) {
            this.setState({ err: false });
            this.setState({ level: nextState });
            this.level = levels[nextState];
            this.draw();
        } else if (e.target.title === 'prevIteration' && nextState > -1 && nextState < 11) {
            this.setState({ err: false });
            this.setState({ level: nextState });
            this.level = levels[nextState];
            this.draw();
        } else {
            this.setState({ err: true });
        }
    }

    render() {
        return (
            <div className="main">
                <div className="row">
                    <span>level: </span>
                    <input type="number" name="level" value={this.state.level} onChange={this.handleChange} />
                    <span>x center: </span>
                    <input
                        type="number"
                        name="centerX"
                        value={this.state.centerX}
                        onChange={this.handleChange}
                    />
                    <span>y center: </span>
                    <input
                        type="number"
                        name="centerY"
                        value={this.state.centerY}
                        onChange={this.handleChange}
                    />
                    <div />
                    <p title="prevIteration" onClick={this.handleIteration}>
                        previous iteration
                    </p>
                    <p title="nextIteration" onClick={this.handleIteration}>
                        next iteration
                    </p>
                    <div>{this.state.err && 'max amount of iterations is 10'}</div>
                </div>
                <canvas height="800" width="800" ref="canvas" style={{ border: '1px solid black' }} />
            </div>
        );
    }
}

const levels = {
    0: 600,
    1: 300,
    2: 250,
    3: 80,
    4: 40,
    5: 20,
    6: 10,
    7: 5,
	8: 2,
	9: 1,
	10: 0.5
};

export default App;
