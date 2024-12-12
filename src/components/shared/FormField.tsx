import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions, Platform } from "react-native";
import { icons } from "@/src/constants";

interface Props {
	title?: string;
	value: string;
	placeholder?: string;
	handleChangeText: (text: string) => void;
	otherStyles?: string;
	keyboardType?: KeyboardTypeOptions;
	type?: string;
	multiline?: boolean;
	numberOfLines?: number;
	errorMessage?: string | boolean;
}

const FormField = ({
	title,
	value,
	placeholder,
	handleChangeText,
	otherStyles,
	type,
	errorMessage,
	multiline = false,
	numberOfLines = 1,
	...props
}: Props) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View className={`${otherStyles}`}>
			{title && <Text className="text-base text-gray-500 pb-2">{title}</Text>}
			<View className="flex flex-row items-center">
				<TextInput
					className="w-full h-15 px-4 py-2 bg-black-100 rounded-3xl border border-gray-400 focus:border-secondary flex-1 text-gray-500 text-base"
					value={value}
					placeholder={placeholder}
					placeholderTextColor="#9CA3AF"
					onChangeText={handleChangeText}
					multiline={multiline}
					numberOfLines={numberOfLines}
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



