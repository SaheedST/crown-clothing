import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg'
import './Navigation.styles.scss'

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <a className="logo-container" href="/">
          <div><CrwnLogo className='logo'/></div>
        </a>
        <div className="nav-links-container">
            <a className="nav-link" href="/">Link</a>
            <a className="nav-link" href="/sign-in">SIGN IN</a>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
