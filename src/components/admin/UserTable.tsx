import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/src/redux/store";
import { User } from "@/src/redux/user/types";
import CustomButton from "../shared/CustomButton";
import Container from "../shared/Container";
import { changeUserStatus, fetchUsers } from "@/src/redux/admin/actions";
import { selectUsers } from "@/src/redux/admin/selectors";
import { Picker } from "@react-native-picker/picker";
import { getDate } from "@/src/utils/dateTime";

const userStatuses = [
  { label: 'Адміністратор', value: 'ADMIN' },
  { label: 'Користувач', value: 'USER' },
  { label: 'Верифікований користувач', value: 'VERIFIED_USER' },
]


const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);

  useEffect(() => {
    fetchUsersData(currentPage);
  }, [currentPage]);

  const fetchUsersData = (page: number) => {
    setIsLoading(true);
    dispatch(fetchUsers({ page, pageSize: 8 }))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleChangeStatus = (id: string, status: User["status"]) => {
    console.log(id, status)
    dispatch(changeUserStatus({ userId: id, status }))
      .catch(() => alert("Сталася помилка при зміні статусу!"));
  };

  return (
    <Container>
      <Text style={styles.header}>Користувачі</Text>
      <View style={styles.table}>
        <View style={styles.row} >
          <Text style={styles.cell} className="font-bold">Ім'я</Text>
          <Text style={styles.cell} className="font-bold">Електронна пошта</Text>
          <Text style={styles.cell} className="font-bold">Опис</Text>
          <Text style={styles.cell} className="font-bold">Номер телефону</Text>
          <Text style={styles.cell} className="font-bold">Дата народження</Text>
          <Text style={styles.cell} className="font-bold">Інтереси</Text>
          <Text style={styles.cell} className="font-bold">Статус</Text>
        </View>
        {users && users.users && users.users.map((user) => (
          <View style={styles.row} key={user._id}>
            <Text style={styles.cell}>{user.name}</Text>
            <Text style={styles.cell}>{user.email}</Text>
            <Text style={styles.cell}>{user.description || "N/A"}</Text>
            <Text style={styles.cell}>{user.phoneNumber || '-'}</Text>
            <Text style={styles.cell}>{getDate(user.dateOfBirth || '') || '-'}</Text>
            <Text style={styles.cell}>{user.interests.join(", ")}</Text>

            <View style={styles.cell}>
              <Picker
                selectedValue={user.status}
                style={styles.picker}
                onValueChange={(value) => handleChangeStatus(user._id, value)}
              >
                {/* <Picker.Item label="Активний" value="active" />
                <Picker.Item label="Неактивний" value="inactive" />
                <Picker.Item label="Заблокований" value="banned" /> */}
                {
                  userStatuses && userStatuses.map((status, index) => <Picker.Item label={status.label} value={status.value} key={index} />)
                }
              </Picker>
            </View>
          </View>
        ))}
      </View>
      {users && users.users && (
        <View className="flex flex-row justify-center items-center gap-4 mt-4 mb-4">
          {users.pagination.page > 1 && (
            <CustomButton onPress={handlePrevPage} additionalStyles="px-4 py-2">
              Попередня сторінка
            </CustomButton>
          )}
          <Text className='text-xl font-bold text-blue-500'>{users.pagination.page}</Text>
          {users.pagination.page < users.pagination.totalPages && (
            <CustomButton onPress={handleNextPage} additionalStyles="px-4 py-2">
              Наступна сторінка
            </CustomButton>
          )}
        </View>
      )}
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
    gap: 6,
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    flex: 1,
    width: 90,
  },
  picker: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default UserTable;
