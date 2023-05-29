import { Layout, Menu } from "antd";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { Note } from "./components/Note";
import { savedFences } from "./store";
import { FENCE_STORAGE_KEY } from "./store/constant";
import { AppRoot, ContentRoot } from "./styledApp";

import type { TFence } from "./store/types";

function App() {
  const setSavedFences = useSetAtom(savedFences);

  const { pathname } = useLocation();

  useEffect(() => {
    try {
      const initFences = JSON.parse(
        localStorage.getItem(FENCE_STORAGE_KEY) ?? "[]"
      ) as [string, TFence][];
      const initMap = new Map(initFences);
      setSavedFences(initMap);
    } catch (e) {
      localStorage.removeItem(FENCE_STORAGE_KEY);
    }
  }, []);

  return (
    <AppRoot>
      <Layout>
        <Layout.Sider breakpoint="lg" collapsedWidth="0">
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[pathname.replace("/", "_")]}
            items={[
              {
                key: "_",
                label: <Link to="/">Map</Link>,
              },
              { key: "_list", label: <Link to="/list">List</Link> },
            ]}
          />
          {pathname === "/" && <Note />}
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
