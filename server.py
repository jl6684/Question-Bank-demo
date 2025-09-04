#!/usr/bin/env python3
"""
Simple HTTP server for Question Bank
Provides an API endpoint to list questions dynamically
"""

import os
import json
import mimetypes
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

class QuestionBankHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/questions':
            self.handle_api_questions()
        else:
            # Serve static files
            super().do_GET()
    
    def handle_api_questions(self):
        """API endpoint to list all questions"""
        try:
            questions = self.scan_questions()
            response = {'questions': questions}
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            error_response = {'error': str(e)}
            self.wfile.write(json.dumps(error_response).encode())
    
    def scan_questions(self):
        """Scan questions directory and return list of questions"""
        questions = []
        questions_dir = 'questions'
        
        if not os.path.exists(questions_dir):
            return questions
        
        # Supported image extensions
        image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}
        
        # Scan each category directory
        for category in os.listdir(questions_dir):
            category_path = os.path.join(questions_dir, category)
            
            if not os.path.isdir(category_path):
                continue
            
            # Scan files in category
            for filename in os.listdir(category_path):
                file_path = os.path.join(category_path, filename)
                
                if os.path.isfile(file_path):
                    _, ext = os.path.splitext(filename.lower())
                    
                    if ext in image_extensions:
                        question_id = f"{category}_{os.path.splitext(filename)[0]}"
                        relative_path = f"questions/{category}/{filename}"
                        
                        # Extract question number from filename
                        question_num = self.extract_question_number(filename)
                        title = f"Question {question_num}" if question_num else filename
                        
                        questions.append({
                            'id': question_id,
                            'category': category,
                            'filename': filename,
                            'path': relative_path,
                            'title': title
                        })
        
        # Sort questions by category and then by filename
        questions.sort(key=lambda x: (x['category'], x['filename']))
        return questions
    
    def extract_question_number(self, filename):
        """Extract question number from filename"""
        import re
        
        # Remove extension
        name = os.path.splitext(filename)[0]
        
        # Try to find number in various patterns
        patterns = [
            r'q(\d+)',           # q1, q2, etc.
            r'question(\d+)',    # question1, question2, etc.
            r'prob(\d+)',        # prob1, prob2, etc.
            r'^(\d+)$'           # just numbers
        ]
        
        for pattern in patterns:
            match = re.search(pattern, name, re.IGNORECASE)
            if match:
                return match.group(1)
        
        return None

def run_server(port=8000):
    """Run the question bank server"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, QuestionBankHandler)
    
    print(f"🚀 Question Bank Server running at http://localhost:{port}")
    print("📁 Place your question images in the 'questions' folder organized by category")
    print("🌐 Access the API at http://localhost:{port}/api/questions")
    print("⏹️  Press Ctrl+C to stop the server")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
        httpd.server_close()

if __name__ == '__main__':
    import sys
    
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Invalid port number. Using default port 8000.")
    
    run_server(port)
