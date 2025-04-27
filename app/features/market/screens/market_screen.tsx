import React, { useState } from "react";
import {View, Text, ScrollView, ActivityIndicator, SafeAreaView, NativeSyntheticEvent, NativeScrollEvent, RefreshControl} from "react-native";
import FeaturedCard from "../components/featured_card";
import AppBar from "@/app/features/common/components/app_bar";
import SearchBar from "@/app/features/common/components/search_bar";
import CoinCard from "@/app/features/market/components/coin_card";
import { CoinData, TabType } from "@/app/features/market/services/api";
import { useMarketData } from "@/app/features/market/hooks/useMarketData";
import { useFeaturedCoins } from "@/app/features/market/hooks/useFeaturedCoins";
import { useSearch } from "@/app/features/common/hooks/useSearch";

const MarketScreen = () => {
    // Use our custom hooks for data fetching and state management
    const { 
        coins, 
        loading, 
        loadingMore, 
        error, 
        loadMoreCoins,
        refreshCoins
    } = useMarketData('usd', 10);

    // State for pull-to-refresh
    const [refreshing, setRefreshing] = useState(false);

    const { 
        featuredCoins, 
        loading: featuredLoading, 
        error: featuredError, 
        selectedTab, 
        changeTab 
    } = useFeaturedCoins('Featured', 'usd');

    // Use our search hook to filter coins
    const { 
        filteredData: filteredCoins, 
        handleSearch 
    } = useSearch(coins, ['symbol', 'name']);

    // Handle scroll to bottom
    const handleScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const paddingToBottom = 20;

        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            loadMoreCoins();
        }
    };

    // Handle tab change
    const handleTabChange = (tab: TabType) => {
        changeTab(tab);
    };

    // Handle pull-to-refresh
    const onRefresh = async () => {
        setRefreshing(true);
        await refreshCoins();
        setRefreshing(false);
    };

    return (
        <SafeAreaView className=" bg-background" style={{ flexDirection: "column", alignItems: "stretch" ,height: "100%"}}>
            <View style={{height: 60,marginTop: 62}}>
                <AppBar onTabChange={handleTabChange} selectedTab={selectedTab} />
            </View>

            <View  style={{flex:1}}>
                <View style={{ height: 200,  }}>
                    {featuredLoading ? (
                        <View style={{flex:1,  justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#FFFFFF" />
                            <Text style={{ color: '#FFFFFF', marginTop: 10 }}>Loading {selectedTab.toLowerCase()}...</Text>
                        </View>
                    ) : featuredError ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                            <Text style={{ color: '#FF6B6B', textAlign: 'center' }}>{featuredError}</Text>
                        </View>
                    ) : (
                        <ScrollView className=" h-[calc(100%-32px)] " horizontal contentContainerStyle={{ marginVertical: 0 }}>
                            {featuredCoins.map((coin) => (
                                <FeaturedCard key={coin.id} coin={coin} />
                            ))}
                        </ScrollView>
                    )}
                </View>

                <View style={{  }}>
                    <SearchBar onSearch={handleSearch} />
                </View>

                <View style={{  }}>
                    {loading ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                            <ActivityIndicator size="large" color="#FFFFFF" />
                            <Text style={{ color: '#FFFFFF', marginTop: 10 }}>Loading coins...</Text>
                        </View>
                    ) : error ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                            <Text style={{ color: '#FF6B6B', textAlign: 'center' }}>{error}</Text>
                        </View>
                    ) : (
                        <ScrollView
                            contentContainerStyle={{ paddingHorizontal: 16 }}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={["#FFFFFF"]}
                                    tintColor="#FFFFFF"
                                    title="Pull to refresh"
                                    titleColor="#FFFFFF"
                                />
                            }
                        >
                            {filteredCoins.map((coin) => (
                                <CoinCard key={coin.id} coin={coin} />
                            ))}
                            {loadingMore && (
                                <View style={{ padding: 20, alignItems: 'center' }}>
                                    <ActivityIndicator size="small" color="#FFFFFF" />
                                    <Text style={{ color: '#FFFFFF', marginTop: 10 }}>Loading more coins...</Text>
                                </View>
                            )}
                        </ScrollView>
                    )}
                </View>
            </View>

        </SafeAreaView>
    );
};

export default MarketScreen;
