import { Platform, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Box, Button } from "@mui/material";

async function createOrder() {
  try {
    const response = await axios.post("http://localhost:3000/order");
    await AsyncStorage.setItem("order", response.data);
  } catch (error) {
    alert("error item created: " + error);
  }
}

export default function HomeScreen() {
  return (
    <View>
      <Box sx={{ width: "100vw", height: "100vh" }}>
        <Button onClick={() => createOrder} fullWidth variant="contained" color="success" sx={{ height: "100%" }}>
          create basket
        </Button>
      </Box>
      <Text style={{ padding: 20 }}> hello</Text>
    </View>
  );
}
