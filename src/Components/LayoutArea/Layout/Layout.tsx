import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Routing from "../../HomeArea/Routing/Routing";
import IndexNavbar from "../Navbars/IndexNavbar";
import PageHeader from "../PageHeader/PageHeader";
import "./Layout.css";

function Layout(): JSX.Element {
    React.useEffect(() => {
        document.body.classList.toggle("index-page");
          return function cleanup() {
            document.body.classList.toggle("index-page");
        };
      },[]);

return (
  <>
    <HashRouter>
        <IndexNavbar />
          <div className="wrapper">
             <PageHeader />
                <div className="main">
                  <Routing/>
                </div>
          </div>
    </HashRouter>
  </>
    );
};

export default Layout;
