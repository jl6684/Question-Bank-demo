# 📚 Advanced Question Bank Website

A comprehensive, self-hosted question bank website that displays questions and mark schemes as images. Perfect for educational institutions, exam preparation, and academic content management with advanced filtering and printing capabilities.

## ✨ Enhanced Features

- **Advanced Organization**: Organize by Subject → Year → Topic → Difficulty Index
- **Dual Content**: Support for both questions and mark schemes (answer keys)
- **Smart Filtering**: Filter by Subject, Year, Topic, and Difficulty simultaneously
- **Selective Printing**: Select specific questions and generate printable documents
- **Flexible Viewing**: View questions only, mark schemes only, or both together
- **Question Selection**: Select multiple questions for batch operations
- **Print Options**: Print questions only, mark schemes only, or both with metadata
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Navigation Controls**: Previous/Next, random selection, keyboard shortcuts
- **Fullscreen Viewing**: Click any image for fullscreen examination
- **Auto-Detection**: Automatically discovers and organizes question content
- **Zero Dependencies**: Pure HTML, CSS, and JavaScript - no database required

## 📁 New Folder Structure

The system now uses a hierarchical organization:

```
project-root/
├── questions/                    # Question images
│   ├── Mathematics/
│   │   ├── 2023/
│   │   │   ├── Algebra/
│   │   │   │   ├── Easy/
│   │   │   │   │   ├── q1.jpg
│   │   │   │   │   ├── q2.png
│   │   │   │   │   └── q3.gif
│   │   │   │   ├── Medium/
│   │   │   │   │   ├── q1.jpg
│   │   │   │   │   └── q2.png
│   │   │   │   └── Hard/
│   │   │   │       └── q1.jpg
│   │   │   ├── Geometry/
│   │   │   └── Calculus/
│   │   └── 2024/
│   ├── Computer Science/
│   │   ├── 2023/
│   │   │   ├── UML Diagrams/
│   │   │   ├── Algorithms/
│   │   │   └── Data Structures/
│   │   └── 2024/
│   └── Physics/
├── mark-schemes/                 # Answer key images (same structure)
│   ├── Mathematics/
│   │   ├── 2023/
│   │   │   ├── Algebra/
│   │   │   │   ├── Easy/
│   │   │   │   │   ├── q1.jpg  # Corresponds to question q1.jpg
│   │   │   │   │   ├── q2.png
│   │   │   │   │   └── q3.gif
│   │   │   │   ├── Medium/
│   │   │   │   └── Hard/
│   │   │   ├── Geometry/
│   │   │   └── Calculus/
│   │   └── 2024/
│   ├── Computer Science/
│   └── Physics/
├── index.html
├── css/
├── js/
└── README.md
```

## 🚀 Quick Start

### Option 1: Static File Hosting (Simplest)

1. **Download/Clone** this repository
2. **Organize your content** using the new structure:
   ```
   questions/Subject/Year/Topic/Difficulty/q1.jpg
   mark-schemes/Subject/Year/Topic/Difficulty/q1.jpg
   ```
3. **Open `index.html`** in a web browser or host on any web server

### Example Setup:
```
questions/
├── Mathematics/
│   └── 2024/
│       └── Algebra/
│           ├── Easy/
│           │   ├── q1.jpg
│           │   └── q2.png
│           └── Medium/
│               └── q1.jpg
└── Computer Science/
    └── 2024/
        └── UML Diagrams/
            └── Medium/
                ├── q1.png
                └── q2.jpg

mark-schemes/
├── Mathematics/
│   └── 2024/
│       └── Algebra/
│           ├── Easy/
│           │   ├── q1.jpg    # Answer for Math/2024/Algebra/Easy/q1.jpg
│           │   └── q2.png
│           └── Medium/
│               └── q1.jpg
└── Computer Science/
    └── 2024/
        └── UML Diagrams/
            └── Medium/
                ├── q1.png
                └── q2.jpg
```

### Option 2: Web Server Hosting

Upload all files to your web server and access via browser. Works with all hosting services.

## 📁 Folder Structure

```
question-bank/
├── index.html          # Main application file
├── css/
│   └── style.css       # Styling
├── js/
│   └── app.js         # Application logic
├── questions/          # Your question images go here
│   ├── category1/
│   ├── category2/
│   └── README.md      # Instructions for organizing questions
├── config.py          # Configuration options
└── README.md          # This file
```

## 🖼️ Adding Content

### Supported Formats
- **Images**: JPG, JPEG, PNG, GIF, WebP, SVG
- **Naming**: q1.jpg, q2.png, question1.jpg, prob1.gif, 1.png, etc.

### Content Organization Workflow

#### 1. Adding a New Subject
```bash
# Create folders for both questions and mark schemes
mkdir -p "questions/New Subject/2024"
mkdir -p "mark-schemes/New Subject/2024"
```

#### 2. Adding a New Topic
```bash
# Create topic with all difficulty levels
mkdir -p "questions/Mathematics/2024/New Topic/Easy"
mkdir -p "questions/Mathematics/2024/New Topic/Medium" 
mkdir -p "questions/Mathematics/2024/New Topic/Hard"

# Create corresponding mark-scheme folders
mkdir -p "mark-schemes/Mathematics/2024/New Topic/Easy"
mkdir -p "mark-schemes/Mathematics/2024/New Topic/Medium"
mkdir -p "mark-schemes/Mathematics/2024/New Topic/Hard"
```

#### 3. Adding Questions and Mark Schemes
```bash
# Add question image
questions/Mathematics/2024/Algebra/Easy/q1.jpg

# Add corresponding mark scheme (same filename)
mark-schemes/Mathematics/2024/Algebra/Easy/q1.jpg
```

### Content Guidelines
- **Consistent Naming**: Use sequential numbering (q1, q2, q3...)
- **Matching Files**: Mark schemes should have the same filename as questions
- **Proper Difficulty**: Place questions in appropriate difficulty folders
- **Clear Images**: Use high-resolution images for better readability
- **Logical Organization**: Group related questions in the same topic

### Example Content Addition
```
# Step 1: Decide on organization
Subject: Computer Science
Year: 2024
Topic: UML Diagrams  
Difficulty: Medium

# Step 2: Create folders (if they don't exist)
questions/Computer Science/2024/UML Diagrams/Medium/
mark-schemes/Computer Science/2024/UML Diagrams/Medium/

# Step 3: Add files
questions/Computer Science/2024/UML Diagrams/Medium/q1.png      # Question image
mark-schemes/Computer Science/2024/UML Diagrams/Medium/q1.png  # Answer key image

# Step 4: The system will automatically detect and display them
```

## 🎮 Advanced Usage

### Content Organization
The system uses a 4-level hierarchy:
1. **Subject**: Academic subject (Mathematics, Computer Science, Physics, etc.)
2. **Year**: Academic or exam year (2020, 2021, 2022, 2023, 2024, 2025)
3. **Topic**: Specific topic within the subject (Algebra, UML Diagrams, Mechanics)
4. **Difficulty**: Question difficulty level (Easy, Medium, Hard)

### Navigation & Controls
- **Filtering**: Use dropdown menus to filter by Subject, Year, Topic, and Difficulty
- **Navigation**: Previous/Next buttons or arrow keys (← →)
- **Random Question**: Click 🎲 Random button or press Spacebar
- **View Modes**: 
  - 📄 **Question Only**: View just the question image
  - 📝 **Mark Scheme Only**: View just the answer key
  - 📋 **Both**: View question and mark scheme together
- **Fullscreen**: Click 🔍 Fullscreen button or click on any image
- **Exit Fullscreen**: Press Escape or click outside image

### Question Selection & Printing
1. **Select Questions**: 
   - Click ☑️ Select to choose current question
   - Use "Select All" to select all filtered questions
   - Use "Clear All" to deselect everything
2. **Print Selected Questions**:
   - Click 🖨️ Print Selected button
   - Choose print options:
     - Questions Only
     - Mark Schemes Only  
     - Questions + Mark Schemes
   - Include/exclude metadata (Subject, Year, Topic, Difficulty)
   - Generate and print document

### Keyboard Shortcuts
- `← Left Arrow`: Previous question
- `→ Right Arrow`: Next question
- `Space`: Random question
- `S`: Select/deselect current question
- `Escape`: Exit fullscreen mode

### Advanced Features
- **Smart Filtering**: Combine multiple filters for precise question selection
- **Batch Operations**: Select multiple questions across different filters
- **Professional Printing**: Generate properly formatted print documents
- **Metadata Display**: See question details (Subject, Year, Topic, Difficulty)
- **Mark Scheme Integration**: Seamlessly switch between questions and answers

## 🌐 Deployment Options

### 1. Local File (Simplest)
Just open `index.html` in any web browser. Perfect for offline use.

### 2. GitHub Pages
1. Fork/upload this repository to GitHub
2. Enable GitHub Pages in repository settings
3. Access via `https://yourusername.github.io/question-bank`

### 3. Netlify
1. Drag and drop the folder to [netlify.com](https://netlify.com)
2. Get instant hosting with custom domain options

### 4. Traditional Web Hosting
Upload all files to any web hosting service that supports static files.

### 5. Local Web Server
For development or local network access:

**Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Node.js:**
```bash
npx http-server
```

**PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🔧 Advanced Configuration

### Adding More Categories
Edit the `CATEGORIES` array in `config.py` or modify the JavaScript in `app.js` to include your category folder names.

### Custom Question Patterns
The system looks for these naming patterns:
- `q1.jpg`, `q2.png`, etc.
- `question1.jpg`, `question2.png`, etc.

To add custom patterns, modify the `scanQuestionsDirectory()` function in `app.js`.

### Backend Integration (Optional)
For larger question banks, you can add a simple backend:

**PHP Example** (save as `api/questions.php`):
```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

function scanDirectory($dir) {
    $questions = [];
    $categories = array_filter(glob($dir . '/*'), 'is_dir');
    
    foreach ($categories as $categoryPath) {
        $category = basename($categoryPath);
        $files = glob($categoryPath . '/*.{jpg,jpeg,png,gif,webp,svg}', GLOB_BRACE);
        
        foreach ($files as $file) {
            $filename = basename($file);
            $questions[] = [
                'id' => $category . '_' . pathinfo($filename, PATHINFO_FILENAME),
                'category' => $category,
                'filename' => $filename,
                'path' => 'questions/' . $category . '/' . $filename,
                'title' => 'Question ' . pathinfo($filename, PATHINFO_FILENAME)
            ];
        }
    }
    
    return $questions;
}

$questions = scanDirectory('../questions');
echo json_encode(['questions' => $questions]);
?>
```

Then switch to `QuestionBankWithAPI` in `app.js`.

## 🎨 Customization

### Themes
Edit `css/style.css` to customize:
- Colors
- Fonts
- Layout
- Animations

### Branding
- Update the title in `index.html`
- Add your logo/branding
- Modify the color scheme

## 🐛 Troubleshooting

### Questions Not Loading
1. **Check file structure**: Ensure questions are in `/questions/category/` folders
2. **Check file names**: Use `q1.jpg`, `q2.png` etc. or `question1.jpg`, `question2.png` etc.
3. **Check file formats**: Only JPG, PNG, GIF, WebP, SVG are supported
4. **Browser console**: Open developer tools (F12) to see error messages

### Categories Not Showing
1. **Folder naming**: Make sure category folders don't have spaces or special characters
2. **At least one question**: Each category needs at least one properly named image

### Images Not Displaying
1. **File paths**: Ensure images are accessible from the web server
2. **File permissions**: Make sure files are readable
3. **CORS issues**: If using local files, serve through a web server

## 📱 Browser Compatibility

Works on all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Mobile browsers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 💡 Ideas for Enhancement

- [x] **Question & Mark Scheme Support** - Implemented
- [x] **Advanced Filtering System** - Implemented  
- [x] **Question Selection & Printing** - Implemented
- [x] **Professional Print Layouts** - Implemented
- [x] **Multi-level Organization** - Implemented
- [ ] Question timer/scoring system
- [ ] Bookmark favorite questions
- [ ] Question search functionality
- [ ] Multiple choice overlay support
- [ ] Progress tracking and statistics
- [ ] Export question lists to various formats
- [ ] Admin panel for question management
- [ ] Bulk upload functionality
- [ ] Question tagging system
- [ ] User accounts and personalization
- [ ] Question difficulty auto-adjustment
- [ ] Analytics and usage reporting

## 🆘 Support & Troubleshooting

### Common Issues

#### Questions Not Loading
1. **Check folder structure**: Ensure you're using the 4-level hierarchy: Subject/Year/Topic/Difficulty
2. **Check file names**: Use sequential naming (q1.jpg, q2.png, etc.)
3. **Check file formats**: Only JPG, PNG, GIF, WebP, SVG are supported
4. **Browser console**: Open developer tools (F12) to see error messages

#### Mark Schemes Not Showing
1. **Matching structure**: Mark schemes must use identical folder structure as questions
2. **Matching filenames**: Mark scheme files must have exact same names as question files
3. **File accessibility**: Ensure mark scheme images are accessible from web server

#### Filters Not Working
1. **Content exists**: Make sure you have questions in the selected filters
2. **Folder naming**: Avoid spaces and special characters in folder names
3. **Case sensitivity**: Check if your web server is case-sensitive

#### Printing Issues
1. **Selection**: Make sure you have selected questions before printing
2. **Image loading**: Wait for images to fully load before printing
3. **Browser compatibility**: Use a modern browser for best print results

### Getting Help
1. Check the troubleshooting section above
2. Look at the browser console for error messages
3. Verify your folder structure matches the documentation
4. Test with a simple setup first (one subject, one year, one topic)

---

**Happy Learning! 📚✨**

*This enhanced question bank system supports comprehensive academic content management with professional printing capabilities.*
