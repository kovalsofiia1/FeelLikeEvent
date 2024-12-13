import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Event } from "@/src/redux/events/types";
import { getDate } from "@/src/utils/dateTime";
import useDebounce from "@/src/hooks/useDebounce";
import { fetchEvents } from "@/src/redux/events/actions";
import { selectEvents } from "@/src/redux/events/selectors";
import { AppDispatch } from "@/src/redux/store";
import { selectIsLoggedIn } from "@/src/redux/user/selectors";
import { isWeb } from "@/src/utils/storage";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../shared/CustomButton";
import Container from "../shared/Container";
// Example data with the default status as 'created'
const mockEvents: Event[] = [
  {
    _id: "1",
    name: "Concert",
    description: "A live concert event.",
    startDate: "2024-12-20T19:00:00Z",
    endDate: "2024-12-20T22:00:00Z",
    location: {
      country: "USA",
      city: "New York",
      address: "123 Main St",
      place: "Madison Square Garden"
    },
    images: ["image_url_1", "image_url_2"],
    totalSeats: 1000,
    availableSeats: 200,
    price: 50,
    eventStatus: "CREATED", // default status
    targetAudience: "ADULTS",
    createdBy: {
      _id: "creator1",
      name: "John Doe",
      avatarURL: "avatar_url_1"
    }
  },
  {
    _id: "2",
    name: "Art Workshop",
    description: "A creative art workshop.",
    startDate: "2024-12-21T10:00:00Z",
    endDate: "2024-12-21T14:00:00Z",
    location: "Online",
    images: ["image_url_3"],
    totalSeats: 50,
    availableSeats: 50,
    price: 30,
    eventStatus: "CREATED", // default status
    targetAudience: "KIDS",
    createdBy: {
      _id: "creator2",
      name: "Jane Smith",
      avatarURL: "avatar_url_2"
    }
  }
];

const EventTable = () => {
  const router = useRouter();
  // const [events, setEvents] = useState(mockEvents);

  const handleChangeStatus = (id: string, status: string) => {
    console.log(`Change status for event ID: ${id} to ${status}`);
    // setEvents(events.map(event =>
    //   event._id === id ? { ...event, eventStatus: status } : event
    // ));
  };

  // const [isFavorite, setIsFavorite] = useState(false);
  // const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [filters, setFilters] = useState<any>({}); // Track selected filters
  // const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector(selectEvents);

  useEffect(() => {
    fetchEventsData(currentPage, filters); // Fetch events when page or filters change
  }, [currentPage]);

  const fetchEventsData = (page: number, filters: any) => {
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

  return (
    <Container>
      <Text style={styles.header}>Події</Text>
      <View style={styles.table}>
        <View style={styles.row} className="pr-[200px]">
          <Text style={styles.cell} className="font-bold">Назва</Text>
          <Text style={styles.cell} className="font-bold">Опис</Text>
          <Text style={styles.cell} className="font-bold">Дата початку</Text>
          <Text style={styles.cell} className="font-bold">Місце</Text>
          <Text style={styles.cell} className="font-bold">К-сть місць</Text>
          <Text style={styles.cell} className="font-bold">Ціна</Text>
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
            <Text style={styles.cell}>{event.eventStatus}</Text>

            <View style={styles.statusButtons}>
              <CustomButton additionalStyles="px-1" onPress={() => router.push(`/events/${event._id}`)}>Деталі</CustomButton>
              <CustomButton additionalStyles="px-1 bg-green-600" onPress={() => handleChangeStatus(event._id, "verified")}>Схвалити</CustomButton>
              <CustomButton additionalStyles="bg-red-600 px-1" onPress={() => handleChangeStatus(event._id, "declined")}>Відхилити</CustomButton>
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
