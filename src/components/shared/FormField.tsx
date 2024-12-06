// import { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions } from "react-native";

// import { icons } from "@/src/constants";
// import { isWeb } from "@/src/utils/storage";

// interface Props {
//     title?: string;
//     value: string;
//     placeholder?: string;
//     handleChangeText: (text: string) => void;
//     otherStyles?: string;
//     keyboardType?: KeyboardTypeOptions;
//     type?: string;
//     errorMessage?: string;
// }

// const FormField = ({
//     title,
//     value,
//     placeholder,
//     handleChangeText,
//     otherStyles,
//     type,
//     errorMessage,
//     ...props
// }: Props) => {
//     const [showPassword, setShowPassword] = useState(false);

//     return (
//         <View className={` ${otherStyles}`}>
//             <Text className="text-base text-gray-500 pb-2">{title}</Text>

//             <View className="w-full h-15 px-4 py-2 bg-black-100 rounded-3xl border border-gray-400 focus:border-secondary flex flex-row items-center">
//                 <TextInput
//                     className="flex-1 text-gray-500 text-base"
//                     value={value}
//                     placeholder={placeholder}
//                     placeholderTextColor="#9CA3AF"
//                     onChangeText={handleChangeText}
//                     secureTextEntry={type === "password" && !showPassword}
//                     {...props}
//                 />

//                 {type === "password" && (
//                     <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                         <Image
//                             source={showPassword ? icons.eye : icons.eyeHide}
//                             className={isWeb ? "w-3 h-3" : "w-6 h-6"}
//                             resizeMode="contain"
//                         />
//                     </TouchableOpacity>
//                 )}
//             </View>
//             {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
//         </View>
//     );
// };

// export default FormField;

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions, Platform } from "react-native";
import { icons } from "@/src/constants";
import { isWeb } from "@/src/utils/storage";

interface Props {
    title?: string;
    value: string;
    placeholder?: string;
    handleChangeText: (text: string) => void;
    otherStyles?: string;
    keyboardType?: KeyboardTypeOptions;
    type?: string;
    errorMessage?: string;
}

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    type,
    errorMessage,
    ...props
}: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={` ${otherStyles}`}>
            {title && <Text className="text-base text-gray-500 pb-2">{title}</Text>}

            <View className="w-full h-15 px-4 py-2 bg-black-100 rounded-3xl border border-gray-400 focus:border-secondary flex flex-row items-center">
                <TextInput
                    className="flex-1 text-gray-500 text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    onChangeText={handleChangeText}
                    secureTextEntry={type === "password" && !showPassword}
                    {...props}
                />

                {type === "password" && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        accessibilityLabel="Toggle password visibility"
                    >
                        <Image
                            source={showPassword ? icons.eye : icons.eyeHide}
                            style={{
                                width: 24,
                                height: 24,
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>

            {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
        </View>
    );
};

export default FormField;