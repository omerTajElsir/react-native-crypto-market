import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import {TabType} from "@/app/features/market/services/api";
import faturedImage from "@/assets/images/fatured.png";
import gainersImage from "@/assets/images/gainers.png";
import losersImage from "@/assets/images/losers.png";

interface AppBarProps {
    onTabChange: (tab: TabType) => void;
    selectedTab: TabType;
}

const AppBar = ({ onTabChange, selectedTab }: AppBarProps) => {
    const tabs: TabType[] = ["Featured", "Top Gainers", "Top Losers"];

    const getTabImage = (tab: TabType) => {
        switch (tab) {
            case "Featured":
                return faturedImage;
            case "Top Gainers":
                return gainersImage;
            case "Top Losers":
                return losersImage;
            default:
                return faturedImage;
        }
    };

    return (
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer} style={{ marginTop: 4, marginBottom: 0, marginHorizontal:0 ,height: 60}}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    onPress={() => onTabChange(tab)}
                    style={styles.tabContainer}
                >
                    <View style={styles.tabContent}>
                        <Image source={getTabImage(tab)} style={styles.tabIcon} />
                        <Text
                            style={{
                                color: selectedTab === tab ? "#FFFFFF" : "#FFFFFF80", // textPrimary or textSecondary
                                fontSize: 20, // Reduced from 20px to 18px
                                fontFamily: "LufgaMedium",
                                marginLeft: 8, // Add some spacing between icon and text
                            }}
                        >
                            {tab}
                        </Text>
                    </View>
                    <View
                        style={{
                            height:  1,
                            backgroundColor: selectedTab === tab ? "#CDFF00" : "#FFFFFF80", // primary or textSecondary
                            marginTop: 2, // Reduced from 4 to 2
                            width: "100%",
                        }}
                    />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 12, //
        height: 60// Reduced from 16 to 12
    },
    tabContainer: {
        alignItems: "center",
        height: 60, // Reduced from 80 to 60
        width: 260, // Fixed width for each option
    },
    tabContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 8,
    },
    tabIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
});

export default AppBar;
