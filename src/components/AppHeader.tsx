import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Input, Typography } from "antd";
import { Header } from "antd/es/layout/layout";

const { Text, Title } = Typography;

const AppHeader = () => {
  return (
    <Header
      style={{
        background: "#fff",
        marginBottom: 10,
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        borderBottom: "2px solid lightgray",
      }}
    >
      <Flex align="center" justify="space-between" style={{ height: "100%" }}>
        <Input
          placeholder="Search"
          className="header-search-field"
          size="large"
        />
        <Flex align="center" gap="small">
          <Avatar size="large" icon={<UserOutlined />} />
          <Flex vertical justify="center">
            <Title level={5} style={{ margin: 0 }}>
              Martin
            </Title>
            <Text type="secondary">Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Header>
  );
};

export default AppHeader;
