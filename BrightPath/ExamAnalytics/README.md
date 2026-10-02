# Exam Analytics

**Related administration tool: local assessment analysis and reports**

The application is designed for teachers and department staff who need to enter assessment data, compare results and prepare reports without a required cloud connection. My implementation uses Flutter, local SQLite persistence and native PDF/printing support.

## Engineering decisions

- **Local persistence:** SQLite and drift provide typed local data access. This keeps the analysis workflow independent of a remote service while leaving device security, backups and exported-file handling as separate responsibilities.
- **Local access gate:** A PIN-based gate with bcrypt hashing fits the offline workflow. It is distinct from database encryption or a cloud account system.
- **Reporting:** The application includes score entry, grading, distributions, rankings and printable reports.
- **Feature organization:** Feature-oriented modules keep the related interface, data access and behavior together. The public case describes the design without publishing the private schema or module inventory.

**Technology:** Flutter/Dart, SQLite/drift, Riverpod, bcrypt, charting and PDF/printing packages.

## Implementation and test stage

The **May 2026** source record documents the data and feature implementation. The test entry was still a placeholder, so this case makes no passing-test or completed release claim. The recorded analyzer output had zero errors with informational hints; that is separate from behavioral test coverage.

This companion addresses assessment analysis, while BrightPath covers broader school administration. No client records, interface captures or source are included.

[← BrightPath](../README.md) · [All case studies](../../README.md)
