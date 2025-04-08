Feature: Goban capture detection

  Scenario: Detect a captured white stone
    Given a 3x3 goban with a white stone surrounded by black stones
    When I click on the white stone
    Then I should see that it is captured

  Scenario: Detect a white stone with liberty
    Given a 3x3 goban with a white stone and at least one empty adjacent cell
    When I click on the white stone
    Then I should see that it is not captured
