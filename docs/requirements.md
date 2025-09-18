# Requirements Document - Calorie Calculator Application

## 1. Functional Requirements

### 1.1 Calorie Calculation
- **FR-001**: Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor equation
- **FR-002**: Calculate Total Daily Energy Expenditure (TDEE) based on activity level
- **FR-003**: Provide weight loss recommendations (-500 calories from TDEE)
- **FR-004**: Provide weight gain recommendations (+500 calories from TDEE)

### 1.2 User Profile Management
- **FR-005**: Accept user age (1-120 years)
- **FR-006**: Accept user gender (Male/Female)
- **FR-007**: Accept user weight (1-500 kg)
- **FR-008**: Accept user height (1-300 cm)
- **FR-009**: Accept activity level (5 predefined levels)

### 1.3 Food Intake Tracking
- **FR-010**: Add food items with name, calories per 100g, and quantity
- **FR-011**: Categorize food by meal type (Breakfast, Lunch, Dinner, Snack)
- **FR-012**: Calculate total calories for food items based on quantity
- **FR-013**: Track food intake with timestamps
- **FR-014**: Display daily calorie intake summary
- **FR-015**: Show calorie breakdown by meal type

### 1.4 Data Persistence
- **FR-016**: Store food entries in database
- **FR-017**: Retrieve daily food intake from database
- **FR-018**: Maintain data across application sessions

## 2. Non-Functional Requirements

### 2.1 Usability
- **NFR-001**: Command-line interface with menu-driven navigation
- **NFR-002**: Input validation with clear error messages
- **NFR-003**: Intuitive user prompts and feedback

### 2.2 Performance
- **NFR-004**: Response time < 1 second for all operations
- **NFR-005**: Support up to 1000 food entries per day

### 2.3 Reliability
- **NFR-006**: Handle invalid input gracefully
- **NFR-007**: Maintain data integrity in database operations
- **NFR-008**: Graceful shutdown on user interruption

### 2.4 Maintainability
- **NFR-009**: Modular architecture following SOLID principles
- **NFR-010**: Clear separation of concerns (Models, Services, CLI)
- **NFR-011**: Extensible design for new BMR calculation algorithms

## 3. System Requirements

### 3.1 Technical Requirements
- **TR-001**: Python 3.7+ runtime environment
- **TR-002**: SQLite database for data persistence
- **TR-003**: Standard library dependencies only

### 3.2 Data Requirements
- **DR-001**: Store user profile data temporarily (session-based)
- **DR-002**: Persist food intake data permanently
- **DR-003**: Support date-based data retrieval

## 4. User Stories

### 4.1 Calorie Calculation
- **US-001**: As a user, I want to calculate my daily calorie needs so I can plan my diet
- **US-002**: As a user, I want to know my BMR so I understand my baseline metabolism
- **US-003**: As a user, I want weight management recommendations so I can achieve my goals

### 4.2 Food Tracking
- **US-004**: As a user, I want to log my food intake so I can track my daily calories
- **US-005**: As a user, I want to categorize meals so I can see eating patterns
- **US-006**: As a user, I want to see my daily intake summary so I can monitor progress

## 5. Acceptance Criteria

### 5.1 Calorie Calculation
- BMR calculation matches Mifflin-St Jeor formula results
- TDEE correctly applies activity multipliers
- Weight management recommendations are ±500 calories from TDEE

### 5.2 Food Tracking
- Food entries are saved to database with correct timestamps
- Daily summaries show accurate calorie totals
- Meal breakdown displays correct categorization

### 5.3 Data Validation
- All numeric inputs are validated within specified ranges
- Invalid inputs display appropriate error messages
- Application handles edge cases without crashing
