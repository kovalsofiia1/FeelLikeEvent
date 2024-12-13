import EventTable from "@/src/components/admin/EventTable";
import UserTable from "@/src/components/admin/UserTable";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

const AdminPage = () => {
  const [selectedPage, setSelectedPage] = useState<"users" | "events">("users");

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <TouchableOpacity
          style={[styles.sidebarButton, selectedPage === "users" && styles.activeButton]}
          onPress={() => setSelectedPage("users")}
        >
          <Text style={styles.buttonText}>Користувачі</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sidebarButton, selectedPage === "events" && styles.activeButton]}
          onPress={() => setSelectedPage("events")}
        >
          <Text style={styles.buttonText}>Події</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {selectedPage === "users" ? <UserTable /> : <EventTable />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  sidebar: {
    width: 200,
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row"
  },
  sidebarButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#007BFF",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    // padding: 20,
  },
});

export default AdminPage;
