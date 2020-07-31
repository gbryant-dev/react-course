import React, { Component } from 'react';

const asyncComponent = ImportComponent => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            ImportComponent()
            .then(cmp => {
                console.log('Getting async component', cmp);
                this.setState({component: cmp.default})
            });
        }

        render() {
            const C = this.state.component
            return C ? <C {...this.props} /> : null;
        }
        
    }
}

export default asyncComponent;