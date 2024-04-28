import { useCallback } from "react";
import { useState } from "react";

export default function useUndo<T>(initialCommands: T[]) {
  const [commands, setCommands] = useState<T[]>(initialCommands);
  const [undoneCommands, setUndoneCommands] = useState<T[]>([]);

  const addCommand = (commandOrCallback: T | ((prevCommands: T[]) => T[])) => {
    if (commandOrCallback instanceof Function) {
      setCommands((prevCommands) => commandOrCallback(prevCommands));
    } else {
      setCommands((prevCommands) => [...prevCommands, commandOrCallback]);
      setUndoneCommands([]);
    }
  };

  const redo = () => {
    // Implement redo logic here
    setUndoneCommands((prevUndoCommands) => {
      const lastUndoneCommand = prevUndoCommands[prevUndoCommands.length - 1];
      setCommands((prevCommands) => [...prevCommands, lastUndoneCommand]);
      return undoneCommands.slice(0, -1);
    });
  };

  const undo = () => {
    console.log("undo");
    setCommands((prevCommands) => {
      const lastCommand = prevCommands[prevCommands.length - 1];
      setUndoneCommands((prevUndoneCommands) => [
        ...prevUndoneCommands,
        lastCommand,
      ]);
      return prevCommands.slice(0, commands.length - 1);
    });
  };

  const reset = () => {
    setCommands(initialCommands);
    setUndoneCommands([]);
  };

  const clear = () => {
    setCommands([]);
    setUndoneCommands([]);
  };
  console.log(commands);
  return { commands, addCommand, redo, undo, reset, clear };
}
