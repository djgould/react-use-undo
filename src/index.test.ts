import useUndo from "./index";
import { renderHook, act } from "@testing-library/react";
import { describe, expect, test } from "@jest/globals";

test("initial values correctly returns", () => {
  const { result } = renderHook(() => useUndo(["hello"]));
  expect(result.current.commands).toEqual(["hello"]);
});

test("tracks multiple commands", () => {
  const { result } = renderHook(() => useUndo<string>([]));
  const { addCommand } = result.current;
  act(() => addCommand("hello"));
  act(() => addCommand("world"));
  expect(result.current.commands).toEqual(["hello", "world"]);
});

test("can undo a command", () => {
  const { result } = renderHook(() => useUndo<string>([]));
  const { addCommand, undo } = result.current;
  act(() => addCommand("hello"));
  act(() => addCommand("world"));
  expect(result.current.commands).toEqual(["hello", "world"]);
  act(() => undo());
  expect(result.current.commands).toEqual(["hello"]);
});

test("can redo an undone command", () => {
  const { result } = renderHook(() => useUndo<string>([]));
  const { addCommand, undo, redo } = result.current;
  act(() => addCommand("hello"));
  act(() => addCommand("world"));
  expect(result.current.commands).toEqual(["hello", "world"]);
  act(() => undo());
  expect(result.current.commands).toEqual(["hello"]);
  act(() => redo());
  expect(result.current.commands).toEqual(["hello", "world"]);
});
