# Question Bank Configuration

# Subjects to scan for questions
SUBJECTS = [
    "Mathematics",
    "Computer Science", 
    "Physics",
    "Chemistry",
    "Biology",
    "Engineering"
]

# Years to scan for questions
YEARS = [
    "2020", "2021", "2022", "2023", "2024", "2025"
]

# Topics for each subject (add more as needed)
TOPICS = {
    "Mathematics": [
        "Algebra", "Geometry", "Calculus", "Statistics", 
        "Trigonometry", "Probability", "Number Theory"
    ],
    "Computer Science": [
        "UML Diagrams", "Algorithms", "Data Structures", 
        "Programming", "Databases", "Networks", "Security"
    ],
    "Physics": [
        "Mechanics", "Thermodynamics", "Electromagnetism", 
        "Optics", "Quantum", "Relativity", "Waves"
    ],
    "Chemistry": [
        "Organic", "Inorganic", "Physical", "Analytical", 
        "Biochemistry", "Thermochemistry"
    ],
    "Biology": [
        "Cell Biology", "Genetics", "Evolution", "Ecology", 
        "Anatomy", "Physiology", "Botany"
    ],
    "Engineering": [
        "Structural", "Electrical", "Mechanical", "Civil", 
        "Software", "Chemical", "Aerospace"
    ]
}

# Difficulty levels
DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"]

# Supported image formats
IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "svg"]

# Question naming patterns to look for
QUESTION_PATTERNS = [
    "q{number}.{ext}",           # q1.jpg, q2.png
    "question{number}.{ext}",    # question1.jpg, question2.png
    "prob{number}.{ext}",        # prob1.jpg, prob2.png
    "{number}.{ext}"             # 1.jpg, 2.png
]

# Maximum number of questions to scan per topic/difficulty combination
MAX_QUESTIONS_PER_CATEGORY = 50

# Folder structure
QUESTIONS_FOLDER = "questions"
MARK_SCHEMES_FOLDER = "mark-schemes"

# Expected folder structure: 
# questions/Subject/Year/Topic/Difficulty/q1.jpg
# mark-schemes/Subject/Year/Topic/Difficulty/q1.jpg
