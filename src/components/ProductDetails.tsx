import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Tabs, Descriptions, Button, Flex } from "antd";
import { useITHardwareStore } from "../store/itHardwareStore";
import Breadcrumb from "./BreadCrumb";

const { Content } = Layout;
const { TabPane } = Tabs;

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hardware, setSelectedProduct, selectedProduct } =
    useITHardwareStore();

  useEffect(() => {
    const product = hardware.find((item) => item.id.toString() === id);
    if (product) {
      setSelectedProduct(product);
    } else {
      // Handle product not found
      navigate("/");
    }
  }, [id, hardware, setSelectedProduct, navigate]);

  if (!selectedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <Content style={{ margin: "0 16px" }}>
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        Back to List
      </Button>
      <Breadcrumb />
      <h2>{selectedProduct.name}</h2>
      <Flex gap="large">
        <div className="product-details-image">
          <img src={selectedProduct.imgSrc} alt={selectedProduct.name} />
        </div>
        <Tabs defaultActiveKey="2">
          <TabPane tab="Details" key="1">
            {selectedProduct.description}
          </TabPane>
          <TabPane tab="Specifications" key="2">
            <Descriptions column={1} bordered>
              {Object.entries(selectedProduct).map(([key, value]) => (
                <Descriptions.Item
                  label={key}
                  key={key}
                  style={{ textTransform: "capitalize" }}
                >
                  {value}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </TabPane>
        </Tabs>
      </Flex>
    </Content>
  );
};

export default ProductDetails;
