import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex flex-1 items-center justify-center bg-blue"   >
      <Text className="text-3xl" >Hello Sofiia 1 .</Text>
      <Link href="/profile" style={{ color: 'blue', textDecorationLine: 'underline' }}>Go to profile</Link>
    </View>
  );
}
