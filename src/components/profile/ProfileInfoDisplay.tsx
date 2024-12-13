import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import TagsList from "../shared/tags/TagsList";
import { User } from "@/src/redux/user/types";
import HorizontalLine from "../shared/elements/HorizontalLine";
import { getDate } from "@/src/utils/dateTime";

type ProfileInfoDisplayProps = {
  userProfile: User
};

const ProfileInfoDisplay: React.FC<ProfileInfoDisplayProps> = ({ userProfile }) => {
  return (
    <View>
      <Text className='font-bold text-blue-500 text-xl mb-4'>Профіль користувача</Text>


      <View>
        <Text className="text-lg">Основна інформація</Text>
        <HorizontalLine></HorizontalLine>
      </View>
      <View className="flex flex-row gap-8 items-start flex-wrap">
        <Image source={{ uri: userProfile?.avatarURL || '' }} className="border w-[200px] h-[200px] rounded-xl" />
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
          userProfile.interests.length ?
            <TagsList tags={userProfile.interests} />
            :
            <Text>У користувача поки немає доданих інтересів</Text>
        }

      </Text>
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
