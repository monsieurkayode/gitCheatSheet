import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { toast } from 'react-toastify';
import { logoutUser } from '../../actions/userActions';
import logo from '../../assets/images/giticonw.png';

const Nav = styled.nav`
  height: 64px;
  line-height: 64px;
  text-align: center;
  position: relative;
  align-self: normal;

  @keyframes drop {
    from {
      margin-top: 10px;
      opacity: 0
    }
    to {
      margin-top: 30px;
      opacity: 0.9;
    }
  }

  .tooltip {
    line-height: initial;
    text-transform: uppercase;
    font-size: 10px;
    font-family: 'Josefin Sans', sans-serif;
    background: #668090;
    margin-top: 30px;
    box-shadow: 4px 3px 5px rgba(0,0,0,0.3);
    animation: drop .3s;
    visibility: unset;
    display: none;

    &.place-bottom::after {
      border-bottom-color: #668090;
    }

    &.place-left::after {
      border-left-color: #668090;
    }

    @media only screen and (max-width: 920px) {
      display: none;
    }
  }

  .show {
    visibility: unset;
    display: block;
  }

  .container {
    display: flex;
    align-items: center;
    max-width: 1232px;
    margin: 0 auto;
    padding: 0 1%;

    @media only screen and (min-width: 920px) and (max-width: 1260px) {
      padding: 0 3%;
    }

    .left {
      line-height: 0;

      img {
        width: 45px;
        min-width: 40px;
        min-height: 45px;
        background: #6756b3;
        border-radius: 50%;
        border: 2px solid #f1f3f5;
        padding: 10px;
        cursor: pointer;
      }
    }

    .brand {
      flex: 1 1 auto;
      cursor: pointer;
      
      > a {
        text-transform: uppercase;
        font-family:  'Josefin Sans', sans-serif;
        font-size: 13px;
        font-weight: 700;
        text-decoration: none;
        color: #15234d;

        &:hover {
          color: #745fb5;
        }
      }

    }

    .actions {
      font-family:  'Josefin Sans', sans-serif;
      min-width: 60px;

      ul {
        line-height: 0;
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          display: inline-block;
          cursor: pointer;

          > i {
            font-size: 20px;
            -webkit-text-fill-color:  #15234d;
          }
        }

        > :last-child {
          padding-left: 20px;
        }
      }
    }
  }
`;

const AvatarDiv = styled.div`
  line-height: 0;
  display: ${props => (props.authenticated ? '' : 'none')}
`;

const NavMenu = styled.ul`
  display: ${props => (props.authenticated ? 'none' : '')}
`;

const NavBar = ({ user, authenticated, logout }) => (
  <Nav className="top-nav">
    <div className="container">
      <div className="left">
        <Link to="/" onClick={() => toast.dismiss()}>
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="brand"><Link to="/">Gitcheatsheet</Link></div>
      <div className="actions">
        <AvatarDiv authenticated={authenticated} data-tip data-for="logout">
          <Avatar
            onClick={() => {
              ReactTooltip.hide();
              logout();
            }}
            style={{ cursor: 'pointer' }}
            round
            size={30}
            name={user.username}
            color="#668090"
          />
        </AvatarDiv>
        <NavMenu authenticated={authenticated}>
          <Link
            to="/register"
            onClick={() => {
              toast.dismiss();
              ReactTooltip.hide();
            }}
          >
            <li>
              <i data-tip data-for="register" className="material-icons">
                person_add
              </i>
            </li>
          </Link>
          <Link
            to="/login"
            onClick={() => {
              toast.dismiss();
              ReactTooltip.hide();
            }}
          >
            <li>
              <i data-tip data-for="login" className="material-icons">
                account_circle
              </i>
            </li>
          </Link>
        </NavMenu>
      </div>
    </div>
    <ReactTooltip className="tooltip" id="register" effect="solid">
      <span>Register</span>
    </ReactTooltip>
    <ReactTooltip className="tooltip" id="login" effect="solid">
      <span>Login</span>
    </ReactTooltip>
    <ReactTooltip className="tooltip" id="logout" effect="solid">
      <span>Logout</span>
    </ReactTooltip>
  </Nav>
);

NavBar.defaultProps = {
  user: {}
};

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string
  }),
  logout: PropTypes.func.isRequired
};


const mapStateToProps = ({ userDetails }) => ({
  authenticated: Object.keys(userDetails.user).length === 2,
  user: userDetails.user
});

export default connect(mapStateToProps, { logout: logoutUser })(NavBar);
