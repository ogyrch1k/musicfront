import React from 'react';

class MySelect extends React.Component{
    render() {
            return (
                <select
                    value={this.props.value}
                    onChange={event => this.props.onChange(event.target.value)}
                >
                <option value="">{this.props.defaultValue}</option>
                    {this.props.options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
    }
}
export default MySelect;
