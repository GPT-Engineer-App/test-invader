import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Github, ChevronUp, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useTheme } from "next-themes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr, meow, and hiss.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to six times their length.",
  "A cat's nose print is unique, like a human's fingerprint.",
  "Cats have 32 muscles in each ear.",
  "The oldest known pet cat was found in a 9,500-year-old grave on Cyprus.",
  "A cat's hearing is much more sensitive than a human's or dog's.",
  "Cats can rotate their ears 180 degrees.",
];

const catBreeds = [
  { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg", description: "Known for their distinctive color points and blue almond-shaped eyes." },
  { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg", description: "Recognized for their long, luxurious coat and sweet, gentle nature." },
  { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG", description: "One of the largest domestic cat breeds, known for their intelligence and playful personality." },
  { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg", description: "Wild-looking cats with a spotted or marbled coat, known for their high energy and playfulness." },
  { name: "British Shorthair", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg", description: "Known for their round faces, chunky bodies, and dense, plush coats." },
];

const quizQuestions = [
  {
    question: "What is a group of cats called?",
    options: ["A pride", "A clowder", "A pack", "A herd"],
    correctAnswer: "A clowder"
  },
  {
    question: "How many muscles does a cat have in each ear?",
    options: ["12", "20", "32", "40"],
    correctAnswer: "32"
  },
  {
    question: "What is the average lifespan of a domestic cat?",
    options: ["5-10 years", "10-15 years", "15-20 years", "20-25 years"],
    correctAnswer: "15-20 years"
  }
];

const Index = () => {
  const [catFact, setCatFact] = useState(catFacts[0]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { theme, setTheme } = useTheme();
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateCatFact = () => {
    const randomFact = catFacts[Math.floor(Math.random() * catFacts.length)];
    setCatFact(randomFact);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CatWorld</h1>
          <ul className="flex space-x-4 items-center">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Gallery</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="flex-grow">
        <div className="relative h-[80vh] overflow-hidden">
          <video
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://example.com/cat-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl font-bold text-white shadow-lg"
            >
              Welcome to CatWorld
            </motion.h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Popular Cat Breeds</CardTitle>
                <CardDescription>Swipe to see different cat breeds</CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full max-w-md mx-auto">
                  <CarouselContent>
                    {catBreeds.map((breed, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex flex-col items-center justify-center p-6">
                              <img src={breed.image} alt={breed.name} className="w-full h-64 object-cover rounded-md mb-4" />
                              <h3 className="text-xl font-semibold mb-2">{breed.name}</h3>
                              <p className="text-sm text-center">{breed.description}</p>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Characteristics of Cats</CardTitle>
                  <CardDescription>What makes cats unique?</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6">
                    <li>Independent nature</li>
                    <li>Excellent hunters with sharp claws and teeth</li>
                    <li>Flexible bodies and quick reflexes</li>
                    <li>Keen senses, especially hearing and night vision</li>
                    <li>Communicate through vocalizations, body language, and scent</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Cat Fact Generator</CardTitle>
                  <CardDescription>Learn interesting facts about cats!</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={catFact}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="mb-4"
                    >
                      {catFact}
                    </motion.p>
                  </AnimatePresence>
                  <Button onClick={generateCatFact}>Generate New Fact</Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Cat Quiz</CardTitle>
                <CardDescription>Test your knowledge about cats!</CardDescription>
              </CardHeader>
              <CardContent>
                {!quizCompleted ? (
                  <>
                    <h3 className="text-lg font-semibold mb-4">Question {currentQuestion + 1}</h3>
                    <p className="mb-4">{quizQuestions[currentQuestion].question}</p>
                    <RadioGroup onValueChange={(value) => {
                      if (value === quizQuestions[currentQuestion].correctAnswer) {
                        setQuizScore(quizScore + 1);
                      }
                      if (currentQuestion < quizQuestions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1);
                      } else {
                        setQuizCompleted(true);
                      }
                    }}>
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <div className="flex items-center space-x-2" key={index}>
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">Quiz Completed!</h3>
                    <p className="text-lg">Your score: {quizScore} out of {quizQuestions.length}</p>
                    <Button onClick={() => {
                      setQuizScore(0);
                      setCurrentQuestion(0);
                      setQuizCompleted(false);
                    }} className="mt-4">
                      Retake Quiz
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Adopt a Cat</CardTitle>
                <CardDescription>Give a loving home to a furry friend</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>
                  <div>
                    <Label htmlFor="catPreference">Cat Preference</Label>
                    <Input id="catPreference" placeholder="Any specific breed or age preference?" />
                  </div>
                  <Button type="submit">Submit Adoption Request</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <footer className="bg-primary text-primary-foreground p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About CatWorld</h3>
            <p>Dedicated to providing cat lovers with information, facts, and fun content about our feline friends.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Gallery</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-2">Stay updated with our latest cat news and facts!</p>
            <div className="flex">
              <Input type="email" placeholder="Enter your email" className="mr-2" />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2023 CatWorld. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Facebook size={24} className="cursor-pointer hover:text-secondary" />
            <Twitter size={24} className="cursor-pointer hover:text-secondary" />
            <Instagram size={24} className="cursor-pointer hover:text-secondary" />
            <Github size={24} className="cursor-pointer hover:text-secondary" />
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8"
          >
            <Button
              onClick={scrollToTop}
              className="rounded-full w-12 h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <ChevronUp size={24} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

// Add this script to enable the parallax effect
const script = document.createElement('script');
script.innerHTML = `
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.body.style.setProperty('--scroll', scrollY + 'px');
  });
`;
document.body.appendChild(script);
