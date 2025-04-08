Feature: Goban capture detection

  Scenario: Detect a captured white stone
    Given a 3x3 goban with a white stone surrounded by black stones
    When I click on the white stone
    Then I should see that it is captured

  Scenario: Detect a white stone with liberty
    Given a 3x3 goban with a white stone and at least one empty adjacent cell
    When I click on the white stone
    Then I should see that it is not captured

  Scenario: Detect a black group that is captured
    Given a goban with a black group completely surrounded by white stones
    When I click on a black stone in the group
    Then I should see that it is captured

  Scenario: Detect a black group that is not captured
    Given a goban with a black group that has at least one liberty
    When I click on a black stone in the group
    Then I should see that it is not captured

  Scenario: Detect a square-shaped black group that is captured
    Given a goban with a square-shaped black group completely surrounded
    When I click on any black stone in the group
    Then I should see that it is captured