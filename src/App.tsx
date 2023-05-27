import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

import { AppRoot, ContentRoot } from "./styledApp";

function App() {
  return (
    <AppRoot>
      <Layout>
        <Layout.Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            items={[
              {
                key: "map",
                label: <Link to="/">Map</Link>,
              },
              { key: "list", label: <Link to="/list">List</Link> },
            ]}
          />
        </Layout.Sider>
        <Layout>
          <ContentRoot>
            <Outlet />
          </ContentRoot>
        </Layout>
      </Layout>
    </AppRoot>
  );
}

export default App;
