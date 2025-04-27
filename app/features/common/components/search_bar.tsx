import { View, TextInput, Image, Text, StyleSheet } from "react-native";
import { icons } from "@/constants/icons";

interface SearchBarProps {
    onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const handleTextChange = (text: string) => {
        if (onSearch) {
            onSearch(text);
        }
    };

    return (
        <View style={styles.container}>
            {/* Section 1: "All Coins" text with underline */}
            <View style={styles.allCoinsSection}>
                <Text style={styles.allCoinsText}>All Coins</Text>
                <View style={styles.underline} />
            </View>

            {/* Section 2: Search text field */}
            <View style={styles.searchSection}>
                <TextInput
                    placeholder='Search...'
                    style={styles.searchInput}
                    placeholderTextColor="#FFFFFF80"
                    onChangeText={handleTextChange}
                />
                <Image
                    source={icons.search}
                    style={styles.searchIcon}
                    resizeMode="contain"
                    tintColor="#FFFFFF"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 8,
    },
    allCoinsSection: {
        alignItems: 'center',
        width: '48%',
    },
    allCoinsText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'LufgaBold',
    },
    underline: {
        height: 1,
        backgroundColor: '#CDFF00', // primary color
        width: '100%',
        marginTop: 6,
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2B2B2B4D', // cardBackground color
        borderRadius: 32,
        paddingHorizontal: 16,
        width: '48%',
        marginTop:12,
    },
    searchIcon: {
        width: 20,
        height: 20,
    },
    searchInput: {
        flex: 1,
        color: '#FFFFFF',
        marginRight: 8,
        fontSize: 24,
        fontFamily: 'LufgaRegular',
    }
});

export default SearchBar;
