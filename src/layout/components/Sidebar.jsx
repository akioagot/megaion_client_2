import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  InboxOutlined,
  TeamOutlined,
  UserOutlined,
  BankOutlined,
  FileDoneOutlined,
  PushpinOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  PieChartOutlined,
  MenuOutlined,
  GroupOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

import useAppStore from "../../store/AppStore";
import useUserStore from "../../store/UserStore";
import megaionLogo from "../../assets/images/megaion.png";
import megaionLogoSmall from "../../assets/images/megaion-small.png";

function Sidebar() {
  const { isSidebarOpen } = useAppStore();
  const { roles: userRoles } = useUserStore();

  const location = useLocation();

  const allMenu = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "/products",
      icon: <UnorderedListOutlined />,
      label: <Link to="/products">Products</Link>,
    },
    {
      key: "/inventory",
      icon: <DatabaseOutlined />,
      label: <Link to="/inventory">Inventory</Link>,
    },
    {
      key: "/purchaseOrders",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/purchaseOrders">Purchase Orders</Link>,
    },
    {
      key: "/orders",
      icon: <ShoppingOutlined />,
      label: <Link to="/orders">Orders</Link>,
    },
    // {
    //   key: "/reports",
    //   icon: <PieChartOutlined />,
    //   label: <Link to="/reports">Reports</Link>,
    // },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: <Link to="/users">Users</Link>,
    },
    {
      key: "/productGroups",
      icon: <GroupOutlined />,
      label: <Link to="/productGroups">Product Groups</Link>,
      group: "Others",
    },
    {
      key: "/suppliers",
      icon: <InboxOutlined />,
      label: <Link to="/suppliers">Suppliers</Link>,
      group: "Others",
    },
    {
      key: "/companies",
      icon: <TeamOutlined />,
      label: <Link to="/companies">Companies</Link>,
      group: "Others",
    },
    {
      key: "/locations",
      icon: <PushpinOutlined />,
      label: <Link to="/locations">Locations</Link>,
      group: "Others",
    },
    {
      key: "/warehouses",
      icon: <BankOutlined />,
      label: <Link to="/warehouses">Warehouses</Link>,
      group: "Others",
    },
    {
      key: "/ecommerce",
      icon: <UnorderedListOutlined />,
      label: <Link to="/ecommerce">Ecommerce</Link>,
    },
    {
      key: "/customerOrders",
      icon: <ShoppingOutlined />,
      label: <Link to="/customerOrders">My Orders</Link>,
    },
  ];

  const userRoleMenu = {
    Admin: [
      "/dashboard",
      "/products",
      "/inventory",
      "/purchaseOrders",
      "/orders",
      "/reports",
      "/users",
      "/productGroups",
      "/suppliers",
      "/companies",
      "/locations",
      "/warehouses",
      "/customerOrders",
    ],
    Customer: ["/ecommerce", "/customerOrders"],
    Sales: ["/dashboard", "/orders"],
    Procurement: ["/dashboard", "/purchaseOrders"],
    "Inventory staff": ["/dashboard", "/inventory"],
    "Warehouse staff": ["/dashboard", "/purchaseOrders"],
    "Logistic manager": ["/dashboard", "/orders"],
  };

  const getMenuForRoles = (menu, userRoleMenu, roles) => {
    const assignedMenu = [];
    roles.forEach((role) => {
      userRoleMenu[role].forEach((menuKey) => {
        if (!assignedMenu.find((item) => item.key === menuKey)) {
          const menuItem = menu.find((item) => item.key === menuKey);
          if (menuItem) assignedMenu.push(menuItem);
        }
      });
    });
    return assignedMenu;
  };

  const menuItems = getMenuForRoles(allMenu, userRoleMenu, userRoles);

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={!isSidebarOpen}
      theme="light"
      width={220}
      className="sidebar"
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={isSidebarOpen ? megaionLogo : megaionLogoSmall}
          alt="Megaion Logo"
          style={{
            height: 64,
            width: isSidebarOpen ? 200 : "auto",
            padding: 10,
            borderRadius: 15,
          }}
        />
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
      />
    </Layout.Sider>
  );
}

export default Sidebar;
