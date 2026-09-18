Feature: DemoQA Web Tables CRUD, search, pagination and sorting

  Scenario: User can add, filter, edit, delete, paginate and sort records
    Given the user is on the Web Tables page
    When the user clicks the Add button
    And the user fills the registration form with:
      | Field      | Value               |
      | First Name | Emma                |
      | Last Name  | Stone               |
      | Age        | 28                  |
      | Email      | emma.stone@test.com |
      | Salary     | 75000               |
      | Department | QA                  |
    And the user submits the registration form
    Then the new record should be visible in the table

    When the user searches for "Emma"
    Then only Emma's row should be visible

    When the user clears the search
    Then all records should be visible

    When the user clicks the Edit icon for "Emma"
    And the user changes the salary to 85000
    And the user submits the edited form
    Then the salary for "Emma" should be updated to 85000

    When the user searches for "Kierra"
    Then Kierra's row should be visible

    When the user clears the search
    And the user deletes the row for "Emma"
    Then the row for "Emma" should not exist

    When the user changes rows per page to 5 if available
    Then the table should update the visible row count

    When the user clicks the Age header
    Then the table should be sorted by age ascending

    When the user clicks the Age header again
    Then the table should be sorted by age descending
