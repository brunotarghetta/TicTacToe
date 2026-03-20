import { describe, expect, it } from "vitest";
import {
  calculateWinner,
  createPlayers,
  emptyBoard,
  getNextStartingSymbol,
  getUpdatedHistory,
  getUpdatedScore,
} from "../../src/gameUtils";

describe("gameUtils", () => {
  it("returns an empty board with 9 null positions", () => {
    expect(emptyBoard).toHaveLength(9);
    expect(emptyBoard.every((cell) => cell === null)).toBe(true);
  });

  it("detects a winner and the winning line", () => {
    const result = calculateWinner(["X", "X", "X", null, "O", null, null, "O", null]);

    expect(result).toEqual({
      winner: "X",
      line: [0, 1, 2],
    });
  });

  it("returns null when there is no winner", () => {
    expect(calculateWinner(emptyBoard)).toBeNull();
  });

  it("creates default quick mode players", () => {
    expect(createPlayers("quick")).toEqual({
      X: "Jugador 1",
      O: "Jugador 2",
    });
  });

  it("creates multiplayer players using trimmed names and defaults", () => {
    expect(
      createPlayers("multi", {
        playerOne: "  Ana  ",
        playerTwo: "",
      }),
    ).toEqual({
      X: "Ana",
      O: "Jugador 2",
    });
  });

  it("appends a round result to history", () => {
    expect(getUpdatedHistory([], "X")).toEqual([{ round: 1, winnerSymbol: "X" }]);
  });

  it("updates the score for winners and draws", () => {
    const score = { X: 0, O: 0, draws: 0 };

    expect(getUpdatedScore(score, "X")).toEqual({ X: 1, O: 0, draws: 0 });
    expect(getUpdatedScore(score, "O")).toEqual({ X: 0, O: 1, draws: 0 });
    expect(getUpdatedScore(score, null)).toEqual({ X: 0, O: 0, draws: 1 });
  });

  it("alternates the starting symbol", () => {
    expect(getNextStartingSymbol("X")).toBe("O");
    expect(getNextStartingSymbol("O")).toBe("X");
  });
});
