import { useSheetRoute } from "@/cheatsheets/route";
import { CheatSheetView } from "@/components/CheatSheetView";
import { DeckPicker } from "@/components/DeckPicker";
import { StudyView } from "@/components/StudyView";
import { useTheme } from "@/hooks/useTheme";
import { useStore } from "@/store";

export default function App() {
  useTheme();
  const status = useStore((s) => s.status);
  const sheet = useSheetRoute();

  if (status !== "idle") return <StudyView />;
  return sheet ? <CheatSheetView id={sheet} /> : <DeckPicker />;
}
