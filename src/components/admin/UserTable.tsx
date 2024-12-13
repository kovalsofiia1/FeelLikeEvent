import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Container from "../shared/Container";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" },
];

const UserTable = () => {
  const handleChangeStatus = (id: number) => {
    console.log(`Change status for user ID: ${id}`);
    // Implement status change logic here
  };

  return (
    <Container>
      <Text style={styles.header}>Users</Text>
      <View style={styles.table}>
        {mockUsers.map((user) => (
          <View style={styles.row} key={user.id}>
            <Text style={styles.cell}>{user.name}</Text>
            <Text style={styles.cell}>{user.email}</Text>
            <Text style={styles.cell}>{user.status}</Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleChangeStatus(user.id)}
            >
              <Text style={styles.actionText}>Change Status</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    flex: 1,
  },
  actionButton: {
    backgroundColor: "#007BFF",
    padding: 5,
    borderRadius: 5,
  },
  actionText: {
    color: "#fff",
  },
});

export default UserTable;
