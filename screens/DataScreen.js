import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setLocations } from "../src/store/locationsSlice";
import * as FileSystem from "expo-file-system";

const DataScreen = () => {
  const locations = useSelector((state) => state.local.locations);
  const dispatch = useDispatch();
  const [dataContent, setDataContent] = useState("");

  const handleImportData = async () => {
    try {
      // Define the file path and name
      const fileUri = FileSystem.documentDirectory + "Data.js";

      // Check if the file exists
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        Alert.alert("Data File Not Found", "Data.js file does not exist.");
        return;
      }

      // Read the file content
      const fileContent = await FileSystem.readAsStringAsync(fileUri);

      // Parse the file content to get the locations data
      const importedLocations = JSON.parse(fileContent);

      // Dispatch an action to update the store with the imported locations
      dispatch(setLocations(importedLocations));

      Alert.alert("Data Imported", "Data.js has been imported successfully.");
    } catch (error) {
      console.error("Error while importing data:", error);
    }
  };

  const handleExportData = async () => {
    try {
      // Convert locations to a string
      const locationsString = JSON.stringify(locations);

      // Define the file path and name
      const fileUri = FileSystem.documentDirectory + "Data.js";

      // Write the locations data to the file
      await FileSystem.writeAsStringAsync(fileUri, locationsString);

      Alert.alert("Data Exported", "Data.js has been exported successfully.");

      // Update the data content state
      setDataContent(locationsString);
    } catch (error) {
      console.error("Error while exporting data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Import Data" onPress={handleImportData} />
      <Button title="Export Data" onPress={handleExportData} />
      <View style={styles.dataView}>
        <Text style={styles.dataLabel}>Data.js Content:</Text>
        <Text style={styles.dataContent}>{dataContent}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dataView: {
    marginTop: 16,
  },
  dataLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dataContent: {
    marginTop: 8,
    fontSize: 16,
  },
});

export default DataScreen;
