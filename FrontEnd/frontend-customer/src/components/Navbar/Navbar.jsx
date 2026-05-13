import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../assets/shoppingcart.png";
import { useContext, useRef, useEffect } from "react";
import { GlobalContext } from "../../context/ContainContext.jsx";
import { auth } from "../../../firebase.js";
import SignOutBtn from "../SignOutBtn/SignOutBtn.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    setFind,
    storage,
    cartRef,
    authorize,
    filterPd,
    setFilterPd,
    dataSet,
    setNameFind,
    nameFind,
  } = useContext(GlobalContext);
  const user = auth.currentUser;
  const stickyRef = useRef();

  const handleSticky = () => {
    if (!stickyRef.current) return;

    if (window.scrollY > 0) {
      stickyRef.current.style.position = "sticky";
      stickyRef.current.style.top = "0";
      stickyRef.current.style.zIndex = "10";
    } else {
      stickyRef.current.style.position = "relative";
    }
  };
  const handleInput = (e) => {
    const findValue = e.target.value;
    setNameFind(findValue);
    const productInSearch = dataSet.filter((product) =>
      product.title.toLowerCase().includes(findValue.toLowerCase())
    );
    setFilterPd(productInSearch);
  };

  const findRender = () => {
    setFind(nameFind);
    setNameFind("");
  };
  const getItem = (item) => {
    sessionStorage.clear();
    sessionStorage.setItem("item", JSON.stringify(item));
    setNameFind("");
    navigate("/Info");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleSticky);
  }, []);

  return (
    <div id="navContainer" ref={stickyRef}>
      <ul id="listOption">
        <li
          className="options"
          onClick={() => {
            navigate("/");
          }}
        >
          Logo
          {/* <img  style={{width:'100%',height:'100px'}} src={Logo} alt="Logo"/> */}
        </li>
        <li className="options noHover searchEngine">
          <input
            value={nameFind}
            onChange={handleInput}
            type="text"
            placeholder="Text your product you need..."
          />
          {nameFind ? (
            <ul
              className="listPd"
              style={{ position: "absolute", top: "77%", left: "-12.7%" }}
            >
              {filterPd
                ? filterPd
                    .map((item, index) => (
                      <li
                        className="dropListPd"
                        key={index}
                        onClick={() => {
                          getItem(item);
                        }}
                      >
                        <div className="imgPd">
                          <img src={item.thumbnail} />
                        </div>
                        <div className="infoPd">
                          <div style={{ fontWeight: 700 }}>{item.title}</div>
                          <div className="descripPd">{item.description}</div>
                        </div>
                      </li>
                    ))
                    .slice(0, 5)
                : undefined}
            </ul>
          ) : undefined}
        </li>
        <li className="options " onClick={findRender}>
          Find
        </li>
        <li
          className="options noHover navCart"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <img
            className="iconCart"
            ref={cartRef}
            src={cartIcon}
            alt="icon Cart"
          />
          <div id="countCart">
            {storage.reduce((sum, item) => sum + item.quantity, 0)}
          </div>
        </li>
        <li className="options">Category</li>
        <li className="options">Contact</li>
        <li className="options btnLog noHover">
          {user || authorize ? (
            <SignOutBtn />
          ) : (
            <div>
              <button onClick={() => navigate("/Login")}>Login</button>
              <button onClick={() => navigate("/Signup")}>Sign up</button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
