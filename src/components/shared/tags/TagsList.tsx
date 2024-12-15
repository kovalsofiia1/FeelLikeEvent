import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
interface Props {
    tags: string[]
}

const TagsList: React.FC<Props> = ({ tags }) => {
    return (
        <View className="flex-row flex-wrap mb-4">
            {tags.map((tag) => (
                <Text
                    key={tag}
                    className="text-sm bg-white rounded-full px-2 py-1 text-gray-600 mr-2 mb-2 min-w-10 text-center"
                    style={{ backgroundColor: "white" }}
                >
                    {tag}
                </Text>
            ))}
        </View>
    )
}

export default TagsList

const styles = StyleSheet.create({})