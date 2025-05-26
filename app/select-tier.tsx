import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function HomeConsultation() {
  const { url } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  if (!url) return null;

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', zIndex: 1 }}>
          <ActivityIndicator size="large" color="#007aff" />
        </View>
      )}
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}
