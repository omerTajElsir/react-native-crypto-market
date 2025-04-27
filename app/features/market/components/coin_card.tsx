import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import { CoinData } from "@/app/features/market/services/api";
import { useRouter } from "expo-router";
import LineChart from "./line_chart";

interface CoinCardProps {
    coin: CoinData;
}

const CoinCard = ({ coin }: CoinCardProps) => {
    const router = useRouter();

    const handlePress = () => {
        // Navigate to coin details screen with coin data as a parameter
        router.push({
            pathname: "/features/coin_details/screens/coin_details_screen",
            params: { coin: JSON.stringify(coin) }
        });
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View
                style={{
                    width: '100%',
                    height: 120,
                    backgroundColor: "#2B2B2B4D", // cardBackground color
                    borderRadius: 24,
                    padding: 16,
                    marginVertical: 8,
                    flexDirection: 'row', // Change to row layout
                }}
            >
                {/* Left Section: Coin icon, symbol, name, and price */}
                <View style={styles.leftSection}>
                    <View style={styles.cardHeader}>
                        <Image 
                            source={{ uri: coin.image }} 
                            style={styles.coinIcon} 
                            resizeMode="contain"
                        />
                        <View style={styles.coinInfo}>
                            <Text style={styles.coinSymbol}>{coin.symbol.toUpperCase()}</Text>
                            <Text style={styles.coinName}>{coin.name}</Text>
                        </View>
                    </View>

                    <Text style={styles.price}>${coin.currentPrice.toLocaleString()}</Text>
                </View>

                {/* Right Section: Daily change and chart */}
                <View style={styles.rightSection}>
                    <View style={styles.priceChangeContainer}>
                        <Text style={[
                            styles.priceChange, 
                            { color: coin.priceChangePercentage24h >= 0 ? '#CDFF00' : '#FF3440' }
                        ]}>
                            {coin.priceChangePercentage24h >= 0 ? '+' : ''}
                            {coin.priceChangePercentage24h.toFixed(2)}%
                        </Text>
                    </View>

                    <View style={styles.chartContainer}>
                        <LineChart 
                            data={coin.sparkline} 
                            width={150} 
                            height={60} 
                            color={coin.priceChangePercentage24h >= 0 ? "#CDFF00" : "#FF3440"}
                            priceChangePercentage24h={coin.priceChangePercentage24h}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    leftSection: {
        flex: 1,
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    rightSection: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    coinIcon: {
        width: 32,
        height: 32,
        marginRight: 8,
        borderRadius: 16,
    },
    coinInfo: {
        flexDirection: 'column',
    },
    coinSymbol: {
        color: '#FFFFFF',
        fontFamily: 'LufgaBold',
        fontSize: 16,
    },
    coinName: {
        color: '#CCCCCC',
        fontFamily: 'LufgaRegular',
        fontSize: 14,
    },
    chartContainer: {
        alignItems: 'flex-end',
    },
    price: {
        color: '#FFFFFF',
        fontFamily: 'LufgaBold',
        fontSize: 18,
        marginTop: 8,
    },
    priceChangeContainer: {
        backgroundColor: '#4A4A4A',
        borderRadius: 12,
        padding: 8,
        marginBottom: 8,
    },
    priceChange: {
        fontSize: 14,
        fontFamily: 'LufgaBold',
    }
});

export default CoinCard;
