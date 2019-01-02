import React, { Component } from 'react';
import SortableTree, { getTreeFromFlatData } from 'react-sortable-tree';
import data from './data/test.js'

class Tree01 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: getTreeFromFlatData({
        flatData: data.map(node => ({ ...node, title: node.Name||node.MachineType })),
        getKey: node => node.ObjectID,                   // resolve a node's key
        getParentKey: node => node.AccountID,            // resolve a node's parent's key
        rootKey: null, // The value of the parent key when there is no parent (i.e., at root level)
      })
    };
    console.log(this.state.treeData);
  }

  componentDidUpdate(){
    // console.log("Tree01 state: ", this.state)
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ height: 400 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            getNodeKey={({ node }) => node.title}
            canDrag={false}
          />
        </div>
        <div className="m-4 ">
          {JSON.stringify(this.state.treeData)}
        </div>
      </React.Fragment>
    );
  }
}

export default Tree01;
