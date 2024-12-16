import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getDate } from "@/src/utils/dateTime";
import { changeEventStatus, fetchEvents } from "@/src/redux/admin/actions";
import { selectEvents } from "@/src/redux/admin/selectors";
import { AppDispatch } from "@/src/redux/store";
import { selectIsLoggedIn } from "@/src/redux/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../shared/CustomButton";
import Container from "../shared/Container";

const EventTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector(selectEvents);

  useEffect(() => {
    fetchEventsData(currentPage);
  }, [currentPage]);

  const fetchEventsData = (page: number) => {
    setIsLoading(true);

    // Combine pagination, search query, and filters into the API request
    const params = {
      page,
      pageSize: 8,
    };

    dispatch(fetchEvents(params))
      .then(() => setIsLoading(false)) // Set loading to false after events are fetched
      .catch(() => setIsLoading(false));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increase page to load more events
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1); // Decrease page if not the first page
    }
  };

  const handleChangeStatus = (id: string, action: 'decline' | 'verify') => {
    dispatch(changeEventStatus({ eventId: id, action }))
      .catch(() => {
        alert("Сталася помилка при зміні статусу!")
      })
  };


  return (
    <Container>
      <Text style={styles.header}>Події</Text>
      <View style={styles.table}>
        <View style={styles.row} className="pr-[100px]">
          <Text style={styles.cell} className="font-bold">Назва</Text>
          <Text style={styles.cell} className="font-bold">Опис</Text>
          <Text style={styles.cell} className="font-bold">Дата початку</Text>
          <Text style={styles.cell} className="font-bold">Місце</Text>
          <Text style={styles.cell} className="font-bold">К-сть місць</Text>
          <Text style={styles.cell} className="font-bold">Ціна</Text>
          <Text style={styles.cell} className="font-bold">Тип</Text>
          <Text style={styles.cell} className="font-bold">Статус</Text>
        </View>
        {events.events && events.events.map((event) => (
          <View style={styles.row} key={event._id}>
            <Text style={styles.cell}>{event.name}</Text>
            <Text style={styles.cell} className="w-15 px-2">{event.description}</Text>
            <Text style={styles.cell}>{getDate(event.startDate)}</Text>
            <Text style={styles.cell}>{event.location ? (typeof event.location === 'string' ? event.location : `${event.location.city}, ${event.location.country}`) : "N/A"}</Text>
            <Text style={styles.cell}>{event.totalSeats}</Text>
            <Text style={styles.cell}>{event.price} грн.</Text>
            <Text style={styles.cell}>{event.eventType}</Text>
            <Text style={styles.cell}>{event.eventStatus}</Text>

            <View style={styles.statusButtons} className="flex flex-col items-end justify-end flex-wrap gap-2">
              <CustomButton additionalStyles="px-1" onPress={() => router.push(`/events/${event._id}`)}>Деталі</CustomButton>
              {<CustomButton additionalStyles="px-1 bg-green-600" onPress={() => handleChangeStatus(event._id, "verify")}>Схвалити</CustomButton>}
              {<CustomButton additionalStyles="bg-red-600 px-1" onPress={() => handleChangeStatus(event._id, "decline")}>Відхилити</CustomButton>}
            </View>
          </View>
        ))}
      </View>
      {events.events && <View className="flex flex-row justify-center items-center gap-4 mt-4 mb-4">
        {events.pagination.page > 1 && <CustomButton onPress={handlePrevPage} additionalStyles="px-4 py-2">
          Попередня сторінка
        </CustomButton>}
        <Text className='text-xl font-bold text-blue-500'>{events.pagination.page}</Text>
        {events.pagination.page < events.pagination.totalPages && <CustomButton onPress={handleNextPage} additionalStyles="px-4 py-2">
          Наступна сторінка
        </CustomButton>
        }
      </View>
      }
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
    width: 90
  },
  actionButton: {
    backgroundColor: "#007BFF",
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  actionText: {
    color: "#fff",
  },
  statusButtons: {
    flexDirection: "row",
    gap: 10,
  },
  statusButton: {
    backgroundColor: "#28a745", // green for verify
    padding: 5,
    borderRadius: 5,
  },
  statusText: {
    color: "#fff",
  },
});

export default EventTable;
