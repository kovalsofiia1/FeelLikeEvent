import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FormField from "./FormField";
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";
import { selectCurrentEventComments } from "@/src/redux/events/selectors";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/redux/store";
import { commentEvent } from "@/src/redux/events/actions";
import { useLocalSearchParams } from "expo-router";

const CommentsSection = () => {
    const comments = useSelector(selectCurrentEventComments);
    const [newComment, setNewComment] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { eventId } = useLocalSearchParams();

    const handleAddComment = () => {
        if (newComment.trim()) {
            const newCommentObject = {
                text: newComment.trim(),
            };
            dispatch(commentEvent({ eventId: eventId as string, text: newComment.trim() }))
                .unwrap()
                .then(() => {
                    setNewComment('');
                })
                .catch((e) => {
                    alert("Щось пішло не так!");
                })
        }
    };

    return (
        <View className="py-4">
            {/* Section Title */}
            <Text className="text-lg font-bold text-gray-900">Коментарі</Text>

            {/* Input Field */}
            <View className="flex gap-1 items-right pb-4">
                <FormField
                    placeholder="Коментар"
                    value={newComment}
                    handleChangeText={(e) => setNewComment(e)}
                    keyboardType="default"
                />
                <CustomButton additionalStyles="self-end" onPress={handleAddComment}>Залишити коментар</CustomButton>
            </View>

            <View className="flex-1">
                {comments.map((item) => (
                    <View key={item._id} className="flex-row items-start mb-4">
                        {/* User Avatar */}
                        <View className="bg-blue-100 rounded-full h-10 w-10 items-center justify-center mr-3">
                            <Text className="text-blue-600 font-bold">{item.userId.name?.charAt(0) || 'A'}</Text>
                        </View>
                        {/* Comment Content */}
                        <View className="flex-1">
                            <View className="flex-row justify-between items-center">
                                <Text className="font-bold text-gray-800">{item.userId.name}</Text>
                            </View>
                            <Text className="text-gray-600">{item.text}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default CommentsSection;
