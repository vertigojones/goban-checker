import { defineFeature, loadFeature } from "jest-cucumber"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import _GobanBoard from "../components/GobanBoard"

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
        expect(
          screen.getByText(/stone at \(1, 1\) is captured/i)
        ).toBeInTheDocument()
      })
    })

    test("Detect a white stone with liberty", ({ given, when, then }) => {
      given(
        "a 3x3 goban with a white stone and at least one empty adjacent cell",
        () => {
          // TODO: Modify GobanBoard to accept props so we can pass in a custom board
          render(<GobanBoard />)
        }
      )

      when("I click on the white stone", async () => {
        const button = screen.getAllByRole("button")[4]
        await userEvent.click(button)
      })

      then("I should see that it is not captured", () => {
        expect(
          screen.getByText(/stone at \(1, 1\) is not captured/i)
        ).toBeInTheDocument()
      })
    })
  })
})

export {}
