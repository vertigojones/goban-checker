import { defineFeature, loadFeature } from "jest-cucumber"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import GobanBoard, { Stone } from "../components/GobanBoard"

const feature = loadFeature("./src/features/goban-capture.feature")

describe("GobanBoard feature", () => {
  defineFeature(feature, (test) => {
    test("Detect a captured white stone", ({ given, when, then }) => {
      given("a 3x3 goban with a white stone surrounded by black stones", () => {
        render(<GobanBoard />)
      })

      when("I click on the white stone", async () => {
        const button = screen.getAllByRole("button")[4] // middle cell (1,1)
        await userEvent.click(button)
      })

      then("I should see that it is captured", () => {
        expect(screen.getByTestId("capture-message")).toHaveTextContent(
          "Stone at (1, 1) is captured"
        )
      })
    })

    test("Detect a white stone with liberty", ({ given, when, then }) => {
      const boardWithLiberty: Stone[][] = [
        [".", ".", "."],
        ["B", "W", "B"],
        [".", ".", "."],
      ]

      given(
        "a 3x3 goban with a white stone and at least one empty adjacent cell",
        () => {
          render(<GobanBoard board={boardWithLiberty} />)
        }
      )

      when("I click on the white stone", async () => {
        const button = screen.getAllByRole("button")[4] // middle cell (1,1)
        await userEvent.click(button)
      })

      then("I should see that it is not captured", () => {
        expect(screen.getByTestId("capture-message")).toHaveTextContent(
          "Stone at (1, 1) is not captured"
        )
      })
    })

    test("Detect a black group that is captured", ({ given, when, then }) => {
      given(
        "a goban with a black group completely surrounded by white stones",
        () => {
          throw new Error("Test not yet implemented")
        }
      )

      when("I click on a black stone in the group", async () => {
        throw new Error("Test not yet implemented")
      })

      then("I should see that it is captured", () => {
        throw new Error("Test not yet implemented")
      })
    })

    test("Detect a black group that is not captured", ({
      given,
      when,
      then,
    }) => {
      given("a goban with a black group that has at least one liberty", () => {
        throw new Error("Test not yet implemented")
      })

      when("I click on a black stone in the group", async () => {
        throw new Error("Test not yet implemented")
      })

      then("I should see that it is not captured", () => {
        throw new Error("Test not yet implemented")
      })
    })

    test("Detect a square-shaped black group that is captured", ({
      given,
      when,
      then,
    }) => {
      given(
        "a goban with a square-shaped black group completely surrounded",
        () => {
          throw new Error("Test not yet implemented")
        }
      )

      when("I click on any black stone in the group", async () => {
        throw new Error("Test not yet implemented")
      })

      then("I should see that it is captured", () => {
        throw new Error("Test not yet implemented")
      })
    })
  })
})

export {}
