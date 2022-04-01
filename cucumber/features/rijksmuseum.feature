Feature: Rijksmuseum Search
Background: Goto website
  Given I open the Rijksmuseum page
  And I dismiss the cookie dialog
  Then the title is "Rijksmuseum Amsterdam, home of the Dutch masters"

@search @nightwatch
Scenario: Searching for Night watch
  When I search "night watch"
  Then Body contains "Operation Night Watch"
  Then Body contains "The Night Watch, Rembrandt van Rijn, 1642"

@search @cucumber
Scenario: Searching for cucumber
  When I search "cucumber"
  Then Body contains "Muskusroos (Rosa moschata) en komkommer (Cucumis sativus)"
