// import React, { ReactNode } from 'react';
// import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// interface Props {
//     children: ReactNode;
// }

// const Container: React.FC<Props> = ({ children }) => {
//     const screenHeight = Dimensions.get('window').height; // Get screen height

//     return (
//         <LinearGradient
//             colors={['rgba(245,245,245,0.5)', 'rgba(52,112,255,0.4)', 'rgba(157, 96, 232, 0.4)']}
//             start={{ x: 0.4, y: 0.4 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.container}
//         >

//             <ScrollView className='min-h-full flex-1'>
//                 <View className="px-4 py-4">
//                     {children}
//                 </View>
//             </ScrollView>
//         </LinearGradient>
//     );
// };

// export default Container;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1, // Ensures the gradient fills the entire screen
//     },
//     scrollViewContent: {
//         flexGrow: 1, // Ensures the ScrollView content can grow and be scrollable
//     },
// });


import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
    children: ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
    const screenHeight = Dimensions.get('window').height; // Get screen height

    return (
        <LinearGradient
            colors={['rgba(245,245,245,0.5)', 'rgba(52,112,255,0.4)', 'rgba(157, 96, 232, 0.4)']}
            start={{ x: 0.4, y: 0.4 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.scrollViewContent,
                    { minHeight: screenHeight }, // Ensure it takes up at least the full screen height
                ]}
            >
                <View style={styles.innerContainer}>
                    {children}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default Container;

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensures the gradient fills the entire screen
    },
    scrollViewContent: {
        flexGrow: 1, // Ensures ScrollView content can grow and be scrollable
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
});
