import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Text "mo:core/Text";

actor {
  type Lesson = {
    id : Nat;
    title : Text;
    content : Text;
    difficulty : Nat;
  };

  type PracticeProblem = {
    id : Nat;
    question : Text;
    answer : Text;
    lessonId : Nat;
    topic : Text;
  };

  type Progress = {
    completedLessons : List.List<Nat>;
    practiceScores : Map.Map<Nat, Nat>;
    streak : Nat;
    achievements : List.List<Text>;
    practiceSessions : List.List<PracticeSession>;
  };

  type PracticeSession = {
    topic : Text;
    problemsAttempted : Nat;
    correctCount : Nat;
    duration : Nat;
    timestamp : Nat;
  };

  type PracticeProgress = {
    topic : Text;
    attempts : Nat;
    correct : Nat;
    fastestTime : Nat;
  };

  type ProgressView = {
    completedLessons : [Nat];
    practiceScores : [(Nat, Nat)];
    streak : Nat;
    achievements : [Text];
    practiceSessions : [PracticeSession];
  };

  module Lesson {
    public func compare(a : Lesson, b : Lesson) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module PracticeProblem {
    public func compare(a : PracticeProblem, b : PracticeProblem) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module Progress {
    public func compare(a : Progress, b : Progress) : Order.Order {
      Nat.compare(a.streak, b.streak);
    };
  };

  let lessons = Map.empty<Nat, Lesson>();
  let problems = Map.empty<Nat, PracticeProblem>();
  let userProgress = Map.empty<Principal, Progress>();

  public shared ({ caller }) func initializeContent() : async () {
    let lesson1 : Lesson = {
      id = 1;
      title = "Fractions - The Pizza Slice Dilemma";
      content =
        "# Fractions - The Pizza Slice Dilemma  **Concept**: A fraction is a way of representing a part of a whole. Imagine a pizza (with brainrot toppings, of course). If you cut it into 8 slices, each slice is 1/8.  ## Visual Explanation  Pizza: [1/8][1/8][1/8][1/8][1/8][1/8][1/8][1/8]  **Example**: 3 slices out of 8 (brainrot style) is written as 3/8.  **Brainrot Pro Tip**: Always keep an eye on the denominator! It's the total number of slices.  ## Fraction Addition Example  - Add 1/4 (brainrot cheese pizza) and 2/8 (brainrot pepperoni pizza) - Convert to common denominator: 1/4 = 2/8 - Add: 2/8 + 2/8 = 4/8 = 1/2";
      difficulty = 1;
    };

    let lesson2 : Lesson = {
      id = 2;
      title = "Decimals - The Game Score Hack";
      content =
        "# Decimals - The Game Score Hack  **Concept**: Decimals are another way to express fractions or parts of a whole. Imagine your game scores went decimal... can you handle the brainrot?  ## Visual Explanation  Game Score Bar: [0.1][0.2][0.3][0.4][0.5][0.6][0.7][0.8][0.9][1.0]  **Example**: 0.5 = 1/2, 0.25 = 1/4  **Brainrot Pro Tip**: Just move the decimal left for tenths, right for wholes!  ## Decimal to Fraction Conversion  - 0.75 as a fraction? Easy! 0.75 = 3/4.";
      difficulty = 2;
    };

    let lesson3 : Lesson = {
      id = 3;
      title = "Percentages - Power Up Your Scores";
      content =
        "# Percentages - Power Up Your Scores  **Concept**: A percentage is a fraction out of 100. Think of it as your power bar in brainrot games – 100% = full power!  ## Visual Representation  Power Bar: [0%][25%][50%][75%][100%]  **Example**: 40% = 40/100 = 4/10 = 2/5  **Brainrot Pro Tip**: Move the decimal two places to go from percentage to decimal.";
      difficulty = 2;
    };

    let lesson4 : Lesson = {
      id = 4;
      title = "Algebra - Unravel the Brainrot Mystery";
      content =
        "# Algebra - Unravel the Brainrot Mystery  **Concept**: In algebra, we use letters (like X) to represent mystery numbers. It's like solving brainrot puzzles!  ## Example  - Find X: X + 5 = 12 - Subtract 5 from both sides:  X = 12 - 5 X = 7  **Brainrot Pro Tip**: Always do the same thing to both sides to keep the puzzle balanced.";
      difficulty = 3;
    };

    let lesson5 : Lesson = {
      id = 5;
      title = "Geometry - The Shape War";
      content =
        "# Geometry - The Shape War  **Concept**: Geometry is all about shapes, spaces, and measuring brainrot objects.  ## Common Formulas  **Rectangle Area**: length × width (Area of game console) **Circle Area**: π × radius² (Area of pizza)  **Brainrot Pro Tip**: Remember π ≈ 3.14. It's like your favorite pizza topping!";
      difficulty = 3;
    };

    let lesson6 : Lesson = {
      id = 6;
      title = "Ratios - The Brainrot Mixer";
      content =
        "# Ratios - The Brainrot Mixer  **Concept**: A ratio compares two different things. It's like mixing brainrot sauces.  ## Example  - 3:1 ratio of ketchup to mayo - 3 ketchup bottles for every 1 mayo bottle  **Brainrot Pro Tip**: Double both sides to increase the ratio without changing the flavor!";
      difficulty = 2;
    };

    lessons.add(lesson1.id, lesson1);
    lessons.add(lesson2.id, lesson2);
    lessons.add(lesson3.id, lesson3);
    lessons.add(lesson4.id, lesson4);
    lessons.add(lesson5.id, lesson5);
    lessons.add(lesson6.id, lesson6);

    let problem1 : PracticeProblem = {
      id = 1;
      question = "What is 1/2 of 8?";
      answer = "4";
      lessonId = 1;
      topic = "fractions";
    };

    let problem2 : PracticeProblem = {
      id = 2;
      question = "Convert 0.75 to a fraction.";
      answer = "3/4";
      lessonId = 2;
      topic = "decimals";
    };

    let problem3 : PracticeProblem = {
      id = 3;
      question = "40% as a decimal is?";
      answer = "0.4";
      lessonId = 3;
      topic = "percentages";
    };

    let problem4 : PracticeProblem = {
      id = 4;
      question = "Solve for X: X + 5 = 12";
      answer = "7";
      lessonId = 4;
      topic = "algebra";
    };

    let problem5 : PracticeProblem = {
      id = 5;
      question = "Area of rectangle (5m x 3m)";
      answer = "15";
      lessonId = 5;
      topic = "geometry";
    };

    let problem6 : PracticeProblem = {
      id = 6;
      question = "3:1 sauce to fries ratio. If you have 15 fries, how much sauce?";
      answer = "5";
      lessonId = 6;
      topic = "ratios";
    };

    problems.add(problem1.id, problem1);
    problems.add(problem2.id, problem2);
    problems.add(problem3.id, problem3);
    problems.add(problem4.id, problem4);
    problems.add(problem5.id, problem5);
    problems.add(problem6.id, problem6);

    let progressMap : Map.Map<Nat, Nat> = Map.empty<Nat, Nat>();
    let initialProgress : Progress = {
      completedLessons = List.empty<Nat>();
      practiceScores = progressMap;
      streak = 0;
      achievements = List.empty<Text>();
      practiceSessions = List.empty<PracticeSession>();
    };
    userProgress.add(caller, initialProgress);
  };

  public shared ({ caller }) func addMultiplicationProblems() : async () {
    let problemsToAdd = [
      {
        id = 7;
        question = "7 x 8 = ?";
        answer = "56";
        lessonId = 0;
        topic = "multiplication";
      },
      {
        id = 8;
        question = "12 friends each bring 5 brainrot snacks. How many snacks?";
        answer = "60";
        lessonId = 0;
        topic = "multiplication";
      },
      {
        id = 9;
        question = "If you have 45 brainrot meme stickers and 9 friends, how many stickers per friend?";
        answer = "5";
        lessonId = 0;
        topic = "division";
      },
      {
        id = 10;
        question = "144 divided by 12 equals?";
        answer = "12";
        lessonId = 0;
        topic = "division";
      },
      {
        id = 11;
        question = "37 packs of chips, 4 bags each. Total chips?";
        answer = "148";
        lessonId = 0;
        topic = "multiplication";
      },
      {
        id = 12;
        question = "Divide 81 treasure coins among 9 pirates. Each gets?";
        answer = "9";
        lessonId = 0;
        topic = "division";
      },
    ];

    for (problem in problemsToAdd.values()) {
      problems.add(problem.id, problem);
    };
  };

  public query ({ caller }) func getLessons() : async [Lesson] {
    lessons.values().toArray().sort();
  };

  public query ({ caller }) func getPracticeProblems() : async [PracticeProblem] {
    problems.values().toArray().sort();
  };

  public query ({ caller }) func getProblemsByTopic(topic : Text) : async [PracticeProblem] {
    problems.values().toArray().filter(
      func(p) {
        Text.equal(p.topic, topic);
      }
    );
  };

  public shared ({ caller }) func completeLesson(lessonId : Nat) : async ProgressView {
    switch (userProgress.get(caller)) {
      case (null) { Runtime.trap("User not found") };
      case (?progress) {
        progress.completedLessons.add(lessonId);
        let updatedProgress : Progress = {
          completedLessons = progress.completedLessons;
          practiceScores = progress.practiceScores;
          streak = progress.streak + 1;
          achievements = progress.achievements;
          practiceSessions = progress.practiceSessions;
        };
        userProgress.add(caller, updatedProgress);
        progressToView(updatedProgress);
      };
    };
  };

  public shared ({ caller }) func submitPracticeScore(problemId : Nat, score : Nat) : async ProgressView {
    switch (userProgress.get(caller)) {
      case (null) { Runtime.trap("User not found") };
      case (?progress) {
        progress.practiceScores.add(problemId, score);
        let updatedProgress : Progress = {
          completedLessons = progress.completedLessons;
          practiceScores = progress.practiceScores;
          streak = progress.streak;
          achievements = progress.achievements;
          practiceSessions = progress.practiceSessions;
        };
        userProgress.add(caller, updatedProgress);
        progressToView(updatedProgress);
      };
    };
  };

  public shared ({ caller }) func addAchievement(achievement : Text) : async ProgressView {
    switch (userProgress.get(caller)) {
      case (null) { Runtime.trap("User not found") };
      case (?progress) {
        progress.achievements.add(achievement);
        let updatedProgress : Progress = {
          completedLessons = progress.completedLessons;
          practiceScores = progress.practiceScores;
          streak = progress.streak;
          achievements = progress.achievements;
          practiceSessions = progress.practiceSessions;
        };
        userProgress.add(caller, updatedProgress);
        progressToView(updatedProgress);
      };
    };
  };

  public shared ({ caller }) func recordPracticeSession(session : PracticeSession) : async ProgressView {
    switch (userProgress.get(caller)) {
      case (null) { Runtime.trap("User not found") };
      case (?progress) {
        progress.practiceSessions.add(session);
        let updatedProgress : Progress = {
          completedLessons = progress.completedLessons;
          practiceScores = progress.practiceScores;
          streak = progress.streak;
          achievements = progress.achievements;
          practiceSessions = progress.practiceSessions;
        };
        userProgress.add(caller, updatedProgress);
        progressToView(updatedProgress);
      };
    };
  };

  public query ({ caller }) func getPracticeSessions() : async [PracticeSession] {
    switch (userProgress.get(caller)) {
      case (null) { Runtime.trap("User not found") };
      case (?progress) {
        progress.practiceSessions.toArray();
      };
    };
  };

  public query ({ caller }) func getPracticeProgressByTopic(topic : Text) : async PracticeProgress {
    switch (userProgress.get(caller)) {
      case (null) { Runtime.trap("User not found") };
      case (?progress) {
        var attempts = 0;
        var correct = 0;
        var fastestTime = 0;

        let filteredSessions = progress.practiceSessions.toArray().filter(
          func(session) {
            Text.equal(session.topic, topic);
          }
        );

        filteredSessions.forEach(
          func(session) {
            attempts += session.problemsAttempted;
            correct += session.correctCount;
            if (session.duration < fastestTime or fastestTime == 0) {
              fastestTime := session.duration;
            };
          }
        );

        {
          topic;
          attempts;
          correct;
          fastestTime;
        };
      };
    };
  };

  public query ({ caller }) func getProgress() : async ?ProgressView {
    switch (userProgress.get(caller)) {
      case (null) { null };
      case (?progress) { ?progressToView(progress) };
    };
  };

  func progressToView(progress : Progress) : ProgressView {
    {
      completedLessons = progress.completedLessons.toArray();
      practiceScores = progress.practiceScores.toArray();
      streak = progress.streak;
      achievements = progress.achievements.toArray();
      practiceSessions = progress.practiceSessions.toArray();
    };
  };
};
