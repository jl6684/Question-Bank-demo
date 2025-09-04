# Question Bank Structure

This folder contains question images organized by Subject, Year, Topic, and Difficulty Index.

## Folder Structure:
```
questions/
├── Mathematics/
│   ├── 2023/
│   │   ├── Algebra/
│   │   │   ├── Easy/
│   │   │   │   ├── q1.jpg
│   │   │   │   ├── q2.png
│   │   │   │   └── q3.gif
│   │   │   ├── Medium/
│   │   │   │   ├── q1.jpg
│   │   │   │   └── q2.png
│   │   │   └── Hard/
│   │   │       └── q1.jpg
│   │   ├── Geometry/
│   │   │   ├── Easy/
│   │   │   ├── Medium/
│   │   │   └── Hard/
│   │   └── Calculus/
│   │       ├── Easy/
│   │       ├── Medium/
│   │       └── Hard/
│   └── 2024/
│       ├── Algebra/
│       ├── Geometry/
│       └── Statistics/
├── Computer Science/
│   ├── 2023/
│   │   ├── UML Diagrams/
│   │   │   ├── Easy/
│   │   │   ├── Medium/
│   │   │   └── Hard/
│   │   ├── Algorithms/
│   │   │   ├── Easy/
│   │   │   ├── Medium/
│   │   │   └── Hard/
│   │   └── Data Structures/
│   │       ├── Easy/
│   │       ├── Medium/
│   │       └── Hard/
│   └── 2024/
│       ├── Programming/
│       ├── Databases/
│       └── Networks/
└── Physics/
    ├── 2023/
    │   ├── Mechanics/
    │   ├── Thermodynamics/
    │   └── Electromagnetism/
    └── 2024/
        ├── Optics/
        ├── Quantum/
        └── Relativity/
```

## Mark Schemes Structure:
```
mark-schemes/
├── Mathematics/
│   ├── 2023/
│   │   ├── Algebra/
│   │   │   ├── Easy/
│   │   │   │   ├── q1.jpg     # Corresponds to questions/Mathematics/2023/Algebra/Easy/q1.jpg
│   │   │   │   ├── q2.png
│   │   │   │   └── q3.gif
│   │   │   ├── Medium/
│   │   │   └── Hard/
│   │   └── Geometry/
│   └── 2024/
├── Computer Science/
│   ├── 2023/
│   └── 2024/
└── Physics/
    ├── 2023/
    └── 2024/
```

## Organization Hierarchy:
1. **Subject**: Main academic subject (Mathematics, Computer Science, Physics, etc.)
2. **Year**: Academic year or exam year (2020, 2021, 2022, 2023, 2024, 2025)
3. **Topic**: Specific topic within the subject (Algebra, UML Diagrams, Mechanics, etc.)
4. **Difficulty**: Question difficulty level (Easy, Medium, Hard)

## File Naming Conventions:
- Use `q1.jpg`, `q2.png`, etc., OR
- Use `question1.jpg`, `question2.png`, etc., OR
- Use `prob1.jpg`, `prob2.png`, etc., OR
- Use `1.jpg`, `2.png`, etc.
- Supported formats: jpg, jpeg, png, gif, webp, svg

## Mark Schemes:
- Mark schemes should be in the `mark-schemes` folder
- Use the **exact same folder structure** as questions
- Use the **exact same filename** as the corresponding question
- If a question doesn't have a mark scheme, the system will still work

## Adding New Content:

### 1. Adding a New Subject:
- Create folder: `questions/NewSubject/`
- Create folder: `mark-schemes/NewSubject/`
- Update the subjects list in `js/app.js` if needed

### 2. Adding a New Year:
- Create folder: `questions/Subject/NewYear/`
- Create folder: `mark-schemes/Subject/NewYear/`

### 3. Adding a New Topic:
- Create folder: `questions/Subject/Year/NewTopic/`
- Create all difficulty folders: `Easy/`, `Medium/`, `Hard/`
- Create corresponding mark-scheme folders

### 4. Adding Questions:
1. Place question image in: `questions/Subject/Year/Topic/Difficulty/q1.jpg`
2. Place mark scheme in: `mark-schemes/Subject/Year/Topic/Difficulty/q1.jpg`
3. The system will automatically detect and load them

## Features:
- **Filtering**: Filter by Subject, Year, Topic, and Difficulty
- **Selection**: Select multiple questions for printing
- **Viewing**: View questions only, mark schemes only, or both
- **Printing**: Generate printable documents with selected questions
- **Navigation**: Browse through questions with keyboard shortcuts
- **Fullscreen**: Click any image for fullscreen viewing

## Tips:
- Keep filenames simple and sequential (q1, q2, q3...)
- Use consistent image formats within each topic
- Organize by difficulty to help with study progression
- Include both questions and mark schemes for best experience
- Use descriptive folder names for topics
