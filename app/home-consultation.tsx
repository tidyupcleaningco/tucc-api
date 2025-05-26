import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeConsultation() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://tidyup.daily.co/HomeConsultTest' }}
        style={{ flex: 1 }}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
}
