import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tag } from '@/src/redux/events/types'

interface Props {
    tags: Tag[]
}

const TagsList: React.FC<Props> = ({ tags }) => {
    return (
        <View className="flex-row flex-wrap mb-4">
            {tags.map((tag) => (
                <Text
                    key={tag._id}
                    className="text-sm bg-blue-200 rounded-full px-2 py-1 text-gray-600 mr-2 mb-2 min-w-10 text-center"
                >
                    {tag.name}
                </Text>
            ))}
        </View>
    )
}

export default TagsList

const styles = StyleSheet.create({})