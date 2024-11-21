import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/bg.jpeg")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bem-vindo!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Passo 1: Acesse a aba Detectar</ThemedText>
        <ThemedText>
          Navegue até a aba{" "}
          <ThemedText type="defaultSemiBold">Detectar</ThemedText> no menu
          inferior do aplicativo.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Passo 2: Abra a câmera</ThemedText>
        <ThemedText>
          Toque no ícone da câmera localizado no centro da aba{" "}
          <ThemedText type="defaultSemiBold">Detectar</ThemedText>.
          Certifique-se de conceder as permissões necessárias para usar a
          câmera.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Passo 3: Comece a detecção</ThemedText>
        <ThemedText>
          Aponte a câmera para a área que deseja analisar. O aplicativo iniciará
          automaticamente a detecção de doenças e exibirá os resultados na tela.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    position: "absolute", // Mantém a posição absoluta
    top: 0, // Garante que comece do topo
    bottom: 0, // Expande até a parte inferior
    left: 0, // Expande até o lado esquerdo
    right: 0, // Expande até o lado direito
    width: "100%", // Ajusta a largura para ocupar todo o espaço
    height: "100%", // Ajusta a altura para ocupar todo o espaço
  },
});
