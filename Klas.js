
        const courses = [
            {
                id: 1,
                name: "Advanced Mathematics",
                subject: "Math",
                teacher: "Ms. Ming-ming",
                enrolled: null,
                progress: 0,
                badge: null,
                overview: "Master advanced mathematical concepts including calculus, statistics, and algebraic functions. This course prepares students for college-level mathematics.",
                topics: ["Calculus Fundamentals", "Statistical Analysis", "Advanced Algebra", "Trigonometry", "Mathematical Modeling"],
                badgeRequirement: "Complete all modules with 80% or higher average",
                lessons: [
                    {
                        title: "Introduction to Limits",
                        duration: "45 min",
                        content: "Understanding the concept of limits is fundamental to calculus. A limit describes the value that a function approaches as the input approaches some value.",
                        objectives: ["Define what a limit is", "Calculate basic limits", "Understand continuity"],
                        completed: null
                    },
                    {
                        title: "Derivative Fundamentals",
                        duration: "60 min",
                        content: "Derivatives measure how a function changes as its input changes. This is the foundation for understanding rates of change in mathematics.",
                        objectives: ["Calculate derivatives using basic rules", "Apply the power rule", "Understand geometric interpretation"],
                        completed: null
                    },
                    {
                        title: "Applications of Derivatives",
                        duration: "50 min",
                        content: "Learn how derivatives are used in real-world scenarios including optimization problems and motion analysis.",
                        objectives: ["Solve optimization problems", "Analyze motion", "Find critical points"],
                        completed: null
                    }
                ],
                practices: [
                    {
                        title: "Limit Calculation Practice",
                        type: "Problem Set",
                        problems: 15,
                        timeLimit: "30 min",
                        difficulty: "Beginner",
                        completed: null,
                        score: 0
                    },
                    {
                        title: "Derivative Rules Worksheet",
                        type: "Interactive",
                        problems: 20,
                        timeLimit: "45 min",
                        difficulty: "Intermediate",
                        completed: null,
                        score: 0
                    },
                    {
                        title: "Real-World Applications",
                        type: "Project",
                        problems: 5,
                        timeLimit: "2 hours",
                        difficulty: "Advanced",
                        completed: null,
                        score: null
                    }
                ],
                quiz: {
                    title: "Chapter 1: Limits and Derivatives",
                    questions: [
                        { question: "What is the limit of f(x) = x² as x approaches 2?", options: ["2", "4", "8", "16"], correct: 1 },
                        { question: "The derivative of x³ is:", options: ["x²", "3x²", "3x", "x³"], correct: 1 }
                    ]
                },
                examples: [
                    { title: "Finding Limits", description: "Step-by-step process to calculate limits using algebraic methods" },
                    { title: "Derivative Applications", description: "Real-world applications of derivatives in physics and economics" }
                ],
                resources: [
                    { name: "Calculus Reference Guide", type: "PDF", size: "2.3 MB" },
                    { name: "Practice Problems Set 1", type: "PDF", size: "1.8 MB" },
                    { name: "Graphing Calculator Tutorial", type: "Video", size: "45 MB" }
                ]
            },
            {
                id: 2,
                name: "Physics Fundamentals",
                subject: "Science",
                teacher: "Mr. Kupal",
                enrolled: null,
                progress: 0,
                badge: null,
                overview: "Explore the fundamental principles of physics including mechanics, thermodynamics, and electromagnetism through hands-on experiments and theoretical study.",
                topics: ["Classical Mechanics", "Thermodynamics", "Electromagnetism", "Wave Physics", "Modern Physics"],
                badgeRequirement: "Complete lab experiments and maintain 85% average",
                lessons: [
                    {
                        title: "Newton's Laws of Motion",
                        duration: "55 min",
                        content: "Explore the three fundamental laws that govern motion in our universe, from everyday objects to celestial bodies.",
                        objectives: ["Understand each of Newton's three laws", "Apply laws to solve problems", "Analyze force diagrams"],
                        completed: null
                    },
                    {
                        title: "Energy and Work",
                        duration: "50 min",
                        content: "Learn about different forms of energy and how work relates to energy transfer in physical systems.",
                        objectives: ["Define kinetic and potential energy", "Calculate work done by forces", "Apply conservation of energy"],
                        completed: null
                    },
                    {
                        title: "Waves and Sound",
                        duration: "65 min",
                        content: "Understand wave properties, sound propagation, and the physics behind musical instruments.",
                        objectives: ["Describe wave characteristics", "Calculate wave speed", "Explain sound phenomena"],
                        completed: null
                    }
                ],
                practices: [
                    {
                        title: "Force and Motion Problems",
                        type: "Lab Simulation",
                        problems: 12,
                        timeLimit: "40 min",
                        difficulty: "Beginner",
                        completed: null,
                        score: 0
                    },
                    {
                        title: "Energy Conservation Lab",
                        type: "Hands-on Lab",
                        problems: 8,
                        timeLimit: "90 min",
                        difficulty: "Intermediate",
                        completed: null,
                        score: 0
                    },
                    {
                        title: "Wave Analysis Project",
                        type: "Research Project",
                        problems: 3,
                        timeLimit: "1 week",
                        difficulty: "Advanced",
                        completed: null,
                        score: null
                    }
                ],
                quiz: {
                    title: "Motion and Forces Quiz",
                    questions: [
                        { question: "Newton's first law states that:", options: ["F=ma", "Objects at rest stay at rest", "Action equals reaction", "Energy is conserved"], correct: 1 },
                        { question: "The unit of force is:", options: ["Joule", "Newton", "Watt", "Pascal"], correct: 1 }
                    ]
                },
                examples: [
                    { title: "Projectile Motion", description: "Calculate trajectory of objects under gravity" },
                    { title: "Circuit Analysis", description: "Analyze simple electrical circuits using Ohm's law" }
                ],
                resources: [
                    { name: "Physics Formula Sheet", type: "PDF", size: "1.5 MB" },
                    { name: "Lab Manual", type: "PDF", size: "5.2 MB" },
                    { name: "Simulation Software", type: "Software", size: "120 MB" }
                ]
            },
            {
                id: 3,
                name: "English Literature",
                subject: "English",
                teacher: "Mrs. Ampang",
                enrolled: null,
                progress:  0,
                badge: null,
                overview: "Analyze classic and contemporary literature, develop critical thinking skills, and improve writing techniques through comprehensive study of various literary genres.",
                topics: ["Poetry Analysis", "Novel Studies", "Drama and Theater", "Creative Writing", "Literary Criticism"],
                badgeRequirement: "Submit all essays and achieve 80% on final portfolio",
                discussions: [
                    { author: "Mrs. Davis", time: "1 day ago", message: "Please read chapters 1-3 of 'To Kill a Mockingbird' for our discussion tomorrow." },
                    { author: "Emma L.", time: "4 hours ago", message: "The symbolism in this novel is incredible!" }
                ],
                quiz: {
                    title: "Poetry Elements Quiz",
                    questions: [
                        { question: "What is a metaphor?", options: ["Direct comparison", "Indirect comparison", "Sound repetition", "Rhythm pattern"], correct: 1 },
                        { question: "Iambic pentameter has how many syllables per line?", options: ["8", "10", "12", "14"], correct: 1 }
                    ]
                },
                examples: [
                    { title: "Sonnet Analysis", description: "Breaking down Shakespeare's Sonnet 18" },
                    { title: "Character Development", description: "Tracking character arcs in modern novels" }
                ],
                resources: [
                    { name: "Literary Terms Glossary", type: "PDF", size: "800 KB" },
                    { name: "Essay Writing Guide", type: "PDF", size: "1.2 MB" },
                    { name: "Audio Book Collection", type: "Audio", size: "2.1 GB" }
                ]
            },
            {
                id: 4,
                name: "World History",
                subject: "History",
                teacher: "Mr. Bossing",
                enrolled: null,
                progress: 0,
                badge: null,
                overview: "Journey through major historical events, civilizations, and cultural developments that shaped our modern world from ancient times to the present.",
                topics: ["Ancient Civilizations", "Medieval Period", "Renaissance", "Industrial Revolution", "Modern Era"],
                badgeRequirement: "Complete research project and score 80% on comprehensive exam",
                discussions: [
                    { author: "Mr. Wilson", time: "2 days ago", message: "Excellent presentations on the Industrial Revolution! Next topic: World War impacts." },
                    { author: "Alex K.", time: "6 hours ago", message: "The primary sources from WWI were eye-opening." }
                ],
                quiz: {
                    title: "Ancient Civilizations Quiz",
                    questions: [
                        { question: "Which river was crucial to Egyptian civilization?", options: ["Tigris", "Euphrates", "Nile", "Indus"], correct: 2 },
                        { question: "The Roman Empire fell in:", options: ["410 AD", "476 AD", "500 AD", "550 AD"], correct: 1 }
                    ]
                },
                examples: [
                    { title: "Primary Source Analysis", description: "Examining historical documents and artifacts" },
                    { title: "Timeline Creation", description: "Building comprehensive historical timelines" }
                ],
                resources: [
                    { name: "World History Atlas", type: "PDF", size: "15 MB" },
                    { name: "Documentary Collection", type: "Video", size: "8.5 GB" },
                    { name: "Historical Maps Pack", type: "Images", size: "250 MB" }
                ]
            },
            {
                id: 5,
                name: "Computer Programming",
                subject: "Technology",
                teacher: "Ms. Ging-ging",
                enrolled: null,
                progress: 0,
                badge: null,
                overview: "Learn fundamental programming concepts using Python and JavaScript. Build real-world applications and develop problem-solving skills through coding projects.",
                topics: ["Python Basics", "JavaScript Fundamentals", "Web Development", "Data Structures", "Algorithm Design"],
                badgeRequirement: "Complete final project and achieve 90% on coding assessments",
                discussions: [
                    { author: "Ms. Garcia", time: "5 hours ago", message: "Great progress on your web projects! Remember to test your code thoroughly." },
                    { author: "David P.", time: "2 hours ago", message: "The JavaScript tutorial was really helpful!" }
                ],
                quiz: {
                    title: "Python Fundamentals Quiz",
                    questions: [
                        { question: "Which keyword is used to define a function in Python?", options: ["function", "def", "define", "func"], correct: 1 },
                        { question: "What does 'len()' function return?", options: ["Length", "Last element", "List", "Loop"], correct: 0 }
                    ]
                },
                examples: [
                    { title: "Building a Calculator", description: "Step-by-step calculator application development" },
                    { title: "Web Scraping Basics", description: "Extract data from websites using Python" }
                ],
                resources: [
                    { name: "Python Cheat Sheet", type: "PDF", size: "500 KB" },
                    { name: "Code Examples", type: "ZIP", size: "2.8 MB" },
                    { name: "Development Tools", type: "Software", size: "450 MB" }
                ]
            },
            {
                id: 6,
                name: "Chemistry Lab",
                subject: "Science",
                teacher: "Dr. Kwak-kwak",
                enrolled: null,
                progress: 0,
                badge: null,
                overview: "Hands-on laboratory experience exploring chemical reactions, molecular structures, and analytical techniques. Safety protocols and scientific method emphasized.",
                topics: ["Atomic Structure", "Chemical Bonding", "Reactions & Equations", "Organic Chemistry", "Laboratory Techniques"],
                badgeRequirement: "Complete all lab reports and pass safety certification",
                discussions: [
                    { author: "Dr. Brown", time: "1 day ago", message: "Safety reminder: Always wear goggles and follow proper disposal procedures." },
                    { author: "Lisa T.", time: "8 hours ago", message: "The titration experiment results were surprising!" }
                ],
                quiz: {
                    title: "Chemical Bonding Quiz",
                    questions: [
                        { question: "What type of bond forms between metals and non-metals?", options: ["Covalent", "Ionic", "Metallic", "Hydrogen"], correct: 1 },
                        { question: "The periodic table is organized by:", options: ["Mass", "Atomic number", "Electrons", "Neutrons"], correct: 1 }
                    ]
                },
                examples: [
                    { title: "Balancing Equations", description: "Master the art of chemical equation balancing" },
                    { title: "pH Calculations", description: "Understanding acids, bases, and pH scale" }
                ],
                resources: [
                    { name: "Periodic Table Reference", type: "PDF", size: "1.1 MB" },
                    { name: "Lab Safety Manual", type: "PDF", size: "3.2 MB" },
                    { name: "Molecular Models", type: "3D Files", size: "85 MB" }
                ]
            },
            {
                id: 7,
                name: "Art & Design",
                subject: "Arts",
                teacher: "Ms. Topacio",
                enrolled: null,
                progress: 0,
                badge: null,
                overview: "Explore various art forms and design principles through hands-on creative projects.",
                topics: ["Drawing Fundamentals", "Color Theory", "Digital Design", "Art History", "Portfolio Development"],
                badgeRequirement: "Complete portfolio with 10 original pieces" },


            {
                id: 8,  
                name: "Spanish Language",
                subject: "Foreign Languange",
                teacher: "Señora Martinez",
                enrolled: false,
                progress: 0,
                badge: null, overview: "Develop conversational Spanish skills through immersive learning techniques.", topics: ["Basic Grammar", "Vocabulary Building", "Conversation Practice", "Cultural Studies", "Writing Skills"], badgeRequirement: "Pass oral proficiency exam" },


            {
                id: 9,
                name: "Economics",
                subject: "Social Studies",
                teacher: "Mr. Anderson",
                enrolled: false,
                progress: 0,
                badge: null,
                overview: "Understand economic principles and their real-world applications.",
                topics: ["Supply & Demand", "Market Systems", "Personal Finance", "Global Economics", "Economic Policy"],
                badgeRequirement: "Complete market analysis project" },


            {
                id: 10,
                name: "Biology",
                subject: "Science",
                teacher: "Dr. Lee",
                enrolled: false,
                progress: 0,
                badge: null,
                overview: "Study living organisms and biological processes through lab work and field studies.",
                topics: ["Cell Biology", "Genetics", "Evolution", "Ecology", "Human Biology"], badgeRequirement: "Complete research project and lab practicum" },


            {
                id: 11,
                name: "Music Theory",
                subject: "Arts",
                eacher: "Mr. Thompson",
                enrolled: false,
                progress: 0,
                badge: null,
                overview: "Learn the fundamentals of music composition and analysis.",
                topics: ["Scales & Modes", "Harmony", "Rhythm", "Composition", "Music History"],
                badgeRequirement: "Compose and perform original piece" },


            {
                id: 12,
                name: "Physical Education",
                subject: "PE",
                teacher: "Coach Tse",
                enrolled: false,
                progress: 0,
                badge: null,
                overview: "Develop physical fitness and learn various sports and activities.",
                topics: ["Fitness Training", "Team Sports", "Individual Sports", "Health Education", "Nutrition"],
                badgeRequirement: "Meet fitness benchmarks and complete health project" }
        ];
            //teacher tab
        const teachers = [
            { name: "Ms. Ming-ming", subject: "Mathematics", email: "ming-ming@kupal.edu.ph", phone: "+63 9XX XXX XXXX", experience: "8 years" },
            { name: "Mr. Kupal", subject: "Physics", email: "kupal@kuapal.edu.ph", phone: "+63 9XX XXX XXXX", experience: "12 years" },
            { name: "Mrs. Ampang", subject: "English", email: "ampang@kupal.edu.ph", phone: "+63 9XX XXX XXXX", experience: "15 years" },
            { name: "Mr. Bossing", subject: "History", email: "bossing@kupal.edu.ph", phone: "+63 9XX XXX XXXX", experience: "10 years" },
            { name: "Ms. Ging-ging", subject: "Technology", email: "ging-ging@kupal.edu.ph", phone: "+63 9XX XXX XXXX", experience: "6 years" },
            { name: "Dr. Kwak-kwak", subject: "Chemistry", email: "kwak-kwak@edu.ph.edu", phone: "+63 9XX XXX XXXX", experience: "20 years" }
        ];
            // badges part
        const badges = [
            { name: "Math Wizard", icon: "🧙‍♂️", color: "blue", earned: true },
            { name: "Science Explorer", icon: "🔬", color: "green", earned: true },
            { name: "Literary Scholar", icon: "📚", color: "purple", earned: true },
            { name: "History Buff", icon: "🏛️", color: "yellow", earned: true },
            { name: "Tech Innovator", icon: "💻", color: "indigo", earned: false },
            { name: "Chemistry Master", icon: "⚗️", color: "red", earned: false }
        ];


        let currentCourse = null;
        let currentTab = 'lessons';


        // Navigation
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.add('hidden');
            });
           
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
           
            // Show selected section
            document.getElementById(sectionId).classList.remove('hidden');
           
            // Add active class to clicked nav item
            event.target.classList.add('active');
           
            // Update content based on section
            if (sectionId === 'courses') {
                updateAllCourses();
            } else if (sectionId === 'my-courses') {
                updateEnrolledCourses();
            } else if (sectionId === 'teachers') {
                updateTeachers();
            } else if (sectionId === 'account') {
                updateAccountInfo();
            }
        }


        // Course detail view
        function viewCourse(courseId) {
            currentCourse = courses.find(c => c.id === courseId);
            if (currentCourse) {
                showCourseDetail();
            }
        }


        function showCourseDetail() {
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.add('hidden');
            });
           
            // Show course detail
            document.getElementById('course-detail').classList.remove('hidden');
           
            // Update course header
            const header = document.getElementById('courseHeader');
            header.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-800">${currentCourse.name}</h2>
                        <p class="text-gray-600 text-lg"> ${currentCourse.teacher} •  ${currentCourse.subject}</p>
                    </div>
                    ${currentCourse.enrolled ?
                        `<div class="text-right">
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Enrolled</span>
                            <div class="mt-2">
                                <div class="text-sm text-gray-600">Progress: ${currentCourse.progress}%</div>
                                <div class="w-32 bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${currentCourse.progress}%"></div>
                                </div>
                            </div>
                        </div>` :
                        `<button onclick="enrollCourse(${currentCourse.id})" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                            Enroll Now
                        </button>`
                    }
                </div>
                <p class="text-gray-700">${currentCourse.overview}</p>
            `;
           
            // Show default tab
            showCourseTab('lessons');
        }


        function showCourseTab(tabName) {
            currentTab = tabName;
           
            // Update tab buttons
            document.querySelectorAll('.course-tab').forEach(tab => {
                tab.classList.remove('tab-active', 'border-blue-500', 'text-blue-600');
                tab.classList.add('border-transparent', 'text-gray-500');
            });
           
            event.target.classList.add('tab-active', 'border-blue-500', 'text-blue-600');
            event.target.classList.remove('border-transparent', 'text-gray-500');
           
            // Update tab content course part tab
            const content = document.getElementById('courseTabContent');
           
            switch(tabName) {
                case 'lessons':
                    content.innerHTML = `
                        <div class="space-y-6">
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <h4 class="font-bold text-blue-800 mb-2">Course Lessons</h4>
                                <p class="text-blue-700 text-sm">Study the course material and track your learning progress.</p>
                            </div>
                            ${currentCourse.lessons ? currentCourse.lessons.map((lesson, index) => `
                                <div class="border border-gray-200 rounded-lg p-6 ${lesson.completed ? 'bg-green-50 border-green-200' : 'bg-white'}">
                                    <div class="flex justify-between items-start mb-4">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-8 h-8 rounded-full flex items-center justify-center ${lesson.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}">
                                                ${lesson.completed ? '✓' : index + 1}
                                            </div>
                                            <div>
                                                <h5 class="font-bold text-lg text-gray-800">${lesson.title}</h5>
                                                <p class="text-sm text-gray-600">⏱️ ${lesson.duration}</p>
                                            </div>
                                        </div>
                                        ${lesson.completed ?
                                            '<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Completed</span>' :
                                            '<span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">In Progress</span>'
                                        }
                                    </div>
                                    <p class="text-gray-700 mb-4">${lesson.content}</p>
                                    <div class="mb-4">
                                        <h6 class="font-medium text-gray-800 mb-2">Learning Objectives:</h6>
                                        <ul class="space-y-1">
                                            ${lesson.objectives.map(obj => `
                                                <li class="flex items-center space-x-2 text-sm text-gray-600">
                                                    <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                                    <span>${obj}</span>
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                    <button onclick="startLesson('${lesson.title}')" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                        ${lesson.completed ? 'Review Lesson' : 'Start Lesson'}
                                    </button>
                                </div>
                            `).join('') : '<p class="text-gray-500">No lessons available yet.</p>'}
                        </div>
                    `;
                    break;
                    
                case 'practices':
                    content.innerHTML = `
                        <div class="space-y-6">
                            <div class="bg-orange-50 p-4 rounded-lg">
                                <h4 class="font-bold text-orange-800 mb-2">Practice Exercises</h4>
                                <p class="text-orange-700 text-sm">Reinforce your learning with hands-on practice problems and activities.</p>
                            </div>
                            ${currentCourse.practices ? currentCourse.practices.map(practice => `
                                <div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                                    <div class="flex justify-between items-start mb-4">
                                        <div>
                                            <h5 class="font-bold text-lg text-gray-800 mb-2">${practice.title}</h5>
                                            <div class="flex items-center space-x-4 text-sm text-gray-600">
                                                <span>📝 ${practice.problems} problems</span>
                                                <span>⏱️ ${practice.timeLimit}</span>
                                                <span class="px-2 py-1 rounded-full text-xs font-medium ${
                                                    practice.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                                    practice.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }">${practice.difficulty}</span>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            ${practice.completed ?
                                                `<div class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">Completed</div>
                                                <div class="text-sm text-gray-600">Score: ${practice.score}%</div>` :
                                                '<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Available</span>'
                                            }
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-2 mb-4">
                                        <span class="text-sm font-medium text-gray-700">Type:</span>
                                        <span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">${practice.type}</span>
                                    </div>
                                    <button onclick="startPractice('${practice.title}')" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                        ${practice.completed ? 'Retry Practice' : 'Start Practice'}
                                    </button>
                                </div>
                            `).join('') : '<p class="text-gray-500">No practice exercises available yet.</p>'}
                        </div>
                    `;
                    break;
                    
                case 'quiz':
                    content.innerHTML = `
                        <div class="space-y-6">
                            <div class="bg-yellow-50 p-4 rounded-lg">
                                <h4 class="font-bold text-yellow-800 mb-2">${currentCourse.quiz ? currentCourse.quiz.title : 'Course Quiz'}</h4>
                                <p class="text-yellow-700 text-sm">Test your knowledge with these practice questions.</p>
                            </div>
                            ${currentCourse.quiz ? currentCourse.quiz.questions.map((q, index) => `
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <h5 class="font-medium text-gray-800 mb-3">Question ${index + 1}: ${q.question}</h5>
                                    <div class="space-y-2">
                                        ${q.options.map((option, optIndex) => `
                                            <label class="flex items-center space-x-2 cursor-pointer">
                                                <input type="radio" name="q${index}" value="${optIndex}" class="text-blue-500">
                                                <span class="text-gray-700">${option}</span>
                                            </label>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('') : '<p class="text-gray-500">No quiz available yet.</p>'}
                            ${currentCourse.quiz ? `
                                <button onclick="submitQuiz()" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                    Submit Quiz
                                </button>
                            ` : ''}
                        </div>
                    `;
                    break;
                    
                case 'examples':
                    content.innerHTML = `
                        <div class="space-y-6">
                            <div class="bg-purple-50 p-4 rounded-lg">
                                <h4 class="font-bold text-purple-800 mb-2">Course Examples</h4>
                                <p class="text-purple-700 text-sm">Practical examples and demonstrations to reinforce learning.</p>
                            </div>
                            ${currentCourse.examples ? currentCourse.examples.map(example => `
                                <div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                                    <h5 class="font-bold text-lg text-gray-800 mb-2">${example.title}</h5>
                                    <p class="text-gray-600 mb-4">${example.description}</p>
                                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                        View Example
                                    </button>
                                </div>
                            `).join('') : '<p class="text-gray-500">No examples available yet.</p>'}
                        </div>
                    `;
                    break;
                    
                case 'resources':
                    content.innerHTML = `
                        <div class="space-y-6">
                            <div class="bg-green-50 p-4 rounded-lg">
                                <h4 class="font-bold text-green-800 mb-2">Course Resources</h4>
                                <p class="text-green-700 text-sm">Download materials, references, and additional learning resources.</p>
                            </div>
                            ${currentCourse.resources ? currentCourse.resources.map(resource => `
                                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            ${resource.type === 'PDF' ? '📄' : resource.type === 'Video' ? '🎥' : resource.type === 'Audio' ? '🎵' : '💾'}
                                        </div>
                                        <div>
                                            <p class="font-medium text-gray-800">${resource.name}</p>
                                            <p class="text-sm text-gray-500">${resource.type} • ${resource.size}</p>
                                        </div>
                                    </div>
                                    <button onclick="downloadResource('${resource.name}')" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                        Download
                                    </button>
                                </div>
                            `).join('') : '<p class="text-gray-500">No resources available yet.</p>'}
                        </div>
                    `;
                    break;
            }
        }


        // Course overview modal --- also for the  button of the modal
        function showCourseOverview(courseId) {
            const course = courses.find(c => c.id === courseId);
            if (course) {
                document.getElementById('modalCourseTitle').textContent = course.name;
                document.getElementById('modalCourseContent').innerHTML = `
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h4 class="text-xl font-bold text-gray-800 mb-4">Course Overview</h4>
                            <p class="text-gray-700 mb-6">${course.overview}</p>
                            
                            <h5 class="font-bold text-gray-800 mb-3">Topics Covered:</h5>
                            <ul class="space-y-2 mb-6">
                                ${course.topics ? course.topics.map(topic => `
                                    <li class="flex items-center space-x-2">
                                        <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        <span class="text-gray-700">${topic}</span>
                                    </li>
                                `).join('') : '<li class="text-gray-500">Topics to be announced</li>'}
                            </ul>
                            
                            <div class="bg-gray-50 p-4 rounded-lg"
                                <p class="text-sm text-gray-600"><strong>Instructor:</strong> ${course.teacher}</p>
                                <p class="text-sm text-gray-600"><strong>Subject:</strong> ${course.subject}</p>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="text-xl font-bold text-gray-800 mb-4">Badge Information</h4>
                            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center mb-6">
                                <div class="text-4xl mb-3">🏆</div>
                                <h5 class="font-bold text-yellow-800 mb-2">${course.badge || 'Course Completion Badge'}</h5>
                                <p class="text-sm text-yellow-700">${course.badgeRequirement || 'Complete all course requirements'}</p>
                            </div>
                            
                            <div class="space-y-4">
                                ${course.enrolled ?
                                    `<div class="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <p class="text-green-800 font-medium">✅ Already Enrolled</p>
                                        <p class="text-sm text-green-600">Progress: ${course.progress}%</p>
                                        <button onclick="viewCourse(${course.id}); closeModal('courseOverviewModal')" class="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full">
                                            Go to Course
                                        </button>
                                    </div>` :
                                    `<button onclick="enrollCourse(${course.id}); closeModal('courseOverviewModal')" class="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors">
                                        Enroll in Course
                                    </button>`
                                }
                            </div>
                        </div>
                    </div>
                `;
                openModal('courseOverviewModal');
            }
        }


        // Modal functions
        function openModal(modalId) {
            document.getElementById(modalId).classList.remove('hidden');
        }


        function closeModal(modalId) {
            document.getElementById(modalId).classList.add('hidden');
        }


        // Form handlers
        function handleLogin(event) {
            event.preventDefault();
            alert('Demo: Login successful! Welcome back to ClasMeyt.');
            closeModal('loginModal');
        }


        function handleRegister(event) {
            event.preventDefault();
            alert('Demo: Account created successfully! Welcome to ClasMeyt.');
            closeModal('registerModal');
        }


        function handleContactForm(event) {
            event.preventDefault();
            alert('Demo: Message sent successfully! We\'ll get back to you soon.');
            event.target.reset();
        }


        function submitQuiz() {
            alert('Demo: Quiz submitted successfully! Results will be available soon.');
        }


        function downloadResource(resourceName) {
            alert(`Demo: Downloading ${resourceName}...`);
        }


        function startLesson(lessonTitle) {
            alert(`Demo: Starting lesson "${lessonTitle}". This would open the lesson content in a learning interface.`);
        }


        function startPractice(practiceTitle) {
            alert(`Demo: Starting practice "${practiceTitle}". This would open the practice exercises interface.`);
        }


        // Course enrollment
        function enrollCourse(courseId) {
            const course = courses.find(c => c.id === courseId);
            if (course) {
                course.enrolled = true;
                course.progress = 0;
                updateAllCourses();
                updateEnrolledCourses();
                updateStats();
                updateAccountInfo();
                alert(`Successfully enrolled in ${course.name}!`);
            }
        }


        function unenrollCourse(courseId) {
            const course = courses.find(c => c.id === courseId);
            if (course) {
                course.enrolled = false;
                course.progress = 0;
                course.badge = null;
                updateAllCourses();
                updateEnrolledCourses();
                updateStats();
                updateAccountInfo();
                alert(`Unenrolled from ${course.name}.`);
            }
        }


        // Update displays for the courses when enrolled ehheheheh
        function updateAllCourses() {
            const container = document.getElementById('allCoursesContainer');
            container.innerHTML = courses.map(course => `
                <div class="bg-gray-100 border border-gray-100 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div class="flex justify-between items-start mb-3">
                        <h4 class="font-bold text-lg text-gray-800 cursor-pointer hover:text-blue-600" onclick="viewCourse(${course.id})">${course.name}</h4>
                        ${course.enrolled ? '<span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Enrolled</span>' : ''}
                    </div>
                    <p class="text-gray-600 mb-2"> ${course.teacher}</p>
                    <p class="text-gray-600 mb-4"> ${course.subject}</p>
                    <div class="flex space-x-2 mb-4">
                        <button onclick="showCourseOverview(${course.id})" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                            View Overview
                        </button>
                        ${course.enrolled ?  //button ng enroll kpag enroll na
                            `<button onclick="unenrollCourse(${course.id})" class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                                Unenroll
                            </button>` : //button ng enroll
                            `<button onclick="enrollCourse(${course.id})" class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                                Enroll
                            </button>`
                        }
                    </div>
                </div>
            `).join('');
        }

        //sa ano toh my courses
        function updateEnrolledCourses() {
            const container = document.getElementById('enrolledCoursesContainer');
            const enrolledCourses = courses.filter(c => c.enrolled);
            
            container.innerHTML = enrolledCourses.map(course => `
                <div class="bg-gray-100 border border-gray-100 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div class="flex justify-between items-start mb-3">
                        <h4 class="font-bold text-lg text-gray-800 cursor-pointer hover:text-blue-600" onclick="viewCourse(${course.id})">${course.name}</h4>
                        ${course.badge ? `<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">🏆 Badge Earned</span>` : ''}
                    </div>
                    <p class="text-gray-600 mb-2"> ${course.teacher}</p>
                    <p class="text-gray-600 mb-4"> ${course.subject}</p>
                    <div class="mb-4">
                        <div class="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>${course.progress}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-500 h-2 rounded-full transition-all duration-300" style="width: ${course.progress}%"></div>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="viewCourse(${course.id})" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                            Enter Course
                        </button>
                        <button onclick="unenrollCourse(${course.id})" class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                            Unenroll
                        </button>
                    </div>
                </div>
            `).join('');
        }
            //teacher container part hehehe
        function updateTeachers() {
            const container = document.getElementById('teachersContainer');
            container.innerHTML = teachers.map(teacher => `
                <div class="bg-gray-100 border border-gray-100 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div class="text-center mb-4">
                        <div class="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                            ${teacher.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h4 class="font-bold text-lg text-gray-800">${teacher.name}</h4>
                        <p class="text-blue-600 font-medium">${teacher.subject}</p>
                    </div>
                    <div class="space-y-2 text-sm">
                        <p class="text-gray-600"> ${teacher.email}</p>
                        <p class="text-gray-600"> ${teacher.phone}</p>
                        <p class="text-gray-600"> ${teacher.experience} experience</p>
                    </div>
                    <button class="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors">
                        Contact Teacher
                    </button>
                </div>
            `).join('');
        }


        function updateAccountInfo() {
            // Update enrolled courses in account
            const enrolledCourses = courses.filter(c => c.enrolled);
            const accountCoursesContainer = document.getElementById('accountEnrolledCourses');
            accountCoursesContainer.innerHTML = enrolledCourses.map(course => `
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100" onclick="viewCourse(${course.id})">
                    <div>
                        <p class="font-medium text-gray-800">${course.name}</p>
                        <p class="text-sm text-gray-600">${course.progress}% complete</p>
                    </div>
                    ${course.badge ? '<span class="text-yellow-500">🏆</span>' : ''}
                </div>
            `).join('');


            // Update badges in account sa account toohh
            const accountBadgesContainer = document.getElementById('accountBadges');
            accountBadgesContainer.innerHTML = badges.map(badge => `
                <div class="text-center p-3 ${badge.earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'} rounded-lg">
                    <div class="text-2xl mb-1">${badge.icon}</div>
                    <p class="text-xs font-medium text-gray-700">${badge.name}</p>
                    ${badge.earned ? '<p class="text-xs text-green-600">Earned!</p>' : '<p class="text-xs text-gray-400">Locked</p>'}
                </div>
            `).join('');
        }


        function updateStats() {
            const enrolledCount = courses.filter(c => c.enrolled).length;
            const earnedBadges = badges.filter(b => b.earned).length;
        
            document.getElementById('enrolledCount').textContent = enrolledCount;
            document.getElementById('badgeCount').textContent = earnedBadges;
        }


        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            updateAllCourses();
            updateEnrolledCourses();
            updateTeachers();
            updateAccountInfo();
            updateStats();
        });


        // Close modals when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal-backdrop')) {
                const modals = ['courseOverviewModal']; // lagay mo dto  yung id ng class mo for the closing trigger
                modals.forEach(modalId => {
                    if (!document.getElementById(modalId).classList.contains('hidden')) {
                        closeModal(modalId);
                    }
                });
            }
        });

    function openModal(id) {
    document.getElementById(id).classList.remove("hidden");
    }

    function closeModal(id) {
    document.getElementById(id).classList.add("hidden");
    }


(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'98065659c46a0663',t:'MTc1ODA4ODM0NC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
