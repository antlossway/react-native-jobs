import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable, // replace TouchableOpacity
  Image,
  FlatList,
} from "react-native";

import styles from "./welcome.style";
import { useRouter } from "expo-router";
import { icons, SIZES } from "../../../constants";
const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Adrian</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            //in react-native, no need to use e.target.value
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for"
          />
        </View>

        {/* button */}
        <Pressable style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </Pressable>
      </View>
      {/* use map to fix this error: VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.
      or: if have to use FlatList should have "horizontal"
      */}
      <View style={[styles.tabsContainer, { flexDirection: "row", gap: 10 }]}>
        {jobTypes.map((item) => (
          <Pressable
            key={item}
            style={styles.tab(activeJobType, item)}
            onPress={() => {
              setActiveJobType(item);
              router.push(`/search/${item}`);
            }}
          >
            <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
          </Pressable>
        ))}

        {/* <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <Pressable
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        /> */}
      </View>
    </>
  );
};

export default Welcome;
