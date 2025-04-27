import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import { CoinData } from "@/app/features/market/services/api";
import { useRouter } from "expo-router";
import LineChart from "./line_chart";

interface FeaturedCardProps {
    coin: CoinData;
}

const FeaturedCard = ({ coin }: FeaturedCardProps) => {
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
                    width: 180,
                    height: 193,
                    backgroundColor: "#2B2B2B4D", // cardBackground color
                    borderRadius: 24,
                    padding: 16,
                    marginHorizontal: 8,
                    marginVertical: 8,
                }}
            >
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

                <View style={styles.chartContainer}>
                    <LineChart 
                        data={coin.sparkline} 
                        width={150} 
                        height={50} 
                        color={coin.priceChangePercentage24h >= 0 ? "#CDFF00" : "#FF3440"} 
                        priceChangePercentage24h={coin.priceChangePercentage24h}
                    />
                </View>

                <View style={styles.cardFooter}>
                    <Text style={styles.price}>${coin.currentPrice.toLocaleString()}</Text>
                    <View style={styles.priceChangeContainer}>
                        <Text style={[
                            styles.priceChange, 
                            { color: coin.priceChangePercentage24h >= 0 ? '#CDFF00' : '#FF3440' }
                        ]}>
                            {coin.priceChangePercentage24h >= 0 ? '+' : ''}
                            {coin.priceChangePercentage24h.toFixed(2)}%
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
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
        marginVertical: 8,
        alignItems: 'center',
    },
    cardFooter: {
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        color: '#FFFFFF',
        fontFamily: 'LufgaBold',
        fontSize: 18,
    },
    priceChangeContainer: {
        backgroundColor: '#4A4A4A',
        borderRadius: 12,
        padding: 8,
    },
    priceChange: {
        fontSize: 14,
        fontFamily: 'LufgaBold',
    }
});

export default FeaturedCard;
