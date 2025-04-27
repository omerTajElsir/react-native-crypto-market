import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import {TabType} from "@/app/features/market/services/api";

interface AppBarProps {
    onTabChange: (tab: TabType) => void;
    selectedTab: TabType;
}

const AppBar = ({ onTabChange, selectedTab }: AppBarProps) => {
    const tabs: TabType[] = ["Featured", "Top Gainers", "Top Losers"];

    return (
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer} style={{ marginTop: 4, marginBottom: 0, marginHorizontal:0 ,height: 60}}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    onPress={() => onTabChange(tab)}
                    style={styles.tabContainer}
                >
                    <Text
                        style={{
                            color: selectedTab === tab ? "#FFFFFF" : "#FFFFFF80", // textPrimary or textSecondary
                            fontSize: 18, // Reduced from 20px to 18px
                            fontFamily: "LufgaMedium",
                        }}
                    >
                        {tab}
                    </Text>
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
});

export default AppBar;
