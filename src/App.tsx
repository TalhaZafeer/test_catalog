import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import ProductDetails from "./components/ProductDetails";
import AppHeader from "./components/AppHeader";

const { Content: AntContent, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <AppHeader />
        <Layout>
          <Sider width={300}>
            <Sidebar />
          </Sider>
          <AntContent>
            <Routes>
              <Route path="/" element={<Content />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </AntContent>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
