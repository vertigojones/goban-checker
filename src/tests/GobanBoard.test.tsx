import { defineFeature, loadFeature } from "jest-cucumber"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import GobanBoard from "../components/GobanBoard"
import {
  boardWithLiberty,
  surroundedBlackGroup,
  blackGroupWithLiberty,
  squareGroupSurrounded,
} from "../mocks/boards"

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
          render(<GobanBoard board={surroundedBlackGroup} />)
        }
      )

      when("I click on a black stone in the group", async () => {
        const button = screen.getAllByRole("button")[3] // top-left B (0,1)
        await userEvent.click(button)
      })

      then("I should see that it is captured", () => {
        expect(screen.getByTestId("capture-message")).toHaveTextContent(
          "Stone at (0, 1) is captured"
        )
      })
    })

    test("Detect a black group that is not captured", ({
      given,
      when,
      then,
    }) => {
      given("a goban with a black group that has at least one liberty", () => {
        render(<GobanBoard board={blackGroupWithLiberty} />)
      })

      when("I click on a black stone in the group", async () => {
        const button = screen.getAllByRole("button")[4] // (1,1)
        await userEvent.click(button)
      })

      then("I should see that it is not captured", () => {
        expect(screen.getByTestId("capture-message")).toHaveTextContent(
          "Stone at (1, 1) is not captured"
        )
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
          render(<GobanBoard board={squareGroupSurrounded} />)
        }
      )

      when("I click on any black stone in the group", async () => {
        const button = screen.getAllByRole("button")[3] // (0,1)
        await userEvent.click(button)
      })

      then("I should see that it is captured", () => {
        expect(screen.getByTestId("capture-message")).toHaveTextContent(
          "Stone at (0, 1) is captured"
        )
      })
    })
  })
})

export {}
