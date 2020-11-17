import React from 'react';

type Props = {
    setSearchFunction?: (s:string) => void;
}
interface State {
    value?: string;
}




class SearchBar extends React.Component<Props, State>{
    constructor(props:Props) {
        super(props);
        this.state = {
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            value: event.currentTarget.value
        });
    };

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.props.setSearchFunction(this.state.value)
    };

    render() {
        const style = {
            borderRadius: '4px',
            marginBottom: '7px',
            marginLeft:'6px',
            display: 'block',
            height: '1.8rem',
            width: '100%',
            fontSize: '1.4rem',
            fontFamily: "'Lato',sans-serif"
        };
        const labelStyle = {
            height: '100%',
            width: '80%',
            borderRadius: '1.2rem 0px 0px 1.2rem',
            outline: "none"
        };
        const inputStyle = {
            borderRadius: '1.2rem 0px 0px 1.2rem',
            paddingLeft:"2%",
            width:'100%',
            outline: "none"
        };
        const btnStyle = {
            borderRadius: '0px 1.2rem 1.2rem 0px',

        };

        return(
            <form onSubmit={this.handleSubmit} style={style}>
                <label style={labelStyle}>
                    <input type="text" style={inputStyle} value={this.state.value} onChange={event => this.handleChange(event)} />
                </label>
                <button type="submit" value="Submit" style={btnStyle} className="bg-tesc-blue">Search</button>
            </form>
        );
    }
}

export default SearchBar;