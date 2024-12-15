// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import EventItem from './EventItem'
// import { Event } from '@/src/redux/events/types';

// interface Props {
//   eventsList: Event[]
// }

// const EventsSlider = ({ eventsList }: Props) => {
//   return (
//     <View className="py-4 flex flex-row gap-3 justify-start overflow-x-auto w-full">
//       {eventsList.length ? (
//         eventsList.map((event) => (
//           <EventItem key={event._id} event={event} /> // Ensure EventItem has a fixed width
//         ))
//       ) : (
//         <Text className="text-lg text-slate-600">Події відсутні</Text>
//       )}
//     </View>
//   )
// }

// export default EventsSlider

// const styles = StyleSheet.create({})

import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import React from 'react';
import EventItem from './EventItem';
import { Event } from '@/src/redux/events/types';

interface Props {
  eventsList: Event[];
}

const EventsSlider = ({ eventsList }: Props) => {
  return (
    <View style={styles.container}>
      {eventsList.length ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.scrollContainer}
        >
          <View className="py-4 flex flex-row gap-3 justify-start overflow-x-auto w-full">
            {eventsList.map((event) => (
              <EventItem key={event._id} event={event} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.noEventsText}>Події відсутні</Text>
      )}
    </View>
  );
};

export default EventsSlider;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
  },
  scrollContainer: {
    flexDirection: 'row',
    gap: 12, // Spacing between items
    paddingHorizontal: 8,
  },
  webScroll: {
    overflow: 'scroll', // Enable horizontal scrolling for web
    display: 'flex', // Ensure items render in a flex layout
    flexDirection: 'row',
  },
  noEventsText: {
    fontSize: 18,
    color: '#64748b', // slate-600
    textAlign: 'center',
  },
});
