# Public Coursework

These projects demonstrate relational modeling, HTTP APIs, desktop interfaces, persistence and algorithms. They are coursework and learning projects; the client engagements and independent products are documented separately in the [showcase](../README.md).

## Selected backend and team work

### Doctor Who Knowledge API

Three-person Node.js/Express/Sequelize project with a relational knowledge model and schema-aware OpenAI answers. My contribution includes the responsive frontend, OpenAI integration, deployment configuration, testing and later authentication/PostgreSQL migration work. The team contribution record identifies the original model and query work by teammates.

[Case study and dated tests](../Dr.WHO/README.md) · [Public source](https://github.com/MILTONADINA/Dr.WHO) · [Contribution record](https://github.com/MILTONADINA/Dr.WHO/blob/8b1012d9ae2a3c9f5c7a0c3b1acd808ecacf6a73/CONTRIBUTIONS.md)

### E-Commerce REST API

Java 17/Spring Boot 4 application with separate controller, service and Spring Data JPA layers. User and product controllers each implement create, list and get-by-ID operations. Bid, order, rating and payment-method entities extend the schema; bidding and order-transaction endpoints are outside the implemented route surface. Docker Compose provides PostgreSQL for local development.

The JUnit application-context test passed against isolated PostgreSQL 15 on **October 1, 2026**, at revision `c0e3c56`. That smoke check covers application/persistence initialization.

[Public source](https://github.com/MILTONADINA/Ebay) · [Application-context test](https://github.com/MILTONADINA/Ebay/blob/c0e3c56adaf852ac602ae67c98007ae1be9f88fb/EBAY/src/test/java/com/ebay/api/ApiApplicationTests.java)

## Additional projects

| Project | Implemented work | Source |
|---|---|---|
| Internet Applications | Vue 3 and vanilla-JavaScript clients over Express/MySQL workspaces; bcrypt hashing, list permissions, escaped user content and origin-allowlisted CORS. | [Internet-Apps](https://github.com/MILTONADINA/Internet-Apps) |
| Point-of-Sale and Inventory | Java/Swing retail simulation with item management, tax/payment handling and cashier sessions; PBKDF2 password hashes and CSV persistence with masked payment-account fields. | [POS](https://github.com/MILTONADINA/POS) |
| Car Dealership | Java Swing, JPA/Hibernate and MySQL with MVC/DAO separation; includes a JUnit DAO test using H2. | [dealer](https://github.com/MILTONADINA/dealer) |
| Invoice Management | Java invoice and line-item modeling with JUnit tests. | [Invoice](https://github.com/MILTONADINA/Invoice) |
| Alien Attack | C++ game implementation using SFML. | [AlienAttackGame](https://github.com/MILTONADINA/AlienAttackGame) |
| Dice Roller Pro | Java desktop interface with SQLite-backed roll history. | [Dice-Roller](https://github.com/MILTONADINA/Dice-Roller) |
| Data Structures and Algorithms | Java modules for structures and algorithms, including AVL trees and directed acyclic graphs. | [Data-Structures---Algorithms](https://github.com/MILTONADINA/Data-Structures---Algorithms) |

### Point-of-Sale validation

**Ten selected JUnit checks passed on October 1, 2026**, at revision `d7b9407`, with no failures, errors or skipped tests. Seven credential checks cover salted password hashes, authentication and hash upgrades; three persistence checks cover CSV round trips, quoted fields and payment-account masking. The run used Java 17, temporary synthetic data and headless mode. It did not exercise the Swing interface or the full verification and coverage gates.

[Credential tests](https://github.com/MILTONADINA/POS/blob/d7b940768e4a9287453c9539d4dfc4427feed58d/src/test/java/POSPD/AuthenticationTest.java) · [Persistence tests](https://github.com/MILTONADINA/POS/blob/d7b940768e4a9287453c9539d4dfc4427feed58d/src/test/java/POSDM/PersistenceRoundTripTest.java)

The other table entries describe source implementations and authored test files. Recorded runs are scoped separately for Dr.WHO, the e-commerce API and Point-of-Sale.

[← All case studies](../README.md)
