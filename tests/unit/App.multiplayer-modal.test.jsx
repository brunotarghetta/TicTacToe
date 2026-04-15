// @vitest-environment jsdom

import React from "react";
import { act } from "react";
import ReactDOM from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import App from "../../src/App";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

function getButtonByText(container, text) {
  return Array.from(container.querySelectorAll("button")).find(
    (button) => button.textContent.trim() === text
  );
}

function getButtonByLabel(container, label) {
  return container.querySelector(`button[aria-label="${label}"]`);
}

function getTextboxByLabel(container, labelText) {
  return Array.from(container.querySelectorAll("label")).find((label) =>
    label.textContent.includes(labelText)
  )?.querySelector("input");
}

function click(element) {
  element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
}

describe("App multiplayer modal", () => {
  let container;
  let root;

  afterEach(() => {
    if (root) {
      act(() => {
        root.unmount();
      });
    }

    if (container) {
      container.remove();
    }

    container = null;
    root = null;
  });

  it("opens the modal, selects a preloaded user, and shows the chosen names in the multiplayer flow", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);

    act(() => {
      root.render(<App />);
    });

    act(() => {
      click(getButtonByText(container, "Partida multiple"));
    });

    const openPlayerOneModalButton = getButtonByLabel(
      container,
      "Buscar usuario precargado para Jugador 1"
    );

    act(() => {
      click(openPlayerOneModalButton);
    });

    expect(container.textContent).toContain("Seleccionar usuario");
    expect(getButtonByText(container, "LunaVega")).toBeTruthy();

    act(() => {
      click(getButtonByText(container, "LunaVega"));
    });

    expect(getTextboxByLabel(container, "Nombre Jugador 1 (X)").value).toBe("LunaVega");

    act(() => {
      click(getButtonByLabel(container, "Buscar usuario precargado para Jugador 2"));
    });

    expect(getButtonByText(container, "LunaVega")).toBeUndefined();
    expect(getButtonByText(container, "TomiRios")).toBeTruthy();

    act(() => {
      click(getButtonByText(container, "TomiRios"));
    });

    expect(getTextboxByLabel(container, "Nombre Jugador 2 (O)").value).toBe("TomiRios");

    act(() => {
      click(getButtonByText(container, "Comenzar"));
    });

    expect(container.textContent).toContain("LunaVega (X) vs TomiRios (O)");
    expect(container.textContent).toContain("Turno de LunaVega");
  });
});
