import React, {useEffect, useState} from "react";
import {View, Text, TouchableWithoutFeedback, Alert, SafeAreaView, Image} from "react-native";
import { images } from "@/constants/images";
import { useAuth } from "@/app/features/auth/hooks/useAuth";


const BiometricAuthScreen = () => {

    const { authenticate } = useAuth();

    const handleBiometricAuth = async () => {
        const success = await authenticate();

        if (!success) {
            Alert.alert("Error", "Authentication failed. Please try again.");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <Image
                source={images.bg}
                className={`w-full h-full pl-44`}
                resizeMode="cover"
            />

            <Text className="font-lufga-large absolute top-12 text-textPrimary text-3xl m-xl">Use Biometric{'\n'}to log in?</Text>

            <TouchableWithoutFeedback
                onPress={handleBiometricAuth}
            >
                <View
                    className="absolute bottom-0 bg-primary w-[calc(100%-32px)] h-[48px] rounded-full justify-center items-center left-4 right-4 mb-16"
                >
                    <Text className="text-background text-base">Set up</Text>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default BiometricAuthScreen;