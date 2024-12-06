import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import FormField from "./FormField";
import CustomButton from "./CustomButton";

const CommentsSection = () => {
    const [comments, setComments] = useState([
        {
            id: "1",
            name: "Emily White",
            rating: 4.9,
            text: "Dr. Anderson is an exceptional psychologist. Her insights have been life-changing for me.",
        },
        {
            id: "2",
            name: "James Taylor",
            rating: 4.7,
            text: "I highly recommend Dr. Anderson. She's helped me overcome my personal challenges.",
        },
    ]);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);

    const handleAddComment = () => {
        if (newComment.trim() && newRating > 0) {
            const newCommentObject = {
                id: Date.now().toString(),
                name: "Anonymous", // Replace with user input if available
                rating: newRating,
                text: newComment.trim(),
            };
            setComments((prevComments) => [newCommentObject, ...prevComments]);
            setNewComment("");
            setNewRating(0);
        }
    };

    const renderComment = ({ item }) => (
        <View className="flex-row items-start mb-4">
            {/* User Avatar */}
            <View className="bg-blue-100 rounded-full h-10 w-10 items-center justify-center mr-3">
                <Text className="text-blue-600 font-bold">{item.name.charAt(0)}</Text>
            </View>
            {/* Comment Content */}
            <View className="flex-1">
                <View className="flex-row justify-between items-center">
                    <Text className="font-bold text-gray-800">{item.name}</Text>
                    <Text className="text-yellow-500 font-bold">{item.rating} ★</Text>
                </View>
                <Text className="text-gray-600">{item.text}</Text>
            </View>
        </View>
    );

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
                {/* Only use FlatList */}
                <FlatList
                    data={comments}
                    keyExtractor={(item) => item.id}
                    renderItem={renderComment}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default CommentsSection;
