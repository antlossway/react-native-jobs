import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { checkImageURL } from "../../../../utils";

import styles from "./popularjobcard.style";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <Pressable
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <Pressable style={styles.logoContainer(selectedJob, item)}>
        {/* if data from API includes logo, then render this logo, otherwise render a default logo */}
        <Image
          // source={{
          //   uri: checkImageURL(item.employer_logo)
          //     ? item.employer_logo
          //     : "https://xxxxx",
          // }}
          source={
            checkImageURL(item.employer_logo)
              ? { uri: item.employer_logo }
              : require("../../../../assets/favicon.png")
          }
          resizeMode="contain"
          style={styles.logoImage}
        />
      </Pressable>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}{" "}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={2}>
          {item.job_title}
        </Text>

        <Text style={styles.location}>{item.job_country}</Text>
      </View>
    </Pressable>
  );
};

export default PopularJobCard;
