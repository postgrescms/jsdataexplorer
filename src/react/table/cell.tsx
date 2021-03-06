import React from 'react';
import { TableCellViewModel } from '../../viewmodels/table';

interface IProps {
  model: TableCellViewModel;
}

interface IState {
  text: string;
}
export class TableCell extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { text: props.model.getText() };
    props.model.updateCallback = (data: string) => {
      this.setState({ text: data });
    };
  }
  css() {
    return this.props.model.css()
  }
  render() {
    return (
      <td className={this.css().root}>{this.state.text}</td>
    );
  }
}