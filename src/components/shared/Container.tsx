// import { ScrollView, StyleSheet, Text, View } from 'react-native'
// import React, { ReactNode } from 'react'

// interface Props {
//     children: ReactNode
// }

// const Container: React.FC<Props> = ({ children }) => {
//     return (
//         <ScrollView style={styles.container}>
//             <View className="px-4 pt-4">
//                 {children}
//             </View>
//         </ScrollView>
//     )
// }

// export default Container

// const styles = StyleSheet.create({
//     container: {
//         background: rgb(245, 245, 245);
//         background: linear - gradient(171deg, rgba(245, 245, 245, 1) 29 %, rgba(52, 112, 255, 0.6) 100 %);
//     }
// })


import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
    children: ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
    return (
        <LinearGradient
            colors={['rgba(245,245,245,1)', 'rgba(52,112,255,0.6)', 'rgba(157, 96, 232, 0.6)']}
            start={{ x: 0.4, y: 0.4 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
        flexGrow: 1, // Allows ScrollView to resize dynamically
    },
    innerContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
});
