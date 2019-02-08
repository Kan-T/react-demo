import React, { Component } from "react";
import { Link } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

class Breadcrumb extends Component {
  render() {
    let { breadcrumbs } = this.props;
    breadcrumbs = breadcrumbs.filter(item => {
      return item.key !== "/";
    });
    return (
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            Dynamic breadcrumb
          </li>
          {true && (
            <li className='breadcrumb-item'>
              <Link to='/'>Dashboard</Link>
            </li>
          )}
          {breadcrumbs &&
            breadcrumbs.map((breadcrumb, index) => {
              console.log(breadcrumb)
              return (
                <li key={breadcrumb.key} className='breadcrumb-item'>
                  {index !== breadcrumbs.length - 1 && (
                    <Link to={breadcrumb.props.match.url}>
                      {breadcrumb.key
                        .toString()
                        .split("/")
                        [index + 1]
                        //.toLowerCase()
                      }
                    </Link>
                  )}
                  {index === breadcrumbs.length - 1 &&
                    breadcrumb.key
                      .toString()
                      .split("/")
                      [index + 1]
                      //.toLowerCase()
                  }
                </li>
              );
            })}
        </ol>
      </nav>
    );
  }
}

export default withBreadcrumbs()(Breadcrumb);
