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
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
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
      const photo = await cameraRef.current.takePictureAsync(); // Captura a foto
      if (photo?.uri) {
        setPhotoUri(photo.uri); // Define a URI da foto no estado
        setModalDetectionVisible(true); // Mostra o popup
      } else {
        console.warn("No photo was captured.");
      }
    }
  }

  return (
    <View style={styles.container}>
      {/* Câmera com espaço reservado */}
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
      </View>

      {/* Seção inferior */}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.secondaryCircularButton]}>
          <PhotoIcon name="photo" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.primaryCircularButton}
          onPress={takePhoto}
        >
          <CameraIcon name="camera" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.secondaryCircularButton]}
          onPress={() => setModalHelpVisible(true)}
        >
          <HelpIcon name="help" size={15} color="black" />
        </TouchableOpacity>
      </View>

      {/* Modal para exibir a foto capturada */}
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
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalDetectionVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para exibir instruções da captura */}
      <Modal
        visible={isModalHelpVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalHelpVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.detectionContainer}>
            <Text style={styles.instructionText}>
              1. <Text style={styles.boldText}>Posicione a câmera</Text> de
              forma que o objeto ou a área a ser analisada fique bem visível na
              tela.
            </Text>
            <Text style={styles.instructionText}>
              2. <Text style={styles.boldText}>Aproxime a câmera</Text> do
              objeto até que ele fique nítido e mostre apenas a folha. Tente
              evitar mostrar o fundo ou outros objetos.
            </Text>
            <Text style={styles.instructionText}>
              3.{" "}
              <Text style={styles.boldText}>
                Certifique-se de que há boa iluminação.
              </Text>
              {""} A luz natural é preferível, mas evite sombras fortes.
            </Text>
            <Text style={styles.instructionText}>
              4. <Text style={styles.boldText}>Eviste movimentos bruscos.</Text>{" "}
              Tente manter a câmera estável ao tirar a foto.
            </Text>
            <Text style={styles.instructionText}>
              5. Quando estiver pronto,
              <Text style={styles.boldText}> pressione o botão de captura</Text>
              {""} para tirar a foto.
            </Text>

            <View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalHelpVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
