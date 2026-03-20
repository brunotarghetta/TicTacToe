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
