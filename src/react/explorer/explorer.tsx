import React from 'react';
import { ExplorerPanelViewModel, ExplorerViewModel } from '../../viewmodels/explorer';
import { ExplorerPanel } from '../explorer/panel';


interface IProps {
  model: ExplorerViewModel;
}
interface IState {
  panels: ExplorerPanelViewModel[];
}
export class Explorer extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { panels: props.model.getPanels() };
    this.props.model.addPanelCallback = (panelViewModel) => {
      this.setState({ panels: props.model.getPanels().slice() });
    };
    this.props.model.removePanelCallback = () => {
      this.setState({ panels: props.model.getPanels().slice() });
    };
  }
  css() {
    return this.props.model.css()
  }
  render() {
    return (
      <div className={this.css().root}>
        {this.state.panels.map((row, index) => <ExplorerPanel key={index} model={row} />)}
      </div>
    );
  }
}