import { expect, test } from "@playwright/test";

test("shows landing screen and starts a quick game", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "TaTeTi" })).toBeVisible();
  await page.getByRole("button", { name: "Partida rapida" }).click();

  await expect(page.getByText("Jugador 1 (X) vs Jugador 2 (O)")).toBeVisible();
  await expect(page.getByText("Turno de Jugador 1")).toBeVisible();
});

test("starts a multiplayer game with custom player names", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Partida multiple" }).click();
  await page.getByRole("textbox", { name: "Nombre Jugador 1 (X)" }).fill("Ana");
  await page.getByRole("textbox", { name: "Nombre Jugador 2 (O)" }).fill("Bruno");
  await page.getByRole("button", { name: "Comenzar" }).click();

  await expect(page.getByText("Ana (X) vs Bruno (O)")).toBeVisible();
  await expect(page.getByText("Turno de Ana")).toBeVisible();
});

test("opens the preloaded users modal and uses the selected name in multiplayer", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Partida multiple" }).click();
  await page.getByRole("button", { name: "Buscar usuario precargado para Jugador 1" }).click();

  await expect(page.getByRole("heading", { name: "Seleccionar usuario" })).toBeVisible();
  await page.getByRole("button", { name: "Seleccionar LunaVega" }).click();

  await expect(page.getByRole("textbox", { name: "Nombre Jugador 1 (X)" })).toHaveValue("LunaVega");

  await page.getByRole("button", { name: "Buscar usuario precargado para Jugador 2" }).click();
  await expect(page.getByRole("button", { name: "Seleccionar LunaVega" })).toHaveCount(0);
  await page.getByRole("button", { name: "Seleccionar TomiRios" }).click();

  await expect(page.getByRole("textbox", { name: "Nombre Jugador 2 (O)" })).toHaveValue("TomiRios");

  await page.getByRole("button", { name: "Comenzar" }).click();

  await expect(page.getByText("LunaVega (X) vs TomiRios (O)")).toBeVisible();
  await expect(page.getByText("Turno de LunaVega")).toBeVisible();
});

test("paginates preloaded users in multiplayer modal", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Partida multiple" }).click();
  await page.getByRole("button", { name: "Buscar usuario precargado para Jugador 1" }).click();

  await expect(page.getByText("Pagina 1 de 5")).toBeVisible();
  await expect(page.getByText("50 usuarios disponibles")).toBeVisible();
  await expect(page.getByRole("button", { name: /Seleccionar / })).toHaveCount(10);
  await expect(page.getByRole("button", { name: "Seleccionar LunaVega" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Seleccionar MateoFlux" })).toBeVisible();

  await page.getByRole("button", { name: "Ir a la pagina siguiente" }).click();
  await expect(page.getByText("Pagina 2 de 5")).toBeVisible();
  await expect(page.getByRole("button", { name: /Seleccionar / })).toHaveCount(10);
  await expect(page.getByRole("button", { name: "Seleccionar AitanaSky" })).toBeVisible();

  await page.getByRole("button", { name: "Ir al final" }).click();
  await expect(page.getByText("Pagina 5 de 5")).toBeVisible();
  await expect(page.getByRole("button", { name: /Seleccionar / })).toHaveCount(10);
  await expect(page.getByRole("button", { name: "Seleccionar LuciaFrame" })).toBeVisible();

  await page.getByRole("button", { name: "Ir a la pagina anterior" }).click();
  await expect(page.getByText("Pagina 4 de 5")).toBeVisible();
  await expect(page.getByRole("button", { name: /Seleccionar / })).toHaveCount(10);
  await expect(page.getByRole("button", { name: "Seleccionar AlanTrail" })).toBeVisible();

  await page.getByRole("button", { name: "Ir al principio" }).click();
  await expect(page.getByText("Pagina 1 de 5")).toBeVisible();
  await expect(page.getByRole("button", { name: /Seleccionar / })).toHaveCount(10);
  await expect(page.getByRole("button", { name: "Seleccionar LunaVega" })).toBeVisible();
});

test("finishes a round and shows the summary screen", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Partida rapida" }).click();

  const cells = page.getByRole("grid").getByRole("button");
  await cells.nth(0).click();
  await cells.nth(3).click();
  await cells.nth(1).click();
  await cells.nth(4).click();
  await cells.nth(2).click();

  await expect(page.getByText("Gano Jugador 1")).toBeVisible();
  await page.getByRole("button", { name: "Finalizar" }).click();

  await expect(page.getByRole("heading", { name: "Tanteador final" })).toBeVisible();
  await expect(page.getByText("Jugador 1: 1")).toBeVisible();
  await expect(page.getByText("Jugador 2: 0")).toBeVisible();
});
