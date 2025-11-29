import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { SideBar } from "../Layout/sideBar.jsx"; // Adjust path as needed
import { Header } from "../Layout/header.jsx";   // Adjust path as needed

export function MainLayout() {
  // defaulting to false means it starts CLOSED. 
  // Change to useDisclosure(true) if you want it open by default.
      <AppShell.Navbar p="md">
        <SideBar toggle={toggle} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell >
  );
}