import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { checkImageURL } from "../../../../utils";

import styles from "./nearbyjobcard.style";

const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <Pressable style={styles.container} onPress={handleNavigate}>
      <Pressable style={styles.logoContainer}>
        {/* if data from API includes logo, then render this logo, otherwise render a default logo */}
        <Image
          // source={{
          //   uri: checkImageURL(item.employer_logo)
          //     ? item.employer_logo
          //     : "https://xxxxx",
          // }}
          source={
            checkImageURL(job.employer_logo)
              ? { uri: job.employer_logo }
              : require("../../../../assets/favicon.png")
          }
          resizeMode="contain"
          style={styles.logoImage}
        />
      </Pressable>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={2}>
          {job.job_title}
        </Text>

        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>
    </Pressable>
  );
};

export default NearbyJobCard;
