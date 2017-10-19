import React from 'react';

export default class Tabs extends React.Component {
  constructor(props){
    super(props);
    this.state = { selectedTab: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const selectedTab = parseInt(event.currentTarget.attributes["data-id"].value);
    this.setState({ selectedTab });
  }

  render() {
    const { selectedTab } = this.state;
    const { tabs } = this.props;
    return(
      <div>
        <h1>TAAAABS!</h1>
        <ul>
          {
            tabs.map((tab, idx) => (
              <h1 key={tab.title + '-' + idx}
                  onClick={this.handleClick}
                  data-id={idx}>{tab.title}</h1>
            ))
          }
        </ul>
        <article>{tabs[selectedTab].content}</article>
      </div>
    );
  }
}
