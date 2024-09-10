import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Tag, Flex, Typography } from "antd";
import { useITHardwareStore } from "../store/itHardwareStore";
import Breadcrumb from "./BreadCrumb";
import { Component } from "../types/common";

const { Title } = Typography;

const Content: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    filteredHardware,
    selectedFilters,
    setSelectedFilters,
    updateFilteredHardware,
    activeComponent,
    components,
    setActiveComponent,
  } = useITHardwareStore();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const component = params.get("component");
    if (component) {
      setActiveComponent(component);
    }
    const filters: Record<string, string[]> = {};
    params.forEach((value, key) => {
      if (key !== "component") {
        filters[key] = filters[key] ? [...filters[key], value] : [value];
      }
    });
    setSelectedFilters(filters);
    updateFilteredHardware();
  }, [
    location.search,
    setActiveComponent,
    setSelectedFilters,
    updateFilteredHardware,
  ]);

  const removeFilter = (filterType: string, value: string) => {
    const newFilters = { ...selectedFilters };
    if (Array.isArray(newFilters[filterType])) {
      newFilters[filterType] = (newFilters[filterType] as string[]).filter(
        (v) => v !== value
      );
    } else {
      delete newFilters[filterType];
    }
    setSelectedFilters(newFilters);
    updateFilteredHardware();
    updateURL(newFilters);
  };

  const updateURL = (filters: Record<string, string | string[]>) => {
    const params = new URLSearchParams();
    if (activeComponent) {
      params.append("component", activeComponent);
    }
    Object.entries(filters).forEach(([key, values]) => {
      if (Array.isArray(values)) {
        values.forEach((value) => params.append(key, value));
      } else if (values) {
        params.append(key, values);
      }
    });
    navigate(`?${params.toString()}`);
  };

  const getActiveComponentName = () => {
    const findComponent = (comps: Component[]): string | undefined => {
      for (const comp of comps) {
        if (comp.id === activeComponent) return comp.name;
        if (comp.subcategories) {
          const found = findComponent(comp.subcategories);
          if (found) return found;
        }
      }
    };
    return findComponent(components) || "All Components";
  };

  return (
    <div style={{ margin: "0 16px" }}>
      <Breadcrumb />
      <Title level={2}>
        {getActiveComponentName()} ({filteredHardware.length})
      </Title>
      <Flex vertical gap="large">
        {Object.entries(selectedFilters).map(([filterType, values]) =>
          Array.isArray(values) ? (
            values.map((value) => (
              <Tag
                color="blue"
                key={`${filterType}-${value}`}
                style={{ width: "fit-content" }}
                closable
                onClose={() => removeFilter(filterType, value)}
              >
                {`${filterType}: ${value}`}
              </Tag>
            ))
          ) : (
            <Tag
              key={`${filterType}-${values}`}
              closable
              onClose={() => removeFilter(filterType, values as string)}
            >
              {`${filterType}: ${values}`}
            </Tag>
          )
        )}

        {filteredHardware.map((item) => (
          <Card
            key={item.id}
            hoverable
            onClick={() => navigate(`/product/${item.id}`)}
            className="content-card"
          >
            <Flex gap="large">
              <div className="content-card-image">
                <img alt="example" src={item?.imgSrc} />
              </div>
              <Flex vertical align="start">
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p>{item.description}</p>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </div>
  );
};

export default Content;
