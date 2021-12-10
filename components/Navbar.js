import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "./Button";
import { Dropdown, Image } from "semantic-ui-react";
import { useAuth } from "../contexts/auth";
import SearchBar from "./SearchModule/SearchBar";
function Navbar() {
  const router = useRouter();
  let user = {
    id: "",
    name: "",
    email: "",
    username: "",
    avatarUrl: "",
  };
  const { user: _user, loading, logout } = useAuth();
  user = _user;

  const trigger = (
    <span >
      <Image className='ImageNavbar' avatar src={_user && _user.avatarUrl} style={{width: '2.5em', height: '2.5em'}}/>
    </span>
  );

  const handleItemClick = (value) => {
    switch (value) {
      case "user":
        router.push(`/profile/${user.id}`);
        break;
      case "settings":
        router.push(`/profile/${user.id}/settings`);
        break;
      case "sign-out":
        logout();
        break;
      default:
        break;
    }
  };

  const options = [
    {
      key: "users",
      text: (
        <span>
          Signed in as <strong>{user ? user.username : ""}</strong>
        </span>
      ),
      disabled: true,
      value: "users",
    },
    { key: "user", text: "My profile", icon: "user", value: "user" },
    { key: "settings", text: "Settings", icon: "settings", value: "settings" },
    { key: "sign-out", text: "Sign Out", icon: "sign out", value: "sign-out" },
  ];

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const loginRegLink = (
    <Button>
      <Link href="/sign-in">
        <a>Login</a>
      </Link>
    </Button>
  );
  const userLink = (
    <div className='Dropdown'>
      <Dropdown style={{borderRadius: '50%', background: '#f8f8f8'}} trigger={trigger} icon={null} pointing="top right">
        <Dropdown.Menu>
          {options.map((e) => {
            return (
              <Dropdown.Item
                key={e.key}
                content={e.text}
                icon={e.icon}
                onClick={() => handleItemClick(e.value)}
                disabled={e.disabled || false}
              />
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
      </Head>
      <nav className="NavbarItems row">
        <Link href="/">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img
              className="navbarLogo"
              src="/static/logo.png"
              alt="logo"
              width="60px"
              height="auto"
            />
            <h4 style={{ color: "#FFF", paddingLeft: "8px" }}>E-LEARNING</h4>
          </div>
        </Link>
        <div className="menuIcon" onClick={handleClick}>
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        
        <ul className={clicked ? "navMenu active" : "navMenu"}>
          <li className={router.pathname == "/" ? "actived" : ""}>
            <Link href="/">
              <a className="navLinks">Home</a>
            </Link>
          </li>
          <li className={router.pathname == "/trainers" ? "actived" : ""}>
            <Link href="/trainers">
              <a className="navLinks">Trainers</a>
            </Link>
          </li>
          <li className={router.pathname == "/topics" ? "actived" : ""}>
            <Link href="/topics">
              <a className="navLinks">Topics</a>
            </Link>
          </li>
          <li className={router.pathname == "/classes" ? "actived" : ""}>
            <Link href="/classes">
              <a className="navLinks">Classes</a>
            </Link>
          </li>
          <li className={router.pathname == "/questions" ? "actived" : ""}>
            <Link href="/questions">
              <a className="navLinks">Questions</a>
            </Link>
          </li>
          <li className={router.pathname == "/posts" ? "actived" : ""}>
            <Link href="/posts">
              <a className="navLinks">Blogs</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href={`/profile/${user.id}`}>
                  <a className="navLinksMobile">{user ? user.name : ""}</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/sign-in">
                  <a className="navLinksMobile">Login</a>
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="navSearch" style={{display: 'flex', justifyContent: 'center'}}>
          <SearchBar />
          {user ? userLink : loginRegLink}
        </div>
      </nav>
    </>
  );
}
export default Navbar;
