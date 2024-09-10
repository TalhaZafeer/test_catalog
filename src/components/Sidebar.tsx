import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Checkbox, Radio, Input } from "antd";
import { useITHardwareStore } from "../store/itHardwareStore";
import { Component } from "../types/common";

const { SubMenu } = Menu;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const fetchData = useITHardwareStore((state) => state.fetchData);

  const {
    components,
    filters,
    selectedFilters,
    activeComponent,
    setSelectedFilters,
    setActiveComponent,
    updateFilteredHardware,
  } = useITHardwareStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleComponentSelect = (componentId: string) => {
    setActiveComponent(componentId);
    updateFilteredHardware();
    navigate(`/?component=${componentId}`);
  };

  const handleFilterChange = (filterType: string, value: string | string[]) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(newFilters);
    updateFilteredHardware();
    const params = new URLSearchParams(window.location.search);
    if (Array.isArray(value)) {
      params.delete(filterType);
      value.forEach((v) => params.append(filterType, v));
    } else {
      params.set(filterType, value);
    }
    navigate(`?${params.toString()}`);
  };

  const renderComponents = (components: Component[]): React.ReactNode => {
    return components.map((component) => {
      if (component.subcategories) {
        return (
          <SubMenu
            key={component.id}
            title={`${component.name} (${component?.count || 0})`}
          >
            {renderComponents(component.subcategories)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item
          key={component.id}
          onClick={() => handleComponentSelect(component.id)}
          style={{
            backgroundColor:
              activeComponent === component.id ? "#e6f7ff" : "transparent",
            color: activeComponent === component.id ? "#1890ff" : "inherit",
          }}
        >
          {component.name} ({component?.count || 0})
        </Menu.Item>
      );
    });
  };

  return (
    <Menu
      mode="inline"
      style={{ height: "100%", borderRight: 0, padding: "0 16px" }}
      selectedKeys={activeComponent ? [activeComponent] : []}
    >
      <div className="side-bar-item">
        <Input placeholder="Search..." size="large" />
        {renderComponents(components)}
      </div>
      {Object.entries(filters).map(([filterType, filter]) => (
        <SubMenu
          key={filterType}
          title={filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          className="side-bar-item"
        >
          {filter.options.map((option) => (
            <Menu.Item key={`${filterType}-${option}`}>
              {filter.type === "checkbox" ? (
                <Checkbox
                  checked={(
                    (selectedFilters[filterType] as string[]) || []
                  ).includes(option)}
                  onChange={() => {
                    const newValues = [
                      ...((selectedFilters[filterType] as string[]) || []),
                    ];
                    const index = newValues.indexOf(option);
                    if (index > -1) {
                      newValues.splice(index, 1);
                    } else {
                      newValues.push(option);
                    }
                    handleFilterChange(filterType, newValues);
                  }}
                >
                  {option}
                </Checkbox>
              ) : (
                <Radio
                  checked={selectedFilters[filterType] === option}
                  onChange={() => handleFilterChange(filterType, option)}
                >
                  {option}
                </Radio>
              )}
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};

export default Sidebar;
