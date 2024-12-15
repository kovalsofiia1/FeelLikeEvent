import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import TagsList from "../shared/tags/TagsList";
import { User } from "@/src/redux/user/types";
import HorizontalLine from "../shared/elements/HorizontalLine";
import { getDate } from "@/src/utils/dateTime";
import { DEFAULT_AVATAR_IMAGE } from "@/src/constants/defaultImagePath";
import EventsSlider from "../events/EventsSlider";
import { Event } from "@/src/redux/events/types";
import { axiosInst } from "@/src/api/axiosSetUp";

type ProfileInfoDisplayProps = {
  userProfile: User
};

const ProfileInfoDisplay: React.FC<ProfileInfoDisplayProps> = ({ userProfile }) => {
  const [bookedEvents, setBookedEvents] = useState<Event[]>([]);
  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [visitedEvents, setVisitedEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getUserEvents = async () => {
      try {
        const events = await axiosInst.get('/events/me');

        console.log(events);

        setBookedEvents(events.data.bookedEvents);
        setVisitedEvents(events.data.visitedEvents);
        setCreatedEvents(events.data.createdEvents);

      } catch (err) {
        alert('Не вдалося отримати інформацію про ваші події!')
      }
    }

    getUserEvents();
  }, [])

  return (
    <View>
      <Text className='font-bold text-blue-500 text-xl mb-4'>Профіль користувача</Text>

      {/* Main info */}
      <View>
        <View>
          <Text className="text-lg">Основна інформація</Text>
          <HorizontalLine></HorizontalLine>
        </View>
        <View className="flex flex-row gap-8 items-start flex-wrap">
          <Image source={{ uri: userProfile?.avatarURL || DEFAULT_AVATAR_IMAGE }} className="w-[200px] h-[200px] rounded-xl" />
          <View >
            <Text className="flex flex-col mb-2">
              <Text className="text-base text-gray-500 pb-2">Ім'я</Text>
              <Text className="text-lg font-bold">{userProfile.name}</Text>
            </Text>
            <Text className="flex flex-col mb-2">
              <Text className="text-base text-gray-500 pb-2">Статус</Text>
              <Text className="text-lg font-bold">{userProfile.status}</Text>
            </Text>
            <Text className="flex flex-col mb-2">
              <Text className="text-base text-gray-500 pb-2">Про мене</Text>
              <Text className="text-lg font-bold">{userProfile.description ? userProfile.description : '-'}</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Additional info */}
      <View>
        <View className="mt-4">
          <Text className="text-lg">Особиста інформація</Text>
          <HorizontalLine></HorizontalLine>
        </View>
        <View className="flex flex-row flex-wrap gap-8">
          <Text className="flex flex-col mb-2">
            <Text className="text-base text-gray-500 pb-2">Email</Text>
            <Text className="text-md font-bold">{userProfile.email}</Text>
          </Text>
          <Text className="flex flex-col mb-2">
            <Text className="text-base text-gray-500 pb-2">Номер телефону</Text>
            <Text className="text-md font-bold">{userProfile.phoneNumber ? userProfile.phoneNumber : '-'}</Text>
          </Text>
          <Text className="flex flex-col mb-2">
            <Text className="text-base text-gray-500 pb-2">Дата народження</Text>
            <Text className="text-md font-bold">{userProfile.dateOfBirth ? getDate(userProfile.dateOfBirth) : '-'}</Text>
          </Text>
        </View>
        <Text className="flex flex-col mb-2">
          <Text className="text-base text-gray-500 pb-2">Інтереси: </Text>
          {
            userProfile.interests && userProfile.interests.length ?
              <TagsList tags={userProfile.interests} />
              :
              <Text>У користувача поки немає доданих інтересів</Text>
          }
        </Text>
      </View>

      {/* Events info */}
      <View>
        <View>
          <Text className="text-lg pt-4">Заброньовані події</Text>
          <HorizontalLine></HorizontalLine>
        </View>
        <EventsSlider eventsList={bookedEvents}></EventsSlider>

        <View>
          <Text className="text-lg pt-4">Створені події</Text>
          <HorizontalLine></HorizontalLine>
        </View>
        <EventsSlider eventsList={createdEvents}></EventsSlider>

        <View>
          <Text className="text-lg  pt-4">Відвідані події</Text>
          <HorizontalLine></HorizontalLine>
        </View>
        <EventsSlider eventsList={visitedEvents}></EventsSlider>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '000',
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  info: {
    fontSize: 14,
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
  },
});

export default ProfileInfoDisplay;
