import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  useColorScheme,
} from "react-native";

// Icons
import { MaterialIcons as CameraIcon } from "@expo/vector-icons";
import { Entypo as HelpIcon } from "@expo/vector-icons";
import { Foundation as PhotoIcon } from "@expo/vector-icons";

// Colors
import { Colors } from "@/constants/Colors";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isModalDetectionVisible, setModalDetectionVisible] = useState(false);
  const [isModalHelpVisible, setModalHelpVisible] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo?.uri) {
        setPhotoUri(photo.uri);
        setConfidence(Math.floor(Math.random() * (91 - 85 + 1)) + 85); // Sorteia entre 85% e 91%
        setModalDetectionVisible(true);
      } else {
        console.warn("No photo was captured.");
      }
    }
  }

  return (
    <View style={styles.container}>
      {/* Câmera */}
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
      </View>

      {/* Botões */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.secondaryCircularButton}>
          <PhotoIcon name="photo" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.primaryCircularButton}
          onPress={takePhoto}
        >
          <CameraIcon name="camera" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryCircularButton}
          onPress={() => setModalHelpVisible(true)}
        >
          <HelpIcon name="help" size={15} color="black" />
        </TouchableOpacity>
      </View>

      {/* Modal da Detecção */}
      <Modal
        visible={isModalDetectionVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalDetectionVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.detectionContainer}>
            {photoUri && (
              <Image source={{ uri: photoUri }} style={styles.previewImage} />
            )}
            <Text style={styles.analysisTitle}>Resultado da Análise</Text>
            <Text style={styles.analysisText}>
              <Text style={styles.boldText}>Doença:</Text> Helmintosporiose
            </Text>
            <Text style={styles.analysisText}>
              <Text style={styles.boldText}>Confiabilidade:</Text> {confidence}%
            </Text>
            <Text style={styles.analysisText}>
              <Text style={styles.boldText}>Recomendações:</Text> Realizar
              pulverização com fungicidas específicos para controle da doença.
              Evitar áreas com alta umidade e realizar rotação de culturas.
              <Text style={styles.seeMore}>Ver mais</Text>
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalDetectionVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Ajuda */}
      <Modal
        visible={isModalHelpVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalHelpVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.detectionContainer}>
            <Text style={styles.instructionText}>
              1. Posicione a câmera de forma que o objeto fique visível na tela.
            </Text>
            <Text style={styles.instructionText}>
              2. Certifique-se de que há boa iluminação.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalHelpVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  seeMore: {
    color: "#3950B6",
    fontSize: 13,
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: Colors.light.background, // Cor de fundo com o tom de destaque
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5, // Borda arredondada
    borderWidth: 1.5,
    borderColor: Colors.light.tint, // Cor da borda com o tom de destaque
    alignItems: "center",
    justifyContent: "center",
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    textAlign: "center",
  },
  analysisText: {
    fontSize: 14,
    color: "black",
    marginBottom: 8,
    textAlign: "left",
  },
  buttonText: {
    color: "white", // Cor do texto
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start", // Alinha elementos no topo
    backgroundColor: Colors.light.background,
  },
  cameraContainer: {
    flex: 4, // Câmera ocupa 4/5 da tela
  },
  camera: {
    flex: 1,
  },
  footer: {
    flex: 2 / 3, // Área inferior ocupa 1/5 da tela
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    paddingHorizontal: 20,
  },
  message: {
    textAlign: "center",
    color: "white",
    paddingBottom: 10,
  },
  primaryCircularButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: Colors.light.tint,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryCircularButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: Colors.light.tint,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
  },
  instructionButton: {
    backgroundColor: Colors.light.background,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
  },
  detectionContainer: {
    backgroundColor: Colors.light.background,
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.light.tint,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  instructionTitle: {
    color: "rgba(0, 0, 0, 0.8)",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  numberText: {
    color: "rgba(0, 0, 0, 0.8)",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "left",
  },
  boldText: {
    color: "rgba(0, 0, 0, 0.8)", // Cor do texto
    fontSize: 14, // Tamanho da fonte
    fontWeight: "bold", // Define o texto em negrito
    marginBottom: 10, // Espaçamento inferior
    textAlign: "left", // Alinha o texto à esquerda
  },
  instructionText: {
    color: "rgba(0, 0, 0, 0.8)",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "left",
  },
  previewImage: {
    margin: 20,
    width: 250,
    height: 250,
  },
});
