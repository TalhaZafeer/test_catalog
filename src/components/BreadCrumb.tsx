import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { useITHardwareStore } from "../store/itHardwareStore";
import { Component } from "../types/common";

const Breadcrumb: React.FC = () => {
  const { activeComponent, components } = useITHardwareStore();

  const findComponentPath = (
    componentId: string | null,
    currentComponents: Component[],
    currentPath: Component[] = []
  ): Component[] | null => {
    for (const component of currentComponents) {
      if (component.id === componentId) {
        return [...currentPath, component];
      }
      if (component.subcategories) {
        const path = findComponentPath(componentId, component.subcategories, [
          ...currentPath,
          component,
        ]);
        if (path) return path;
      }
    }
    return null;
  };

  const componentPath = activeComponent
    ? findComponentPath(activeComponent, components)
    : null;

  return (
    <AntBreadcrumb style={{ margin: "16px 0" }}>
      {/* <AntBreadcrumb.Item>
        <Link to="#">Components</Link>
      </AntBreadcrumb.Item> */}
      {componentPath?.map((component) => (
        <AntBreadcrumb.Item key={component.id}>
          <Link to={`/?component=${component.id}`}>{component.name}</Link>
        </AntBreadcrumb.Item>
      ))}
    </AntBreadcrumb>
  );
};

export default Breadcrumb;
