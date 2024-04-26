import { useCallback } from "react";
import { useState } from "react";

export default function useUndo<T>(initialCommands: T[]): {
  commands: T[];
  addCommand: (command: T) => void;
  redo: () => void;
  undo: () => void;
  reset: () => void;
  clear: () => void;
} {
  const [commands, setCommands] = useState<T[]>(initialCommands);
  const [undoneCommands, setUndoneCommands] = useState<T[]>([]);

  const addCommand = (command: T) => {
    setCommands((prevCommands) => [...prevCommands, command]);
    setUndoneCommands([]);
  };

  const redo = () => {
    // Implement redo logic here
    setUndoneCommands((prevUndoCommands) => {
      const lastUndoneCommand = prevUndoCommands[prevUndoCommands.length - 1];
      setCommands((prevCommands) => [...prevCommands, lastUndoneCommand]);
      return undoneCommands.slice(0, -1);
    });
  };

  const undo = useCallback(() => {
    // Implement undo logic here
    const lastCommand = commands[commands.length - 1];
    setCommands((prevCommands) => {
      const lastCommand = prevCommands[prevCommands.length - 1];
      setUndoneCommands((prevUndoneCommands) => [
        ...prevUndoneCommands,
        lastCommand,
      ]);
      return prevCommands.slice(0, commands.length - 1);
    });
  }, [commands, undoneCommands]);

  const reset = () => {
    setCommands(initialCommands);
    setUndoneCommands([]);
  };

  const clear = () => {
    setCommands([]);
    setUndoneCommands([]);
  };

  return { commands, addCommand, redo, undo, reset, clear };
}
