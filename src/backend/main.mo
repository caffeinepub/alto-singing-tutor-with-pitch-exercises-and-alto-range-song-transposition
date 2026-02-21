import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Lesson = {
    id : Nat;
    title : Text;
    content : Text;
    difficulty : Nat;
    topic : Text;
  };

  type PracticeProblem = {
    id : Nat;
    question : Text;
    answer : Text;
    lessonId : Nat;
    topic : Text;
  };

  type PracticeSession = {
    topic : Text;
    problemsAttempted : Nat;
    correctCount : Nat;
    duration : Nat;
    timestamp : Nat;
  };

  type Progress = {
    completedLessons : List.List<Nat>;
    practiceScores : Map.Map<Nat, Nat>;
    streak : Nat;
    achievements : List.List<Text>;
    practiceSessions : List.List<PracticeSession>;
  };

  type ProgressView = {
    completedLessons : [Nat];
    practiceScores : [(Nat, Nat)];
    streak : Nat;
    achievements : [Text];
    practiceSessions : [PracticeSession];
  };

  type PracticeProgress = {
    topic : Text;
    attempts : Nat;
    correct : Nat;
    fastestTime : Nat;
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

  module PracticeSession {
    public func compare(a : PracticeSession, b : PracticeSession) : Order.Order {
      Nat.compare(a.timestamp, b.timestamp);
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

  func initializeFractionsLessons() : [Lesson] {
    [
      {
        id = 100;
        title = "Fractions - Equivalent Mayhem";
        content = "# Equivalent Fractions - The Brainrot Shortcut\n\n## Brainrot Concept\nEquivalent fractions are different ways to write the same value. It's like having two usernames that let you into the same account.\n\n## Examples\n- 1/2 = 2/4 = 4/8\n- Same amount, different number of slices!\n";
        difficulty = 1;
        topic = "fractions";
      },
      {
        id = 101;
        title = "Fractions - Adding & Subtracting Madness";
        content = "# Adding & Subtracting Fractions - Brainrot Chaos\n\n## Adding Like Denominators\nSimply add the numerators and keep the denominator the same!\n\n## Adding Unlike Denominators\nNo common denominator? Multiply both to get the same bottom number!\n\n## Examples\n- 1/4 + 2/8 = 1/4 + 1/4 = 2/4 = 1/2\n";
        difficulty = 2;
        topic = "fractions";
      },
      {
        id = 102;
        title = "Fractions - Multiplying & Dividing Mayhem";
        content = "# Multiplying & Dividing Fractions - Brainrot Style\n\n## Multiplying Fractions\nSimply multiply the numerators together and denominators together!\n\n## Dividing Fractions\nMultiply by the reciprocal (flip it) and then multiply as usual.\n\n## Examples\n- 2/3 × 3/4 = 6/12 = 1/2\n- 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2\n";
        difficulty = 3;
        topic = "fractions";
      },
    ];
  };

  func initializeDecimalsLessons() : [Lesson] {
    [
      {
        id = 200;
        title = "Decimals - Place Value Panic";
        content = "# Decimal Place Value - Don't Lose Your Place!\n\n## Brainrot Concept\nEach digit to the right of the decimal point is a power of 10 smaller - tenths, hundredths, thousandths.\n\n## Visual Example\n- 0.5 = 5 tenths\n- 0.05 = 5 hundredths\n- 0.005 = 5 thousandths\n";
        difficulty = 1;
        topic = "decimals";
      },
      {
        id = 201;
        title = "Decimals - Operation Overload";
        content = "# Operating with Decimals - Brainrot Speedrun\n\n## Add & Subtract\nLine up the decimals and add or subtract.\n\n## Multiply\nMultiply as if they're whole numbers, then count and place the decimal correctly!\n\n## Divide\nMove decimal points to make the divisor a whole number, then divide as usual!\n";
        difficulty = 2;
        topic = "decimals";
      },
      {
        id = 202;
        title = "Decimals - Fraction Conversion Chaos";
        content = "# Decimal-Fraction Conversion - The Brainrot Hack\n\n## Decimals to Fractions\nDecimal numbers can be rewritten as fractions, making them easier to manipulate!\n\n## Brainrot Pro Tip:\nJust read the decimal to say the fraction.\n\n## Examples\n- 0.5 = 5/10s = 1/2\n- 0.45 = 45/100s = 9/20\n";
        difficulty = 3;
        topic = "decimals";
      },
    ];
  };

  func initializePercentagesLessons() : [Lesson] {
    [
      {
        id = 300;
        title = "Percent Basics - Power Bar of Life";
        content = "# Percentages - Power Bar Reality\n\n## Brainrot Concept\nPercentages are fractions out of 100, representing power level as a whole.\n\n## Examples\n- 25% = 1/4 full\n- 50% = half full\n- 100% = full power\n\n## Conversion Hack\nDecimal to percent - move two spaces right.\n- 0.75 = 75%\n";
        difficulty = 1;
        topic = "percentages";
      },
      {
        id = 301;
        title = "Percent Calculations - Discount Defense";
        content = "# Calculating with Percentages - Biggest Brain Discounts\n\n## Finding a Percentage of a Number\nMultiply the number by the percentage as a decimal.\n\n## Percentage Increase/Decrease\nAdd or subtract percentage from the original\n";
        difficulty = 2;
        topic = "percentages";
      },
      {
        id = 302;
        title = "Real-World Percentages - Saving Brainrot Bucks";
        content = "# Real World Percentages - Brainrot Bargains\n\n## Concepts\n- Discount calculation (sale prices)\n- Tips (service gratitude)\n- Tax (government fee)\n\n## Example\n20% off $50 = $40\n";
        difficulty = 3;
        topic = "percentages";
      },
    ];
  };

  func initializeAlgebraLessons() : [Lesson] {
    [
      {
        id = 400;
        title = "Algebraic Expressions - Brainrot Code";
        content = "# Algebraic Expressions - Crack the Brainrot Code\n\n## Brainrot Concept\nUse letters to stand for unknown numbers and manipulate equations like code.\n\n## Example\n- Let x = pizza slices\n- Equation:  x + 5 = 12\n- x is now 7\n";
        difficulty = 1;
        topic = "algebra";
      },
      {
        id = 401;
        title = "One and Two-Step Equations - Brainrot Solutions";
        content = "# One & Two Step Equations - Blazing Through Brainrot\n\n## Brainrot Technique\nPerform the opposite operation to isolate the variable.\n\n## Examples\nx + 3 = 7 → x = 4\n2x = 10 → x = 5\n";
        difficulty = 2;
        topic = "algebra";
      },
      {
        id = 402;
        title = "Like Terms and Distributive Property - Brainrot Combo Moves";
        content = "# Like Terms & Distributive Property - Next Level Brainrot\n\n## Combining Like Terms\nTerms with the same variable can merge into one term.\n\n## Distributive Property\nApply to all terms inside parentheses\n\n## Example\n2(x + 3) = 2x + 6\n";
        difficulty = 3;
        topic = "algebra";
      },
    ];
  };

  func initializeGeometryLessons() : [Lesson] {
    [
      {
        id = 500;
        title = "Area and Perimeter - Shape Wars Begin";
        content = "# Area & Perimeter - Master the Shapes\n\n## Rectangle\n- Area: Length x Width\n- Perimeter: Add all sides\n\n## Triangle Area\n- 1/2 x Base x Height\n";
        difficulty = 1;
        topic = "geometry";
      },
      {
        id = 501;
        title = "Circles - Brainrot Pi Power";
        content = "# Circles - Brainrot Pi Power\n\n## Area\n- π × radius²\n- Use 3.14 for π\n\n## Circumference\n- 2 × π × radius\n";
        difficulty = 2;
        topic = "geometry";
      },
      {
        id = 502;
        title = "Volume and Angles - Brainrot 3D Effects";
        content = "# Volume & Angles - Brainrot in 3D\n\n## Volume\n- Rectangular Prism: Length × Width × Height\n- Cylinder: π × radius² × height\n\n## Angles\n- Complementary = 90°\n- Supplementary = 180°\n";
        difficulty = 3;
        topic = "geometry";
      },
    ];
  };

  func initializeRatiosLessons() : [Lesson] {
    [
      {
        id = 600;
        title = "Ratios and Simplification - Brainrot Recipes";
        content = "# Ratios & Simplification - Mix It Up\n\n## Basic Ratio\n- Compares parts (3:1 brainrot:normal)\n- Can add both sides, keep same ratio\n";
        difficulty = 1;
        topic = "ratios";
      },
      {
        id = 601;
        title = "Equivalent Ratios - Brainrot Proportions";
        content = "# Equivalent Ratios - Proportional Effects\n\n## Equivalent Ratios\n- Double or triple both sides \n";
        difficulty = 2;
        topic = "ratios";
      },
      {
        id = 602;
        title = "Word Problems - Brainrot Ratios in Life";
        content = "# Ratios in Word Problems - Real Life Brainrot\n\n## Example\n- Sauce to fries ratio\n- Recipe Ingredient Ratio\n- Scale Model Ratio\n";
        difficulty = 3;
        topic = "ratios";
      },
    ];
  };

  func initializeMultiplicationLessons() : [Lesson] {
    [
      {
        id = 700;
        title = "Multiplication - Brainrot Flash Facts";
        content = "# Multiplication Facts - Brainrot Speedrun\n\n## Brainrot Basics\n- Order doesn't matter (commutative property)\n- Trick for multiplying by 10: Just add a 0 to the number!\n";
        difficulty = 1;
        topic = "multiplication";
      },
      {
        id = 701;
        title = "Multi-Digit Multiplication - Brainrot Strategies";
        content = "# Multi-Digit Multiplication - Level Up Techniques\n\n## Brainrot Pro Tip\n- Break large numbers into smaller parts (distributive property)\n- Example: 12 × 8 = (10 × 8) + (2 × 8) = 96\n";
        difficulty = 2;
        topic = "multiplication";
      },
      {
        id = 702;
        title = "Word Problem Warriors - Brainrot Multiplies";
        content = "# Word Problems - Multiply to Solve Everything\n\n## Example Problems\n- Total number of stickers per friend\n- Calculating total price of multiple items\n";
        difficulty = 3;
        topic = "multiplication";
      },
    ];
  };

  func initializeDivisionLessons() : [Lesson] {
    [
      {
        id = 800;
        title = "Division - The Breakdown";
        content = "# Division Basics - Splitting Brainrot\n\n## Division Works In Reverse\n- Find the dividend, divisor, and quotient\n- Finding whole number answers\n";
        difficulty = 1;
        topic = "division";
      },
      {
        id = 801;
        title = "Long Division - Brainrot Longevity";
        content = "# Long Division - Step By Step Brainrot\n\n## Steps\n- Divide -> Multiply -> Subtract -> Bring Down\n- Continue until done\n";
        difficulty = 2;
        topic = "division";
      },
      {
        id = 802;
        title = "Division Shortcuts and Remainders";
        content = "# Division Shortcuts & Remainders - Brainrot Extras\n\n## Divisibility Rules\n- 2: number ends with 0, 2, 4, 6, 8\n- 3: sum of digits divisible by 3\n- 5: ends with 0 or 5\n";
        difficulty = 3;
        topic = "division";
      },
    ];
  };

  public shared ({ caller }) func initializeContent() : async () {
    let allLessons = initializeFractionsLessons()
      .concat(initializeDecimalsLessons())
      .concat(initializePercentagesLessons())
      .concat(initializeAlgebraLessons())
      .concat(initializeGeometryLessons())
      .concat(initializeRatiosLessons())
      .concat(initializeMultiplicationLessons())
      .concat(initializeDivisionLessons());

    for (lesson in allLessons.values()) {
      lessons.add(lesson.id, lesson);
    };

    let practiceProblems : [PracticeProblem] = [
      // Fractions: Equivalent
      {
        id = 100;
        question = "What is the equivalent fraction of 2/4?";
        answer = "1/2";
        lessonId = 100;
        topic = "fractions";
      },
      {
        id = 101;
        question = "What is 3/5 as an equivalent fraction with a denominator of 10?";
        answer = "6/10";
        lessonId = 100;
        topic = "fractions";
      },
      // Fractions: Addition
      {
        id = 102;
        question = "Add 1/4 + 1/4";
        answer = "1/2";
        lessonId = 101;
        topic = "fractions";
      },
      {
        id = 103;
        question = "Subtract 3/8 - 1/8";
        answer = "1/4";
        lessonId = 101;
        topic = "fractions";
      },
      // Fractions: Multiplication/Division
      {
        id = 104;
        question = "Multiply 2/3 × 3/4";
        answer = "1/2";
        lessonId = 102;
        topic = "fractions";
      },
      {
        id = 105;
        question = "Divide 1/2 by 1/4";
        answer = "2";
        lessonId = 102;
        topic = "fractions";
      },
      // Decimals: Place Value
      {
        id = 200;
        question = "What is 0.5 in fraction form?";
        answer = "1/2";
        lessonId = 200;
        topic = "decimals";
      },
      {
        id = 201;
        question = "What is 0.75 in fraction form?";
        answer = "3/4";
        lessonId = 200;
        topic = "decimals";
      },
      // Decimals: Operations
      {
        id = 202;
        question = "Add 2.5 + 3.25";
        answer = "5.75";
        lessonId = 201;
        topic = "decimals";
      },
      {
        id = 203;
        question = "Multiply 3.4 × 2";
        answer = "6.8";
        lessonId = 201;
        topic = "decimals";
      },
      // Decimals: Conversion
      {
        id = 204;
        question = "Convert 0.8 to a percentage";
        answer = "80%";
        lessonId = 202;
        topic = "decimals";
      },
      {
        id = 205;
        question = "Convert 25% to a decimal";
        answer = "0.25";
        lessonId = 202;
        topic = "decimals";
      },
      // Percentages: Basics
      {
        id = 300;
        question = "What is 40% as a decimal?";
        answer = "0.4";
        lessonId = 300;
        topic = "percentages";
      },
      {
        id = 301;
        question = "What is 1/2 as a percentage?";
        answer = "50%";
        lessonId = 300;
        topic = "percentages";
      },
      // Percentages: Calculations
      {
        id = 302;
        question = "What is 25% of 80?";
        answer = "20";
        lessonId = 301;
        topic = "percentages";
      },
      {
        id = 303;
        question = "Increase 50 by 20%";
        answer = "60";
        lessonId = 301;
        topic = "percentages";
      },
      // Percentages: Real World
      {
        id = 304;
        question = "After a 20% discount, a $50 item costs?";
        answer = "40";
        lessonId = 302;
        topic = "percentages";
      },
      {
        id = 305;
        question = "What is the total cost after 10% sales tax on $30?";
        answer = "33";
        lessonId = 302;
        topic = "percentages";
      },
    ];

    for (problem in practiceProblems.values()) {
      problems.add(problem.id, problem);
    };

    let initialProgress : Progress = {
      completedLessons = List.empty<Nat>();
      practiceScores = Map.empty<Nat, Nat>();
      streak = 0;
      achievements = List.empty<Text>();
      practiceSessions = List.empty<PracticeSession>();
    };
    userProgress.add(caller, initialProgress);
  };

  public query ({ caller }) func getLessons() : async [Lesson] {
    lessons.values().toArray().sort();
  };

  public query ({ caller }) func getLessonsByTopic(topic : Text) : async [Lesson] {
    lessons.values().toArray().filter(
      func(l) {
        Text.equal(l.topic, topic);
      }
    );
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
