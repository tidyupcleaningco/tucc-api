
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Animated, FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const GOOGLE_API_KEY = 'AIzaSyDxUjX79s1ydRBrJ1J0WUsYiETICTCmH-k';

const AddressInputScreen = () => {
  const [addressInput, setAddressInput] = useState('');
  const [predictions, setPredictions] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const router = useRouter();

  const fetchPredictions = async (query: string) => {
    if (!query || query.length < 3) {
      setPredictions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&components=country:us&types=address`
      );
      const data = await response.json();
      const addresses = data.predictions.map((p: any) => p.description);
      setPredictions(addresses);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setPredictions([]);
    }
  };

  const handleInputChange = (text: string) => {
    setAddressInput(text);
    setSelectedAddress(null);
    setAvailable(null);
    fetchPredictions(text);
  };

  const handleSelectAddress = (address: string) => {
    setSelectedAddress(address);
    setAddressInput(address);
    setPredictions([]);
    const isServicable = checkServiceAvailability(address);
    setAvailable(isServicable);
Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 600, // was 300 — slower is more obvious
  delay: 100,     // adds slight anticipation
  useNativeDriver: true,
}).start();
  };

  const checkServiceAvailability = (address: string): boolean => {
    const zipMatch = address.match(/\b(\d{5})\b/);
    const hasPortland = address.toLowerCase().includes('portland');

    if (zipMatch) {
      const zip = zipMatch[1];
      return zip.startsWith('97') || hasPortland;
    }

    return hasPortland;
  };

 const handleContinuePress = () => {
  if (available) {
    router.push('/contact-details');
  }
else if (selectedAddress && available === false) {
      console.log('Address not serviceable, please enter a different address.');
    } else {
      console.log('Please enter an address first.');
    }
  };

  const renderPredictionItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.predictionItem} onPress={() => handleSelectAddress(item)}>
      <Text style={styles.predictionText}>{item}</Text>
    </TouchableOpacity>
  );

let buttonText = 'Continue';
let buttonDisabled = !selectedAddress || available === false;

const getStaticMapUrl = (address: string) =>
  `https://maps.googleapis.com/maps/api/staticmap?size=600x200&zoom=15&markers=${encodeURIComponent(
    address
  )}&key=${GOOGLE_API_KEY}`;
if (selectedAddress) {
  console.log('Static map URL:', getStaticMapUrl(selectedAddress));
}

return (
  <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.heading}>Where do you need cleaning?</Text>

        <View style={styles.card}>
          {/* Input field and pin icon */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Enter your address"
              placeholderTextColor="#888"
              value={addressInput}
              onChangeText={handleInputChange}
              autoCapitalize="words"
              autoFocus={true}
              autoCorrect={false}
              keyboardType="default"
            />
            {selectedAddress && (
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/marker.png' }}
                style={styles.pinIcon}
              />
            )}
          </View>

          {/* Static map preview with fade-in */}
          {selectedAddress && (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Image
                source={{ uri: getStaticMapUrl(selectedAddress) }}
                style={{
                  height: 140,
                  width: '100%',
                  borderRadius: 8,
                  marginBottom: 16,
                  shadowColor: '#000',
                  shadowOpacity: 0.08,
                  shadowRadius: 6,
                  shadowOffset: { width: 0, height: 3 },
                  elevation: 3,
                }}
                resizeMode="cover"
              />
            </Animated.View>
          )}

          {/* Prediction list */}
          {predictions.length > 0 && (
            <FlatList
              data={predictions}
              keyExtractor={(item) => item}
              renderItem={renderPredictionItem}
              style={styles.list}
              keyboardShouldPersistTaps="handled"
            />
          )}

          {/* Error message */}
          {selectedAddress && available === false && (
            <Text style={styles.errorText}>Sorry, we don't service that area yet.</Text>
          )}

          {/* CTA button */}
          <TouchableOpacity
            style={[styles.button, buttonDisabled && styles.buttonDisabled]}
            onPress={handleContinuePress}
            disabled={buttonDisabled}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  </KeyboardAvoidingView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  inner: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputWrapper: {
    position: 'relative',
  },
  inputWithIcon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    marginBottom: 12,
    paddingRight: 40, // spacing for icon
  },
  pinIcon: {
    position: 'absolute',
    right: 12,
    top: 14,
    width: 20,
    height: 20,
    tintColor: '#888',
  },
  list: {
    marginBottom: 12,
  },
  predictionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  predictionText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: '#CC3333',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3478F6',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#BCC1C6',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 16,
  shadowColor: '#000',
  shadowOpacity: 0.06,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
  elevation: 3, // Android shadow
  marginTop: 8,
  marginBottom: 24,
},
});

export default AddressInputScreen;
