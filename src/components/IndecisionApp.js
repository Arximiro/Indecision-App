import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';


export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined,
        modalOpen: false
    };
    handleDeleteOptions = () => {
        this.setState(() => ({options: []}));
    };
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    };
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({selectedOption: option, modalOpen: true}));
    };
    handleAddOption = (option) => {
        const lcOptions = []
        this.state.options.forEach((option) => lcOptions.push(option.toLowerCase()));
        if(!option) {
            return 'Enter a valid value';
        } else if (lcOptions.indexOf(option.toLowerCase()) > -1) {
            return 'This option already exists';
        }
        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    };
    handleClearSelectedOption = () => this.setState(() => ({modalOpen: false}));
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options) this.setState(() => ({options}))
        } catch (e) {}        
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    render() {        
        return (
            <div>
                <Header />
                <div className="container">
                    <Action
                      hasOptions={this.state.options.length > 0}
                      handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                          handleDeleteOptions={this.handleDeleteOptions}
                          handleDeleteOption={this.handleDeleteOption}
                          options={this.state.options}
                        />
                        <AddOption
                          handleAddOption={this.handleAddOption}
                        />
                    </div>                    
                </div>
                
                 <OptionModal
                   selectedOption={this.state.selectedOption}
                   modalOpen={this.state.modalOpen}
                   handleClearSelectedOption={this.handleClearSelectedOption}
                 />
            </div>
        );
    }
}
