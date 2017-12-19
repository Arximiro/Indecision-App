// Cool //

class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);

        this.state = {
            title: 'Indecision App',
            subtitle: 'Let the computer choose your fate',
            options: ['Thing One', 'Thing Two', 'Thing Three']
        };
    }
    handleDeleteOptions() {this.setState(() => ({options: []}))}
    handlePick() {this.setState(() => alert(this.state.options[Math.floor(Math.random() * this.state.options.length)]))}
    handleAddOption(option) {
        if(!option) {
            return 'Enter a valid value';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }
        this.setState((prevState) => ({options: prevState.options.concat(option)}))}
    render() {        
        return (
            <div>
                <Header title={this.state.title} subtitle={this.state.subtitle} />
                <Action
                  hasOptions={this.state.options.length > 0}
                  handlePick={this.handlePick}
                />
                <Options
                  handleDeleteOptions={this.handleDeleteOptions}
                  options={this.state.options}
                />
                <AddOption
                  handleAddOption={this.handleAddOption}
                 />
            </div>
        );
    }
}


const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
};

const Action = (props) => {
    return (
        <div>
        <button
          disabled={!props.hasOptions}
          onClick={props.handlePick}
        >
          What to do?
        </button>
        </div>
    );
};

const Options = (props) => {
    return (
        <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {props.options.map((option) => <Option key={option} optionText={option}  />)}
        </div>
    );
};

const Option = (props) => {
    return (
        <div>
            <ul>
            <li>{props.optionText}</li>
            </ul>
        </div>
    );
};

class AddOption extends React.Component {
        constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({error}))

        !error ? e.target.elements.option.value = '' : undefined;
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                <input type="text" name="option" placeholder="Enter Option Here" />
                <button>Add Option</button>
                </form>
            </div>
        );
    }
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));