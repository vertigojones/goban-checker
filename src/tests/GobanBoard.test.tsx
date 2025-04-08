import { defineFeature, loadFeature } from "jest-cucumber"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import GobanBoard from "../components/GobanBoard"

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
      given(
        "a 3x3 goban with a white stone and at least one empty adjacent cell",
        () => {
          render(<GobanBoard />) // TODO: Pass a board with a liberty
        }
      )

      when("I click on the white stone", async () => {
        const button = screen.getAllByRole("button")[4]
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
          // TODO: render GobanBoard with surrounded black group
        }
      )

      when("I click on a black stone in the group", async () => {
        // TODO: simulate click on a black stone in the group
      })

      then("I should see that it is captured", () => {
        // TODO: assert the stone is captured
      })
    })

    test("Detect a black group that is not captured", ({
      given,
      when,
      then,
    }) => {
      given("a goban with a black group that has at least one liberty", () => {
        // TODO: render GobanBoard with black group and liberty
      })

      when("I click on a black stone in the group", async () => {
        // TODO: simulate click on a black stone in the group
      })

      then("I should see that it is not captured", () => {
        // TODO: assert the stone is not captured
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
          // TODO: render GobanBoard with square-shaped group surrounded
        }
      )

      when("I click on any black stone in the group", async () => {
        // TODO: simulate click on any black stone in the square
      })

      then("I should see that it is captured", () => {
        // TODO: assert that the stone is captured
      })
    })
  })
})

export {}
